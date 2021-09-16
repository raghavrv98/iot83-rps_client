/**
 *
 * DetailedView
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
import { cloneDeep } from 'lodash';
import * as inRange from 'lodash/inRange';
let componentChart = undefined;
var startTimer = undefined
var endTimer = undefined
import { capitalizeFirstLetter } from '../../utils/commonUtils';
import NoDataFound from '../../components/NoDataFound';
import SkeletonLoader from '../../components/SkeletonLoader';

am4core.addLicense("CH145187641");
/* eslint-disable react/prefer-stateless-function */
class DetailedView extends React.Component {

  state = {
    checkedLegends: this.props.checkedLegends,
    axisStart: undefined,
    axisEnd: undefined,
    start: undefined,
    end: undefined,
    xAxisValue: this.props.xAxisValue,
    yAxisValue: this.props.yAxisValue,
    isInversed: this.props.isInversed,
    isPipelineDetailFetching: this.props.isPipelineDetailFetching
  }

  componentWillReceiveProps(nextprops) {

    if (nextprops.data && nextprops.data.chartData !== (this.props.data && this.props.data.chartData)) {
      this.setState({
        chartData: nextprops.data.chartData,
      }, () => this.props.data.chartData.length > 0 && this.getComponentConfig('pipeLine'))
    }

    if (nextprops.checkedLegends !== this.props.checkedLegends) {
      this.setState({
        checkedLegends: nextprops.checkedLegends,
      }, () => {
        if (this.props.data.chartData.length > 0) {
          componentChart.data = this.getComponentChartData(this.state.chartData)
        }
      }
      )
    }

    if (nextprops.xAxisValue !== this.props.xAxisValue || nextprops.yAxisValue !== this.props.yAxisValue || nextprops.isInversed !== this.props.isInversed || nextprops.isPipelineDetailFetching !== this.props.isPipelineDetailFetching) {
      this.setState({
        xAxisValue: nextprops.xAxisValue,
        yAxisValue: nextprops.yAxisValue,
        isInversed: nextprops.isInversed,
        isPipelineDetailFetching: nextprops.isPipelineDetailFetching
      }, () => this.props.data.chartData.length > 0 && !nextprops.isPipelineDetailFetching && this.getComponentConfig('pipeLine'))
    }

  }

  getComponentChartData = (data) => {
    let checkedLegends = cloneDeep(this.state.checkedLegends)
    let alarms = cloneDeep(this.props.data.alarms)
    let filteredData = []
    let start = this.state.start ? this.state.start : 0;
    let end = this.state.end && this.state.end < data.length - 1 ? this.state.end : data.length - 1;
    let originalSkipper = Math.ceil(data.length / 200);
    let skipper = Math.ceil(Math.abs(end - start) / 200);
    for (let i = 0; i < data.length; i += (((start <= i || start <= i + originalSkipper) && i <= end) ? skipper : originalSkipper)) {
      data[i].isBulletDisplayed = false;
      data[i].bullet = "";
      if (data[i].component && checkedLegends.includes(data[i].component.name)) {
        data[i].type = "component"
        data[i].name = data[i].component.name
        data[i].dy = data[i].component.dy
        data[i].imgUrl = data[i].component.img
        data[i].isBulletDisplayed = true;
        data[i].bullet = window.API_URL + data[i].imgUrl
      } else if (data[i].landmark && checkedLegends.includes("landmark")) {
        data[i].type = "landmark"
        data[i].name = data[i].landmark.names[0]
        data[i].dy = data[i].landmark.dy
        data[i].imgUrl = data[i].landmark.img
        data[i].isBulletDisplayed = true;
        data[i].bullet = window.API_URL + data[i].imgUrl
      } else if (data[i].scada && checkedLegends.includes("scadaSensor")) {
        data[i].type = "scadaSensor"
        data[i].name = data[i].scada.sensors[0].name
        data[i].dy = data[i].scada.dy
        data[i].imgUrl = data[i].scada.img
        data[i].isBulletDisplayed = true;
        data[i].bullet = window.API_URL + data[i].imgUrl
      }
      data[i].distance = Math.round(data[i].distance);
      data[i].index = filteredData.length;
      filteredData.push(data[i])
    }

    if (filteredData.some(val => val.distance != data[data.length - 1].distance)) {
      data[data.length - 1].isBulletDisplayed = false;
      data[data.length - 1].bullet = "";
      if (data[data.length - 1].component && checkedLegends.includes(data[data.length - 1].component.name)) {
        data[data.length - 1].isBulletDisplayed = true;
        data[data.length - 1].bullet = window.API_URL + data[data.length - 1].imgUrl
      }
      filteredData.push(data[data.length - 1])
    }

    if (data.length > 0) {
      // let wpu = this.props.data.wpu;
      let startDistance = data[start] ? data[start].distance : 0
      let endDistance = data[end] ? data[end].distance : 0
      // let startPipe = data[0].distance

      alarms = alarms.map(alarm => {

        if (checkedLegends.includes(alarm.type + alarm.category)) {
          let temp = cloneDeep(alarm);
          if (temp.distance < startDistance && temp.end > startDistance) {
            temp.distance = startDistance + ((temp.end < endDistance ? temp.end : endDistance) - startDistance) / 2
          }
          if (temp.distance > endDistance && temp.start < endDistance) {
            temp.distance = endDistance - (endDistance - (temp.start > startDistance ? temp.start : startDistance)) / 2
          }
          if (inRange(temp.start, startDistance, endDistance+1) || inRange(temp.distance, startDistance, endDistance+1)
              || inRange(temp.end, startDistance, endDistance+1)) {
            let alarmDistance = temp.distance;
            // let index = Math.floor((startDistance - startPipe) / (originalSkipper * wpu) + (alarmDistance - startDistance) / (skipper * wpu))
            let index = filteredData.findIndex(val => (val.distance === alarmDistance) || (val.distance > alarmDistance))
            index = index >= filteredData.length ? filteredData.length - 1 : index
            filteredData[index].type = alarm.type
            filteredData[index].category = alarm.category
            filteredData[index].name = alarm.name
            filteredData[index].dy = alarm.dy
            filteredData[index].imgUrl = alarm.img
            filteredData[index].isBulletDisplayed = true;
            filteredData[index].bullet = window.API_URL + filteredData[index].imgUrl
          }
        }
        return alarm;
      })
    }
    return filteredData;
  }

  getComponentConfig(id) {
    let _self = this
    var hoveredName = undefined;
    var hoveredType = undefined;
    var hoveredDistance = undefined;
    componentChart = am4core.createFromConfig({
      "type": "XYChart",
      "container": id,
      "width": "100%",
      "height": "97%",
      "xAxes": [{
        "keepSelection": true,
        "type": 'ValueAxis',
        "strictMinMax": true,
        "min": _self.state.chartData[0][_self.state.xAxisValue],
        "max": _self.state.chartData[_self.state.chartData.length - 1][_self.state.xAxisValue],
        "cursorTooltipEnabled": false,
        "title": {
          "text": _self.state.xAxisValue === "x" ? "East" : "Distance",
          "fontWeight": 600,
          "fill": '#c4262e',
          "tooltipText": _self.state.xAxisValue === "x" ? "Distance East from plant datum" : "Linear distance along pipe",
          "tooltipY": -40
        },
        "dataFields": {
          "category": "distance"
        },
        "fontSize": "12px",
        renderer: {
          "inversed": _self.state.isInversed,
          grid: {
            strokeOpacity: 0,
          },
          "labels": {
            "adapter": [{
              key: "text",
              "callback": function (label, target, key) {
                return label + " " + _self.props.data.units.distance;
              }
            }]
          }
        },
      }],
      "cursor": {
        "behavior": "zoomXY",
        "lineX": {
          "disabled": true,
        },
        "lineY": {
          "disabled": true,
        },
      },
      "scrollbarX": {
        "marginBottom": 20
      },
      "scrollbarY": undefined,
      "series": [{
        "type": "LineSeries",
        "strokeWidth": 8,
        "id": "series1",
        "name": "Segment",
        "segments": {
          "template": {
            "events": {
              "hit": function (ev) {
                _self.setState({
                  isAlarmDataFetching: true,
                  alarmData: false,
                  clickedComponentType: hoveredType,
                  clickedComponentName: hoveredName,
                  isTimeView: false,
                  lastCursorPosition: "",
                  lastCursorPositionReset: ""
                })
                let val = hoveredDistance.toString()
                _self.props.onClickHandler(val)
              }
            },
            "interactionsEnabled": true
          }
        },
        "tooltip": {
          "getFillFromObject": false,
          "background": {
            "fill": '#000',
            "filters": [
              {
                "opacity": 2,
              },
            ],
          },
          "label": {
            "interactionsEnabled": true,
            "fill": '#fff',
          },
        },
        "bullets": [
          {
            "type": "Bullet",
            "children": [{
              "type": "Image",
              "propertyFields": {
                "href": "bullet",
                "dy": "dy",
              },
              "width": 15,
              "height": 20,
              "horizontalCenter": "middle",
              "verticalCenter": "middle",
              "interactionsEnabled": true,
              "events": {
                "hit": function (ev) {
                  let val = hoveredDistance.toString()
                  if (hoveredType != "landmark") {
                    _self.setState({
                      isAlarmDataFetching: true,
                      alarmData: false,
                      clickedComponentType: hoveredType,
                      clickedComponentName: hoveredName,
                      lastCursorPosition: "",
                      isTimeView: false,
                      lastCursorPositionReset: ""
                    })
                    _self.props.onClickHandler(val)
                  }
                }
              }
            }],
          },
        ],
        "slices": {
          "cursorOverStyle": "pointer"
        },
        "propertyFields": {
          "stroke": "color",
        },
        "dataFields": {
          "valueY": _self.state.yAxisValue,
          "valueX": _self.state.xAxisValue,
          "dataIndex": "index"
        },

      }],
      "yAxes": [{
        "type": "ValueAxis",
        "fontSize": "12px",
        "extraMax": 0.2,
        "cursorTooltipEnabled": false,
        "title": {
          "text": _self.state.xAxisValue === "x" ? "North" : "Elevation",
          "fontWeight": 600,
          "fill": '#c4262e',
          "tooltipText": _self.state.xAxisValue === "x" ? "Distance North from plant datum" : "Elevation from plant datum",
          "tooltipY": _self.state.xAxisValue === "x" ? "270" : "230"
        },
        renderer: {
          "inversed": _self.state.isInversed,
          grid: {
            strokeOpacity: 0,
          },
          "labels": {
            "adapter": [{
              key: "text",
              "callback": function (label, target, key) {
                return label + " " + _self.props.data.units.distance;
              }
            }]
          }
        },
      }],
      "data": _self.getComponentChartData(cloneDeep(_self.state.chartData))
    });
    function scrollbarChanged(target) {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
      let state = {
        start: Math.floor(target.start * _self.state.chartData.length),
        end: Math.ceil(target.end * _self.state.chartData.length),
        axisStart: target.start,
        axisEnd: target.end
      }

      if (_self.checkPrevState(state)) {
        _self.setState(cloneDeep(state), () => {
          componentChart.data = _self.getComponentChartData(_self.state.chartData);
        })
      }
    }

    componentChart.cursor.events.on("hidden", (ev) => {
      hoveredName = undefined;
      hoveredType = undefined;
      hoveredDistance = undefined;
      this.refs.onHover.innerHTML = ""
    });

    componentChart.cursor.events.on("ready", (ev) => {
      hoveredName = undefined;
      hoveredType = undefined;
      hoveredDistance = undefined;
      this.refs.onHover.innerHTML = ""
    });

    var xAxes = componentChart.xAxes.getIndex(0);
    if (_self.state.axisStart) {
      xAxes.start = _self.state.axisStart
    }

    if (_self.state.axisEnd) {
      xAxes.end = _self.state.axisEnd
    }

    xAxes.events.on("startchanged", (ev) => {
      clearTimeout(startTimer)
      startTimer = setTimeout(() => {
        scrollbarChanged(ev.target)
      }, 500)
    });
    xAxes.events.on("endchanged", (ev) => {
      clearTimeout(endTimer)
      endTimer = setTimeout(() => {
        scrollbarChanged(ev.target)
      }, 500)
    });

    // Set up cursor's events to update the label
    componentChart.cursor.events.on("cursorpositionchanged", (ev) => {
      var xAxis = ev.target.chart.xAxes.getIndex(0);
      let x = xAxis.positionToValue(xAxis.toAxisPosition(ev.target.xPosition));
      let idx = searchval(x);
      function searchval(x) {
        let center;
        let left = 0;
        let maxidx = componentChart.data.length - 1;
        let right = maxidx;

        // bisect data array 
        // bisect data array 
        // bisect data array 
        // worst-case performance: O(log2(n))
        while (left < right) {
          center = Math.floor((left + right) / 2);
          if (componentChart.data[center][_self.state.xAxisValue] < x) {
            left = center + 1;
          }
          else {
            right = center;
          }
        }

        // check which data point is closer to the cursor
        if (x > componentChart.data[center][_self.state.xAxisValue]) {
          if ((center < maxidx) && (x - componentChart.data[center][_self.state.xAxisValue]) > (componentChart.data[center + 1][_self.state.xAxisValue] - x)) {
            center = center + 1;
          }
        }

        if (x < componentChart.data[center][_self.state.xAxisValue]) {
          if ((center > 0) && (componentChart.data[center][_self.state.xAxisValue] - x) > (x - componentChart.data[center - 1][_self.state.xAxisValue])) {
            center = center - 1;
          }
        }
        return center;
      }
      hoveredName = componentChart.data[idx].name;
      hoveredType = componentChart.data[idx].type;
      hoveredDistance = componentChart.data[idx].distance;
      let xValue = componentChart.data[idx][_self.state.xAxisValue],
        yValue = componentChart.data[idx][_self.state.yAxisValue],
        attrValue = Object.entries(componentChart.data[idx]).filter(([key, value]) => key.includes(Object.entries(this.props.data.units)[1][0])),
        nameValue = componentChart.data[idx].isBulletDisplayed && componentChart.data[idx].name != "none" ? componentChart.data[idx].name : "NA";

      let html = `<p><strong>Name</strong>${nameValue}</p>
      <p><strong>${_self.state.xAxisValue === "x" ? 'East' : 'Distance'}</strong>${xValue == null ? "NA" : this.props.data.units.distance ? xValue + " " + this.props.data.units.distance : xValue}</p>
      <p><strong>${_self.state.xAxisValue === "x" ? 'North' : 'Elevation'}</strong>${yValue == null ? "NA" : this.props.data.units.distance ? yValue + " " + this.props.data.units.distance : yValue}</p>`

      attrValue.map(([key, value]) => {
        let attrValue = "NA"
        if (value !== null) {
          attrValue = value + " " + Object.entries(this.props.data.units)[1][1]
        }
        html = html + `<p><strong>${key}</strong>${attrValue}</p>`;
      })
      this.refs.onHover.innerHTML = html;

    });
  }

  checkPrevState = (state) => {
    return Object.keys(state).some(stateInstance => cloneDeep(state[stateInstance]) != cloneDeep(this.state[stateInstance]));
  }

  legendFilterChange = (event) => {
    let checkedLegends = cloneDeep(this.state.checkedLegends)
    if (event.target.checked) {
      checkedLegends.push(event.target.id);
    } else {
      checkedLegends = checkedLegends.filter(checkedLegend => checkedLegend != event.target.id);
    }
    this.setState({
      checkedLegends
    }, () => componentChart.data = this.getComponentChartData(this.state.chartData));
  }

  getImageTag(legend) {
    let availableURls = ['anchor', 'drain', 'instrument', 'flange', 'pullbox', 'support', 'valve', 'vent', 'weld', 'scadasensor', 'bend', 'elbow', 'fosplice', 'splice', 'landmark', 'alarmbell', 'alarm', 'warning', 'emergency', 'raisedalarm', 'raisedwarning', 'raisedemergency', 'acknowledgedalarm', 'acknowledgedwarning', 'acknowledgedemergency', 'addressedalarm', 'addressedwarning', 'addressedemergency']
    if (availableURls.includes(legend.toLowerCase().trim().replace(" ", ""))) {
      return <img src={window.API_URL + "api/public/static/components/" + legend.toLowerCase().trim().replace(" ", "") + ".png"} />;
    }
    else {
      return <img src={require('../../assets/images/question.png')} />;
    }
  }

  render() {
    return (
      <div className="card-body pipelineTopologyBox">
        {this.state.isPipelineDetailFetching ?
          <SkeletonLoader skeleton="skeletonDetailedView" mode="middleView" />
          : this.props.data && this.props.data.chartData.length > 0 ? <React.Fragment>
            <div className="profileDetailsHover" ref="onHover"></div> 111111
            <div id={this.props.id} className="detailViewGraph"></div> 222222

            <ul className="attributeFilterBox">
              {this.props.legends.map((legend, index) => {
                if (index < 8) {
                  return <li className="pipelineAttribute" key={index} >
                    <label className="attributeLabel">
                      <input className="formControl" checked={this.state.checkedLegends.includes(legend.item)} type="checkbox" onChange={this.legendFilterChange} name="roles" id={legend.item} required />
                      <span className="attributeLabelText">{capitalizeFirstLetter(legend.item)}</span>
                      <span className="checkmark">
                        {this.getImageTag(legend.item)}
                      </span>
                    </label>
                  </li>
                }
              }
              )}

              {this.props.legends.length > 8 ? <li className="pipelineAttribute">
                <div className="dropdown legendsDropdown">
                  <button className="btn btn-transparent btn-toggle" data-toggle="dropdown">
                    <i className="fa fa-angle-double-right"></i>
                  </button>
                  <div className="dropdown-menu animated fadeIn">
                    <ul className="attributeFilterBox">
                      {this.props.legends.map((legend, index) => {
                        if (index >= 8) {
                          return <li className="pipelineAttribute" key={index} >
                            <label className="attributeLabel">
                              <input className="formControl" checked={this.state.checkedLegends.includes(legend.item)} type="checkbox" onChange={this.legendFilterChange} name="roles" id={legend.item} required />
                              <span className="attributeLabelText">{capitalizeFirstLetter(legend.item)}</span>
                              <span className="checkmark">
                                {this.getImageTag(legend.item)}
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
          </React.Fragment> :
            <NoDataFound noDataCommonMsg={false} skeleton="skeletonDetailedView" mode="middleView" dataName="data" dataImg="pipeline-img" />
        }
      </div>
    );
  }
}

DetailedView.propTypes = {};

export default DetailedView;
