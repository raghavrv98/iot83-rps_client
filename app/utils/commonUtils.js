import axios from "axios";
import history from "./history";
import { push } from "react-router-redux";
import { put } from "redux-saga/effects";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { startsWith } from "lodash";
import { filter } from "@amcharts/amcharts4/.internal/core/utils/Iterator";
am4core.addLicense("CH145187641");

export function getHeaders() {
  return {
    headers: {
      "X-Authorization": `Bearer ${localStorage.token}`, // Need to get from store once Group done
      "Content-Type": "application/json",
      "X-TENANT-ID": localStorage.tenant
    }
  };
}


export function logoutHandler() {
  const config = getHeaders();
  axios
    .post(`${window.API_URL}api/v1/logout`, {}, config)
    .then(function (response) {
      clearLocalStorage();
    })
    .catch(function (error) {
      if (error.response.status == 401) {
        clearLocalStorage();
      } else if (error.response.status == 403) {
        history.push({ pathname: '/error403', state: { error: error.response.data.message ? error.response.data.message : error.response.data.error } })
      }
    });
}

export function bytesToSize(bytes) {
  let memorySize = ["Byte", "KB", "MB", "GB", "TB"]
  if (bytes == 0) {
    return '0 Byte';
  } else {
    const power = Math.floor(Math.log(bytes) / Math.log(1000));
    return (bytes / Math.pow(1000, power)).toFixed(2) + ' ' + memorySize[power];
  }
}

export function clearLocalStorage() {
  let url = localStorage.getItem('auth0URL') + 'logout?client_id=' + localStorage.getItem('client_id')
  let internalUser = localStorage.getItem('internalUser')
  localStorage.clear();
  if (internalUser == "true") {
    history.push("/login");
  }
  else {
    window.location.href = url
  }
}

export function* errorHandler(error, errorType) {
  if (error.response) {
    if (error.response.status === 401) {
      clearLocalStorage();
    } else if (error.response.status === 400) {
      yield put({
        type: errorType,
        error: error.response.data.message ? error.response.data.message : error.response.data.error
      })
    } else if (error.response.status === 403) {
      yield put(push({ pathname: '/error403', state: { error: error.response.data.message ? error.response.data.message : error.response.data.error } }));
    } else if (error.response.status === 404) {
      yield put(push("/error404"));
    } else {
      yield put({ type: errorType, error: error.response.data.message });
    }
  } else {
    yield put({ type: errorType, error: error.message ? error.message : error });
  }
}

export function reduceToK(value) {
  if (value == 0) {
    return '0';
  } else if (value > 999) {
    let updatedValue = value / 1000;
    return (updatedValue.toFixed(1) + 'k');
  }
  else {
    return value
  }
}

export function showInitials(name) {
  let nameChange = ""
  let wordCount = name.split(' ')
  if (wordCount.length > 1) {
    nameChange = wordCount[0].charAt(0) + wordCount[1].charAt(0)
    name = nameChange.toUpperCase()
  }
  else {
    nameChange = wordCount[0].charAt(0) + wordCount[0].charAt(1)
    name = nameChange.toUpperCase()
  }
  return name
}

export function getGaugeConfig(id, healthScore, gaugeConfig, badDTS, chartMin, chartMax) {
  var chart = am4core.create(id, am4charts.GaugeChart);
  chart.hiddenState.properties.opacity = 0;
  chart.fontSize = 11;
  chart.innerRadius = am4core.percent(80);
  chart.resizable = true;

  var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
  axis2.min = chartMin;
  axis2.max = chartMax;
  axis2.strictMinMax = true;
  axis2.renderer.labels.template.disabled = true;
  axis2.renderer.ticks.template.disabled = true;
  axis2.renderer.grid.template.disabled = false;
  axis2.renderer.grid.template.opacity = 0.5;
  axis2.renderer.labels.template.bent = true;
  axis2.renderer.labels.template.fill = am4core.color("#000");
  axis2.renderer.labels.template.fontWeight = "bold";
  axis2.renderer.labels.template.fillOpacity = 0.3;


  for (let grading of gaugeConfig) {
    var range = axis2.axisRanges.create();
    range.axisFill.fill = am4core.color(grading.color);
    range.axisFill.fillOpacity = 0.8;
    range.axisFill.zIndex = -1;
    range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
    range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
    range.grid.strokeOpacity = 0;
    range.stroke = am4core.color(grading.color).lighten(-0.1);
    range.label.location = 0.5;
    range.label.inside = true;
    range.label.radius = am4core.percent(10);
    range.label.paddingBottom = -5;
    range.label.fontSize = "0em";
  }

  var matchingGrade = lookUpGrade(healthScore, gaugeConfig);

  var label = chart.radarContainer.createChild(am4core.Label);
  label.isMeasured = false;
  label.fontSize = "1em";
  label.x = am4core.percent(50);
  label.paddingBottom = 5;
  label.horizontalCenter = "middle";
  label.verticalCenter = "bottom";
  label.fill = am4core.color(matchingGrade.color);

  var hand = chart.hands.push(new am4charts.ClockHand());
  hand.axis = axis2;
  hand.startWidth = 2;
  hand.value = healthScore;
  badDTS ? hand.stroke = am4core.color("#ff0000") : null
  badDTS ? hand.fill = am4core.color("#ff0000") : null
  hand.radius = am4core.percent(80);
  hand.pin.radius = 3;
  label.fontSize = 13;
  label.fontWeight = "bold"
  label.dy = 10
}

export function lookUpGrade(lookupScore, grades) {
  for (var i = 0; i < grades.length; i++) {
    if ((i == 0 && lookupScore < grades[i].lowScore) || (i == grades.length - 1 && lookupScore > grades[i].highScore))
      return grades[i]
    else if (
      grades[i].lowScore <= lookupScore &&
      grades[i].highScore >= lookupScore
    ) {
      return grades[i];
    }
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function startsWithNumber(row, value) {
  let slicedValue = row.slice(0, value.length)
  return slicedValue == value
}

export function filterCaseInsensitive(filter, row) {
  const id = filter.pivotId || filter.id;
  return (
    typeof (row[id]) == 'string' ?
      row[id].toLowerCase().startsWith(filter.value.toLowerCase()) : startsWithNumber(String(row[id]), String(filter.value))
  );
}