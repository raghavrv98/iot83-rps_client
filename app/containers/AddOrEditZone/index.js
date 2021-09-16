/**
 *
 * AddOrEditZone
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import {
  onSubmitHandler,
  getZoneDetails,
  resetToInitailState
} from "./actions";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  getSubmitSuccess,
  getSubmitError,
  getDetailsSuccess,
  getDetailsError
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from "../../messages";
import SkeletonLoader from "../../components/SkeletonLoader";
import MessageModal from "../../components/MessageModal/Loadable";
import Dropzone from "react-dropzone";
import { Parser } from 'json2csv';


/* eslint-disable react/prefer-stateless-function */
export class AddOrEditZone extends React.Component {
  state = {
    isLoading: false,
    isOpen: false,
    payload: {
      "PanelId": {
        "value": ""
      },
      "CircuitId": {
        "value": ""
      },
      "FeedChain": {
        "unit": "m",
        "value": ""
      },
      "EndChain": {
        "unit": "m",
        "value": ""
      },
      "DesignVolts": {
        "unit": "V",
        "value": ""
      },
      "DesignPF": {
        "value": ""
      },
      "MaintainAmps": {
        "unit": "A",
        "value": ""
      },
      "StartupAmps": {
        "unit": "A",
        "value": ""
      },
      "MaintainTemp": {
        "unit": "C",
        "value": ""
      },
      "StartupTemp": {
        "unit": "C",
        "value": ""
      }
    },
    activeButton: "addOne",
    sampleCsvData: [
      {
        "PanelId": "",
        "CircuitId": "",
        "FeedChain": "m",
        "EndChain": "m",
        "DesignVolts": "V",
        "DesignPF": "",
        "MaintainAmps": "A",
        "StartupAmps": "A",
        "MaintainTemp": "C",
        "StartupTemp": "C",
      },
      {
        "PanelId": "",
        "CircuitId": "511A-1",
        "FeedChain": 3032,
        "EndChain": 0,
        "DesignVolts": 1499,
        "DesignPF": 0.9,
        "MaintainAmps": 89,
        "StartupAmps": 108,
        "MaintainTemp": 135,
        "StartupTemp": 5
      }
    ],
    isEHTZoneCsvReqired: false,
    incorrectfileErrorMsg: false
  };

  componentDidMount() {
    this.props.resetToInitailState();
    if (this.props.match.params.zoneId) {
      this.setState({ isLoading: true }, () =>
        this.props.getZoneDetails(
          this.props.match.params.plantId,
          this.props.match.params.pipelineId,
          this.props.match.params.zoneId
        )
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSuccess && nextProps.submitSuccess !== this.props.submitSuccess) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: nextProps.submitSuccess,
        type: "success",
        modalSuccess: "success",
      });
    }
    if (nextProps.getDetailsSuccess && nextProps.getDetailsSuccess !== this.props.getDetailsSuccess) {
      this.setState({
        payload: nextProps.getDetailsSuccess,
        isLoading: false
      });
    }

    ['submitError', 'getDetailsError'].map(val => {
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
      });
    }
  }

  nameChangeHandler = event => {
    let payload = JSON.parse(JSON.stringify(this.state.payload));
    if ((event.target.id === "FeedChain" ||
      event.target.id === "EndChain" ||
      event.target.id === "DesignVolts" ||
      event.target.id === "MaintainAmps" ||
      event.target.id === "StartupAmps" ||
      event.target.id === "DesignPF" ||
      event.target.id === "MaintainTemp" ||
      event.target.id === "StartupTemp") && event.target.value) {
      payload[event.target.id].value = parseFloat(event.target.value);
    }
    else {
      payload[event.target.id].value = event.target.value;
    }
    this.setState({
      payload
    });
  };

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: ""
    });
    if (this.state.modalSuccess === "success") {
      this.props.history.push(`/manageZones/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}`);
    }
  };

  onDrop = acceptedFiles => {
    if (acceptedFiles.length > 0) {
      this.setState({
        uploadedFile: acceptedFiles[0],
        isScadaSensorCsvReqired: false,
        incorrectfileErrorMsg: false
      })
    }
    else {
      this.setState({
        uploadedFile: undefined,
        isScadaSensorCsvReqired: false,
        incorrectfileErrorMsg: true
      })
    }
  }

  downloadSample = () => {
    const parser = new Parser();
    const csvData = parser.parse(this.state.sampleCsvData);
    var data = "text/csv;charset=utf-8," + encodeURIComponent(csvData);
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = "ehtZoneSample.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  submitHandler = event => {
    event.preventDefault();
    if (!this.state.uploadedFile && this.state.activeButton != 'addOne') {
      this.setState({
        isScadaSensorCsvReqired: true,
        incorrectfileErrorMsg: false
      })
    }
    else {
      this.setState({
        isLoading: true,
        isScadaSensorCsvReqired: false,
        incorrectfileErrorMsg: false
      }, () => {
        let payload
        if (this.state.activeButton == "addOne") {
          payload = this.state.payload
        } else {
          payload = new FormData();
          payload.append('file', this.state.uploadedFile);
        }
        this.props.onSubmitHandler(
          payload,
          this.props.match.params.plantId,
          this.props.match.params.pipelineId,
          this.props.match.params.zoneId,
          this.state.activeButton === "addOne" ? false : true
        );
      })
    }
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>AddOrEditZone</title>
          <meta name="description" content="Description of AddOrEditZone" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push(`/manageZones/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}`); }}>
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left" />
                </button>
                <FormattedMessage {...commonMessages.manageZones} children={(message => message)} />
              </span>
            </p>
            <h5>{this.props.match.params.zoneId ? <FormattedMessage {...messages.updateZone} children={(message => message)} /> : <FormattedMessage {...messages.createZone} children={(message => message)} />}</h5>
          </div>
        </div>
        {this.state.isLoading ? <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" /> :
          <React.Fragment>
            <form
              className="contentForm addEditEHTZone"
              onSubmit={this.submitHandler}
            >
              <h5 className="formHeader mr-b-40">
                {this.props.match.params.zoneId ? <FormattedMessage {...messages.updateZone} children={(message => message)} /> : <FormattedMessage {...messages.createZone} children={(message => message)} />}
                {this.props.match.params.zoneId ? null : <div className="headerItemRight">
                  <div className="toggleButton">
                    <button type="button" onClick={() => this.setState({ activeButton: "addOne" })} className={this.state.activeButton === "addOne" ? "btn-toggle active" : "btn-toggle"}>
                      <FormattedMessage {...messages.addone} children={(message => message)} />
                    </button>
                    <button type="button" onClick={() => this.setState({ activeButton: "addMany" })} className={this.state.activeButton === "addMany" ? "btn-toggle active" : "btn-toggle"}>
                      <FormattedMessage {...messages.addmany} children={(message => message)} />
                    </button>
                  </div>
                </div>}
              </h5>
              {this.state.activeButton === "addOne" ? <React.Fragment>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.PanelId} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.payload.PanelId.value}
                    id="PanelId"
                    onChange={this.nameChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.CircuitId} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.payload.CircuitId.value}
                    id="CircuitId"
                    onChange={this.nameChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.FeedChain} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.FeedChain.value}
                      id="FeedChain"
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">m</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.EndChain} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.EndChain.value}
                      id="EndChain"
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">m</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.DesignVolts} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.DesignVolts.value}
                      id="DesignVolts"
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">V</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.DesignPF} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.DesignPF.value}
                      id="DesignPF"
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">V</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.MaintainAmps} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.MaintainAmps.value}
                      id="MaintainAmps"
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">A</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.StartupAmps} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.StartupAmps.value}
                      id="StartupAmps"
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">A</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.MaintainTemp} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.MaintainTemp.value}
                      id="MaintainTemp"
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">&#8451;</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.StartupTemp} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.StartupTemp.value}
                      id="StartupTemp"
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">&#8451;</span>
                    </div>
                  </div>
                </div>
              </React.Fragment> : <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...commonMessages.uploadCSV} children={message => message} /> :
                  <sup>
                      <i className="fas fa-asterisk" />
                    </sup>
                  </label>
                  <div className="fx-b80">
                    <div className="dropZoneOuterBox pd-r-0 mr-0 w-100">
                      <Dropzone accept=".csv" className="dropZoneBox" multiple={false} onDrop={this.onDrop.bind(this)}>
                        <div className="dropZoneBoxContent">
                          <img src={require("../../assets/images/file.png")} />
                          <p> {this.state.uploadedFile ? this.state.uploadedFile.name : <FormattedMessage {...commonMessages.dropzonemsg} children={message => message} />}</p>
                        </div>
                      </Dropzone>
                      {this.state.isScadaSensorCsvReqired && <p className="modBusErrorMsg">
                        <FormattedMessage {...messages.scadaSensorErrorMsg} children={(message => message)} />
                      </p>}
                      {this.state.incorrectfileErrorMsg && <p className="modBusErrorMsg">
                        <FormattedMessage {...messages.incorrectfileErrorMsg} children={(message => message)} />
                      </p>}
                    </div>
                    <button
                      type="button"
                      className="btn-transparent text-cyan mr-t-8"
                      onClick={this.downloadSample}
                    >
                      <FormattedMessage {...commonMessages.downloadSample} children={(message => message)} />
                      <i className="far fa-download mr-l-8" />
                    </button>
                  </div>
                </div>}
              <div className="form-group justify-content-end mt-3">
                <button
                  type="submit"
                  id="saveZone"
                  className="btn btn-danger"
                >
                  <i className="far fa-check-circle" />
                  {this.props.match.params.zoneId ? <FormattedMessage {...commonMessages.update} children={(message => message)} /> : <FormattedMessage {...commonMessages.save} children={(message => message)} />}
                </button>
              </div>
            </form>
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

AddOrEditZone.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  submitSuccess: getSubmitSuccess(),
  submitError: getSubmitError(),
  getDetailsSuccess: getDetailsSuccess(),
  getDetailsError: getDetailsError()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSubmitHandler: (payload, plantId, pipelineId, zoneId, isBulkUpload) => dispatch(onSubmitHandler(payload, plantId, pipelineId, zoneId, isBulkUpload)),
    getZoneDetails: (plantId, pipelineId, zoneId) => dispatch(getZoneDetails(plantId, pipelineId, zoneId)),
    resetToInitailState: () => dispatch(resetToInitailState())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditZone", reducer });
const withSaga = injectSaga({ key: "addOrEditZone", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AddOrEditZone);
