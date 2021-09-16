/**
 *
 * AddOrEditAgent
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  getAgentSuccess,
  getAgentFailure,
  getAgentDataSuccess,
  getAgentDataFailure
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import { createAgent, getAgentDetails } from "./actions";
import MessageModal from "../../components/MessageModal/Loadable";
import commonMessages from "../../messages"
import SkeletonLoader from "../../components/SkeletonLoader"
import csv from 'csv'
import { Parser } from 'json2csv';
import { cloneDeep } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditAgent extends React.Component {
  state = {
    isLoading: false,
    isOpen: false,
    payload: {
      name: "",
      deviceTag: "",
      type: "dcsagent",
      active: false,
      modbusPort: "",
      modbusMap: "",
      modbusFileName: ""
    },
    sampleCsvData: [
      {
        ModbusGroup: "Coils",
        PrimaryUse: "STS Alarm State Input",
        Description: "STS Circuit Alarm State - breaker trip",
        Tag: "YI-EHT-1-TRP",
        AbsoluteAddress: "1",
        Type: "alarm present",
        MinMeasurement: "0",
        MaxMeasurement: "1",
        Comment: "n = index of STS circuit. 0 = No alarms, 1 = Alarm present",
        Width: "16",
      }
    ]
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({
        isLoading: true
      }, () => this.props.getAgentDetails(this.props.match.params.id));
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.agentDataSuccess && nextprops.agentDataSuccess !== this.props.agentDataSuccess) {
      let payload = nextprops.agentDataSuccess.rps
      payload.type = payload.type.toLowerCase();
      this.setState({
        payload,
        isLoading: false
      });
    }

    ['agentDataFailure', 'agentFailure'].map(val => {
      this.errorSetStateHandler(nextprops[val], this.props[val]);
    })

    if (nextprops.agentSuccess && nextprops.agentSuccess !== this.props.agentSuccess) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: this.props.match.params.id ?
          <FormattedMessage {...messages.agentUpdateMessage} children={(message => message)} /> :
          <FormattedMessage {...messages.agentCreateMessage} children={(message => message)} />,
        type: "success",
        modalSuccess: "success"
      });
    }
  }

  errorSetStateHandler(nextError, currentError) {
    if (nextError && nextError !== currentError) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: nextError,
        type: "error"
      });
    }
  }

  inputChangeHandler = event => {
    let payload = cloneDeep(this.state.payload);
    if (event.target.id === "modbusPort" && event.target.value) {
      payload[event.target.id] = parseInt(event.target.value);
    } else {
      payload[event.target.id] = event.target.value;
    }
    if (event.target.id === "active") {
      payload[event.target.id] = event.target.checked;
    }
    if (event.target.id === "type" && event.target.value === "apsensingdtspoller") {
      payload.APSensingDTSPoller = {
        ipAddress: "",
        port: 5025,
        instrumentIdentificationString: "",
        location: "",
        instrumentSetting: 1,
        pollingInterval: 300,
        secretKey: "",
        dtsPollType: "temp",
      }
    } else if (event.target.id === "type" && event.target.value === "dcsagent") {
      delete payload.APSensingDTSPoller;
    }
    this.setState({
      payload
    });
  }

  onSubmitHandler = event => {
    event.preventDefault();
    let payload = cloneDeep(this.state.payload);
    if (payload.type === "dcsagent" && payload.modbusMap === "") {
      this.setState({
        isModbusMapRequired: true,
        incorrectfileError: false
      });
    } else {
      if (payload.type === "apsensingdtspoller") {
        payload.type = "APSensingDTSPoller"
        delete payload.modbusMap;
        delete payload.modbusFileName;
        delete payload.modbusPort;
      }
      else {
        payload.type = "DCSAgent"
      }
      this.setState({ isLoading: true });
      this.props.createAgent(payload);
    }
  }

  onDrop(files) {
    let payload = cloneDeep(this.state.payload)
    if (files.length > 0) {
      let file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        csv.parse(reader.result, (err, data) => {
          payload["modbusMap"] = this.getDCSUnitList(data)
        });
      }
      payload["modbusFileName"] = file.name;
      this.setState({
        payload,
        isModbusMapRequired: false,
        incorrectfileError: false
      });

      reader.readAsBinaryString(file);
    }
    else {
      payload["modbusFileName"] = "";
      payload["modbusMap"] = "";
      this.setState({
        payload,
        incorrectfileError: true,
        isModbusMapRequired: false
      })
    }
  }

  getDCSUnitList(data) {
    data[0] = data[0].map(val => val.charAt(0).toUpperCase() + val.slice(1))
    let dcsUnitList = [];

    for (let row = 1; row < data.length; row++) {
      const dcsUnit = {}
      for (let column = 0; column < data[row].length; column++) {
        dcsUnit[data[0][column]] = data[row][column];
      }
      dcsUnitList.push(dcsUnit)
    }
    return dcsUnitList;
  }

  downloadCsv = content => {
    const parser = new Parser();
    const csvData = parser.parse(content);
    var data = "text/csv;charset=utf-8," + encodeURIComponent(csvData);
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = "ModbusMapSample.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: ""
    });
    if (this.state.modalSuccess === "success") {
      this.props.history.push("/manageAgents");
    }
  };

  nameChangeHandler = event => {
    let payload = cloneDeep(this.state.payload);
    switch (event.target.id) {
        case "instrumentSetting":
        case "pollingInterval":
        case "port":
            payload.APSensingDTSPoller[event.target.id] = parseInt(event.target.value) 
            break;
        default:
            payload.APSensingDTSPoller[event.target.id] = event.target.value
    }
    this.setState({
      payload
    })
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title> AddOrEditAgent </title>
          <meta name="description" content="Description of AddOrEditAgent" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push("/manageAgents"); }}>
                <button type="button" className="btn btn-transparent" >
                  <i className="far fa-long-arrow-left" />
                </button>
                <FormattedMessage {...commonMessages.manageAgents} children={(message => message)} />
              </span>
            </p>
            <h5>
              {this.props.match.params.id ?
                <FormattedMessage {...messages.headingEdit} children={(message => message)} /> :
                <FormattedMessage {...messages.headingAdd} children={(message => message)} />}
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center" />
        </div>

        {this.state.isLoading ?
          <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" />
          :
          <React.Fragment>
            <form className="contentForm" onSubmit={this.onSubmitHandler}>
              <h5 className="formHeader">
                {this.props.match.params.id ?
                  <FormattedMessage {...messages.headingEdit} children={(message => message)} /> :
                  <FormattedMessage {...messages.headingAdd} children={(message => message)} />}
                <div className="headerItemRight">
                  <div className="switchButtonLabel">
                    <label className="switchLabelText"><FormattedMessage {...messages.agentStatus} children={(message => message)} /> :</label>
                    <label className="switchLabel">
                      <input
                        type="checkbox"
                        id="active"
                        checked={this.state.payload.active}
                        onChange={this.inputChangeHandler}
                      />
                      <span className="switchMark"></span>
                    </label>
                  </div>
                </div>
              </h5>

              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...commonMessages.name} children={(message => message)} />
                  <sup className="mr-r-7">
                    <i className="fas fa-asterisk" />
                  </sup>
                  :
                  </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={this.inputChangeHandler}
                  value={this.state.payload.name}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...messages.devicetag} children={(message => message)} />
                  <sup className="mr-r-7">
                    <i className="fas fa-asterisk" />
                  </sup>
                  :
                  </label>
                <input
                  type="text"
                  className="form-control"
                  id="deviceTag"
                  onChange={this.inputChangeHandler}
                  value={this.state.payload.deviceTag}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...commonMessages.type} children={(message => message)} />
                  <sup className="mr-r-7">
                    <i className="fas fa-asterisk" />
                  </sup>
                  :
                  </label>
                <select
                  id="type"
                  className="form-control"
                  value={this.state.payload.type}
                  disabled={this.props.match.params.id ? true : false}
                  onChange={this.inputChangeHandler}
                  required
                >
                  <FormattedMessage {...messages.option1} children={(message => <option value="apsensingdtspoller">{message}</option>)} />
                  <FormattedMessage {...messages.option2} children={(message => <option value="dcsagent">{message}</option>)} />
                </select>
              </div>
              {this.state.payload.type === "dcsagent" && <React.Fragment>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.modbusPort} children={(message => message)} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                    </label>
                  <input
                    type="number"
                    className="form-control"
                    id="modbusPort"
                    min="1"
                    max="65535"
                    onChange={this.inputChangeHandler}
                    value={this.state.payload.modbusPort}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.addModbusMap} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="fx-b80">
                    <div className="dropZoneOuterBox pd-r-0 mr-0 w-100">
                      <Dropzone accept=".csv" className="dropZoneBox" multiple={false} onDrop={this.onDrop.bind(this)}>
                        <div className="dropZoneBoxContent">
                          <img src={require("../../assets/images/file.png")} />
                          <p> {this.state["payload"]["modbusFileName"] ?
                            this.state["payload"]["modbusFileName"] :
                            <FormattedMessage {...commonMessages.dropzonemsg} />
                          }</p>
                        </div>
                      </Dropzone>
                    </div>
                    {this.state.isModbusMapRequired && <p className="modBusErrorMsg">
                      <FormattedMessage {...messages.modbusMapErrorMsg} children={(message => message)} />
                    </p>}
                    {this.state.incorrectfileError && <p className="modBusErrorMsg">
                      <FormattedMessage {...messages.incorrectfileErrorMsg} children={(message => message)} />
                    </p>}
                    <button
                      type="button"
                      className="btn-transparent text-cyan mr-t-8 pd-0"
                      onClick={() => this.downloadCsv(this.state.sampleCsvData)}
                    >
                      <FormattedMessage {...commonMessages.downloadSample} children={(message => message)} />
                      <i className="far fa-download mr-l-8" />
                    </button>
                  </div>
                </div>
              </React.Fragment>}
              {this.state.payload.type === "apsensingdtspoller" && <React.Fragment>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.ipAddress} children={(message => message)} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                    </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.nameChangeHandler}
                    id="ipAddress"
                    value={this.state.payload.APSensingDTSPoller.ipAddress}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.port} children={(message => message)} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                    </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.nameChangeHandler}
                    id="port"
                    min='1'
                    max='65535'
                    value={this.state.payload.APSensingDTSPoller.port}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.instrumentSetting} children={(message => message)} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                    </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.nameChangeHandler}
                    id="instrumentSetting"
                    min='1'
                    max='65535'
                    value={this.state.payload.APSensingDTSPoller.instrumentSetting}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.pollingInterval} children={(message => message)} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                    </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.nameChangeHandler}
                    id="pollingInterval"
                    min='1'
                    max='65535'
                    value={this.state.payload.APSensingDTSPoller.pollingInterval}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.secretKey} children={(message => message)} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                    </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.nameChangeHandler}
                    id="secretKey"
                    value={this.state.payload.APSensingDTSPoller.secretKey}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.dtsPollType} children={(message => message)} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                    </label>
                  <select
                    type="text"
                    className="form-control"
                    onChange={this.nameChangeHandler}
                    id="dtsPollType"
                    value={this.state.payload.APSensingDTSPoller.dtsPollType}
                    required
                  >
                      <option value="temp"> Temperature </option>
                      <option value="loss"> Fiber Attenuation </option>
                  </select>
                </div>
              </React.Fragment>}
              <div className="form-group justify-content-end mt-3">
                <button id="saveAgent" className="btn btn-danger">
                  <i className="far fa-check-circle" />
                  {this.props.match.params.id ? <FormattedMessage {...commonMessages.update} children={(message => message)} /> : <FormattedMessage {...commonMessages.save} children={(message => message)} />}
                </button>
              </div>
            </form>
          </React.Fragment>
        }
        {
          this.state.isOpen ? (
            <MessageModal
              type={this.state.type}
              message={this.state.message}
              onClose={this.modalCloseHandler}
            />
          ) : null
        }
      </div >
    );
  }
}

AddOrEditAgent.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  agentSuccess: getAgentSuccess(),
  agentFailure: getAgentFailure(),
  agentDataSuccess: getAgentDataSuccess(),
  agentDataFailure: getAgentDataFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createAgent: payload => dispatch(createAgent(payload)),
    getAgentDetails: (id) => dispatch(getAgentDetails(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditAgent", reducer });
const withSaga = injectSaga({ key: "addOrEditAgent", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AddOrEditAgent);
