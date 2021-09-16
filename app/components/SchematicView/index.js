/**
 *
 * SchematicView
 *
 */

import React from "react";
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import commonMessages from '../../messages';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import SkeletonLoader from "../SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
class SchematicView extends React.Component {
	summaryChart = {};

	componentDidUpdate() {
		if (!this.summaryChart['segment' + this.props.pipelineId.value] && !this.props.isFetching && this.props.data.length > 0) {
			this.getChartConfig('segment' + this.props.pipelineId.value, this.props)
		}
	}

	shouldComponentUpdate(nextProps) {
		if (
			JSON.stringify(nextProps.plantId) != JSON.stringify(this.props.plantId) ||
			JSON.stringify(nextProps.pipelineId) != JSON.stringify(this.props.pipelineId) ||
			JSON.stringify(nextProps.isFetching) != JSON.stringify(this.props.isFetching) ||
			JSON.stringify(nextProps.isViewExpanded) != JSON.stringify(this.props.isViewExpanded)
		) {
			return true
		}
		return false
	}

	createChartData = (props) => {
		let data = JSON.parse(JSON.stringify(props.data))
		const zoomSegment = JSON.parse(JSON.stringify(props.zoomSegment))
		data.push({
			alarmCount: 0,
			en: "",
			in: data[data.length - 1].en,
			segment: data.length,
			sensors: [],
			colors:[]
		})

		data[0].bullet2 = require('../../assets/images/end.png')
		data[0].dx = -10
		data[data.length - 1].bullet2 = require('../../assets/images/start.png')
		data[data.length - 1].dx = 10
		data = data.map((chartUnit, index) => {
			if (props.selection && zoomSegment.some(temp => temp.segment == index)) {
				chartUnit.color = "#596570";
			}
			else {
				chartUnit.color = chartUnit.colors && chartUnit.colors.length > 0 ? chartUnit.colors[0] : "#8e9eab"
			}
			chartUnit.count = 1;
			if (props.showAlarms && chartUnit.alarmCount > 0) {
				chartUnit.bullet = require('../../assets/images/mapMarker.png')
				chartUnit.alarm = chartUnit.alarmCount
			}
			if (props.showRTDSensors && Object.keys(chartUnit.sensors).length > 0)
				chartUnit.rtdBullet = window.API_URL + "api/public/static/components/scadasensor.png";
			return chartUnit;
		});
		return data;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.pipelineId.value != this.props.pipelineId.value && this.summaryChart['segment' + nextProps.pipelineId.value]) {
			this.summaryChart['segment' + nextProps.pipelineId.value].dispose()
			this.summaryChart['segment' + nextProps.pipelineId.value] = undefined
		}

		if (this.summaryChart['segment' + nextProps.pipelineId.value] && (JSON.stringify(nextProps.zoomSegment) != JSON.stringify(this.props.zoomSegment)) && nextProps.data.length > 0) {
			this.summaryChart['segment' + nextProps.pipelineId.value].data = this.createChartData(nextProps);
			this.createTrendLineData(nextProps.heaterLayers);
			// this.summaryChart['segment' + nextProps.pipelineId.value].series.values.map((val, index) => {
			// 	if(val.id !== "series1") {
			// 		let heaterVal= nextProps.heaterLayers[val.name.split('_')[1]].heaters[val.name.split('_')[2]]
			// 		console.log('heaterVal: ', heaterVal);
			// 		let count = val.name.split('_')[1] % 2 == 0 ? 1 + (((val.name.split('_')[1] / 2) + 1) / 1000) : 1 - ((parseInt(val.name.split('_')[1] / 2) + 1) / 1000)
			// 		let trend = [
			// 			{
			// 				segment: index == 0 ? heaterVal.startSegment : heaterVal.startSegment + 1,
			// 				count: count
			// 			},
			// 			{
			// 				segment: heaterVal.endSegment + 1,
			// 				count: count
			// 			}
			// 		]
			// 		val.data = trend;
			// 	}
			// })
		}
	}

	getChartConfig(id, props) {
		let data = this.createChartData(props);
		am4core.addLicense("CH145187641");
		am4core.options.queue = true;
		am4core.options.onlyShowOnViewport = true;
		this.summaryChart[id] = am4core.createFromConfig({
			"type": "XYChart",
			"container": id,
			"autoSetClassName": true,
			"cursor": {
				"lineX": {
					"disabled": true
				},
				"lineY": {
					"disabled": true
				},
				"behavior": "none"
			},
			"series": [
				{
					"type": "LineSeries",
					"strokeWidth": 18,
					"id": "series1",
					"propertyFields": {
						"stroke": "color"
					},
					// "filters" : [{
					// 	"type" : "DropShadowFilter",
					// 	"filterUnits" : "userSpaceOnUse",
					// 	"dx" : 20,
					// 	"dy" : 20,
					// 	"blur" : 5
					// }],
					"segments": {
						"template": {
							"cursorOverStyle": am4core.MouseCursorStyle.pointer,
							"interactionsEnabled": true,
							"events": {
								"hit": function (ev) {
									if (!ev.target.dataItem.isDisabled) {
										props.onSegmentClick(clickedSegment, data);
									}
								}
							}
						}
					},
					"bullets": [
						{
							"type": "Bullet",
							"children": [
								{
									"type": "Image",
									"propertyFields": {
										"href": "bullet"
									},
									"dy": -13,
									"dx": data.length < 10 ? 70 : 18,
									"horizontalCenter": "middle",
									"verticalCenter": "middle",
									"interactionsEnabled": true,
									"cursorOverStyle": am4core.MouseCursorStyle.pointer,
									"events": {
										"hit": function (ev) {
											if (!ev.target.dataItem.isDisabled) {
												props.onSegmentClick(clickedSegment, data);
											}
										}
									}
								},
								{
									"type": "Image",
									"propertyFields": {
										"href": "bullet2",
										"dx": "dx"
									},
									"dy": -13,
									"horizontalCenter": "middle",
									"verticalCenter": "middle",
								},
								{
									"type": "Image",
									"propertyFields": {
										"href": "rtdBullet",
									},
									"dy": 20,
									"dx": data.length < 10 ? 70 : 18,
									"width": 25,
									"height": 25,
									"horizontalCenter": "middle",
									"verticalCenter": "middle",
									"interactionsEnabled": true,
									"cursorOverStyle": am4core.MouseCursorStyle.pointer,
									"events": {
										"hit": function (ev) {
											if (props.showRTDSensors && !ev.target.dataItem.dataContext.disabled && !props.isViewExpanded) {
												props.onRtdClick(ev.target.dataItem.dataContext.sensors);
											}
										}
									}
								}
							]
						},
						{
							"type": "LabelBullet",
							"label": {
								"text": "{alarm}",
								"dy": -15,
								"dx": data.length < 10 ? 70 : 18,
								"fill": "#fff",
								"horizontalCenter": "middle",
								"verticalCenter": "bottom",
								"cursorOverStyle": am4core.MouseCursorStyle.pointer,
								"events": {
									"hit": function (ev) {
										if (!ev.target.dataItem.isDisabled) {
											props.onSegmentClick(clickedSegment, data);
										}
									}
								}
							}
						}
					],
					"dataFields": {
						"valueY": "count",
						"categoryX": "segment",
						"isDisabled": "disabled"
					},
				}
			],
			"yAxes": [
				{
					"type": "ValueAxis",
					"cursorTooltipEnabled": false,
					"renderer": {
						"minGridDistance": props.showHeaters ? 200 / props.heaterLayers.length : 200,
						"grid": {
							"strokeOpacity": 0
						},
						"labels": {
							"disabled": true
						}
					}
				}
			],
			"xAxes": [
				{
					"type": "CategoryAxis",
					"dataFields": {
						"category": "segment"
					},
					"renderer": {
						"grid": {
							"strokeOpacity": 0.09
						},
						"inside": true,
						"labels": {
							"template": {
								"adapter": {
									"text": (text, target) => {
										if (target && target.tooltipDataItem && target.tooltipDataItem.dataContext)
											return Math.round(target.tooltipDataItem.dataContext.in) + " " + props.categoryAxisUnit;
									}
								}
							}
						},
						"axisFills": {
							"template": {
								"fill": "#a9a9a9"
							},
						}
					},
					"cursorTooltipEnabled": false
				}
			],
			data: data
		});

		var clickedSegment = null;
		this.summaryChart[id].cursor.events.on("cursorpositionchanged", function (ev) {
			var xAxis = ev.target.chart.xAxes.getIndex(0);
			let idx = calculateIndex();
			function calculateIndex() {
				return Math.floor((xAxis.toAxisPosition(ev.target.xPosition) / (1 / data.length)) - 0.5)
			}
			clickedSegment = idx;
		});
		if (props.showHeaters)
			this.createTrendLineData(props.heaterLayers);

		this.summaryChart[id].cursor.events.on("hidden", (ev) => {
			this.refs.summaryViewHover.innerHTML = ""
		});

		this.summaryChart[id].cursor.events.on("ready", (ev) => {
			this.refs.summaryViewHover.innerHTML = ""
		});
	}

	createTrendLineData(heaterLayers) {
		heaterLayers.map((value, index) => {
			let count = index % 2 == 0 ? 1 + (((index / 2) + 1) / 1000) : 1 - ((parseInt(index / 2) + 1) / 1000)
			value.heaters.map((val, heaterIndex) => {
				let trend = [
					{
						segment: heaterIndex == 0 ? val.startSegment : val.startSegment + 1,
						count: count
					},
					{
						segment: val.endSegment + 1,
						count: count
					}
				]
				this.createTrendLine(trend, index, heaterIndex, val.on ? am4core.color("#ff4500") : am4core.color("#808080"), val)
			})
		})
	}

	createTrendLine = (data, index, heaterIndex, color, val) => {
		var trend = this.summaryChart['segment' + this.props.pipelineId.value].series.push(new am4charts.LineSeries());
		trend.dataFields.valueY = "count";
		trend.dataFields.categoryX = "segment";
		trend.strokeWidth = 2
		trend.stroke = trend.fill = color
		trend.data = data;
		trend.temp = val
		trend.name = "heaters_" + index + "_" + heaterIndex
		var segment = trend.segments.template;
		segment.interactionsEnabled = true;
		trend.events.on("over", (ev) => {
			this.refs.summaryViewHover.innerHTML = `<p><strong>Start</strong>${ev.target.temp.start}</p>
      <p><strong>End</strong>${ev.target.temp.end}</p>
      <p><strong>circuitId</strong>${ev.target.temp.circuitId}</p>
      <p><strong>panelId</strong>${ev.target.temp.panelId}</p>
      <p><strong>power</strong>${ev.target.temp.power == null ? "NA" : this.props.heaterUnit ? ev.target.temp.power + " " + this.props.heaterUnit : ev.target.temp.power}</p>`;
		});

		var bullet = trend.bullets.create(am4charts.Bullet);
		var closeBullet = bullet.createChild(am4core.Rectangle);
		closeBullet.width = 2;
		closeBullet.height = 8;
		closeBullet.horizontalCenter = "middle";
		closeBullet.verticalCenter = "middle";
		closeBullet.stroke = closeBullet.fill = color;
		return trend;
	};

	componentWillUnmount() {
		am4core.disposeAllCharts()
	}

	render() {
		return (
			<div className="schematicView">
				{!this.props.isFetching ?
					this.props.data.length > 0 ?
						<React.Fragment>
							<div className="chartBox" key={this.props.pipelineId.value}>
								<div id={'segment' + this.props.pipelineId.value} />
							</div>

							{this.props.ShowExpandButton &&
								<button className={this.props.isViewExpanded ? "btn btn-transparent btn-compress" : "btn btn-transparent btn-expand"} onClick={() => this.props.expandToogleClick(!this.props.isViewExpanded)}>
									<i className={this.props.isViewExpanded ? "far fa-compress" : "far fa-expand"}></i>
								</button>
							}

							<div className="pipelineHighlights" ref="summaryViewHover"></div>
						</React.Fragment>
						:
						Object.keys(this.props.noDataSkeleton).length > 0 ? this.props.noDataSkeleton : <h1><FormattedMessage {...messages.noDataToDisplay} children={(message => message)} /></h1>
					:
					<SkeletonLoader skeleton="skeletonPipeline" />
				}
			</div>
		);
	}
}

SchematicView.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	data: PropTypes.array.isRequired,
	isViewExpanded: PropTypes.bool,
	expandToogleClick: PropTypes.func,
	zoomSegment: PropTypes.array,
	selection: PropTypes.bool,
	showAlarms: PropTypes.bool,
	showRTDSensors: PropTypes.bool,
	onSegmentClick: PropTypes.func,
	onRtdClick: PropTypes.func,
	showHeaters: PropTypes.bool,
	heaterLayers: PropTypes.array,
	heaterUnit: PropTypes.string,
	categoryAxisUnit: PropTypes.string,
	plantId: PropTypes.object,
	pipelineId: PropTypes.object,
	ShowExpandButton: PropTypes.bool,
	noDataSkeleton : PropTypes.object
};

SchematicView.defaultProps = {
	isViewExpanded: false,
	expandToogleClick: () => { return false },
	zoomSegment: [],
	selection: false,
	showAlarms: false,
	showRTDSensors: false,
	onSegmentClick: () => { return false },
	onRtdClick: () => { return false },
	showHeaters: false,
	heaterLayers: [],
	heaterUnit: 'W/m',
	categoryAxisUnit: 'm',
	plantId: {},
	pipelineId: {},
	ShowExpandButton: true,
	noDataSkeleton : {}
}

export default SchematicView;
