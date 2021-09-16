/**
 *
 * Amchart4Chart
 *
 */

import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.addLicense("CH145187641");

/* eslint-disable react/prefer-stateless-function */
class Amchart4Chart extends React.Component {

  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    am4core.createFromConfig(this.props.data)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.id !== this.props.id) {
      am4core.useTheme(am4themes_animated);
      am4core.createFromConfig(nextProps.data)
    }
  }
  
  render() {
    return <div id={this.props.id} style={{width: "100%", height: this.props.height}} onClick={this.props.onClick}></div>
  }
}

Amchart4Chart.propTypes = {};

export default Amchart4Chart;
