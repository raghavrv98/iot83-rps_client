/**
 *
 * ManageLogs
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { getLogsList, generateLogs } from "./actions";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  makeSelectManageLogs,
  getLogsListSuccess,
  getLogsListFailure,
  generateLogsSuccess,
  generateLogsFailure,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from "../../messages";
import { showInitials } from "../../utils/commonUtils";
import moment from "moment";
import MessageModal from "../../components/MessageModal/Loadable";
import SkeletonLoader from "../../components/SkeletonLoader/Loadable";
import differenceBy from 'lodash/differenceBy'

/* eslint-disable react/prefer-stateless-function */
export class ManageLogs extends React.Component {
  state = {
    isLoading: true,
    isModalOpen: false,
    logsList: [],
    isOpen: false,
    payload: { type: "current" },
  };

  modalCloseHandler = () => {
    this.setState({
      isModalOpen: false,
      isOpen: false,
      message: "",
      type: "",
    });
  };

  componentDidMount = () => {
    this.props.getLogsList();
    setInterval(() => {
      this.props.getLogsList();
    }, 10000);
  };

  componentWillReceiveProps(nextprops) {
    if (
      nextprops.getLogsListSuccess &&
      nextprops.getLogsListSuccess !== this.props.getLogsListSuccess
    ) {
      let logsList = nextprops.getLogsListSuccess
      let logsListOld = this.props.getLogsListSuccess
      let logsListNew = nextprops.getLogsListSuccess
      let newLogsList = logsListOld ? differenceBy(logsListNew, logsListOld, 'name') : []
      if (newLogsList.length != 0) {
        logsList.map(val => {
          newLogsList.map(newLog => {
            if (newLog.name === val.name) {
              val.new = true
              return newLog
            }
          })
          return val
        })
      }
      this.setState({
        logsList,
        isLoading: false,
      });
    }
    if (
      nextprops.generateLogsSuccess &&
      nextprops.generateLogsSuccess !== this.props.generateLogsSuccess
    ) {
      this.setState({
        isLoading: false,
        isOpen: true,
        type: "success",
        modalSuccess: "success",
        message: "Zip file generation is in progress",
      });
    }
    ["getLogsListFailure", "generateLogsFailure"].map((val) => {
      this.errorSetStateHandler(nextprops[val], this.props[val]);
    });
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

  logsDurationHandler = (event) => {
    this.setState({
      payload: {
        type: event.target.id,
      },
    });
  };

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageLogs</title>
          <meta name="description" content="Description of ManageLogs" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p>Manage Logs</p>
            <h5>
              All Available Logs
              <span className="customCountBadge">
                {this.state.logsList.length}
              </span>
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right">
            <button
              type="button"
              className="btn btn-create"
              onClick={() => {
                this.setState({ isModalOpen: true });
              }}
            >
              <i className="far fa-plus" />
            </button>
          </div>
        </div>

        {this.state.isLoading ? (
          <SkeletonLoader skeleton="skeletonListCount" mode="fullView" />
        ) : (
            <ul className="appListView">
              {this.state.logsList.map((val, index) => {
                return (
                  <li key={index}>
                    <div className="listIcon">
                      <div className="contentIcon">
                        <i className="far fa-file-contract" />
                        <sub>
                          <h6>{showInitials(val.name)}</h6>
                        </sub>
                      </div>
                    </div>
                    <div className="listContent">
                      <h6>
                        File Name
                      {val.new && <span className="customCountBadge">New</span>}
                      </h6>
                      <p>{val.name}</p>
                    </div>
                    <div className="listContent">
                      <h6>File Type</h6>
                      <p>{val.type}</p>
                    </div>
                    <div className="listContent">
                      <h6>File Size</h6>
                      <p>{val.size}</p>
                    </div>
                    <div className="listContent">
                      <h6>Last Modified At</h6>
                      <p>
                        {moment(val.lastModified).format("DD MMM YYYY HH:mm:ss")}
                      </p>
                    </div>
                    <div className="listContent">
                      <h6>Actions</h6>
                      <a
                        className="btn-list"
                        href={`${window.API_URL}api/public/static${val.path}`}
                        download
                      >
                        <i className="far fa-download" />
                      Download
                    </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

        {/* Generate log Modal start  */}
        {this.state.isModalOpen && (
          <div className="modal fade show d-block" id="generateLog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    Generate Logs
                    <button className="close" onClick={this.modalCloseHandler}>
                      <i className="far fa-times" />
                    </button>
                  </h4>
                </div>
                <div className="modal-body">
                  <div className="saveReport">
                    <div className="flex">
                      <div className="fx-b50">
                        <span className="icon">
                          <i className="fal fa-edit" />
                        </span>
                        <label className="customRadioButton">
                          <input
                            type="radio"
                            id="current"
                            name="logs"
                            checked={this.state.payload.type == "current"}
                            onChange={this.logsDurationHandler}
                          />
                          <span className="radiomark" />
                          <span className="radioText">Current Logs</span>
                        </label>
                      </div>
                      <div className="fx-b50">
                        <span className="icon">
                          <i className="fal fa-history" />
                        </span>
                        <label className="customRadioButton">
                          <input
                            type="radio"
                            name="logs"
                            id="history"
                            checked={this.state.payload.type == "history"}
                            onChange={this.logsDurationHandler}
                          />
                          <span className="radiomark" />
                          <span className="radioText">History Logs</span>
                        </label>
                      </div>
                    </div>
                    <div className="text-right mt-3">
                      <button
                        onClick={() => {
                          this.setState({ isModalOpen: false }, () =>
                            this.props.generateLogs(this.state.payload)
                          );
                        }}
                        className="btn btn-danger"
                        type="button"
                      >
                        <i className="far fa-check-circle" />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Generate log Modal start  */}
        {this.state.isOpen}
        {this.state.isOpen && (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onClose={this.modalCloseHandler}
          />
        )}
      </div>
    );
  }
}

ManageLogs.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageLogs: makeSelectManageLogs(),
  getLogsListSuccess: getLogsListSuccess(),
  getLogsListFailure: getLogsListFailure(),
  generateLogsSuccess: generateLogsSuccess(),
  generateLogsFailure: generateLogsFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLogsList: () => dispatch(getLogsList()),
    generateLogs: (payload) => dispatch(generateLogs(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageLogs", reducer });
const withSaga = injectSaga({ key: "manageLogs", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageLogs);
