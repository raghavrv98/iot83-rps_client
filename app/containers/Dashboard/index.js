
/**
 *
 * Dashboard
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
	getTimeFreezeDataSuccess,
	getTimeFreezeDataFailure,
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
import { getPipeLineSummary, getSegmentData, getAlarmChart, managePlantList, fetchPipelinesDetails, getAttributes } from './actions';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commonMessages from '../../messages';
import * as am4core from "@amcharts/amcharts4/core";
import Select from 'react-select';
import MessageModal from "../../components/MessageModal/Loadable";
import moment from 'moment';
import ReactTable from "react-table";
import Range from 'rc-slider/lib/Range';
am4core.addLicense("CH145187641");
import HistoryChart from '../../components/HistoryChart/Loadable';
import { filterCaseInsensitive, lookUpGrade, getGaugeConfig, capitalizeFirstLetter } from '../../utils/commonUtils';
import SchematicView from '../../components/SchematicView';
import DetailedView from '../../components/DetailedView/Loadable';
import NoDataFound from '../../components/NoDataFound';
import SkeletonLoader from '../../components/SkeletonLoader';
import PipelineHealth from '../../components/PipelineHealth';
import { cloneDeep } from 'lodash';
import {toBoolean} from "@amcharts/amcharts4/.internal/core/utils/Type";

export class Dashboard extends React.Component {
	state = {
		isPlantLoading: true,
		plantList: [],
		selectedPlant: { value: "noData", label: "ALL" },
		isPipeLineFetching: true,
		pipelineList: [],
		selectedPipeline: {},
		segments: [],
		legends: [],
		checkedLegends: [],
		isSummaryFetching: true,
		zoomSegment: [],
		chartData: [],
		isPipelineDetailFetching: true,
		attributes: [],
		pipelineViews: {
			key: undefined,
			Profile: false,
			Plan: false
		},
		optionsAttributes: [],
		selectedAttribute: "",
		isAttributeFetching: true,
		isAlarmDataFetching: true,
		alarmData: false,
		isPreviewAttributeFetching: true,
		previewAttributes: [],
		previewSelectedAttribute: [],
		isPreviewAlarmChartFetching: true,
		lastDistance: "",
		isTimeView: false,
		isTimeViewTimestamp: false,
		isAlarmChartDisable: false,
		lastCursorPosition: "",
		isButtonActive: true,
		isInversed: false,
		isDetailViewExpand: false,
		isSchematicViewExpand: false,
		xAxisValue: 'distance',
		yAxisValue: 'z',
		isOpenTable: false,
		tableData: [],
		tableHeading: "",
		stats: {},
		switchLandscape: true,
		distanceUnit: "",
		attributeUnit: "",
		chartMin: 0,
		chartMax: 100,
		gaugeConfig: [],
		labels: [],
		modalAttributes: [],
		isParameterTrending: false,
		parameterTrendingAlarmData: false,
		insideChanges: false,
		checkedLegendsHistory: [],
		historyDuration: 60,
		historyDurationModal: 60,
		wpu: 1,
		isLegendStable: false,
		healthScore: '',
		isActivePlanModal: false
	}

	showPipelineListMob = () => {
		$(".pipelineListMob").removeClass('slideInRight');
		$(".pipelineListMob").addClass('slideInLeft');
		$(".pipelineListMob").css({ left: '5px' });
	}

	hidePipelineListMob = () => {
		$(".pipelineListMob").removeClass('slideInLeft');
		$(".pipelineListMob").addClass('slideInRight');
		$(".pipelineListMob").css({ left: '-98.6%' });
	}

	componentWillMount() {
		this.props.managePlantList();
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.insideChanges && nextProps.match.params.plantId != this.props.match.params.plantId && nextProps.match.params.pipelineId != this.props.match.params.pipelineId && nextProps.match.params.distance != this.props.match.params.distance) {
			let selectedPlant = nextProps.match.params.plantId ? this.state.plantList.find(val => val.value === nextProps.match.params.plantId) : { value: "all", label: "ALL" }
			this.setState({
				selectedPlant,
				isPipeLineFetching: true,
				isSummaryFetching: true,
				isPipelineDetailFetching: true,
				isAttributeFetching: true,
				isAlarmDataFetching: true,
			})
			this.props.fetchPipelinesDetails(selectedPlant.value);
		}
		if (nextProps.plantList && nextProps.plantList !== this.props.plantList) {
			let plantList, selectedPlant;
			if (nextProps.plantList.result.length > 0) {
				plantList = nextProps.plantList.result.map(val => {
					return {
						value: val._id,
						label: val.name
					};
				})
				plantList.unshift({ value: "all", label: "ALL" });
				selectedPlant = this.props.match.params.plantId ?
					plantList.find(val => val.value === this.props.match.params.plantId) : { value: "all", label: "ALL" };
				this.props.fetchPipelinesDetails(selectedPlant.value);
				this.setState({
					plantList,
					selectedPlant,
					isPlantLoading: false
				});
			}
			else {
				plantList = [{ value: "noData", label: "No Plant Exist" }]
				selectedPlant = { value: "noData", label: "No Plant Exist" }
				this.setState({
					plantList,
					selectedPlant,
					isPlantLoading: false,
					isPipeLineFetching: false,
					isSummaryFetching: false,
					isAttributeFetching: false,
					isPipelineDetailFetching: false,
					isAlarmDataFetching: false
				});
			}
		}

		if (nextProps.pipelineList && nextProps.pipelineList !== this.props.pipelineList) {
			var originalList = nextProps.pipelineList.result
			let pipelineList = nextProps.pipelineList.result.map(option => {
				let color = lookUpGrade(option.healthScore, nextProps.pipelineList.gaugeConfig).color
				return {
					selected: false,
					value: option._id,
					label: option.name,
					totalAlarm: option.alarmCount,
					plantId: option.plantId,
					healthcolor: color
				}
			})
			if (pipelineList.length > 0) {
				let selectedPipeline = this.props.match.params.pipelineId ? pipelineList.find(val => val.value === this.props.match.params.pipelineId) : pipelineList[0]
				pipelineList.map(val => {
					if (val.value == selectedPipeline.value) {
						val.selected = true
					}
				})
				this.setState({
					pipelineList,
					originalList,
					selectedPipeline,
					isPipeLineFetching: false,
					gaugeConfig: nextProps.pipelineList.gaugeConfig
				}, () => {
					this.props.getPipeLineSummary(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId)
				})
			} else {
				this.setState({
					pipelineList,
					selectedPipeline: {},
					isPipeLineFetching: false,
					isSummaryFetching: false,
					isAttributeFetching: false,
					isPipelineDetailFetching: false,
					isAlarmDataFetching: false,
				})
			}
		}

		if (nextProps.timeFreezeDataSuccess && this.props.timeFreezeDataSuccess !== nextProps.timeFreezeDataSuccess) {
			if (nextProps.timeFreezeDataSuccess.summary.length >= 1) {
				let heaterLayers = nextProps.timeFreezeDataSuccess.heaterLayers
				let lastDistance = Math.round(nextProps.timeFreezeDataSuccess.summary[nextProps.timeFreezeDataSuccess.summary.length - 1].en);
				let findSegment = [];
				if (this.props.match.params.distance) {
					let value = parseInt(this.props.match.params.distance);
					let clickedSegment = nextProps.timeFreezeDataSuccess.summary.find(
						seg => value >= parseInt(seg.in) && value <= parseInt(seg.en)
					).segment;
					if (clickedSegment == nextProps.timeFreezeDataSuccess.summary.length - 2) {
						nextProps.timeFreezeDataSuccess.summary.filter(val => val.segment >= (clickedSegment - 1) && val.segment <= (clickedSegment + 1) ? findSegment.push(val) : [])
					}
					else if (clickedSegment == nextProps.timeFreezeDataSuccess.summary.length - 1) {
						nextProps.timeFreezeDataSuccess.summary.filter(val => val.segment >= (clickedSegment - 2) && val.segment <= (clickedSegment) ? findSegment.push(val) : [])
					}
					else {
						nextProps.timeFreezeDataSuccess.summary.filter(val => val.segment >= clickedSegment && val.segment <= (clickedSegment + 2) ? findSegment.push(val) : [])
					}
				}
				let distanceUnit = nextProps.timeFreezeDataSuccess.units.distance
				let powerUnit = nextProps.timeFreezeDataSuccess.units.power
				originalList = cloneDeep(this.state.originalList)
				let selectedId = originalList.find(val => val._id == this.state.selectedPipeline.value)
				let healthScore = selectedId.healthScore
				let healthScoreColor = lookUpGrade(healthScore, this.state.gaugeConfig)
				let badDTS = selectedId.badDTS
				let zoomSegment = this.props.match.params.distance ? findSegment : nextProps.timeFreezeDataSuccess.summary.filter(seg => seg.segment >= 0 && seg.segment <= 2)
				this.setState({
					heaterLayers,
					isSummaryFetching: false,
					healthScore,
					badDTS,
					healthScoreColor: healthScoreColor.color,
					zoomSegment,
					segments: nextProps.timeFreezeDataSuccess.summary,
					stats: nextProps.timeFreezeDataSuccess.stats,
					lastDistance,
					distanceUnit,
					powerUnit,
				}, () => {
					this.state.healthScore != null && getGaugeConfig("gaugechart" + this.state.selectedPipeline.value, this.state.healthScore, this.state.gaugeConfig, this.state.badDTS, this.state.chartMin, this.state.chartMax)
					this.props.getAttributes(this.state.selectedPipeline.plantId, this.state.selectedPipeline.value, 'dts', undefined);
				});
			} else {
				this.setState({
					segments: [],
					lastDistance: "",
					zoomSegment: [],
					isSummaryFetching: false,
					isAttributeFetching: false,
					isPipelineDetailFetching: false,
					isAlarmDataFetching: false,
					healthScore: null
				});
			}
		}

		if (nextProps.attributesList && this.props.attributesList !== nextProps.attributesList) {
			if (nextProps.attributesList.attributesType === "dts") {
				let zoomSegment = this.state.zoomSegment.map(val => val.segment)
				let raw_pipelineViews = nextProps.attributesList.data.attributes.find(val => val.pipelineViews).pipelineViews;
				let pipelineViews = {key: "pipelineViews", Profile: raw_pipelineViews["Profile"] === "true",
														   Plan: raw_pipelineViews["Plan"] === "true"}
				this.setState({
					activePlan: nextProps.attributesList.data.activePlan,
					attributes: nextProps.attributesList.data.attributes,
					pipelineViews: pipelineViews,
					selectedAttribute: nextProps.attributesList.data.attributes[0].name,
					lastCursorPosition: "",
					isTimeView: false,
					lastCursorPositionReset: "",
					optionsAttributes: nextProps.attributesList.data.attributes.map(val => {
						return {
							label: val.displayName,
							value: val.name
						}
					}),
					isAttributeFetching: false
				}, () => {
					this.props.getSegmentData(
						this.state.selectedPipeline.value,
						this.state.selectedPipeline.plantId,
						zoomSegment,
						nextProps.attributesList.data.attributes[0].name
					);
					if (!this.state.isTimeView) {
						this.props.getAlarmChart(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, this.props.match.params.distance ? this.props.match.params.distance : Math.round(this.state.zoomSegment[0].in), { attributes: [this.state.selectedAttribute], minutes: this.state.isParameterTrending ? this.state.historyDurationModal : this.state.historyDuration })
					}
				});
			} else {
				let previewAttributes = nextProps.attributesList.data.attributes.map(val => {
					var label = <div className="labelAttribute">
						{val.value ?
							<i className="far fa-check-circle text-success"></i>
							:
							<i className="fas fa-star text-warning"></i>
						}
						<span>{val.displayName}</span>
					</div>
					return {
						label,
						value: val.name,
						active: val.value
					}
				});

				this.setState({
					previewAttributes,
					modalAttributes: nextProps.attributesList.data.attributes,
					previewSelectedAttribute: [previewAttributes[0]],
					isPreviewAttributeFetching: false
				}, () => {
					this.props.getAlarmChart(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, this.state.alarmData.distance, { attributes: [previewAttributes[0].value], minutes: this.state.isParameterTrending ? this.state.historyDurationModal : this.state.historyDuration })
				});
			}
		}

		if (nextProps.segmentDataSuccess && this.props.segmentDataSuccess !== nextProps.segmentDataSuccess) {
			if (nextProps.segmentDataSuccess.chartData.length > 0) {
				let chartData = nextProps.segmentDataSuccess.chartData.map(val => {
					val.inversed = false;
					return val
				})
				let checkedLegends = cloneDeep(this.state.checkedLegends)
				if (!this.state.isLegendStable) {
					checkedLegends = [];
					nextProps.segmentDataSuccess.legends.filter(val => {
						if (val.default)
							checkedLegends.push(val.item)
						return val
					})
				}

				this.setState({
					detailedViewData: nextProps.segmentDataSuccess,
					alarmAxisTimestamp: nextProps.segmentDataSuccess.timestamp,
					isTimeViewTimestamp: true,
					chartData,
					wpu: nextProps.segmentDataSuccess.wpu,
					legends: nextProps.segmentDataSuccess.legends,
					alarms: nextProps.segmentDataSuccess.alarms,
					checkedLegends,
					attributeUnit: nextProps.segmentDataSuccess.units[this.state.selectedAttribute],
					isPipelineDetailFetching: false,
					clickedComponentName: nextProps.segmentDataSuccess.chartData[0].name,
					clickedComponentType: nextProps.segmentDataSuccess.chartData[0].type,
				})
			} else {
				this.setState({
					chartData: [],
					isPipelineDetailFetching: false,
					clickedComponentName: "",
					clickedComponentType: "",
					isAlarmDataFetching: false,
					detailedViewData: nextProps.segmentDataSuccess
				});
			}
		}

		if (nextProps.chartDetailsSuccess && nextProps.chartDetailsSuccess !== this.props.chartDetailsSuccess) {
			let temp = nextProps.chartDetailsSuccess
			let alarmData = this.state.alarmData
			let parameterTrendingAlarmData = this.state.parameterTrendingAlarmData
			if (this.state.previewAttributes.length > 0) {
				parameterTrendingAlarmData = temp
			} else {
				alarmData = temp
			}
			nextProps.chartDetailsSuccess.attributes.map(attr => {
				this.state.checkedLegendsHistory.push(`${attr.name}_history_visible`)
				attr.id = "history"
				return attr
			})
			this.setState({
				alarmData,
				parameterTrendingAlarmData,
				isAlarmDataFetching: false,
				isPreviewAlarmChartFetching: false,
			});
		}

		['plantListFailure', 'pipelineListFailure', 'timeFreezeDataFailure', 'attributesListFailure', 'segmentDataError', 'chartDetailsFailure'].map(val => {
			this.errorSetStateHandler(nextProps[val], this.props[val]);
		})
	}

	errorSetStateHandler(nextError, currentError) {
		if (nextError && nextError !== currentError) {
			this.setState({
				isPlantLoading: false,
				isPipeLineFetching: false,
				isSummaryFetching: false,
				isAttributeFetching: false,
				isPipelineDetailFetching: false,
				isAlarmDataFetching: false,
				isOpen: true,
				message: nextError,
				type: "error",
			});
		}
	}

	showPipeline = () => {
		this.setState({
			isPipelineDetailFetching: true,
			chartData: [],
			isAlarmDataFetching: true,
			alarmData: false,
			isAttributeFetching: true
		}, () => { this.props.getAttributes(this.state.selectedPipeline.plantId, this.state.selectedPipeline.value, "dts", undefined) });
	};

	updateClickedPipeline = (clickedSegment, data) => {
		data = cloneDeep(data)
		let zoomSegment = []
		clickedSegment = clickedSegment === data.length - 1 || clickedSegment === data.length - 2 || clickedSegment === data.length - 3 ? data.length - 3 : clickedSegment
		clickedSegment = [clickedSegment, clickedSegment + 1, clickedSegment + 2];
		clickedSegment = clickedSegment.sort((a, b) => a.segment - b.segment)
		clickedSegment.forEach(val => {
            if(data[val]) {
                zoomSegment.push(data[val])
            }
        })
		this.setState({
			zoomSegment,
			lastCursorPosition: "",
			isTimeView: false,
			lastCursorPositionReset: "",
			isLegendStable: false
		});
		this.showPipeline();
	}

	rtdClickHandler = (sensors) => {
		this.setState({
			isOpenTable: true,
			tableData: sensors,
			tableHeading: "Sensors List"
		});
	}

	handleChange = (event, value) => (option) => {
		if (event === "selectedPipeline" && this.state.selectedPipeline.value !== value.value) {
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
				insideChanges: true,
				selectedPipeline: value,
				isSummaryFetching: true,
				segments: [],
				isAttributeFetching: true,
				attributes: [],
				optionsAttributes: [],
				selectedAttribute: "",
				isPipelineDetailFetching: true,
				chartData: [],
				isAlarmDataFetching: true,
				alarmData: false,
				isButtonActive: true,
				xAxisValue: 'distance',
				yAxisValue: 'z',
				zoomSegment: [],
				isLegendStable: false,
				stats: {},
				pipelineList
			}, () => {
				this.props.getPipeLineSummary(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId)
				if (this.props.match.params.plantId || this.props.match.params.pipelineId || this.props.match.params.distance)
					this.props.history.push('/operatorDashboard');
			})
		} else if (event === "selectedPlant" && this.state.selectedPlant.value !== option.value) {
			this.setState({
				insideChanges: true,
				selectedPlant: option,
				isPipeLineFetching: true,
				pipelineList: [],
				selectedPipeline: {},
				isSummaryFetching: true,
				segments: [],
				isAttributeFetching: true,
				attributes: [],
				optionsAttributes: [],
				selectedAttribute: "",
				isPipelineDetailFetching: true,
				chartData: [],
				isAlarmDataFetching: true,
				alarmData: false,
				isButtonActive: true,
				xAxisValue: 'distance',
				yAxisValue: 'z',
				zoomSegment: [],
				isLegendStable: false,
				stats: {}
			}, () => {
				this.props.fetchPipelinesDetails(this.state.selectedPlant.value)
				if (this.props.match.params.plantId || this.props.match.params.pipelineId || this.props.match.params.distance)
					this.props.history.push('/operatorDashboard');
			})
		}
	}

	modalCloseHandler = () => {
		this.setState({
			isOpen: false,
			isOpenTable: false,
			tableData: [],
			tableHeading: "",
			message: "",
			type: "",
		});
	}

	attributeChangeHandler = (selectedAttribute, distance) => {
		let zoomSegment = this.state.zoomSegment.map(val => val.segment)
		let checkedLegends = cloneDeep(this.state.checkedLegends)
		this.setState({
			isLegendStable: true,
			selectedAttribute,
			checkedLegends,
			isPipelineDetailFetching: true,
			chartData: [],
			isAlarmDataFetching: true,
			alarmData: false,
			isTimeView: false,
			lastCursorPosition: "",
			lastCursorPositionReset: "",
			isTimeViewTimestamp: false
		}, () => {
			this.props.getSegmentData(
				this.state.selectedPipeline.value,
				this.state.selectedPipeline.plantId,
				zoomSegment,
				selectedAttribute
			);
			if (!this.state.isTimeView) {
				this.props.getAlarmChart(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, distance ? distance : Math.round(this.state.zoomSegment[0].in), { attributes: [this.state.selectedAttribute], minutes: this.state.isParameterTrending ? this.state.historyDurationModal : this.state.historyDuration })
			}
		})
	}

	preveiwSelectedAttribute = () => {
		let tempAlarmChart = cloneDeep(this.state.alarmData)
		this.setState({
			tempAlarmChart,
			isPreviewAttributeFetching: true,
			isPreviewAlarmChartFetching: true,
			isAlarmChartDisable: true,
			lastCursorPosition: "",
			isParameterTrending: true,
			parameterTrendingAlarmData: false,
			checkedLegendsHistory: [],
			historyDurationModal: 60
		});
		this.props.getAttributes(this.state.selectedPipeline.plantId, this.state.selectedPipeline.value, "all", this.state.alarmData.distance)
	}

	handleMultiChange = (selectedAttribute) => {
		if (selectedAttribute[selectedAttribute.length - 1].active) {
			if (selectedAttribute) {
				let sendingObject = {
					attributes: selectedAttribute.map(attr => attr.value),
					minutes: this.state.historyDuration
				}
				let distance = this.state.tempAlarmChart.distance;
				this.setState({
					previewSelectedAttribute: selectedAttribute,
					isPreviewAlarmChartFetching: true,
					checkedLegendsHistory: []
				}, () => {
					this.props.getAlarmChart(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, distance, sendingObject)
				});
			}
		}
		else {
			this.upgradePlanModal(false)
		}
	}

	reset = () => {
		let zoomSegment = this.state.zoomSegment.map(val => val.segment)
		this.setState({
			isPipelineDetailFetching: true,
			isTimeView: false,
			isTimeViewTimestamp: false,
			lastCursorPosition: "",
			chartData: [],
			lastCursorPositionReset: ""
		})
		this.props.getSegmentData(
			this.state.selectedPipeline.value,
			this.state.selectedPipeline.plantId,
			zoomSegment,
			this.state.selectedAttribute
		)
	}

	compassToggleButton = (event) => {
		if (event.target.id == "profile") {
			this.setState({
				isButtonActive: true,
				xAxisValue: 'distance',
				yAxisValue: 'z',
				isInversed: false
			}
			)
		}
		else {
			this.setState({
				isButtonActive: false,
				xAxisValue: 'x',
				yAxisValue: 'y'
			}
			)
		}
	}

	compassButton = () => {
		let isInversed = this.state.isInversed;
		isInversed = !isInversed;
		this.setState({
			isInversed,
		},
		)
	}


	getGradient = (colors, min, max, name, reverseGradient) => {
		let gradient = reverseGradient ? "linear-gradient(to left," : "linear-gradient(to right,"
		let gradientLength = Math.abs(max - min)
		colors.map((val, index) => {
			let colorsLength = ((Math.abs(val.max - val.min) * 100) / gradientLength)
			let colorStart = (Math.abs(val.min - min) / gradientLength) * 100
			let colorStop = (Math.abs(val.max - min) / gradientLength) * 100
			if (colors.length > 1) {
				gradient = gradient + val.color.replace('{}', 1) + (index == 0 ? colorStart : colorsLength > 5 ? colorStart + 5 : colorStart + (colorsLength / 2)) + "% " + (index == (colors.length - 1) ? colorStop : colorsLength > 5 ? colorStop - 5 : colorStop - (colorsLength / 2)) + "%" + (colorStop == 100 ? ')' : ',');
			}
			else {
				gradient = gradient + val.color.replace('{}', 0.2) + ',' + val.color.replace('{}', 1) + ")";
			}
		})
		return gradient
	}

	marksRange(ranges) {
		let marks = {}
		ranges.map(val => marks[val] = val)
		return marks
	}

	trendingViewClickHandler = (lastPosition, dataProvider) => {
		if (!isNaN(lastPosition)) {
			this.setState({
				lastCursorPosition: lastPosition,
				lastCursorPositionReset: lastPosition,
				isPipelineDetailFetching: true,
				isTimeView: true,
				isTimeViewTimestamp: dataProvider.timestamp,
				chartData: [],
				isLegendStable: true
			});
			if (dataProvider.timestamp) {
				let zoomSegment = this.state.zoomSegment.map(val => val.segment)
				this.props.getSegmentData(
					this.state.selectedPipeline.value,
					this.state.selectedPipeline.plantId,
					zoomSegment,
					this.state.selectedAttribute,
					dataProvider.timestamp
				);
				if (!this.state.isTimeView) {
					this.props.getAlarmChart(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, this.props.match.params.distance ? this.props.match.params.distance : Math.round(this.state.zoomSegment[0].in), { attributes: [this.state.selectedAttribute], minutes: this.state.isParameterTrending ? this.state.historyDurationModal : this.state.historyDuration })
				}
			}
		}
	}

	expandToogleClick = (view) => {
		this.setState({ isSchematicViewExpand: view });
	}

	nextPreviousDisableCheck = (type) => {
		let arrayCheck
		let currentSegment = cloneDeep(this.state.zoomSegment)
		let allSegment = cloneDeep(this.state.segments)

		currentSegment = currentSegment.map(val => val.segment).sort((a, b) => a.segment - b.segment)
		allSegment = allSegment.map(val => val.segment).sort((a, b) => a.segment - b.segment)
		arrayCheck = (currentSegment[0] === allSegment[0] && type === "previous") || (currentSegment[currentSegment.length - 1] === allSegment[allSegment.length - 1] && type === "next")
		return arrayCheck
	}

	selectedSegments = (type) => {
		let selected = []
		let currentSegment = cloneDeep(this.state.zoomSegment)
		let allSegment = cloneDeep(this.state.segments)

		currentSegment = currentSegment.map(val => val.segment).sort((a, b) => a.segment - b.segment)
		allSegment = allSegment.map(val => val.segment).sort((a, b) => a.segment - b.segment)

		if (type === "previous")
			selected = currentSegment[0] === allSegment[1] || currentSegment[0] === allSegment[2] ? [allSegment[0], allSegment[1], allSegment[2]] : this.state.zoomSegment.map(val => val = val.segment - 3)
		else
			selected = currentSegment[currentSegment.length - 1] === allSegment[allSegment.length - 3] || currentSegment[currentSegment.length - 1] === allSegment[allSegment.length - 2] ? [allSegment[allSegment.length - 3], allSegment[allSegment.length - 2], allSegment[allSegment.length - 1]] : this.state.zoomSegment.map(val => val = val.segment + 3)
		return selected[0]
	}

	durationChangeHandler = isparameterTrending => {
		this.setState({
			[isparameterTrending ? 'historyDurationModal' : 'historyDuration']: event.target.value,
			isAlarmDataFetching: !isparameterTrending,
			isPreviewAlarmChartFetching: isparameterTrending
		}, () => {
			let pipelineId = this.state.selectedPipeline.value;
			let plantId = this.state.selectedPipeline.plantId;
			let distance = this.state.alarmData.distance ? this.state.alarmData.distance : this.props.match.params.distance ? this.props.match.params.distance : Math.round(this.state.zoomSegment[0].in);
			let sendingObject = {
				attributes: this.state.isParameterTrending ? cloneDeep(this.state.previewSelectedAttribute).map(attr => attr.value) : [this.state.selectedAttribute],
				minutes: this.state.isParameterTrending ? this.state.historyDurationModal : this.state.historyDuration
			}
			this.props.getAlarmChart(pipelineId, plantId, distance, sendingObject)
		})
	}

	getAlarmChart = (val) => {
		let attributes = { attributes: [this.state.selectedAttribute], minutes: this.state.isParameterTrending ? this.state.historyDurationModal : this.state.historyDuration }
		this.setState({
			isAlarmDataFetching: true
		}, () => this.props.getAlarmChart(this.state.selectedPipeline.value, this.state.selectedPipeline.plantId, val, attributes))
	}

	upgradePlanModal = (close) => {
		this.setState({
			isActivePlanModal: !close
		})
	}


	render() {
		let columns
		cloneDeep(this.state.tableData).map(val => {
			columns = Object.keys(val).map(value => {
				if (value === "description") {
					return {
						Header: capitalizeFirstLetter(value),
						accessor: value,
						filterable: true,
						style: { 'whiteSpace': 'unset' }
					}
				} else {
					return {
						Header: capitalizeFirstLetter(value),
						accessor: value,
						filterable: true,
					}
				}
			});
			return val
		})

		let requiredAttr = this.state.attributes.find(attr => attr.name == this.state.selectedAttribute)
		let gradient = "linear-gradient(to right, #FFA12C, #DA5326 55%, #F11D28 85%)"
		if (requiredAttr) {
			gradient = this.getGradient(requiredAttr.colors, requiredAttr.ranges[0], requiredAttr.ranges[requiredAttr.ranges.length - 1], requiredAttr.name, requiredAttr.reverseGradient)
		}
		let sliderAttribute = this.state.attributes.find(value => value.name === this.state.selectedAttribute)
		return (
			<div className="appContent">
				<Helmet>
					<title>Dashboard</title>
					<meta name="description" content="Description of Dashboard" />
				</Helmet>

				<div className="pageBreadcrumb">
					<div className="flex-item pageBreadcrumb-lg">
						{this.props.match.params.plantId || this.props.match.params.pipelineId ?
							<p className="pd-l-30">
								<span className="cursor-pointer" onClick={() => { this.props.history.goBack(); }}>
									<button className="btn btn-transparent"><i className="far fa-long-arrow-left" /></button>
									{this.props.match.params.lastPage === "list" ?
										<FormattedMessage {...messages.pipelineSummaryView} children={(message => message)} /> :
										<FormattedMessage {...messages.manageAlarms} children={(message => message)} />
									}
								</span>
							</p> :
							<p><FormattedMessage {...commonMessages.dashboard} children={(message => message)} /></p>
						}
						<h5>
							<span className="md-port-d-b"><FormattedMessage {...messages.operatorDashboard} children={(message => message)} /></span>
							<span className="mx-3 md-port-hide">|</span>
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
					<div className="flex-item pageBreadcrumb-sm">
						<div className="form-group mr-b-0 flex align-items-baseline">
							<label className="form-label f-13 fx-b40 pd-r-10 text-right">
								<FormattedMessage {...commonMessages.selectPlant} children={(message => message)} /> :
							</label>
							<Select
								isDisabled={this.state.selectedPlant.value === "noData" || this.state.isPipelineDetailFetching || this.state.isAlarmDataFetching}
								className="form-control-multi-select fx-b60"
								id="selectedPlant"
								value={this.state.selectedPlant}
								onChange={this.handleChange("selectedPlant")}
								options={this.state.plantList}
							/>
						</div>
					</div>
				</div>

				<section className="operatorDashBoard">
					<React.Fragment>
						{!this.state.isPlantLoading ?
							this.state.selectedPlant.value === "noData" ?
								<NoDataFound skeleton="skeletonDashFullView" mode="fullView" dataName="data" dataImg="dash" button="reload" />
								:
								<div className="flex">
									<div className="div-lg mr-b-sm mr-b-lg">
										<div className={this.state.isSchematicViewExpand ? "card pipeLineViewBox expandBox" : "card pipeLineViewBox"}>
											<div className="card-header">
												<button className="btn btn-pipelineList" onClick={this.showPipelineListMob}>
													<i className="fas fa-bars"></i>
												</button>
												{this.state.isSummaryFetching ? "" : Object.keys(this.state.selectedPipeline).length > 0 && this.state.segments.length > 0 ? "Schematic View - " + this.state.selectedPipeline.label + " ( 0 - " + this.state.lastDistance + " " + this.state.distanceUnit + " )" : "Schematic View"}
												{/* {!this.state.isSummaryFetching ?
													<label className="switch">
														<input disabled={this.state.selectedPlant.value === "noData" || this.state.isPipelineDetailFetching || this.state.isAlarmDataFetching || this.state.segments.length < 3} checked={this.state.zoomSegment.length == 1 ? false : true} onChange={this.segmentToggle} type="checkbox" />
														<span className="slider">
															<FormattedMessage {...messages.multipleSelection} children={(message => message)} />
														</span>
													</label>
													: null
												} */}
												{Object.keys(this.state.stats).length && !this.state.isSummaryFetching ?
													<div className="pipelineHighlights">
														<p><strong><FormattedMessage {...messages.minTimetoFreeze} children={(message => message)} /></strong>{this.state.stats.minTTF}</p>
														<p><strong><FormattedMessage {...messages.minTemperature} children={(message => message)} /></strong>{this.state.stats.minTemp}</p>
														<p><strong><FormattedMessage {...messages.maxTemperature} children={(message => message)} /></strong>{this.state.stats.maxTemp}</p>
													</div> : null
												}
											</div>

											<div className="card-body pipelineViewBody">
												<SchematicView
													noDataSkeleton={<NoDataFound noDataCommonMsg={false} skeleton="skeletonPipeline" dataName="data" dataImg="pipelineDetail" />}
													isFetching={this.state.isSummaryFetching}
													data={this.state.segments}
													isViewExpanded={this.state.isSchematicViewExpand}
													expandToogleClick={this.expandToogleClick}
													ShowExpandButton={true}
													zoomSegment={this.state.zoomSegment}
													selection={true}
													showAlarms={true}
													showRTDSensors={true}
													onSegmentClick={(clickedSegment) => this.updateClickedPipeline(clickedSegment, this.state.segments)}
													onRtdClick={this.rtdClickHandler}
													showHeaters={true}
													heaterLayers={this.state.heaterLayers}
													heaterUnit={this.state.powerUnit}
													categoryAxisUnit={this.state.distanceUnit}
													plantId={this.state.selectedPlant}
													pipelineId={this.state.selectedPipeline}
												/>
											</div>
										</div>
									</div>

									<div className="div-sm mr-b-lg animated pipelineListMob">
										<div className="pipelineFilterBox">
											<div className="card pipeLineViewBox">
												<div className="card-header">
													<FormattedMessage {...messages.pipelineHealth} children={(message => message)} />
													<button className="btn-pipelineClose" onClick={this.hidePipelineListMob}><i className="fas fa-times"></i></button>
												</div>
												<PipelineHealth
													fetchingPipelines={this.state.isPipeLineFetching}
													pipelineList={this.state.pipelineList}
													onPipelineClick={this.handleChange}
													isPipelineDisabled={this.state.isAlarmDataFetching || this.state.isPipelineDetailFetching}
													noDataMode="smallView"
												/>
											</div>
										</div>
									</div>

									<div className="div-lg mr-b-sm">
										<div className={this.state.isDetailViewExpand ? "card pipeLineViewBox expandBox minHeight" : "card pipeLineViewBox minHeight"}>
											{this.state.isAttributeFetching ?
												<SkeletonLoader skeleton="skeletonDetailedView" mode="middleView" />
												:
												<React.Fragment>
													{this.state.attributes.length > 0 ? null : <div className="card-header">Detailed View</div>}
													{this.state.attributes.length > 0 ? <React.Fragment>
														<div className="card-header profileViewHeader">
															<button
																className="btn-transparent prev-button"
																onClick={() => this.updateClickedPipeline(this.selectedSegments("previous"), this.state.segments)}
																disabled={this.nextPreviousDisableCheck("previous")}
															>
																<i className="fa fa-arrow-circle-left"></i>
															</button>

															<button
																className="btn-transparent next-button"
																onClick={() => this.updateClickedPipeline(this.selectedSegments("next"), this.state.segments)}
																disabled={this.nextPreviousDisableCheck("next")}
															>
																<i className="fa fa-arrow-circle-right"></i>
															</button>

															<div className="toggleButton">
																<button type="button" id="profile" onClick={this.state.pipelineViews.Profile ? () => this.compassToggleButton : () => this.upgradePlanModal(false)} className={this.state.isButtonActive ? "btn-toggle active" : "btn-toggle"}>
																	<span style={{marginRight:.7 + 'em'}}><i className={this.state.pipelineViews.Profile ? "far fa-check-circle text-success" : "fas fa-star text-warning"}></i></span>
																	<FormattedMessage {...messages.profileView} children={(message => message)} />
																</button>
																<button type="button" id="plan" onClick={this.state.pipelineViews.Plan ? () => this.compassToggleButton: () => this.upgradePlanModal(false)} className={this.state.isButtonActive ? "btn-toggle" : "btn-toggle active"}>
																	<span style={{marginRight:.7 + 'em'}}><i className={this.state.pipelineViews.Plan ? "far fa-check-circle text-success" : "fas fa-star text-warning"}></i></span>
																	<FormattedMessage {...messages.planView} children={(message => message)} />
																</button>
															</div>
															{this.state.isButtonActive ? 'Profile' + ' ' + 'Detailed View ( ' + (Math.round(this.state.zoomSegment[0].in)) + ' to ' + (Math.round(this.state.zoomSegment[(this.state.zoomSegment.length) - 1].en)) + " " + this.state.distanceUnit + ' )' : 'Plan' + ' ' + 'Detailed View ( ' + (Math.round(this.state.zoomSegment[0].in)) + ' to ' + (Math.round(this.state.zoomSegment[(this.state.zoomSegment.length) - 1].en)) + " " + this.state.distanceUnit + ')'}
															<p className="timeStatus">
																<strong><FormattedMessage {...commonMessages.time} children={(message => message)} /></strong>{this.state.isTimeViewTimestamp ? moment(this.state.alarmAxisTimestamp).format("DD MMM YYYY HH:mm:ss") : "-"}
															</p>
															<div className="form-group">
																<label className="form-label">Select Attribute :</label>
																<div className="dropdown selectAttribute">
																	<button className={this.state.isAlarmDataFetching || this.state.isPipelineDetailFetching ? "btn dropdown-toggle disabled" : "btn dropdown-toggle"} disabled={this.state.isAlarmDataFetching || this.state.isPipelineDetailFetching} type="button" data-toggle="dropdown">
																		<span><i className={this.state.attributes.find(val => val.name === this.state.selectedAttribute).value ? "far fa-check-circle text-success" : "fas fa-star text-warning"}></i></span>
																		{this.state.attributes.find(val => val.name === this.state.selectedAttribute).displayName}
																	</button>
																	<ul className="dropdown-menu">
																		{this.state.attributes.map(attr =>
																			<li className={"dropdown-item"} key={attr.name} onClick={attr.value ? () => this.attributeChangeHandler(attr.name, this.state.alarmData.distance) : () => this.upgradePlanModal(false)}>
																				{attr.value ?
																					<span> <i className="far fa-check-circle text-success"></i></span>
																					:
																					<span> <i className="fas fa-star text-warning"></i></span>
																				}
																				{attr.displayName}
																			</li>
																		)}
																	</ul>
																</div>
															</div>
														</div>

														<DetailedView
															id="pipeLine"
															xAxisValue={this.state.xAxisValue}
															yAxisValue={this.state.yAxisValue}
															isInversed={this.state.isInversed}
															data={this.state.detailedViewData}
															onClickHandler={this.getAlarmChart}
															checkedLegends={this.state.checkedLegends}
															isPipelineDetailFetching={this.state.isPipelineDetailFetching}
															legends={this.state.legends}
														/>
													</React.Fragment>
														:
														<NoDataFound noDataCommonMsg={false} skeleton="skeletonDetailedView" mode="middleView" dataName="data" dataImg="pipeline-img" />
													}
												</React.Fragment>
											}
											{this.state.detailedViewData && this.state.detailedViewData.chartData.length > 0 &&
												<div className="detailViewFooter">
													<div className="pipelineColorScaleBox">
														<div className="customRangeBox">
															{sliderAttribute &&
																<Range
																	min={sliderAttribute.ranges[0]}
																	max={sliderAttribute.ranges[sliderAttribute.ranges.length - 1]}
																	railStyle={{ background: gradient }}
																	marks={this.marksRange(sliderAttribute.ranges)}
																	defaultValue={[]}
																	disabled={true}
																	className="customRange"
																/>
															}
														</div>
														<h6>{requiredAttr ? this.state.attributeUnit ? requiredAttr.displayName + " ( " + this.state.attributeUnit + " )" : requiredAttr.displayName : ""}</h6>
													</div>
													{this.state.isButtonActive ? null :
														<button onClick={this.compassButton} className="btn-compass">
															<img className={this.state.isInversed ? "rotateAntiClock" : "rotateClock"} src={require('../../assets/images/needle.png')}></img>
														</button>
													}


													{this.state.chartData.length > 0 ?
														this.state.isDetailViewExpand ?
															<button className="btn btn-transparent btn-expand" onClick={() => this.setState({ isDetailViewExpand: false })}>
																<i className="far fa-compress"></i>
															</button>
															:
															<button className="btn btn-transparent btn-expand" onClick={() => this.setState({ isDetailViewExpand: true })}>
																<i className="far fa-expand"></i>
															</button>
														: null
													}
												</div>
											}
										</div>
									</div>

									<div className="div-sm">
										<div className="card pipeLineViewBox">
											<div className="card-header">
												<FormattedMessage {...messages.parametertrendingView} children={(message => message)} />  {this.state.alarmData ? "( " + this.state.alarmData.distance + " " + this.state.distanceUnit + " )" : null}
												<div className="btnGroup">
													{this.state.isTimeView ? <button
														className="btn btn-transparent text-danger"
														onClick={this.reset}
													>
														<i className="far fa-undo" />
													</button> : null}
													<button
														className="btn-transparent text-info"
														onClick={this.preveiwSelectedAttribute}
														disabled={this.state.alarmData && this.state.alarmData.chartData.length > 0 ? false : true}
													>
														<i className="far fa-chart-line" />
													</button>
												</div>
											</div>

											<div className="card-body parameterTrending">
												{!this.state.isAlarmDataFetching ?
													<React.Fragment>
														{this.state.alarmData && this.state.alarmData.chartData.length > 0 ?
															<React.Fragment>
																<ul className="parameterTrendingInfo">
																	<li>
																		<h6><FormattedMessage {...messages.component} children={(message => message)} /></h6>
																		<p className={this.state.alarmData.components.length > 1 ? null : "noEllipsis"}>
																			{this.state.alarmData.components.length > 0 ? this.state.alarmData.components[0] : "NA"}
																		</p>
																		{this.state.alarmData.components.length > 1 ?
																			<div className="dropdown componentsDropdown">
																				<span className="countBadge" data-toggle="dropdown" >
																					{this.state.alarmData.components.length - 1}
																					<sub>
																						<i className="far fa-plus" />
																					</sub>
																				</span>
																				<div className="dropdown-menu">
																					<h5><FormattedMessage {...messages.components} children={(message => message)} /> </h5>
																					<ul>
																						{this.state.alarmData.components.map((val, index) =>
																							<li key={index}>{val}</li>
																						)}
																					</ul>
																				</div>
																			</div>
																			: null}
																	</li>
																	<li>
																		<h6><FormattedMessage {...messages.alarms} children={(message => message)} /></h6>
																		<p className={this.state.alarmData.alarms.length > 0 ? null : "noEllipsis"}>
																			{this.state.alarmData.alarms.length > 0 ?
																				this.state.alarmData.alarms[0].type :
																				"NA"
																			}
																		</p>
																		{this.state.alarmData.alarms.length > 0 ?
																			<span className="countBadge" onClick={() => this.setState({ isOpenTable: true, tableData: this.state.alarmData.alarms, tableHeading: "Alarms List" })} >
																				{this.state.alarmData.alarms.length > 1 ? this.state.alarmData.alarms.length - 1 : <i className="fas fa-info" />}
																				<sub><i className="fas fa-plus" /></sub>
																			</span>
																			: null
																		}
																	</li>
																	<li>
																		<h6><FormattedMessage {...messages.sensors} children={(message => message)} /></h6>
																		<p className={this.state.alarmData.sensors.length > 1 ? null : "noEllipsis"}>
																			{this.state.alarmData.sensors.length > 0 ?
																				this.state.alarmData.sensors[0].Name :
																				"NA"
																			}
																		</p>
																		{this.state.alarmData.sensors.length > 0 ?
																			<span className="countBadge" onClick={() => this.setState({ isOpenTable: true, tableData: this.state.alarmData.sensors, tableHeading: "Sensors List" })}>
																				{this.state.alarmData.sensors.length > 1 ? this.state.alarmData.sensors.length - 1 : <i className="fas fa-info" />}
																				<sub><i className="fas fa-plus" /></sub>
																			</span> : null
																		}
																	</li>
																	<li>
																		<h6>{capitalizeFirstLetter(this.state.selectedAttribute)}</h6>
																		<p className="noEllipsis">
																			{this.state.alarmData.attributes && this.state.alarmData.attributes.length > 0 ? this.state.alarmData.attributes[0].value : "NA"}
																		</p>
																	</li>
																</ul>
																<div className="timeStatusOuter">
																	<p className="timeStatus">
																		<strong><FormattedMessage {...messages.lastUpdated} children={(message => message)} /></strong>
																		{this.state.alarmData.chartData && this.state.alarmData.chartData.length > 0 ?
																			moment(this.state.alarmData.chartData[this.state.alarmData.chartData.length - 1].timestamp).format("DD MMM YYYY HH:mm:ss") : "-"}
																	</p>
																	<div className="form-group">
																		<select onChange={() => this.durationChangeHandler(false)} value={this.state.historyDuration} className="form-control">
																			<option value={60}>1 Hour</option>
																			<option value={180}>3 Hour</option>
																			<option value={360}>6 Hour</option>
																			<option value={1440}>1 Day</option>
																			<option value={10080}>1 Week</option>
																			<option value={20160}>2 Weeks</option>
																		</select>
																	</div>
																</div>
																<HistoryChart
																	data={cloneDeep(this.state.alarmData)}
																	height="300"
																	cursorArray={[this.state.lastCursorPosition]}
																	attributes={this.state.attributes}
																	clickable={!this.state.isAlarmChartDisable}
																	onClick={this.trendingViewClickHandler}
																	categoryField="timestamp"
																	isDateAxis={true}
																	checkedLegends={this.state.checkedLegendsHistory}
																	id={"parameterTrending"}
																/>
															</React.Fragment>
															:
															<NoDataFound noDataCommonMsg={false} skeleton="skeletonParameterView" mode="middleView" dataName="data" dataImg="lineChart" />
														}
													</React.Fragment> :
													<SkeletonLoader skeleton="skeletonParameterView" mode="middleView" />
												}
											</div>
										</div>
									</div>
								</div>
							:
							<SkeletonLoader skeleton="skeletonDashFullView" mode="fullView" />
						}
					</React.Fragment>
				</section>

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

				{this.state.isParameterTrending ? <div className="modal d-block" id="parameterTrending">
					<div className="modal-dialog modal-xl">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">
									<FormattedMessage {...messages.parametertrendingView} children={(message => message)} />
									<button className="close" onClick={() => this.setState({ alarmData: this.state.tempAlarmChart, isParameterTrending: false, isAlarmChartDisable: false, lastCursorPosition: this.state.lastCursorPositionReset, previewSelectedAttribute: [], previewAttributes: [], checkedLegendsHistory: [] })} ><i className="far fa-times"></i></button>
								</h4>
							</div>
							<div className="modal-body">
								<div className="flex modalMaxHeight">
									<div className="modalDiv-lg mr-b-sm">
										<div className="parameterTrendingModal">
											{this.state.isPreviewAttributeFetching ?
												<SkeletonLoader skeleton="parameterModalSkeleton" mode="middleView" />
												: <React.Fragment>
													<div className="filterBox shadowNone mr-b-10 flex">
														<div className="fx-b85 pd-r-10">
															<div className="form-group">
																<label className="form-label"><FormattedMessage {...commonMessages.selectAttribute} children={(message => message)} /> :</label>
																<Select
																	placeholder="Select Attribute"
																	isClearable={false}
																	value={this.state.previewSelectedAttribute}
																	onChange={this.handleMultiChange}
																	options={
																		this.state.previewSelectedAttribute.length >= 4 ?
																			this.state.previewSelectedAttribute :
																			this.state.previewAttributes
																	}
																	noOptionsMessage={() => "Max limit achieved"}
																	isMulti
																/>
															</div>
														</div>
														<div className="fx-b15 pd-l-10">
															<div className="form-group">
																<label className="form-label"><FormattedMessage {...commonMessages.selectDuration} children={(message => message)} /> :</label>
																<select onChange={() => this.durationChangeHandler(true)} value={this.state.historyDurationModal} className="form-control">
																	<option value={60}>1 Hour</option>
																	<option value={180}>3 Hour</option>
																	<option value={360}>6 Hour</option>
																	<option value={1440}>1 Day</option>
																	<option value={10080}>1 Week</option>
																	<option value={20160}>2 Weeks</option>
																</select>
															</div>
														</div>
													</div>
													<div className="card pipeLineViewBox shadowNone">
														<div className="card-body pipelineTopologyBox">
															{this.state.isPreviewAlarmChartFetching ?
																<SkeletonLoader skeleton="skeletonChart" mode="middleView" />
																: <HistoryChart
																	data={this.state.parameterTrendingAlarmData}
																	height="376"
																	cursorArray={[]}
																	attributes={this.state.modalAttributes}
																	clickable={false}
																	categoryField="timestamp"
																	isDateAxis={true}
																	checkedLegends={this.state.checkedLegendsHistory}
																	id={"parameterTrendingModal"}
																/>
															}
														</div>
													</div>
												</React.Fragment>
											}
										</div>
									</div>
									<div className="modalDiv-sm">
										<table className="table customHTMLTable">
											<thead>
												<tr>
													<th width="40%"><FormattedMessage {...messages.attributesHeading} children={(message => message)} /></th>
													<th width="60%"><FormattedMessage {...messages.infoHeading} children={(message => message)} /></th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td><FormattedMessage {...messages.rawLocation} children={(message => message)} /></td>
													<td>{this.state.parameterTrendingAlarmData && this.state.parameterTrendingAlarmData.distance.toString() ? this.state.parameterTrendingAlarmData.distance + " " + this.state.distanceUnit : "NA"}</td>
												</tr>
												{this.state.parameterTrendingAlarmData && this.state.parameterTrendingAlarmData.attributes.length > 0 ? (this.state.parameterTrendingAlarmData.attributes.map((val, index) => {
													let label = this.state.previewAttributes.find(attr => attr.value == val.name.split('__')[0]).label
													return <tr key={index}>
														{val.name.split('__')[1] ? <td>{label}{(val.name.split('__')[1])}</td> : <td>{label}</td>}
														<td>{this.state.parameterTrendingAlarmData.attributes && !this.state.isPreviewAlarmChartFetching && this.state.parameterTrendingAlarmData.attributes.length > 0 ? val.value : "NA"}</td>
													</tr>
												}))
													:
													null
												}
											</tbody>

										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> : null
				}

				{/* ToolTip Data Modal Start  */}

				{this.state.isOpenTable ? <div className="modal d-block">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">{this.state.tableHeading}<button onClick={this.modalCloseHandler} className="close"><i className="far fa-times"></i></button></h4>
							</div>
							<div className="modal-body">
								<div className="customReactTableBox modalMaxHeight">
									<ReactTable
										noDataText={
											this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName={this.state.tableHeading === "Alarms List" ? "alarm" : "sensor"} dataImg={this.state.tableHeading === "Alarms List" ? "notification" : "sensor"} />
										}
										defaultFilterMethod={filterCaseInsensitive}
										data={this.state.tableData}
										pageSizeOptions={[5, 10, 20, 25, 50, 100]}
										className="customReactTable"
										defaultPageSize={this.state.tableData.length < 5 ? 5 : 10}
										columns={columns}
										PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
										NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
									/>
								</div>
							</div>

						</div>
					</div>
				</div> : null}

				{this.state.switchLandscape ?
					<div className="landscapeModal">
						<div className="modalContent">
							<h4><FormattedMessage {...messages.switchMessage} children={(message => message)} /></h4>
							<div className="modalImg">
								<img src={require('../../assets/images/landscape.gif')} />
							</div>
							<button className="btn btn-danger" onClick={() => this.setState({ switchLandscape: false })}><FormattedMessage {...messages.ok} children={(message => message)} /></button>
						</div>
					</div>
					: null
				}

				{/* ToolTip Data Modal End  */}

				{/* -----Message Model Start----- */}

				{this.state.isOpen ? (
					<MessageModal
						type={this.state.type}
						message={this.state.message}
						onClose={this.modalCloseHandler}
					/>
				) : null}

				{/* -----Message Model End----- */}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	timeFreezeDataSuccess: getTimeFreezeDataSuccess(),
	timeFreezeDataFailure: getTimeFreezeDataFailure(),
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
		getPipeLineSummary: (pipelineId, plantId) => dispatch(getPipeLineSummary(pipelineId, plantId)),
		getSegmentData: (pipelineId, plantId, segment, attribute, timestamp) => dispatch(getSegmentData(pipelineId, plantId, segment, attribute, timestamp)),
		getAlarmChart: (pipelineId, plantId, distance, attributes) => dispatch(getAlarmChart(pipelineId, plantId, distance, attributes)),
		managePlantList: () => dispatch(managePlantList()),
		fetchPipelinesDetails: (id) => dispatch(fetchPipelinesDetails(id)),
		getAttributes: (plantId, pipelineId, type, distance) => dispatch(getAttributes(plantId, pipelineId, type, distance))
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(Dashboard);

