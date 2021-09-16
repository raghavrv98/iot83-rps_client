/**
 *
 * ManageAlarmsAndAlerts
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
	managePlantList,
	getAlarmType,
	apiApplyFilters,
	alarmStatusChangeHandler,
	getAlarmDetails,
	getAlarmCategory,
	managePipelineList
} from './actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
	getPlantListSuccess,
	getPlantListFailure,
	getPipelineListSuccess,
	getPipelineListFailure,
	getAlarmsTypeSuccess,
	getAlarmsTypeFailure,
	getFilterDataSuccess,
	getFilterDataFailure,
	getAlarmStatusSuccess,
	getAlarmStatusFailure,
	alarmDetailSuccess,
	agentDetailFailure,
	getAlarmsCategorySuccess,
	getAlarmsCategoryFailure
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import commonMessages from '../../messages';
import SkeletonLoader from '../../components/SkeletonLoader';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MessageModal from '../../components/MessageModal/Loadable';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { cloneDeep } from 'lodash';
am4core.addLicense("CH145187641");
import NoDataFound from "../../components/NoDataFound";

export class ManageAlarmsAndAlerts extends React.Component {
	state = {
		isLoading: true,
		isOpen: false,
		alarmType: "",
		alarmCategory: [],
		plantList: [],
		pipelineList: [],
		alarmList: [],
		payload: {},
		count: 1,
		filters: {
			category: 'all',
			type: 'all',
			status: 0,
			sortBy: 'measurementTime',
			order: -1,
		},
		selectedPlantId: '',
		selectedPipelineId: '',
		options: [],
		checkorder: 'measurementTime',
		items: 10,
		offset: 0,
		alarmTypeFilter: [],
		isDetails: false,
		alarmDetails: {},
		name: "",
		alarmDetailsLoading: true,
		alarmsHistory: [],
		isAlarmListLoading: true
	};

	componentDidMount() {
		this.props.managePlantList();
		this.props.getAlarmType();
		this.props.getAlarmCategory();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.getPlantListSuccess && nextProps.getPlantListSuccess !== this.props.getPlantListSuccess) {
			let selectedPlantId = JSON.parse(JSON.stringify(this.state.selectedPlantId));
			selectedPlantId = this.props.match.params.id ? this.props.match.params.id : 'all';
			this.setState({
				plantList: nextProps.getPlantListSuccess.result,
				selectedPlantId,
			}, () => this.props.managePipelineList());
		}
		if (nextProps.getPipelineListSuccess && nextProps.getPipelineListSuccess !== this.props.getPipelineListSuccess) {
			let selectedPipelineId = JSON.parse(JSON.stringify(this.state.selectedPipelineId));
			selectedPipelineId = selectedPipelineId != "" ? selectedPipelineId : 'all';
			let pipelineList = nextProps.getPipelineListSuccess.result
			let filteredPipelines = []
			filteredPipelines = this.props.match.params.id ? pipelineList.filter(val => val.plantId === this.props.match.params.id) : pipelineList
			this.setState({
				pipelineList,
				selectedPipelineId,
				filteredPipelines
			});
			this.props.apiApplyFilters(this.state.filters, this.state.selectedPlantId, selectedPipelineId, 10, 0);
		}
		if (nextProps.getAlarmsTypeSuccess && nextProps.getAlarmsTypeSuccess !== this.props.getAlarmsTypeSuccess) {
			this.setState({
				alarmType: nextProps.getAlarmsTypeSuccess,
				alarmTypeFilter: nextProps.getAlarmsTypeSuccess.types
			});
		}
		if (nextProps.getAlarmsCategorySuccess && nextProps.getAlarmsCategorySuccess !== this.props.getAlarmsCategorySuccess) {
			this.setState({
				alarmCategory: nextProps.getAlarmsCategorySuccess,
			});
		}
		if (nextProps.getFilterDataSuccess && nextProps.getFilterDataSuccess !== this.props.getFilterDataSuccess) {

			let alarmList = [...this.state.alarmList, ...nextProps.getFilterDataSuccess.result]
			this.setState({
				alarmList,
				isLoading: false,
				isAlarmListLoading: false,
				totalCount: nextProps.getFilterDataSuccess.totalCount,
				filteredCount: nextProps.getFilterDataSuccess.filteredCount,
			});
		}
		if (nextProps.getAlarmStatusSuccess && nextProps.getAlarmStatusSuccess !== this.props.getAlarmStatusSuccess) {
			let alarmList = JSON.parse(JSON.stringify(this.state.alarmList));
			alarmList = alarmList.filter(val => val.sequenceId !== nextProps.getAlarmStatusSuccess);
			this.setState({
				alarmList,
				isLoading: false,
				isAlarmListLoading: false,
				isOpen: true,
				message: <FormattedMessage {...messages.alarmStatusSuccess} children={(message => message)} />,
				type: 'success',
			});
		}
		if (nextProps.alarmDetailSuccess && nextProps.alarmDetailSuccess !== this.props.alarmDetailSuccess) {
			let alarmDetails = nextProps.alarmDetailSuccess
			this.state.alarmsHistory.push(alarmDetails)
			this.setState({
				detailsFetching: false,
				alarmDetailsLoading: false,
				alarmDetails
			}, () => {
				this.getDetailsChart(this.state.alarmDetails.chartData);
			});
		}
		['getPlantListFailure', 'getPipelineListFailure', 'getAlarmsTypeFailure', 'getAlarmsCategoryFailure', 'getFilterDataFailure', 'getAlarmStatusFailure', 'agentDetailFailure'].map(val => {
			this.errorSetStateHandler(nextProps[val], this.props[val]);
		})
	}

	errorSetStateHandler(nextError, currentError) {
		if (nextError && nextError !== currentError) {
			this.setState({
				isLoading: false,
				isOpen: true,
				message: nextError,
				type: "error",
				detailsFetching: false,
				alarmDetailsLoading: false,
			});
		}
	}

	applyFilter = event => {
		let alarmType = JSON.parse(JSON.stringify(this.state.alarmType))
		let alarmTypeFilter = JSON.parse(JSON.stringify(this.state.alarmTypeFilter))
		if (event.target.id === 'sortBy') {
			this.setState({ checkorder: event.target.value });
		}
		let filters = { ...this.state.filters };
		let id = event.target.id;
		if (id === 'type') {
			filters.type = event.target.value;
		} else if (id === 'status') {
			filters.status = parseInt(event.target.value);
		} else if (id === 'sortBy') {
			filters.sortBy = event.target.value;
		} else if (id === 'order') {
			filters.order = parseInt(event.target.value);
		}
		else if (id === 'category') {
			filters.category = event.target.value;
			if (event.target.value == "all") {
				alarmTypeFilter = alarmType.types
			}
			else {
				alarmTypeFilter = alarmType.types.filter(val => val.category == event.target.value)
				filters.type = "all"
			}
		}

		this.setState({ filters, isAlarmListLoading: true, alarmList: [], alarmTypeFilter }, () =>
			this.props.apiApplyFilters(filters, this.state.selectedPlantId, this.state.selectedPipelineId, 10, 0)
		);
	};

	getAlarmList = (selectedPlantId, selectedPipelineId, type) => {
		let pipelineList = cloneDeep(this.state.pipelineList)
		let filteredPipelines = selectedPlantId === "all" ? pipelineList : pipelineList.filter(val => val.plantId === selectedPlantId)
		this.setState(
			{
				selectedPlantId,
				selectedPipelineId,
				isAlarmListLoading: true,
				isLoading: type === "plant",
				alarmList: [],
				filters: {
					category: 'all',
					type: 'all',
					status: 0,
					sortBy: 'measurementTime',
					order: -1,
				},
				filteredPipelines
			},
			() => this.props.apiApplyFilters(this.state.filters, selectedPlantId, selectedPipelineId, 10, 0)
		);
	};

	alarmStatusChangeHandler = (seqId, buttonId) => {
		let alarmList = JSON.parse(JSON.stringify(this.state.alarmList)),
			payload,
			plantId;
		alarmList.map(val => {
			plantId = val.plantId;
			if (val.sequenceId == seqId) {
				if (buttonId === 'ack') {
					payload = {
						acknowledged: !val.latestAlarm.acknowledged,
					};
				}
				if (buttonId === 'address') {
					payload = {
						addressed: true,
					};
				}
			}
		});
		this.props.alarmStatusChangeHandler(payload, seqId, plantId);
		this.setState({ isLoading: true, isOpen: false });
	};

	modalCloseHandler = () => {
		this.setState({
			isOpen: false,
			message: '',
			type: '',
		});
	};
	confirmModalHandler = (seqId, buttonId) => {
		this.setState({
			isOpen: true,
			message: <FormattedMessage {...messages.confirmmessage} children={(message => message)} />,
			type: 'confirm',
			seqId,
			buttonId,
		});
	}

	getOptions = (val, index) => {
		this.setState({
			selectedPlant: val.plantId,
			name: val.linksToDomain.name,
			detailsFetching: true,
			id: index,
			isDetails: true,
			description: val.latestAlarm.description,
		}, () => this.props.getAlarmDetails(val.plantId, val.sequenceId));
	};

	paginationHandler = () => {
		this.props.apiApplyFilters(this.state.filters, this.state.selectedPlantId, this.state.selectedPipelineId, 10, this.state.alarmList.length);
	};

	getDetailsChart = (data) => {
		am4core.useTheme(am4themes_animated);

		// Create chart
		var chart = am4core.create("chartDiv", am4charts.XYChart);
		chart.paddingRight = 40;
		chart.paddingTop = -20;
		chart.paddingBottom = 20;
		chart.data = data;

		var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.renderer.minGridDistance = 50;
		dateAxis.baseInterval = {
			"timeUnit": "second",
			"count": 1
		}
		dateAxis.dateFormats.setKey("day", "MMM dd");
		dateAxis.renderer.labels.template.fontSize = 13;

		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.min = -1;
		valueAxis.max = 3;
		valueAxis.renderer.labels.template.fontSize = 13;
		valueAxis.renderer.grid.template.disabled = true;
		valueAxis.renderer.labels.template.disabled = true;
		valueAxis.cursorTooltipEnabled = false;

		var series = chart.series.push(new am4charts.StepLineSeries());
		series.dataFields.dateX = "timestamp";
		series.dataFields.valueY = "status";
		series.dataFields.valueZ = "distance";
		series.strokeWidth = 3;

		series.adapter.add('tooltipText', (text, target) => {
			let data = target.tooltipDataItem.dataContext;
			if (target.tooltipDataItem.dataContext) {
				return data.distance ? `${data.status == 0 ? "Raised" : data.status == 1 ? "Acknowledged" : "Addressed"} : ${moment(data.timestamp).format("DD MMM YYYY HH:mm:ss")} : ${data.distance}` : `${data.status == 0 ? "Raised" : data.status == 1 ? "Acknowledged" : "Addressed"} : ${moment(data.timestamp).format("DD MMM YYYY HH:mm:ss")}`;
			}
			else {
				return text;
			}
		});

		chart.cursor = new am4charts.XYCursor();
		dateAxis.cursorTooltipEnabled = false;
		chart.cursor.lineY.disabled = true;
		chart.cursor.lineX.disabled = true;
		chart.scrollbarX = new am4core.Scrollbar();
		chart.scrollbarX.disabled = true;
		chart.scrollbarX.marginBottom = 20;
		chart.dateFormatter.dateFormat = "dd-MMM HH:mm:ss"

		// Add chart title
		var title = chart.titles.create();
		// title.text = "Alarm Details";
		title.fontSize = 20;
		title.marginBottom = 30;

		// Add simple bullet
		var circleBullet = series.bullets.push(new am4charts.CircleBullet());

		//Add ValueAxis labels
		function createGrid(value) {
			var range = valueAxis.axisRanges.create();
			range.value = value;
			range.label.text = value === 0 ? "Raised" : value === 1 ? "Acknowledged" : value === 2 ? "Addressed" : "";
			range.fontSize = 100;
		}
		createGrid(0);
		createGrid(1);
		createGrid(2);
	}

	getImage = (category, status) => {
		if (status == 0)
			status = "raised"
		else if (status == 1)
			status = "acknowledged"
		else
			status = "addressed"
		category = category && category.toLowerCase()
		let listIcon = status + category
		return <img src={`${window.API_URL}api/public/static/components/${listIcon}.png`} />
	}

	getTimeValue = (createdTime, updatedTime) => {

		if (updatedTime === "") {
			let created = moment(createdTime);
			let age = moment(created).fromNow();
			return age
		}
		else {
			let updated = moment(updatedTime);
			let renewed = moment(updated).fromNow();
			return renewed
		}
	}


	distanceClickHandler = (sequenceId) => {
		this.setState({ detailsFetching: true }, () => this.props.getAlarmDetails(this.state.selectedPlant, sequenceId));
	}

	historyDistanceClickHandler = (index) => {
		let alarmsHistory = cloneDeep(this.state.alarmsHistory)
		this.props.getAlarmDetails(alarmsHistory[index].plantId, alarmsHistory[index].sequenceId)
		alarmsHistory = alarmsHistory.slice(0, index)
		this.setState({ detailsFetching: true, alarmsHistory });
	}
	reloadHandler = () => {
		this.props.managePlantList();
		this.props.getAlarmType();
		this.props.getAlarmCategory();
	}

	render() {
		return (
			<div className="appContent">
				<Helmet>
					<title>ManageAlarmsAndAlerts</title>
					<meta name="description" content="Description of ManageAlarmsAndAlerts" />
				</Helmet>
				<div className="pageBreadcrumb">
					<div className="flex-item fx-b70">
						{this.props.match.params.id ?
							<p className="pd-l-30">
								<span className="cursor-pointer" onClick={() => { this.props.history.push("/managePlant"); }}>
									<button className="btn btn-transparent">
										<i className="far fa-long-arrow-left" />
									</button>
									<FormattedMessage {...commonMessages.managePlant} children={(message => message)} />
								</span>
							</p>
							:
							<p><FormattedMessage {...commonMessages.manageAlarms} children={(message => message)} /></p>
						}
						<h5>
							<FormattedMessage {...messages.allAvailableAlarmsAndAlerts} children={(message => message)} />
							{this.state.isLoading ? null :
								<span className="customCountBadge">{this.state.totalCount}</span>
							}
						</h5>
					</div>
					<div className="flex-item fx-b30">
						<div className="form-group mr-b-0 flex align-items-baseline text-right">
							<label className="form-label f-13 fx-b40 pd-r-10">
								<FormattedMessage {...commonMessages.selectPlant} children={(message => message)} /> :
							</label>
							<select
								ref="type"
								id="plant"
								className="form-control fx-b60"
								required
								value={this.state.selectedPlantId}
								onChange={event => this.getAlarmList(event.target.value, "all", "plant")}
							>
								<option value="all"> All </option>
								{this.state.plantList.map(val => (
									<option key={val._id} value={val._id}>
										{val.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				{this.state.isLoading ? <SkeletonLoader skeleton="skeletonFullViewCount" mode="fullView" /> :
					this.state.plantList.length > 0 ?
						<React.Fragment>
							<div className="alarmFilterBox filterBox flex">
								<div className="fx-b16_66 pd-r-10">
									<div className="form-group">
										<label className="form-label">
											<FormattedMessage {...commonMessages.selectPipeline} children={(message => message)} /> :
										</label>
										<select
											ref="type"
											id="pipeline"
											className="form-control"
											value={this.state.selectedPipelineId}
											onChange={event => this.getAlarmList(this.state.selectedPlantId, event.target.value, "pipeline")}
											required
										>
											<option value="all">All</option>
											{this.state.filteredPipelines.length > 0 &&
												this.state.filteredPipelines.map((val, index) => (
													<option key={index} value={val._id}>
														{val.name}
													</option>
												))}
										</select>
									</div>
								</div>


								<div className="fx-b16_66 pd-r-10 pd-l-10">
									<div className="form-group">
										<label className="form-label">
											<FormattedMessage {...messages.category} children={(message => message)} /> :
										</label>
										<select
											ref="category"
											id="category"
											className="form-control"
											value={this.state.filters.category}
											onChange={this.applyFilter}
											required
										>
											<option value="all">All</option>
											{this.state.alarmCategory.length > 0 &&
												this.state.alarmCategory.map((val, index) => (
													<option key={index} value={val}>
														{val}
													</option>
												))}
										</select>
									</div>
								</div>
								<div className="fx-b16_66 pd-r-10 pd-l-10">
									<div className="form-group">
										<label className="form-label">
											<FormattedMessage {...commonMessages.type} children={(message => message)} /> :
										</label>
										<select
											ref="type"
											id="type"
											className="form-control"
											value={this.state.filters.type}
											onChange={this.applyFilter}
											required
										>
											<option value="all">All</option>
											{this.state.alarmType && this.state.alarmType.types.length > 0 &&
												this.state.alarmTypeFilter.map((val, index) => (
													<option key={index} value={val.type}>
														{val.type}
													</option>
												))}
										</select>
									</div>
								</div>

								<div className="fx-b16_66 pd-r-10 pd-l-10">
									<div className="form-group">
										<label className="form-label"><FormattedMessage {...messages.status} children={(message => message)} /> :</label>
										<select
											ref="type"
											id="status"
											className="form-control"
											value={this.state.filters.status}
											onChange={this.applyFilter}
											required
										>
											<FormattedMessage
												{...commonMessages.all}
												children={message => <option value="3">{message}</option>}
											/>
											<FormattedMessage
												{...messages.statusOption1}
												children={message => <option value="0">{message}</option>}
											/>
											<FormattedMessage
												{...messages.statusOption2}
												children={message => <option value="1">{message}</option>}
											/>
											<FormattedMessage
												{...messages.statusOption4}
												children={message => <option value="2">{message}</option>}
											/>
										</select>
									</div>
								</div>
								<div className="fx-b16_66 pd-l-10 pd-r-10">
									<div className="form-group">
										<label className="form-label">
											<FormattedMessage {...messages.sortBy} children={(message => message)} /> :
									</label>
										<select
											ref="type"
											id="sortBy"
											className="form-control"
											onChange={this.applyFilter}
											value={this.state.checkorder}
											required
										>
											<FormattedMessage
												{...messages.measurementTime}
												children={message => <option value="measurementTime">{message}</option>}
											/>
											<FormattedMessage
												{...messages.priority}
												children={message => <option value="priority">{message}</option>}
											/>
										</select>
									</div>
								</div>
								<div className="fx-b16_66 pd-l-10">
									<div className="form-group">
										<label className="form-label">
											<FormattedMessage {...messages.sortOrder} children={(message => message)} /> :
									</label>
										{this.state.checkorder == 'priority' ?
											<select
												ref="type"
												id="order"
												className="form-control"
												value={this.state.filters.order}
												onChange={this.applyFilter}
												required
											>
												<FormattedMessage
													{...messages.hightolow}
													children={message => <option value="1">{message}</option>}
												/>
												<FormattedMessage
													{...messages.lowtohigh}
													children={message => <option value="-1">{message}</option>}
												/>
											</select>
											:
											<select
												ref="type"
												id="order"
												className="form-control"
												value={this.state.filters.order}
												onChange={this.applyFilter}
												required
											>
												<FormattedMessage
													{...messages.sortOrderOption1}
													children={message => <option value="1">{message}</option>}
												/>
												<FormattedMessage
													{...messages.sortOrderOption2}
													children={message => <option value="-1">{message}</option>}
												/>
											</select>
										}
									</div>
								</div>
							</div>
							{this.state.isAlarmListLoading ? <SkeletonLoader skeleton="skeletonAlarmListCount" mode="middleView" /> :
								this.state.alarmList.length > 0 ?
									<InfiniteScroll
										dataLength={this.state.alarmList.length}
										next={this.paginationHandler}
										hasMore={this.state.alarmList.length == this.state.filteredCount ? false : true}
										loader={<div className="alarmListLoader"><div className="pageLoader"> <FormattedMessage {...commonMessages.loading} children={(message => message)} /> </div></div>}
										hasChildren={this.state.alarmList.length == 0 ? false : true}
										className="customInfiniteScroll"
									>
										<ul className="alarmsAndAlertsList">
											{this.state.alarmList.map((val, index) => (
												<li key={index} className={val.currentStatus == "0" ? "raised" : val.currentStatus == "1" ? "acknowledged" : "addressed"}>
													<span className="alertIcon">
														{this.getImage(val.category, val.currentStatus)}
													</span>
													<p className="mr-b-4">
														<span className="title">
															{' '}
															<FormattedMessage {...commonMessages.type} children={(message => message)} /> :
														</span>{' '}
														<span className="content">{val.type}</span>
														<span className="mx-2">|</span>
														<span className="title">
															<FormattedMessage {...messages.link} children={(message => message)} /> :{' '}
														</span>
														<button
															type="button"
															className="btn btn-link mr-r-5"
															onClick={() =>
																this.props.history.push(
																	`/operatorDashboard/${val.plantId}/${val.linksToDomain.reference
																	}/${val.linksToDomain.distance}/alarm`
																)
															}
														>
															{val.linksToDomain.name} ( {val.linksToDomain.resource} )
												</button>

														<span>
															<span className="mx-2">|</span>
															<span className="title">
																<FormattedMessage {...messages.generated} children={(message => message)} /> :{' '}
															</span>
															<span className="content">{this.getTimeValue(val.createdAt, "")}</span>
														</span>

														<span>
															<span className="mx-2">|</span>
															<span className="title">
																<FormattedMessage {...messages.lastRenewed} children={(message => message)} /> :{' '}
															</span>
															<span className="content">{this.getTimeValue("", val.updatedAt)}</span>
														</span>

														<span>
															<span className="mx-2">|</span>
															<span className="title">
																<FormattedMessage {...messages.measurementTime} children={(message => message)} /> :{' '}
															</span>
															<span className="content">{moment(val.latestAlarm.measurementTime).format("DD MMM YYYY HH:mm:ss")}</span>
														</span>

													</p>
													<p className="mr-b-0">
														<span className="title">
															<FormattedMessage {...messages.description} children={(message => message)} /> :
														</span>{' '}
														<span className="content">{val.latestAlarm.description}</span>{' '}
													</p>
													<div className="button-group">
														<button
															className="btn-transparent"
															onClick={() => this.alarmStatusChangeHandler(val.sequenceId, 'ack')}
															disabled={val.latestAlarm.addressed}
														>
															{val.latestAlarm.acknowledged ||
																val.latestAlarm.addressed ?
																<React.Fragment>
																	<FormattedMessage {...messages.unAck} children={(message => message)} />
																	<span className={val.currentStatus == "0" ? "text-danger" : val.currentStatus == "1" ? "text-warning" : "text-success"}>
																		<i className={val.latestAlarm.addressed ? "far fa-thumbs-down" : "far fa-thumbs-up"} />
																	</span>
																</React.Fragment>
																:
																<React.Fragment>
																	<FormattedMessage {...messages.ack} children={(message => message)} />
																	<span className={val.currentStatus == "0" ? "text-danger" : val.currentStatus == "1" ? "text-warning" : "text-success"}>
																		<i className="far fa-thumbs-up" />
																	</span>
																</React.Fragment>
															}
														</button>
														<button
															className="btn-transparent"
															onClick={() => this.confirmModalHandler(val.sequenceId, 'address')}
															disabled={val.latestAlarm.addressed}
														>
															{val.latestAlarm.addressed ?
																<React.Fragment>
																	<FormattedMessage {...messages.addressed} children={(message => message)} />
																	<span className={val.currentStatus == "0" ? "text-danger" : val.currentStatus == "1" ? "text-warning" : "text-success"}>
																		<i className="far fa-comment-alt-times" />
																	</span>
																</React.Fragment>
																:
																<React.Fragment>
																	<FormattedMessage {...messages.address} children={(message => message)} />
																	<span className={val.currentStatus == "0" ? "text-danger" : val.currentStatus == "1" ? "text-warning" : "text-success"}>
																		<i className="far fa-comment-alt-check" />
																	</span>
																</React.Fragment>
															}
														</button>
														<button
															className="btn-transparent"
															onClick={() => this.getOptions(val, index)}
														>
															<FormattedMessage {...commonMessages.details} children={(message => message)} />
															<span>
																<i className="far fa-info-circle text-info" />
															</span>
														</button>
													</div>
												</li>
											))}
										</ul>
									</InfiniteScroll>
									:
									<NoDataFound skeleton="skeletonAlarmListCount" mode="middleView" dataName="alarm" dataImg="notification" />
							}

							{this.state.isDetails ? <div className="modal d-block">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header">
											<h4 className="modal-title"><FormattedMessage {...commonMessages.alarmDetails} children={(message => message)} />
												<button type="button" className="close" onClick={() => this.setState({ isDetails: false, alarmDetails: {}, name: "", selectedPlant: "", id: "", alarmsHistory: [], alarmDetailsLoading: true })}>
													&times;
											</button>
											</h4>
										</div>
										<div className="modal-body pd-t-10 px-4 pb-4 modalMinHeight">
											{this.state.alarmDetailsLoading ? <SkeletonLoader skeleton="alarmDetailModalSkeleton" mode="middleView"/> :
												<React.Fragment>
													<ul className="navbar-nav alarmLinking">
														{this.state.alarmsHistory.map((val, index) =>
															<li key={index} className={this.state.alarmsHistory.length - 1 === index ? "nav-item active" : "nav-item"}>
																<a onClick={() => this.state.alarmsHistory.length > 1 && this.state.alarmsHistory.length - 1 != index && this.historyDistanceClickHandler(index)} className="nav-link">
																	{val.type}
																	<span>{`[${val.distance} ${val.unit}]`}</span>
																</a>
															</li>
														)}
													</ul>
													<div className="alarmDescription">
														<h6>
															<strong><FormattedMessage {...commonMessages.type} children={(message => message)} /> :</strong>
															{this.state.alarmDetails.type}
														</h6>
														<h6>
															<strong><FormattedMessage {...messages.link} children={(message => message)} /> :</strong>
															{this.state.name}
														</h6>
														<h6>
															<strong><FormattedMessage {...messages.generated} children={(message => message)} /> :</strong>
															{this.getTimeValue(this.state.alarmDetails.createdAt, "")}
														</h6>
														<h6>
															<strong><FormattedMessage {...messages.lastRenewed} children={(message => message)} /> :</strong>
															{this.getTimeValue("", this.state.alarmDetails.updatedAt)}
														</h6>
													</div>
													<div className="flex align-items-center mr-b-20">
														<h6 className="alarmTitle"><FormattedMessage {...messages.historyOf} children={(message => message)} /> {this.state.alarmDetails.type} [{this.state.alarmDetails.distance} {this.state.alarmDetails.unit}] :</h6>

														{this.state.alarmDetails.ancestors && this.state.alarmDetails.ancestors.length > 0 ?
															<ul className="alarmHistory">
																{this.state.alarmDetails.ancestors && this.state.alarmDetails.ancestors.map((val, index) =>
																	<li key={index}>
																		<a onClick={() => this.distanceClickHandler(val.sequenceId)} className="nav-link">
																			<i className="far fa-map-marker-alt"></i>
																			{val.end - val.start} {this.state.alarmDetails.unit}
																			<span>{`[ ${val.start} ${this.state.alarmDetails.unit} - ${val.end} ${this.state.alarmDetails.unit} ]`}</span>
																		</a></li>
																)}
															</ul>
															:
															<h4 className="alarmError"><FormattedMessage {...messages.historyMessage} children={(message => message)} /></h4>
														}
													</div>
													<div className="alarmDetailGraph">
														{this.state.detailsFetching ? <SkeletonLoader skeleton="skeletonChart" mode="middleView"/> :
															<div id="chartDiv" className="alarmChartDiv"></div>
														}
													</div>
												</React.Fragment>
											}
										</div>
									</div>
								</div></div> : null}
						</React.Fragment>
						:
						<NoDataFound skeleton="skeletonFullViewCount" mode="fullView" dataName="alarm" dataImg="notification" button="reload" reloadHandler={this.reloadHandler} />
				}
				{
					this.state.isOpen ?
						<MessageModal
							type={this.state.type}
							message={this.state.message}
							onClose={this.modalCloseHandler}
							onConfirm={() => {
								this.alarmStatusChangeHandler(this.state.seqId, this.state.buttonId);
							}}
						/>
						: null
				}
			</div >
		);
	}
}
ManageAlarmsAndAlerts.propTypes = {
	dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	getPlantListSuccess: getPlantListSuccess(),
	getPlantListFailure: getPlantListFailure(),
	getPipelineListSuccess: getPipelineListSuccess(),
	getPipelineListFailure: getPipelineListFailure(),
	getAlarmsTypeSuccess: getAlarmsTypeSuccess(),
	getAlarmsTypeFailure: getAlarmsTypeFailure(),
	getFilterDataSuccess: getFilterDataSuccess(),
	getFilterDataFailure: getFilterDataFailure(),
	getAlarmStatusSuccess: getAlarmStatusSuccess(),
	getAlarmStatusFailure: getAlarmStatusFailure(),
	alarmDetailSuccess: alarmDetailSuccess(),
	agentDetailFailure: agentDetailFailure(),
	getAlarmsCategorySuccess: getAlarmsCategorySuccess(),
	getAlarmsCategoryFailure: getAlarmsCategoryFailure()
});

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		managePlantList: () => dispatch(managePlantList()),
		managePipelineList: () => dispatch(managePipelineList()),
		getAlarmType: () => dispatch(getAlarmType()),
		getAlarmCategory: () => dispatch(getAlarmCategory()),
		apiApplyFilters: (filters, plantId, pipelineId, limit, offset) => dispatch(apiApplyFilters(filters, plantId, pipelineId, limit, offset)),
		alarmStatusChangeHandler: (payload, seqId, plantId) =>
			dispatch(alarmStatusChangeHandler(payload, seqId, plantId)),
		getAlarmDetails: (plantId, sequenceId) => dispatch(getAlarmDetails(plantId, sequenceId)),
	};
}
const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: 'manageAlarmsAndAlerts', reducer });
const withSaga = injectSaga({ key: 'manageAlarmsAndAlerts', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(ManageAlarmsAndAlerts);
