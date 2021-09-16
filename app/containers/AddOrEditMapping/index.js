/**
 *
 * AddOrEditMapping
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  plantsSuccess,
  plantsFailure,
  editSaveSuccess,
  editSaveFailure,
  fetchMappingDataSuccess,
  fetchMappingDataFailure,
  getAgentDetailsSuccess,
  getAgentDetailsFailure
} from "./selectors";
import MessageModal from "../../components/MessageModal/Loadable";
import {
  getPlantList,
  handelMapping,
  getmappingDetails,
  getAgentDetails
} from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from "../../messages";
import SkeletonLoader from "../../components/SkeletonLoader";
import { CSVReader } from 'react-papaparse';
import ReactTable from "react-table";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { Parser } from 'json2csv';
import NoDataFound from "../../components/NoDataFound";
import {cloneDeep} from 'lodash';

/* eslint-disable react/prefer
-stateless-function */
export class AddOrEditMapping extends React.Component {
  state = {
    fiberDataKeys: [
      "name",
      "startDistance",
      "samplingInterval",
      "spatialResolution",
      "pointOfReturn",
      "measurementTime",
      "intermediateTraceUpdateTime",
      "updateTime",
      "repeatMode",
      "componentIndex"
    ],
    error: {},
    plants: [],
    isFetching: true,
    options: [],
    preservePayload: "",
    tableData: [],
    tableHeaderData: [],
    deviceTag: "",
    payload: {
      actionName: "",
      plantId: "null",
      bindings: [
        {
          dataType: "JSON",
          data: "",
        }
      ]
    },
    editinline: false
  };

  componentWillMount() {
    this.props.getPlantList();
    this.props.getAgentDetails(this.props.match.params.agentId);
    if (this.props.match.params.mapId) {
      this.props.getmappingDetails(
        this.props.match.params.agentId,
        this.props.match.params.mapId
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.plantsListSuccess &&
      nextProps.plantsListSuccess !== this.props.plantsListSuccess
    ) {
      this.setState({
        isFetching: false,
        plants: nextProps.plantsListSuccess.result,
      });
    }
    if (
      nextProps.editSaveSuccess &&
      nextProps.editSaveSuccess !== this.props.editSaveSuccess
    ) {
      this.setState({
        isFetching: false,
        isOpen: true,
        message: nextProps.editSaveSuccess,
        type: "success",
        modalSuccess: "success",
      });
    }
    if (
      nextProps.fetchMappingDataSuccess &&
      nextProps.fetchMappingDataSuccess !== this.props.fetchMappingDataSuccess
    ) {
      let preservePayload = nextProps.fetchMappingDataSuccess;
      this.setState(
        {
          preservePayload,
          payload: nextProps.fetchMappingDataSuccess,
          isFetching: false
        }
      );
    }
    if (
      nextProps.getAgentDetailsSuccess &&
      nextProps.getAgentDetailsSuccess !== this.props.getAgentDetailsSuccess
    ) {
      this.setState({
        agentName: nextProps.getAgentDetailsSuccess.rps.name,
        agentType: nextProps.getAgentDetailsSuccess.rps.type,
        deviceTag: nextProps.getAgentDetailsSuccess.rps.deviceTag
      });
    }
    ['plantsListFailure', 'editSaveFailure', 'fetchMappingDataFailure', 'getAgentDetailsFailure'].map(val => {
      this.errorSetStateHandler(nextProps[val], this.props[val]);
    })
  }

  errorSetStateHandler(nextError, currentError) {
    if (nextError && nextError !== currentError) {
      this.setState({
        isFetching: false,
        isOpen: true,
        message: nextError,
        type: "error",
      });
    }
  }

  modalCloseHandler = () => {
    this.setState({
      isFetching: false,
      isOpen: false,
      message: "",
      type: ""
    });
    if (this.state.modalSuccess === "success") {
      this.props.history.push(`/mappingList/${this.props.match.params.agentId}`)
    }
  }

  bindingAddDeletdHandler = identity => {
    let payload = cloneDeep(this.state.payload);
    let preservePayload = cloneDeep(this.state.preservePayload);
    if (identity.target) {
      payload.bindings.push({
        dataType: "JSON",
        data: ""
      });
    } else {
      payload.bindings.splice(identity, 1);
      preservePayload.bindings && preservePayload.bindings.splice(identity, 1);
    }
    this.setState({
      payload,
      preservePayload
    });
  };

  nameChangeHandler = index => event => {
    let payload = cloneDeep(this.state.payload);
    let value = event.target.value ? event.target.value : "";
    let error = cloneDeep(this.state.error);
    if (index === "plantId") {
      payload.plantId = value;
      this.setState({
        payload
      });
    } else {
      if (index === "actionName") payload.actionName = value;
      else {
        if (error[payload.bindings[index].dataType + index]) {
          delete error[payload.bindings[index].dataType + index]
        }
        payload.bindings[index][event.target.id] = value;
        payload.bindings[index].data = "";
        if (value === "Fiber") {
          payload.bindings[index].data = {
            name: "",
            startDistance: "",
            samplingInterval: "",
            spatialResolution: "",
            pointOfReturn: "",
            measurementTime: "",
            intermediateTraceUpdateTime: "",
            updateTime: "",
            repeatMode: "",
            componentIndex: 0
          }
        }
        if (payload.bindings[index].dataType !== "CSV" && payload.bindings[index].fileName === "") {
          delete payload.bindings[index].fileName;
        } else {
          payload.bindings[index].fileName = "";
        }
      }
      this.setState({
        payload,
        error,
      });
    }
  };

  checkValidation = () => {
    let error = cloneDeep(this.state.error)
    this.state.payload.bindings.map((val, index) => {
      if (!val.data) {
        error[val.dataType + index] = "Please Fill Required Data"
      }
      else {
        error = {}
      }
    })
    this.setState({
      error
    })
    return Object.keys(error).length > 0 ? false : true;
  }

  editandSaveHandler = event => {
    event.preventDefault();
    if (this.checkValidation()) {
      this.setState(
        {
          isFetching: true
        },
        () =>
          this.props.handelMapping(
            this.state.payload,
            this.props.match.params.agentId,
            this.props.match.params.mapId
          )
      );
    }
  };

  handleReadCSV = (data, file, index) => {
    let payload = cloneDeep(this.state.payload);
    payload.bindings[index].data = data.data;
    payload.bindings[index].fileName = file;
    this.setState({
      payload,
    })
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log("err", err);
  }

  createTableColumns = (val, index) => {
    let options = [];
    if (Object.keys(val.data[0]).length > 0) {
      let editOnlineHeaders = [];
      if (Object.keys(val.data[0]).includes('sensorTag')) {
        editOnlineHeaders = [
          {
            name: "deviceId",
            displayName: "DeviceId"
          },
          {
            name: "channel",
            displayName: "Channel"
          },
          {
            name: "sensorTag",
            displayName: "Sensor Tag"
          },
          {
            name: "pipeChainLength",
            displayName: "Pipe Chain Length"
          },
          {
            name: "cableInitial",
            displayName: "Cable Initial"
          },
          {
            name: "cableEnd",
            displayName: "Cable End"
          },
        ]
      } else {
        editOnlineHeaders = [
          {
            name: "deviceId",
            displayName: "DeviceId"
          },
          {
            name: "channel",
            displayName: "Channel"
          },
          {
            name: "cableInitial",
            displayName: "Cable Initial"
          },
          {
            name: "cableEnd",
            displayName: "Cable End"
          },
          {
            name: "pipelineComponentInitial",
            displayName: "Pipeline Component Initial"
          },
          {
            name: "pipelineComponentEnd",
            displayName: "Pipeline Component End"
          },
        ]
      }
      editOnlineHeaders.map((val, index) => {
        let obj = {
          Header: val.displayName,
          Cell: row => {
            return (
              <input
                key={index}
                type="text"
                value={row.original[val.name]}
                onChange={this.tableValueChangeHandler(row.index, val.name)}
              ></input>
            )
          }
        }
        options.push(obj);
      })
    }
    this.setState({
      tableData: val.data,
      editTableName: val.fileName,
      options,
      editBindingIndex: index,
      editInline: true
    })
  }

  tableValueChangeHandler = (index, column) => (event) => {
    let tableData = cloneDeep(this.state.tableData)
    if (event.target.value === "") {
      tableData[index][column] = typeof tableData[index][column] === "number" ? 0 : ""
    } else {
      tableData[index][column] = typeof tableData[index][column] === "number" ? Number(event.target.value) : event.target.value;
    }
    this.setState({
      tableData,
    })
  }

  reactCloseHandler = () => {
    this.setState({
      tableData: [],
      options: [],
      editTableName: "",
      editInline: false
    })
  }

  saveEditCsvFile = () => {
    let tableData = cloneDeep(this.state.tableData);
    let payload = cloneDeep(this.state.payload);
    payload.bindings[this.state.editBindingIndex].data = tableData;
    this.setState({
      payload,
      tableData: [],
      options: [],
    })
  }

  JsonChangeHandler = (value, index) => {
    let payload = cloneDeep(this.state.payload)
    payload.bindings[index].data = value.jsObject
    this.setState({
      payload,
      error: {}
    })
  }

  csvExport = () => {
    const parser = new Parser()
    var data = "text/csv;charset=utf-8," + encodeURIComponent(parser.parse(this.state.tableData));
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = `${this.state.editTableName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  fiberDataChangeHandler = (event, index) => {
    let payload = cloneDeep(this.state.payload)
    payload.bindings[index].data[event.target.id] = event.target.id === "componentIndex" ? Number(event.target.value) : event.target.value;
    this.setState({
      payload,
    })
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>AddOrEditMapping</title>
          <meta name="description" content="Description of AddOrEditMapping" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push(`/mappingList/${this.props.match.params.agentId}`); }}>
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left" />
                </button>
                <FormattedMessage {...messages.allAvailableMappings} children={(message => message)} />
              </span>
            </p>
            <h5>
              <FormattedMessage {...commonMessages.agentName} children={(message => message)} /> - <span className="text-theme">{this.state.agentName}</span>
              <span className="mx-3">|</span>
              <FormattedMessage {...commonMessages.agentType} children={(message => message)} /> - <span className="text-theme">{this.state.agentType}</span>
              <span className="mx-3">|</span>
              <FormattedMessage {...commonMessages.deviceTag} children={(message => message)} /> - <span className="text-theme">{this.state.deviceTag}</span>
            </h5>
          </div>
        </div>

        {this.state.isFetching ? <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" /> :
          <React.Fragment>
            <form className="contentForm" onSubmit={this.editandSaveHandler}>
              <h5 className="formHeader">
                {this.props.match.params.mapId ? (
                  <FormattedMessage {...messages.editMapping} children={(message => message)} />
                ) : (
                    <FormattedMessage {...messages.addNewMapping} children={(message => message)} />
                  )}
              </h5>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...commonMessages.agentID} children={(message => message)}/>:
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="agentId"
                  defaultValue={this.props.match.params.agentId}
                  disabled
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...commonMessages.action} children={(message => message)}/>:
                  <sup>
                    <i className="fas fa-asterisk" />
                  </sup>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="actionName"
                  value={this.state.payload.actionName}
                  onChange={this.nameChangeHandler("actionName")}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...commonMessages.plant} children={(message => message)}/>:
                  <sup>
                    <i className="fas fa-asterisk" />
                  </sup>
                </label>
                <select
                  onChange={this.nameChangeHandler("plantId")}
                  value={this.state.payload.plantId}
                  id="plantId"
                  className="form-control"
                  required
                >
                  <option value="">No Plant Selected </option>
                  {this.state.plants.map(plants => (
                    <option key={plants._id} value={plants._id}>
                      {plants.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FormattedMessage {...messages.addBindings} children={(message => message)}/>:
                  <sup>
                    <i className="fas fa-asterisk" />
                  </sup>
                </label>
                <div className="fx-b80">
                  {this.state.payload.bindings.map((val, index) => (
                    <div className="card newCustomCard" key={"mapping" + index}>
                      <div className="card-header">
                        <div className="flex align-items-center">
                          <div className="fx-b70">
                            <h4 className="cardTitle">
                              <FormattedMessage {...messages.bindNumber} children={(message => message)} />{index + 1}
                            </h4>
                          </div>
                          <div className="fx-b30">
                            {this.state.payload.bindings.length > 1 && (
                              <button
                                type="button"
                                className={`btn-transparent text-danger float-right`}
                                onClick={() => this.bindingAddDeletdHandler(index)}
                                data-tooltip
                                data-tooltip-text="Delete"
                              >
                                <i className="far fa-trash-alt" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label className="form-label fx-b15">
                            <FormattedMessage {...messages.dataname} children={(message => message)}/>:
                            <sup>
                              <i className="fas fa-asterisk" />
                            </sup>
                          </label>
                          <select
                            disabled={this.state.preservePayload ? index < this.state.preservePayload.bindings.length : false}
                            id="dataType"
                            onChange={this.nameChangeHandler(index)}
                            className="form-control fx-b85"
                            required
                            value={val.dataType}
                          >
                            <option value="JSON">JSON</option>
                            <option value="CSV">CSV</option>
                            <option value="Fiber">Fiber</option>
                          </select>
                        </div>
                        {val.dataType === "JSON" ? <div className="form-group">
                          <label className="form-label fx-b15">
                            <FormattedMessage {...messages.jsonname} children={(message => message)}/>:
                            <sup>
                              <i className="fas fa-asterisk" />
                            </sup>
                          </label>
                          <div className className="jsonCodeBox fx-b85">
                            <JSONInput
                              id="rawJson"
                              onKeyPressUpdate={false}
                              placeholder={val.data ? val.data : null}
                              onChange={(value) => this.JsonChangeHandler(value, index)}
                              height='100%'
                              width="100%"
                              theme="light_mitsuketa_tribute"
                              locale={locale}
                            />
                          </div>
                        </div> :
                          val.dataType === "CSV" ?
                            <div className="form-group">
                              <label className="form-label fx-b15">
                                <FormattedMessage {...commonMessages.uploadCSV} children={(message => message)}/> :
                            <sup>
                                  <i className="fas fa-asterisk" />
                                </sup>
                              </label>
                              <div className="fx-b85">
                                <div className="csvReader">
                                  <CSVReader
                                    require
                                    onFileLoaded={(data, file) => this.handleReadCSV(data, file, index)}
                                    style={{ display: 'block' }}
                                    onError={this.handleOnError}
                                    configOptions={{
                                      skipEmptyLines: true,
                                      header: true, /* Header row support */
                                      encoding: undefined,
                                      dynamicTyping: true
                                    }}
                                  />
                                  <div className="csvReaderContent">
                                    <img src={require("../../assets/images/file.png")} />
                                    <p>{
                                      val.fileName ? val.fileName :
                                        <FormattedMessage {...commonMessages.chooseFileToUpload} children={(message => message)}/>
                                    }</p>
                                  </div>
                                </div>
                                {val.data != "" && this.props.match.params.mapId && <button
                                  type="button"
                                  onClick={() => this.createTableColumns(val, index)}
                                  className="btn-transparent text-primary mr-t-8"
                                >
                                  <FormattedMessage
                                    {...messages.editInline}
                                    children={(message => message)}
                                  />
                                  <i className="far fa-pen mr-l-8" />
                                </button>}
                              </div>
                            </div> :
                            <React.Fragment>
                              {this.state.fiberDataKeys.map(value => (
                                <div className="form-group" key={value}>
                                  <label className="form-label fx-b15">
                                    {value !== "name" ?
                                      <FormattedMessage {...messages[value]} children={(message => message)}/> :
                                      <FormattedMessage {...commonMessages[value]} children={(message => message)}/>
                                    }:
                                <sup>
                                      <i className="fas fa-asterisk" />
                                    </sup>
                                  </label>
                                  <input
                                    type={value !== "componentIndex" ? "text" : "number"}
                                    className="form-control fx-b85"
                                    id={value}
                                    value={val.data[value]}
                                    onChange={(event) => this.fiberDataChangeHandler(event, index)}
                                    required
                                  />
                                </div>))}
                            </React.Fragment>
                        }
                        {this.state.error && this.state.error[val.dataType + index] && <div className="flex">
                          <div className="fx-b15" />
                          <p className="fx-b85">{this.state.error[val.dataType + index]}</p>
                        </div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="fx-b100 text-right mt-3">
                  <button
                    type="button"
                    className="btn btn-create"
                    id="Add"
                    onClick={event => this.bindingAddDeletdHandler(event)}
                  >
                    <i id="Add" className="far fa-plus" />
                  </button>
                </div>
              </div>

              <div className="form-group justify-content-end">
                <button id="saveAgent" className="btn btn-danger mt-3">
                  <i className="far fa-check-circle" />
                  {!this.props.match.params.mapId ? (
                    <FormattedMessage {...commonMessages.save} children={(message => message)} />
                  ) : (
                      <FormattedMessage {...commonMessages.update} children={(message => message)} />
                    )}
                </button>
              </div>
            </form>

            {this.state.editInline &&
              <div className="modal d-block">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header editCSVModal position-relative">
                      <h4 className="modal-title"><FormattedMessage {...messages.editcsvfile} children={(message => message)} />
                        <button type="button" className="close" data-dismiss="modal" onClick={() => this.reactCloseHandler()}>&times;</button>
                      </h4>
                      <button type="button" disabled={this.state.tableData.length < 0} className="btn-transparent text-light" onClick={() => this.csvExport()}>
                        <i className="far fa-file-export mr-r-8"></i>
                        <FormattedMessage {...messages.exportToCSV} children={(message => message)}/>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="reactTableModal">
                        <div className="customReactTableBox">
                          <ReactTable
                            columns={this.state.options}
                            noDataText={
                              this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="csv" dataImg="sensor" />
                            }
                            manual
                            pageSize={10}
                            data={this.state.tableData}
                            showPagination={false}
                            className="customReactTable"
                            PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                            NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
                          />
                        </div>
                      </div>
                      <div className="text-right mt-3">
                        <button id="saveMapping" type="button" onClick={() => this.saveEditCsvFile()} className="btn btn-danger" data-dismiss="modal">
                          <i className="far fa-check-circle" data-dismiss="modal" ></i><FormattedMessage {...commonMessages.save} children={(message => message)} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </React.Fragment>}
        {this.state.isOpen ? (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onClose={this.modalCloseHandler}
          />
        ) : null}
      </div>
    );
  }
}

AddOrEditMapping.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  plantsListSuccess: plantsSuccess(),
  plantsListFailure: plantsFailure(),
  editSaveSuccess: editSaveSuccess(),
  editSaveFailure: editSaveFailure(),
  fetchMappingDataSuccess: fetchMappingDataSuccess(),
  fetchMappingDataFailure: fetchMappingDataFailure(),
  getAgentDetailsSuccess: getAgentDetailsSuccess(),
  getAgentDetailsFailure: getAgentDetailsFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPlantList: () => dispatch(getPlantList()),
    handelMapping: (payload, expId, mapId) => dispatch(handelMapping(payload, expId, mapId)),
    getmappingDetails: (agentId, mapId) => dispatch(getmappingDetails(agentId, mapId)),
    getAgentDetails: id => dispatch(getAgentDetails(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditMapping", reducer });
const withSaga = injectSaga({ key: "addOrEditMapping", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AddOrEditMapping);
