/**
 *
 * HistoryChart
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from '../../messages';
import $ from 'jquery';
window.$ = $;
import moment from 'moment';
import { capitalizeFirstLetter } from '../../utils/commonUtils';
import NoDataFound from "../../components/NoDataFound"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { cloneDeep } from 'lodash';
var startTimer = undefined
am4core.useTheme(am4themes_animated);

/* eslint-disable react/prefer-stateless-function */
class HistoryChart extends React.PureComponent {
	colorsArray = []
	multiaxisChart = undefined
	state = {
		data: this.props.data,
		checkedLegends: this.props.checkedLegends,
	}

	componentWillMount() {
		this.colorsArray = []
		if (this.state.data && this.state.data.chartData.length > 0) {
			for (let i = 0; i < this.state.data.attributes.length; i++) {
				let requiredAttr = this.props.attributes.find(attr => attr.name === this.state.data.attributes[i].name.split('__')[0])
				this.axisLegendColorHandler(requiredAttr)
			}
		}
	}

	componentDidMount() {
		if (this.state.data && this.state.data.chartData.length > 0) {
			this.getHistoryChart(this.state.data)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(this.props.cursorArray) != JSON.stringify(nextProps.cursorArray) || JSON.stringify(this.props.data) != JSON.stringify(nextProps.data)) {
			let data = cloneDeep(nextProps.data)
			data.chartData.map((val, index) => {
				if (nextProps.cursorArray.includes(index))
					val.customBullet = window.API_URL + "api/public/static/components/alarmMarker.png"
				return val
			})
			this.multiaxisChart.data = this.props.isDateAxis ? data.chartData : this.getComponentChartData(data.chartData)
		}
	}

	getHistoryChart(data) {
		var _self = this;
		let dataObject = cloneDeep(data)
		dataObject.chartData.map((val, index) => {
			if (this.props.cursorArray.includes(index))
				val.customBullet = window.API_URL + "api/public/static/components/alarmMarker.png"
			return val
		})

		this.multiaxisChart = am4core.create(_self.props.id, am4charts.XYChart);

		// Add cursor
		this.multiaxisChart.cursor = new am4charts.XYCursor();

		if (this.props.isDateAxis) {
			var dateAxis = this.multiaxisChart.xAxes.push(new am4charts.DateAxis())
			dateAxis.groupData = true;
			dateAxis.groupCount = 200;
			dateAxis.renderer.minGridDistance = 50;
			dateAxis.cursorTooltipEnabled = false;

			this.multiaxisChart.cursor.events.on("cursorpositionchanged", function (ev) {
				_self.multiaxisChart.series.each(function (series) {
					var dataItem = dateAxis.getSeriesDataItem(
						series,
						dateAxis.toAxisPosition(_self.multiaxisChart.cursor.xPosition),
						true
					);
					_self.setState({
						legendValue: dataItem ? dataItem.dataContext : ""
					})
				});
			});

		}
		else {
			var categoryAxis = this.multiaxisChart.xAxes.push(new am4charts.CategoryAxis())
			categoryAxis.dataFields.category = this.props.categoryField;
			categoryAxis.renderer.minGridDistance = 50;
			categoryAxis.cursorTooltipEnabled = false;

			this.multiaxisChart.cursor.events.on("cursorpositionchanged", function (ev) {
				_self.multiaxisChart.series.each(function (series) {
					var dataItem = categoryAxis.getSeriesDataItem(
						series,
						categoryAxis.toAxisPosition(_self.multiaxisChart.cursor.xPosition),
						true
					);
					_self.setState({
						legendValue: dataItem ? dataItem.dataContext : ""
					})
				});
			});

			categoryAxis.events.on("startchanged", scrollbarChanged);
			categoryAxis.events.on("endchanged", scrollbarChanged);

			function scrollbarChanged(event) {
				clearTimeout(startTimer);
				let axis = event.target;
				let start = Math.floor(dataObject.chartData.length * axis.start);
				let end = Math.ceil(dataObject.chartData.length * axis.end);
				let state = {
					start,
					end,
				}
				startTimer = setTimeout(() => {
					if (_self.checkPrevState(state)) {
						_self.setState({ ...state }, () => {
							_self.multiaxisChart.data = _self.getComponentChartData(dataObject.chartData);
						})
					}
				}, 500)
			}
		}

		this.multiaxisChart.events.on("ready", function (ev) {
			_self.setState({
				legendValue: ""
			})
		});

		this.multiaxisChart.cursor.events.on("hidden", function (ev) {
			_self.setState({
				legendValue: ""
			})
		});


		let axes = [];
		dataObject.attributes.map(attr => {
			let temp = { ...attr }
			temp.name = temp.name.split('__')[0]
			if (!axes.some(axis => axis.name.split('__')[0] === temp.name))
				axes.push(temp)
			return attr;
		})

		for (let i = 0; i < axes.length; i++) {
			this.createAxis(axes[i].name, i % 2 != 0, this.colorsArray[i], this.multiaxisChart);
		}

		for (let i = 0; i < dataObject.attributes.length; i++) {
			let index = axes.findIndex(val => val.name == dataObject.attributes[i].name.split('__')[0])
			this.createSeries(dataObject.attributes[i].name, dataObject.attributes[i].name, index, this.multiaxisChart);
		}
		this.multiaxisChart.scrollbarX = new am4core.Scrollbar();
		this.multiaxisChart.scrollbarX.marginBottom = 20
		this.multiaxisChart.data = this.props.isDateAxis ? dataObject.chartData : this.getComponentChartData(dataObject.chartData)
	}

	checkPrevState = (state) => {
		return Object.keys(state).some(stateInstance => cloneDeep(state[stateInstance]) != cloneDeep(this.state[stateInstance]));
	}

	isLegendClicked = event => {
		let id = event.target.id
		let name = event.target.name
		if (id !== "") {
			let oriData = JSON.parse(JSON.stringify(this.props.data))
			let data = JSON.parse(JSON.stringify(this.state.data))
			let checkedLegends = this.state.checkedLegends
			data.chartData = data.chartData.map((val, index) => {
				if (name === "history") {
					if (checkedLegends.includes(`${id}_history_visible`)) {
						val[id] = undefined
						val[`${id}__color`] = ""
					}

					else {
						val[id] = oriData.chartData[index][id]
						val[`${id}__color`] = oriData.chartData[index][`${id}__color`]
					}
				}
				else {
					if (checkedLegends.includes(`${id}_analyst_visible`)) {
						val[id] = undefined
						val[`${id}__color`] = ""
					}

					else {
						val[id] = oriData.chartData[index][id]
						val[`${id}__color`] = oriData.chartData[index][`${id}__color`]
					}
				}
				return val
			})
			if (name === "history") {

				if (checkedLegends.includes(`${id}_history_visible`)) {
					checkedLegends.splice(checkedLegends.indexOf(`${id}_history_visible`), 1)
				}
				else {
					checkedLegends.push(`${id}_history_visible`)
				}
			}
			else {

				if (checkedLegends.includes(`${id}_analyst_visible`)) {
					checkedLegends.splice(checkedLegends.indexOf(`${id}_analyst_visible`), 1)
				}
				else {
					checkedLegends.push(`${id}_analyst_visible`)
				}
			}
			this.setState({
				data,
				checkedLegends
			}, () => {
				this.multiaxisChart.data = this.getComponentChartData(data.chartData);
			})
		}
	}

	legendTitle = (title) => {
		let data = JSON.parse(JSON.stringify(this.state.data))
		let unit = data.units[title.split('__')[0]]
		if (title.split('__')[1]) {
			if (moment(Number(title.split('__')[1])).isValid()) {
				title = title.split('__')[0] + `${unit ? " (" + unit + ")" : ""}` + " (" + moment(parseInt(title.split('__')[1])).format("DD MMM YYYY HH:mm") + ")"
			}
			else
				title = title.split('__')[0] + `${unit ? " (" + unit + ")" : ""}` + " (" + title.split('__')[1] + ")"
		}
		else {
			if (unit)
				title = title + " (" + unit + ")";
		}
		return capitalizeFirstLetter(title)
	}

	axisLegendColorHandler = requiredAttr => {
		let colorvalue = (requiredAttr.ranges[requiredAttr.ranges.length - 1] + requiredAttr.ranges[0]) / 2
		let colorCode = requiredAttr && requiredAttr.colors.find(color => (colorvalue > color.min) && (colorvalue <= color.max)).color
		colorCode = colorCode.replace("{}", 1)
		this.colorsArray.push(colorCode)
	}

	createSeries = (field, name, index, chart) => {
		var _self = this
		var series = chart.series.push(new am4charts.LineSeries());
		series.dataFields.valueY = field;
		series.dataFields[this.props.isDateAxis ? 'dateX' : 'categoryX'] = this.props.categoryField
		series.strokeWidth = 2;
		series.yAxis = chart.yAxes.getIndex(index);
		series.name = name;
		series.showOnInit = true;

		series.propertyFields.stroke = name + "__color";

		series.segments.template.interactionsEnabled = true;
		series.segments.template.events.on("hit", function (ev) {
			if (!ev.target.dataItem.isDisabled && _self.props.clickable) {
				var item = ev.target.dataItem.component.tooltipDataItem.dataContext;
				var index = ev.target.dataItem.component.tooltipDataItem.index;
				_self.props.onClick(index, item)
			}
		});

		var bullet = series.bullets.push(new am4charts.Bullet());
		var image = bullet.createChild(am4core.Image);
		image.propertyFields.href = "customBullet";
		image.width = 20;
		image.height = 20;
		image.horizontalCenter = "middle";
		image.verticalCenter = "middle";
		image.interactionsEnabled = true;
		bullet.events.on("hit", function (ev) {
			if (!ev.target.dataItem.isDisabled && _self.props.clickable) {
				var item = ev.target.dataItem.component.tooltipDataItem.dataContext;
				var index = ev.target.dataItem.component.tooltipDataItem.index;
				_self.props.onClick(index, item)
			}
		});
	}

	createAxis = (name, opposite, color, chart) => {
		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.id = name
		if (chart.yAxes.indexOf(valueAxis) != 0) {
			valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
		}

		valueAxis.renderer.line.strokeOpacity = 1;
		valueAxis.renderer.line.strokeWidth = 2;
		valueAxis.renderer.line.stroke = color;
		valueAxis.renderer.labels.template.fill = color;
		valueAxis.renderer.opposite = opposite;
		valueAxis.renderer.grid.template.disabled = true;
		valueAxis.renderer.labels.template.disabled = true;
		valueAxis.cursorTooltipEnabled = false;

		function createGrid(labelObject) {
			valueAxis.min = requiredAttr.ranges[0];
			valueAxis.max = requiredAttr.ranges[requiredAttr.ranges.length - 1];
			var range = valueAxis.axisRanges.create();
			range.value = labelObject.value;
			range.label.text = labelObject.label ? labelObject.label.toString() : "";
			range.label.fill = labelObject.color;
		}
		let requiredAttr = this.props.attributes.find(attr => attr.name === name)
		for (let i = 0; i < requiredAttr.labels.length; i++) {
			createGrid(requiredAttr.labels[i]);
		}
	}

	getComponentChartData(data) {
		let filteredData = []
		let start = this.state.start ? this.state.start : 0;
		let end = this.state.end && this.state.end < data.length - 1 ? this.state.end : data.length - 1;
		let originalSkipper = Math.ceil(data.length / 200) ? Math.ceil(data.length / 200) : 1;
		let skipper = Math.ceil(Math.abs(end - start) / 200) ? Math.ceil(Math.abs(end - start) / 200) : 1;
		for (let i = 0; i < data.length; i += ((start <= i && i <= end) ? skipper : originalSkipper)) {
			filteredData.push(data[i])
		}
		return filteredData;
	}

	render() {
		return (
			this.state.data && this.state.data.chartData.length > 0 ?
				<React.Fragment>
					<div className="graphBox" style={{ height: this.props.height || 300 }} id={this.props.id} />
					<ul className="attributeFilterBox">
						{this.state.data && this.state.data.attributes.map((legend, index) => {
							if (index < 4) {
								return <li className="pipelineAttribute" key={index} >
									<label className="attributeLabel">
										<input className="formControl" name={legend.id} checked={legend.id === "history" ? this.state.checkedLegends.includes(`${legend.name}_history_visible`) : this.state.checkedLegends.includes(`${legend.name}_analyst_visible`)} type="checkbox" onChange={this.isLegendClicked} id={legend.name} required />
										<span className="attributeLabelText">{`${this.legendTitle(legend.name)} ${this.state.legendValue && Object.keys(this.state.legendValue).indexOf(legend.name) != -1 ? this.state.legendValue && ((this.state.legendValue[legend.name] == 0 || this.state.legendValue[legend.name] != null || this.state.legendValue[legend.name]) && this.state.legendValue[legend.name].toString()) ? this.state.legendValue[legend.name] : "" : ""}`}</span>
										<span className="checkmark" style={{ backgroundColor: this.colorsArray[index], borderColor: this.colorsArray[index] }}>
										</span>
									</label>
								</li>
							}
						}
						)}

						{this.state.data.attributes.length > 4 ? <li className="pipelineAttribute">
							<div className="dropdown legendsDropdown">
								<button className="btn btn-transparent btn-toggle" data-toggle="dropdown">
									<i className="fa fa-angle-double-right"></i>
								</button>
								<div className="dropdown-menu animated fadeIn">
									<ul className="attributeFilterBox">
										{this.state.data.attributes.map((legend, index) => {
											if (index >= 4) {
												return <li className="pipelineAttribute" key={index} >
													<label className="attributeLabel">
														<input className="formControl" name={legend.id} checked={legend.id === "history" ? this.state.checkedLegends.includes(`${legend.name}_history_visible`) : this.state.checkedLegends.includes(`${legend.name}_analyst_visible`)} type="checkbox" onChange={this.isLegendClicked} id={legend.name} required />
														<span className="attributeLabelText">{`${this.legendTitle(legend.name)} ${this.state.legendValue && Object.keys(this.state.legendValue).indexOf(legend.name) != -1 ? this.state.legendValue && ((this.state.legendValue[legend.name] == 0 || this.state.legendValue[legend.name] != null || this.state.legendValue[legend.name]) && this.state.legendValue[legend.name].toString()) ? this.state.legendValue[legend.name] : "" : ""}`}</span>
														<span className="checkmark" style={{ backgroundColor: this.colorsArray[index], borderColor: this.colorsArray[index] }}>
														</span>
													</label>
												</li>
											}
										}
										)}
									</ul>
								</div>
							</div>
						</li> : null}
					</ul>
				</React.Fragment>
				:
				<NoDataFound noDataCommonMsg={false} skeleton="skeletonAnalystCharts" mode="middleView" dataName="data" dataImg="lineChart" />

		)
	}
}

HistoryChart.propTypes = {};

export default HistoryChart;
