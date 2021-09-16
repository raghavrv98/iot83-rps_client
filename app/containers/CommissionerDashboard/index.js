
/**
 *
 * CommissionerDashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
	getSegmentDataSuccess,
	getSegmentDataFailure,
	getChartDetailsSuccess,
	getChartDetailsFailure,
	plantList,
	plantListFailure,
	pipelineList,
	pipelineListFailure,
	attributesList,
	attributesListFailure
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getSegmentData, getAlarmChart, managePlantList, fetchPipelinesDetails, getAttributes } from './actions';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commonMessages from '../../messages';
import Select from 'react-select';
import MessageModal from "../../components/MessageModal/Loadable";
import moment from 'moment';
import HistoryChart from '../../components/HistoryChart/Loadable';
import { lookUpGrade, getGaugeConfig } from '../../utils/commonUtils';
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from "../../components/SkeletonLoader";
import PipelineHealth from "../../components/PipelineHealth";
import { cloneDeep } from 'lodash';

export class CommissionerDashboard extends React.Component {
	state = {
		checkedLegends: [],
		selectedAttribute: [],
		optionsAttributes: [],
		selectedPlant: { value: "all", label: "ALL" },
		selectedPipeline: "",
		chartData: false,
		alarmData: false,
		pipelineList: [],
		isplantFetching: true,
		isPipelineFetching: true,
		isAttributesListFetching: true,
		isDistanceChartFetching: true,
		isHistoryChartFetching: true,
		isMultipleAttribute: false,
		selectedTimestamps: [],
		selectedIndex: [],
		selectedIndexTimestamp: true,
		distanceUnit: "",
		chartMin: 0,
		chartMax: 100,
		gaugeConfig: [],
		healthScore: '',
		historyChartDuration: 60,
		isActivePlanModal: false
	}

	componentWillMount() {
		this.props.managePlantList();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.attributesList && this.props.attributesList !== nextProps.attributesList) {
			if (nextProps.attributesList.attributes.length > 0) {
				this.props.getSegmentData(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, { attributes: [nextProps.attributesList.attributes[0].name] })
			}
			let attributesListLabel = JSON.parse(JSON.stringify(nextProps.attributesList.attributes))
			originalList = JSON.parse(JSON.stringify(this.state.originalList))
			let selectedId = originalList.find(val => val._id == this.state.selectedPipeline.value)
			let healthScore = selectedId.healthScore
			let badDTS = selectedId.badDTS
			this.setState({
				activePlan: nextProps.attributesList.activePlan,
				attributesListLabel,
				originalList,
				healthScore,
				badDTS,
				optionsAttributes: nextProps.attributesList.attributes.map(val => {
					var label = <div className="labelAttribute">
						{val.value ?
							<i className="far fa-check-circle text-success mr-r-10"></i>
							:
							<i className="fas fa-star text-warning mr-r-10"></i>
						}
						<span>{val.displayName}</span>
					</div>
					return {
						label,
						value: val.name,
						active: val.value
					}
				}),
				selectedAttribute: nextProps.attributesList.attributes.length > 0 ? [{
					label: <div className="labelAttribute">
						{nextProps.attributesList.attributes[0].value ?
							<i className="far fa-check-circle text-success mr-r-10"></i>
							:
							<i className="fas fa-star text-warning mr-r-10"></i>
						}
						<span>{nextProps.attributesList.attributes[0].displayName}</span>
					</div>,
					value: nextProps.attributesList.attributes[0].name,
					active: nextProps.attributesList.attributes[0].value
				}] : [],
				isAttributesListFetching: false,
				isDistanceChartFetching: true

			});
		}

		if (nextProps.segmentDataSuccess && this.props.segmentDataSuccess !== nextProps.segmentDataSuccess) {
			let originalData = JSON.parse(JSON.stringify(nextProps.segmentDataSuccess))
			var isHistoryChartFetching = this.state.isHistoryChartFetching
			let startPoint, endPoint = ""
			let apiData = nextProps.segmentDataSuccess;
			let timestamp = moment(apiData.timestamp).format("DD MMM YYYY HH:mm:ss");
			let selectedAttribute = JSON.parse(JSON.stringify(this.state.selectedAttribute)).map(val => val.value)
			let healthScore = this.state.healthScore

			let chartdata = {}
			Object.keys(apiData.chartData).map(val => {
				apiData.chartData[val].map(attr => {

					if (chartdata[attr[0]]) {
						chartdata[attr[0]][val] = attr[1]
						chartdata[attr[0]].distance = attr[0]
						chartdata[attr[0]][val + "__color"] = attr[2]
					}
					else {
						let temp = {}
						temp.distance = attr[0]
						temp[val] = attr[1]
						temp[val + "__color"] = attr[2]
						chartdata[attr[0]] = temp
					}

				})
			})

			apiData.chartData = Object.values(chartdata)
			if (apiData.chartData.length > 0) {
				startPoint = apiData.chartData[0].distance;
				endPoint = apiData.chartData[apiData.chartData.length - 1].distance;
				isHistoryChartFetching = this.state.selectedIndexTimestamp

				apiData.attributes = apiData.attributes.filter(attr => !(attr == "distance" || attr.includes('__color'))).map(attr => {
					return {
						name: attr,
						value: endPoint
					};
				})
				delete apiData.units.distance;
				apiData.attributes.map(attr => {
					this.state.checkedLegends.push(`${attr.name}_analyst_visible`);
					attr.id = "analyst"
					return attr
				}
				)
				this.state.healthScore != null && getGaugeConfig("gaugechart" + this.state.selectedPipeline.value, this.state.healthScore, this.state.gaugeConfig, this.state.badDTS, this.state.chartMin, this.state.chartMax)
			}
			else {
				isHistoryChartFetching = false
				healthScore = null
			}

			this.setState({
				chartData: apiData,
				startPoint, endPoint, timestamp,
				isDistanceChartFetching: false,
				isHistoryChartFetching,
				distanceUnit: originalData.units.distance,
				oriData: apiData,
				healthScore
			});
			if (apiData.chartData.length > 0 && this.state.selectedIndexTimestamp && !this.state.removeTimestamp) {
				this.props.getAlarmChart(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, this.state.selectedDistance ? this.state.selectedDistance : apiData.chartData[0].distance, { attributes: selectedAttribute, minutes: this.state.historyChartDuration })
			}
		}

		if (nextProps.chartDetailsSuccess && nextProps.chartDetailsSuccess !== this.props.chartDetailsSuccess) {
			let startDate, endDate;
			let clickDistance = nextProps.chartDetailsSuccess.distance;
			if (nextProps.chartDetailsSuccess.chartData.length > 0) {
				startDate = moment(nextProps.chartDetailsSuccess.chartData[0].timestamp).format("DD MMM YYYY HH:mm:ss");
				endDate = moment(nextProps.chartDetailsSuccess.chartData[nextProps.chartDetailsSuccess.chartData.length - 1].timestamp).format("DD MMM YYYY HH:mm:ss");
			}
			let alarmData = nextProps.chartDetailsSuccess
			alarmData.attributes.map(attr => {
				this.state.checkedLegends.push(`${attr.name}_history_visible`)
				attr.id = "history"
				return attr
			})
			this.setState({
				alarmData,
				startDate, endDate, clickDistance,
				isHistoryChartFetching: false
			});
		}

		if (nextProps.plantList && nextProps.plantList !== this.props.plantList) {
			let plantList = []
			let selectedPlant
			if (nextProps.plantList.result.length > 0) {
				plantList = [{ value: "all", label: "ALL" }]
				nextProps.plantList.result.map(val => {
					plantList.push({
						value: val._id,
						label: val.name
					});
				})
				selectedPlant = this.props.match.params.plantId ? plantList.find(val => val.value === this.props.match.params.plantId) ? this.props.match.params.plantId : { value: "all", label: "ALL" } :
					{ value: "all", label: "ALL" }
				this.props.fetchPipelinesDetails(selectedPlant.value)
			}
			else {
				selectedPlant = { value: "noplant", label: "No plant Available" }
			}
			this.setState({
				plantList,
				selectedPlant,
				isplantFetching: false,
				isPipelineFetching: true
			})
		}

		if (nextProps.pipelineList && nextProps.pipelineList !== this.props.pipelineList) {
			var originalList = nextProps.pipelineList.result
			let pipelineList = nextProps.pipelineList.result.map(option => {
				let color = lookUpGrade(option.healthScore, nextProps.pipelineList.gaugeConfig) && lookUpGrade(option.healthScore, nextProps.pipelineList.gaugeConfig).color
				return {
					value: option._id,
					label: option.name,
					totalAlarm: option.alarmCount,
					plantId: option.plantId,
					healthcolor: color
				}
			})
			if (nextProps.pipelineList.result.length > 0) {
				let selectedPipeline = { label: nextProps.pipelineList.result[0].name, value: nextProps.pipelineList.result[0]._id, plantId: nextProps.pipelineList.result[0].plantId }
				this.props.getAttributes(this.state.selectedPlant.value, selectedPipeline.value);
				pipelineList.map(val => {
					if (val.value == selectedPipeline.value) {
						val.selected = true
					}
				})
				this.setState({
					pipelineList,
					originalList,
					isAttributesListFetching: true,
					selectedPipeline,
					isPipelineFetching: false,
					gaugeConfig: nextProps.pipelineList.gaugeConfig
				})
			}
			else {
				this.setState({
					pipelineList,
					selectedPipeline: "",
					optionsAttributes: [],
					isAttributesListFetching: false,
					isDistanceChartFetching: false,
					isHistoryChartFetching: false,
					isPipelineFetching: false,
				})
			}
		}

		['attributesListFailure', 'segmentDataError', 'chartDetailsFailure', 'plantListFailure', 'pipelineListFailure'].map(val => {
			this.errorSetStateHandler(nextProps[val], this.props[val]);
		})
	}

	errorSetStateHandler(nextError, currentError) {
		if (nextError && nextError !== currentError) {
			this.setState({
				isOpen: true,
				message: nextError,
				type: "error",
				isplantFetching: false,
				isPipelineFetching: false,
				isAttributesListFetching: false,
				isDistanceChartFetching: false,
				isHistoryChartFetching: false
			});
		}
	}

	handleChange = (event, value) => (option) => {
		if (event === "selectedPipeline" && value.value) {
			let pipelineList = cloneDeep(this.state.pipelineList)
			pipelineList.map(val => {
				if (val.value == value.value) {
					val.selected = true
				}
				else {
					val.selected = false
				}
			})
			this.setState({
				selectedPipeline: value,
				isAttributesListFetching: true,
				isDistanceChartFetching: true,
				isHistoryChartFetching: true,
				chartData: false,
				alarmData: false,
				isMultipleAttribute: false,
				selectedIndexTimestamp: true,
				selectedTimestamps: [],
				selectedIndex: [],
				removeTimestamp: false,
				historyChartDuration: 60,
				selectedDistance: this.state.chartData && this.state.chartData.chartData.length > 0 ? this.state.chartData.chartData[0].distance : undefined,
				pipelineList
			}, () => {
				this.props.getAttributes(this.state.selectedPlant.value, value.value);
			})
		} else if (event === "selectedPlant" && this.state.selectedPlant.value !== option.value) {
			this.setState({
				selectedPlant: option,
				isPipelineFetching: true,
				isAttributesListFetching: true,
				isDistanceChartFetching: true,
				isHistoryChartFetching: true,
				chartData: false,
				alarmData: false,
				isMultipleAttribute: false,
				selectedIndexTimestamp: true,
				selectedTimestamps: [],
				selectedIndex: [],
				removeTimestamp: false,
				historyChartDuration: 60,
				selectedDistance: this.state.chartData && this.state.chartData.chartData.length > 0 ? this.state.chartData.chartData[0].distance : undefined,
			}, () => {
				this.props.fetchPipelinesDetails(this.state.selectedPlant.value)
			})
		}
	}

	handleMultiChange = (selectedAttribute) => {
		if (this.state.isMultipleAttribute) {
			selectedAttribute = [selectedAttribute]
		}
		if (selectedAttribute[selectedAttribute.length - 1].active) {
			if (selectedAttribute) {
				let sendingObject = {
					attributes: selectedAttribute.map(attr => attr.value)
				}
				this.setState({
					selectedAttribute,
					isDistanceChartFetching: true,
					isHistoryChartFetching: true,
					selectedIndex: [],
					selectedTimestamps: [],
					selectedIndexTimestamp: true,
					removeTimestamp: false,
					selectedDistance: this.state.chartData.chartData.length > 0 ? this.state.chartData.chartData[0].distance : undefined,
					alarmData: false
				}, () => {
					this.props.getSegmentData(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, sendingObject);
				});
			}
		}
		else {
			this.upgradePlanModal(false)
		}
	}

	modalCloseHandler = () => {
		this.setState({
			isOpen: false,
			message: "",
			type: "",
		});
	}

	attributeSelect = (reset) => {
		let isMultipleAttribute = this.state.isMultipleAttribute ? reset : !this.state.isMultipleAttribute
		this.setState({
			isMultipleAttribute,
			selectedTimestamps: [],
			selectedIndex: [],
			isHistoryChartFetching: true,
			isDistanceChartFetching: true,
			selectedIndexTimestamp: true,
			historyChartDuration: 60,
			selectedDistance: this.state.chartData.chartData.length > 0 ? this.state.chartData.chartData[0].distance : undefined,
			removeTimestamp: false
		}, () => reset ? this.props.getSegmentData(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, { attributes: [this.state.selectedAttribute[0].value] }) : this.props.getAttributes(this.state.selectedPlant.value, this.state.selectedPipeline.value))
	}

	historyViewClickHandler = (lastPosition, dataProvider) => {
		let selectedIndex = JSON.parse(JSON.stringify(this.state.selectedIndex))
		let selectedTimestamps = JSON.parse(JSON.stringify(this.state.selectedTimestamps));
		if (!isNaN(lastPosition) && this.state.isMultipleAttribute && (selectedIndex.includes(lastPosition) || this.state.selectedIndex.length < 3)) {
			let index = selectedIndex.indexOf(lastPosition);
			if (index > -1) {
				selectedIndex.splice(index, 1);
			}
			else {
				selectedIndex.push(lastPosition);
			}
			let timestampIndex = selectedTimestamps.indexOf(dataProvider.timestamp);
			if (timestampIndex > -1) {
				selectedTimestamps.splice(timestampIndex, 1);
			}
			else {
				selectedTimestamps.push(dataProvider.timestamp);
			}
			let sendingObject = {
				attributes: this.state.selectedAttribute.map(attr => attr.value),
				timestamps: selectedTimestamps
			}
			this.setState({
				selectedTimestamps,
				selectedIndex,
				isDistanceChartFetching: true,
				isHistoryChartFetching: false,
				selectedIndexTimestamp: false,
			}, () => { this.props.getSegmentData(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, sendingObject) })
		}
	}

	commisionerViewClickHandler = (lastPosition, dataProvider) => {
		if (!isNaN(lastPosition)) {
			let selectedAttribute = JSON.parse(JSON.stringify(this.state.selectedAttribute)).map(val => val.value);
			this.setState({ isHistoryChartFetching: true, removeTimestamp: this.state.selectedIndex.length > 0, isDistanceChartFetching: (this.state.selectedIndex.length > 0), selectedIndex: [], selectedDistance: dataProvider.distance, selectedTimestamps: [] });
			if (dataProvider.distance) {
				this.state.removeTimestamp ? this.props.getSegmentData(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, { attributes: [this.state.selectedAttribute[0].value] }) : null
				this.props.getAlarmChart(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, dataProvider.distance, { attributes: selectedAttribute, minutes: this.state.historyChartDuration })
			}
		}
	}

	durationChangeHandler = (event) => {
		this.setState({
			historyChartDuration: event.target.value,
			isDistanceChartFetching: true,
			isHistoryChartFetching: true
		}, () => {
			this.props.getSegmentData(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, { attributes: [this.state.selectedAttribute[0].value] })
		})
	}

	upgradePlanModal = (close) => {
		this.setState({
			isActivePlanModal: !close
		})
	}

	render() {
		return (
			<div className="appContent">
				<Helmet>
					<title>Analyst Dashboard</title>
					<meta name="description" content="Description of Analyst Dashboard" />
				</Helmet>

				<div className="pageBreadcrumb">
					<div className="flex-item fx-b70">
						<p><FormattedMessage {...commonMessages.dashboard} children={(message => message)} /></p>
						<h5>
							<FormattedMessage {...messages.analystDashboard} children={(message => message)} />
							<span className="mx-3">|</span>
							<FormattedMessage {...messages.pipelineName} children={(message => message)} /> : <span className="text-theme">{this.state.selectedPipeline ? this.state.selectedPipeline.label : "-"}
								{this.state.healthScore != null ?
									<React.Fragment>
										<div className={this.state.badDTS ? "pipeLineStatus statusAlarm" : "pipeLineStatus"}>
											<div className="statusChartFrame">
												{this.state.badDTS && <span className="gaugeAalrm" />}
												<div id={"gaugechart" + this.state.selectedPipeline.value}></div>
											</div>
										</div>
									</React.Fragment>
									:
									<div className="gaugeSkeleton">
										<div className="pipeInfo"></div>
									</div>
								}

							</span>
						</h5>
					</div>

					<div className="flex-item fx-b30">
						<div className="form-group mr-b-0 flex align-items-baseline">
							<label className="form-label f-13 fx-b40 pd-r-10 text-right">
								<FormattedMessage {...commonMessages.selectPlant} children={(message => message)} /> :
							</label>
							<Select
								className="form-control-multi-select fx-b60"
								id="selectedPlant"
								isDisabled={this.state.selectedPlant.value === "noplant" || this.state.isHistoryChartFetching ? true : false}
								value={this.state.selectedPlant}
								onChange={this.handleChange("selectedPlant")}
								options={this.state.plantList}
							/>
						</div>
					</div>
				</div>
				{this.state.isplantFetching ?
					<SkeletonLoader skeleton="skeletonAnalystDashFullView" mode="fullView" />
					:
					this.state.plantList.length > 0 ?
						<div className="commissionerDashboard">
							<div className="commissionerChartBox">
								{this.state.isAttributesListFetching ?
									<SkeletonLoader skeleton="skeletonHistoryCharts" mode="fullView" />
									:
									this.state.optionsAttributes.length > 0 ?
										<React.Fragment>
											<div className="filterBox">
												<div className="form-group">
													<label className="form-label"><FormattedMessage {...commonMessages.selectAttribute} children={(message => message)} /> :</label>
													<Select
														placeholder="Select Attribute"
														isClearable={false}
														value={this.state.selectedAttribute}
														onChange={this.handleMultiChange}
														options={
															this.state.selectedAttribute.length >= 4 ?
																this.state.selectedAttribute :
																this.state.optionsAttributes
														}
														noOptionsMessage={() => "Max limit achieved"}
														isMulti={!this.state.isMultipleAttribute}
													/>
													<label className="btn-slide">
														<input checked={this.state.isMultipleAttribute} disabled={this.state.isDistanceChartFetching || this.state.isHistoryChartFetching} onChange={() => this.attributeSelect(false)} type="checkbox" />
														<span className="slider">
															<FormattedMessage {...messages.multipleProfile} children={(message => message)} />
														</span>
													</label>
												</div>
											</div>

											<div className="card pipeLineViewBox mr-b-20">
												<div className="card-header flex justify-content-between">
													{this.state.chartData && this.state.chartData.chartData.length > 0 ? <span><FormattedMessage {...messages.distanceView} children={(message => message)} /> ( {this.state.startPoint} - {this.state.endPoint} {this.state.distanceUnit} )</span> : <span><FormattedMessage {...messages.distanceView} children={(message => message)} /></span>}
													{this.state.chartData.chartData && this.state.chartData.chartData.length > 0 ? <span><FormattedMessage {...commonMessages.time} children={(message => message)} /> : {this.state.timestamp}</span> : null}
												</div>
												<div className="card-body pipelineTopologyBox" ref={(section) => { this.componentChart = section; }}>
													{this.state.isDistanceChartFetching ?
														<SkeletonLoader skeleton="skeletonAnalystCharts" mode="middleView" />
														:
														<HistoryChart
															data={this.state.chartData}
															height="300"
															isDateAxis={false}
															categoryAxisUnit={this.state.distanceUnit}
															categoryField="distance"
															cursorArray={[]}
															attributes={this.state.attributesListLabel}
															clickable={true}
															onClick={this.commisionerViewClickHandler}
															checkedLegends={this.state.checkedLegends}
															id={"analyst"}
														/>
													}
												</div>
											</div>

											<div className="card pipeLineViewBox">
												<div className="card-header flex justify-content-between align-items-center">
													{this.state.alarmData.chartData && this.state.alarmData.chartData.length > 0 ? <span><FormattedMessage {...messages.timeView} children={(message => message)} /> ( {this.state.startDate} - {this.state.endDate}  )</span> : <span><FormattedMessage {...messages.timeView} children={(message => message)} /></span>}
													<div className="timeLocationStatus">
														{this.state.alarmData.chartData && this.state.alarmData.chartData.length > 0 ? <span><FormattedMessage {...messages.location} children={(message => message)} /> : {this.state.clickDistance} {this.state.distanceUnit}</span> : null}
														<select onChange={this.durationChangeHandler} value={this.state.historyChartDuration} className="form-control">
															<option value={60}>1 Hour</option>
															<option value={180}>3 Hour</option>
															<option value={360}>6 Hour</option>
															<option value={1440}>1 Day</option>
															<option value={10080}>1 Week</option>
															<option value={20160}>2 Weeks</option>
														</select>
													</div>
												</div>
												<div className="card-body pipelineTopologyBox">
													{this.state.isHistoryChartFetching ?
														<SkeletonLoader skeleton="skeletonAnalystCharts" mode="middleView" />
														: <HistoryChart
															data={this.state.alarmData}
															height="300"
															categoryField="timestamp"
															isDateAxis={true}
															cursorArray={this.state.selectedIndex}
															attributes={this.state.attributesListLabel}
															clickable={this.state.isMultipleAttribute && !(this.state.selectedIndex.length === 3)}
															onClick={this.historyViewClickHandler}
															checkedLegends={this.state.checkedLegends}
															id={"parameterTrendingModal"}
														/>
													}
													{this.state.selectedIndex.length > 0 ?
														<button onClick={() => this.attributeSelect(true)} className="btn-transparent text-danger btn-reset">
															<i className="fas fa-undo" />
														</button> : null}
													{this.state.selectedIndex.length > 0 ?
														<p className="note">
															<span className="noteText"><FormattedMessage {...commonMessages.note} children={(message => message)} /> :</span> <FormattedMessage {...messages.maxLimitMsg} children={(message => message)} />
														</p>
														:
														null
													}
												</div>
											</div>
										</React.Fragment>
										:
										<NoDataFound skeleton="skeletonHistoryCharts" mode="fullView" dataName="data" dataImg="lineChart" />
								}
							</div>
							<div className="pipelineFilterBox">
								<div className="card pipeLineViewBox">
									<div className="card-header"><FormattedMessage {...commonMessages.selectPipeline} children={(message => message)} /></div>
									<PipelineHealth
										fetchingPipelines={this.state.isPipelineFetching}
										pipelineList={this.state.pipelineList}
										onPipelineClick={this.handleChange}
										isPipelineDisabled={this.state.isHistoryChartFetching}
										noDataMode="middleView"
									/>
								</div>
							</div>
						</div>
						:
						<NoDataFound skeleton="skeletonAnalystDashFullView" mode="fullView" dataName="data" dataImg="dash" button="reload" />
				}

				{/* / -----Message Model Start----- / */}

				{this.state.isOpen ? (
					<MessageModal
						type={this.state.type}
						message={this.state.message}
						onClose={this.modalCloseHandler}
					/>
				) : null}

				{/* / -----Message Model End----- / */}

				{/* --------- license upgrade popup start----------- */}

				{this.state.isActivePlanModal && <div className="modal d-block licensePopUp">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-body">
								<button type="button" onClick={() => this.upgradePlanModal(true)} className="btn btn-transparent">
									<i className="fas fa-times"></i>
								</button>
								<div className="upgradeTemplate">
									<span>
										<i className="fas fa-star"></i>
									</span>
								</div>
								<div className="popUpContent">
									<h1>Upgrade your Plan</h1>
									<div className="customBorderBox mr-b-20">
										<span className="customBorder borderLeft"></span>
										<span className="customBorder borderRight"></span>
									</div>
									<h6>You are Currently on
										<span><i className="far fa-badge-check"></i></span>
										{this.state.activePlan}</h6>
									<p>To activate or add additional features in your package upgrade your plan now.</p>
								</div>
							</div>
						</div>
					</div>
				</div>}

				{/* --------- license upgrade popup end----------- */}

			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	segmentDataSuccess: getSegmentDataSuccess(),
	segmentDataError: getSegmentDataFailure(),
	chartDetailsSuccess: getChartDetailsSuccess(),
	chartDetailsFailure: getChartDetailsFailure(),
	plantList: plantList(),
	plantListFailure: plantListFailure(),
	pipelineList: pipelineList(),
	pipelineListFailure: pipelineListFailure(),
	attributesList: attributesList(),
	attributesListFailure: attributesListFailure()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		getSegmentData: (pipelineId, plantId, sendingObject) => dispatch(getSegmentData(pipelineId, plantId, sendingObject)),
		getAlarmChart: (pipelineId, plantId, distance, selectedAttribute) => dispatch(getAlarmChart(pipelineId, plantId, distance, selectedAttribute)),
		managePlantList: () => dispatch(managePlantList()),
		fetchPipelinesDetails: (id) => dispatch(fetchPipelinesDetails(id)),
		getAttributes: (plant, pipeline) => dispatch(getAttributes(plant, pipeline))
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: 'commissionerDashboard', reducer });
const withSaga = injectSaga({ key: 'commissionerDashboard', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(CommissionerDashboard);