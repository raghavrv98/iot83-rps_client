/**
 *
 * ManageReport
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import commonMessages from '../../messages';
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getReportListSuccess, getReportListFailure, plantList, plantListFailure, pipelineList, pipelineListFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { getReportList, managePlantList, fetchPipelinesDetails } from './actions'
import messages from "./messages";
import SkeletonLoader from "../../components/SkeletonLoader"
import MessageModal from '../../components/MessageModal/Loadable';
import { showInitials } from "../../utils/commonUtils";
const pdfshift = require('pdfshift')('75a9a7b63cb9422ca6b5afaec4d39600');
import commonMessage from '../../messages';
import ModalLoader from '../../components/ModalLoader/Loadable'
import NoDataFound from "../../components/NoDataFound";
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
export class ManageReport extends React.Component {
  state = {
    isOpen: false,
    isLoading: true,
    plantList: [],
    pipelineList: [],
    reportList: [],
    generateModal: false,
    selectedPlant: "all",
    selectedPipeline: "all",
    reportType: "all",
    reportListTemp: [],
    downloadType: "html",
    downloadModal: false,
    generatingPdf: false,
    isReportListLoading: true
  }

  componentDidMount() {
    this.props.managePlantList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getReportListSuccess && nextProps.getReportListSuccess !== this.props.getReportListSuccess) {
      this.setState({
        reportList: nextProps.getReportListSuccess,
        isLoading: false,
        isReportListLoading: false,
        reportListTemp: nextProps.getReportListSuccess
      })
    }
    if (nextProps.plantList && nextProps.plantList != this.props.plantList) {
      this.setState({
        plantList: nextProps.plantList.result
      }, () => this.props.fetchPipelinesDetails('all'))
    }
    if (nextProps.pipelineList && nextProps.pipelineList != this.props.pipelineList) {
      this.setState({
        pipelineList: nextProps.pipelineList.result
      }, () => this.props.getReportList('all', 'all'))
    }
    ['getReportListFailure', 'plantListFailure', 'pipelineListFailure'].map(val => {
      this.errorSetStateHandler(nextProps[val], this.props[val]);
    })
  }

  errorSetStateHandler(nextError, currentError) {
    if (nextError && nextError !== currentError) {
      this.setState({
        isLoading: false,
        isFetching: false,
        isOpen: true,
        message: nextError,
        type: "error",
      });
    }
  }

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: ""
    });
  }

  downloadReport = () => {
    var textToSave = window.API_URL + "api/public/static" + this.state.fileUrl;
    if (this.state.downloadType == "pdf") {
      this.setState({ generatingPdf: true })

      pdfshift.convert(textToSave, {
        "landscape": true,
        "use_print": true,
        "remove_blank": true,
        "format": "A3"
      }).then((binary_file) => {
        let base64String = "data:application/pdf;base64," + btoa(new Uint8Array(binary_file).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
        }, ''))
        var hiddenElement = document.createElement("a");
        hiddenElement.href = base64String
        hiddenElement.download = "Report.pdf";
        hiddenElement.click();
        this.setState({ generatingPdf: false, downloadModal: false })
      }).catch(function ({ message, code, response, errors = null }) {
        console.log('message, code, response, errors: ', message, code, response, errors);
      })
    } else {
      var hiddenElement = document.createElement("a");
      hiddenElement.href = textToSave
      hiddenElement.download = "Report.html";
      hiddenElement.click();
      this.setState({ downloadModal: false })
    }
  }

  reportfilterTypeHandler = event => {
    var reportList = JSON.parse(JSON.stringify(this.state.reportList))
    var reportListTemp = JSON.parse(JSON.stringify(this.state.reportListTemp))
    var reportType = this.state.reportType

    reportType = event.target.value
    if (reportType === "all") {
      reportListTemp = reportList
    }
    else {
      reportListTemp = reportList.filter(val => val.type === reportType)
    }
    this.setState({
      reportListTemp,
      reportType,
    })
  }

  reportFilterHandler = event => {
    var selectedPlant = this.state.selectedPlant
    var selectedPipeline = this.state.selectedPipeline

    if (event.target.id === 'plant') {
      selectedPlant = event.target.value,
        selectedPipeline = "all"
    }
    else {
      selectedPipeline = event.target.value
    }

    this.setState(
      {
        selectedPlant,
        selectedPipeline,
        isReportListLoading: true
      }, () => this.props.getReportList(this.state.selectedPlant, this.state.selectedPipeline))
  }

  reloadHandler = () => {
    this.props.managePlantList();
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageReport</title>
          <meta name="description" content="Description of ManageReport" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p>
              <FormattedMessage {...messages.manageReport} children={(message => message)} />
            </p>
            <h5>
              <FormattedMessage {...messages.allAvailableReports} children={(message => message)} />
              {this.state.isLoading ? null : <span className="customCountBadge">{this.state.reportList.length}</span>}
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right">
          </div>
        </div>

        {this.state.isLoading ? <SkeletonLoader skeleton="skeletonListFullView" mode="fullView" /> :
          this.state.plantList.length > 0 ?
            <React.Fragment>
              <div className="alarmFilterBox filterBox flex">
                <div className="fx-b25 pd-r-10">
                  <div className="form-group">
                    <label className="form-label">
                      <FormattedMessage {...messages.selectPlant} children={(message => message)} /> :
										</label>
                    <select
                      className="form-control"
                      value={this.state.selectedPlant}
                      id="plant"
                      onChange={this.reportFilterHandler}
                    >
                      <option value="all">All</option>
                      {this.state.plantList.map((plant, index) => <option key={index} value={plant._id}>{plant.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="fx-b25 pd-l-10 pd-r-10">
                  <div className="form-group">
                    <label className="form-label">
                      <FormattedMessage {...messages.selectPipeline} children={(message => message)} /> :
										</label>
                    <select
                      value={this.state.selectedPipeline}
                      onChange={this.reportFilterHandler}
                      id="pipeline"
                      className="form-control"
                      required
                      disabled={this.state.selectedPlant == "all"}
                    >
                      <option value="all">All</option>
                      {this.state.selectedPlant ?
                        this.state.pipelineList.filter(pipeline => pipeline.plantId == this.state.selectedPlant).map((pipeline, index) => <option key={index} value={pipeline._id}>{pipeline.name}</option>) :
                        null
                      }
                    </select>
                  </div>
                </div>

                <div className="fx-b25 pd-l-10">
                  <div className="form-group">
                    <label className="form-label">
                      <FormattedMessage {...messages.type} children={(message => message)} /> :
										</label>
                    <select
                      value={this.state.reportType}
                      onChange={this.reportfilterTypeHandler}
                      id="reportType"
                      className="form-control"
                      required
                    >
                      <option value="all">All</option>
                      <option value="shiftSummaryReport">Shift Summary Report</option>
                    </select>
                  </div>
                </div>
              </div>
              {this.state.isReportListLoading ? <SkeletonLoader skeleton="skeletonListCount" mode="middleView" /> :
              this.state.reportListTemp.length > 0 ?
                <ul className="appListView">
                  {this.state.reportListTemp.map((val, index) =>
                    <li key={index}>
                      <div className="listIcon">
                        <div className="contentIcon">
                          <i className="fal fa-file-alt"></i>
                          <sub>
                            <h6>{showInitials(val.pipelineName)}</h6>
                          </sub>
                        </div>
                      </div>
                      <div className="listContent">
                        <h6><FormattedMessage {...messages.reportName} children={(message => message)} /></h6>
                        <p>{val.pipelineName}</p>
                      </div>
                      <div className="listContent">
                        <h6><FormattedMessage {...messages.type} children={(message => message)} /></h6>
                        <p>{val.type}</p>
                      </div>
                      <div className="listContent">
                        <h6><FormattedMessage {...commonMessages.shiftName} children={(message => message)} /></h6>
                        <p>{val.shift}</p>
                      </div>
                      <div className="listContent">
                        <h6><FormattedMessage {...commonMessages.crewName} children={(message => message)} /></h6>
                        <p>{val.crew}</p>
                      </div>
                      <div className="listContent">
                        <h6><FormattedMessage {...commonMessages.createdAt} children={(message => message)} /></h6>
                        <p>{moment(val.createdAt).format("DD MMM YYYY HH:mm:ss")}</p>
                      </div>
                      <div className="listContent">
                        <h6><FormattedMessage {...commonMessages.actions} children={(message => message)} /></h6>
                        <button
                          type="button"
                          className="btn-list"
                          onClick={() => this.setState({ fileUrl: val.reportUrlHtml, downloadModal: true })}
                        >
                          <i className="far fa-download" />
                          <FormattedMessage {...messages.report} children={(message => message)} />
                        </button>
                      </div>
                    </li>
                  )}
                </ul>
                :
                <NoDataFound mode="middleView" skeleton="skeletonListCount" dataImg="report" dataName="report" />
              }
            </React.Fragment>
            :
            <NoDataFound skeleton="skeletonListFullView" mode="fullView" dataName="report" dataImg="report" button="reload" reloadHandler={this.reloadHandler} />
        }

        {this.state.downloadModal && <div className="modal fade show d-block" id="saveReport">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  <FormattedMessage {...messages.saveAs} children={(message => message)} />
                  <button className="close" onClick={() => this.setState({ downloadModal: false, generatingPdf: false })}><i className="far fa-times"></i></button></h4>
              </div>
              <div className="modal-body">
                <div className="saveReport">

                  {this.state.generatingPdf ? <ModalLoader /> : <React.Fragment>
                    <div className="flex">
                      <div className="fx-b50">
                        <span className="icon disabled">
                          <i className="far fa-file-pdf" />
                        </span>
                        <label className="customRadioButton">
                          <input
                            type="radio"
                            name="roles"
                            checked={this.state.downloadType == "pdf"}
                            onChange={() => this.setState({ downloadType: "pdf" })}
                            disabled
                          />
                          <span className="radiomark" />
                          <span className="radioText"><FormattedMessage {...messages.pdf} children={(message => message)} /></span>
                        </label>

                      </div>
                      <div className="fx-b50">
                        <span className="icon">
                          <i className="far fa-file-code"></i>
                        </span>
                        <label className="customRadioButton">
                          <input required
                            type="radio"
                            name="roles"
                            checked={this.state.downloadType == "html"}
                            onChange={() => this.setState({ downloadType: "html" })}
                          />
                          <span className="radiomark" />
                          <span className="radioText"><FormattedMessage {...messages.html} children={(message => message)} /></span>
                        </label>
                      </div>
                    </div>
                    <div className="text-right mt-3">
                      <button className="btn btn-danger" type="button" onClick={this.downloadReport}>
                        <i className="far fa-check-circle"></i>
                        <FormattedMessage {...commonMessage.save} children={(message => message)} />
                      </button>
                    </div>
                  </React.Fragment>}
                </div>
              </div>
            </div>
          </div>
        </div>}
        {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
      </div>
    );
  }
}

ManageReport.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  getReportListSuccess: getReportListSuccess(),
  getReportListFailure: getReportListFailure(),
  plantList: plantList(),
  plantListFailure: plantListFailure(),
  pipelineList: pipelineList(),
  pipelineListFailure: pipelineListFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getReportList: (plantId, pipelineId) => dispatch(getReportList(plantId, pipelineId)),
    managePlantList: () => dispatch(managePlantList()),
    fetchPipelinesDetails: (id) => dispatch(fetchPipelinesDetails(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageReport", reducer });
const withSaga = injectSaga({ key: "manageReport", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageReport);
