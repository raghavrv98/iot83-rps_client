/**
 *
 * AddOrEditRtd
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
export class AddOrEditRtd extends React.Component {

  state = {
    isLoading: false,
    isOpen: false,
    payload:
    {
      "Name": "",
      "Type": "",
      "Chain": "",
      "Tag": "",
      "Units": "",
      "EquipId": "",
    },

    activeButton: "addOne",
    sampleCsvData: [
      {
        "Name": "LAUNCHER flow",
        "Type": "FLOW",
        "Chain": 456,
        "Tag": "FI_23007",
        "Units": "m**3/hr",
        "EquipId": "",
      }
    ],
    isScadaSensorCsvReqired: false,
    incorrectfileErrorMsg : false
  };

  componentDidMount() {
    if (this.props.match.params.zoneId) {
      this.setState({ isLoading: true }, () =>
        this.props.getZoneDetails(this.props.match.params.plantId, this.props.match.params.pipelineId, this.props.match.params.zoneId)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSuccess && nextProps.submitSuccess !== this.props.submitSuccess) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: this.props.match.params.zoneId ? <FormattedMessage {...messages.updateRTDMessage} children={(message => message)} /> : <FormattedMessage {...messages.createRTDMessage} children={(message => message)} />,
        type: "success",
        modalSuccess: "success"
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
    if (event.target.id === "Chain" && event.target.value) {
      payload[event.target.id] = parseInt(event.target.value);
    } else {
      payload[event.target.id] = event.target.value;
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
      this.props.history.push(`/manageScadaSensor/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}`);
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
        uploadedFile : undefined,
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
    a.download = "ScadaSensorSample.csv";
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
          <title>AddOrEditScadaSensor</title>
          <meta name="description" content="Description of AddOrEditScadaSensor" />
        </Helmet>
        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push(`/manageScadaSensor/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}`); }}>
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left" />
                </button>
                <FormattedMessage {...commonMessages.manageRTDZone} children={(message => message)} />
              </span>
            </p>
            <h5>{this.props.match.params.zoneId ? <FormattedMessage {...messages.updateRTD} children={(message => message)} /> : <FormattedMessage {...messages.createRTD} children={(message => message)} />}</h5>
          </div>
        </div>
        {this.state.isLoading ?
          <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" />
          :
          <React.Fragment>
            <form className="contentForm" onSubmit={this.submitHandler}>
              <h5 className="formHeader mr-b-40">
                {this.props.match.params.zoneId ? <FormattedMessage {...messages.updateRTD} children={(message => message)} /> : <FormattedMessage {...messages.createRTD} children={(message => message)} />}
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
                    <FormattedMessage {...commonMessages.name} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.payload.Name}
                    id="Name"
                    onChange={this.nameChangeHandler}
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...commonMessages.type} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.payload.Type}
                    id="Type"
                    onChange={this.nameChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.chain} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.payload.Chain}
                      id="Chain"
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
                    <FormattedMessage {...messages.tag} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.payload.Tag}
                    id="Tag"
                    onChange={this.nameChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.units} children={message => message} />
                    <sup className="mr-r-7">
                      <i className="fas fa-asterisk" />
                    </sup>
                    :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.payload.Units}
                    id="Units"
                    onChange={this.nameChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...messages.equipId} children={message => message} /> :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.payload.EquipId}
                    id="EquipId"
                    onChange={this.nameChangeHandler}
                  />
                </div>
              </React.Fragment> : <div className="form-group">
                  <label className="form-label">
                    <FormattedMessage {...commonMessages.uploadCSV} children={message => message} />
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
                  id="saveRtd"
                  className="btn btn-danger"
                >
                  <i className="far fa-check-circle" />
                  {this.props.match.params.zoneId ? <FormattedMessage {...commonMessages.update} children={(message => message)} /> : <FormattedMessage {...commonMessages.save} children={(message => message)} />}
                </button>
              </div>
            </form>
          </React.Fragment>
        }
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

AddOrEditRtd.propTypes = {
  dispatch: PropTypes.func.isRequired
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditRtd", reducer });
const withSaga = injectSaga({ key: "addOrEditRtd", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AddOrEditRtd);
