/**
 *
 * ManageLicencePlan
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import ReactTable from "react-table";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  makeSelectManageLicencePlan,
  licenseListSuccess,
  licenseListFailure,
  licenseDeleteSuccess,
  licenseDeleteFailure
} from "./selectors";
import { getLicenseList, licenseDeleteHandler } from './actions'
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import commonMessages from "../../messages";
import MessageModal from "../../components/MessageModal/Loadable";
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from "../../components/SkeletonLoader";
import { filterCaseInsensitive } from "../../utils/commonUtils";
import { cloneDeep } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class ManageLicencePlan extends React.Component {
  state = {
    licenseList: [],
    isFetching: true,
  }

  componentWillMount() {
    this.props.getLicenseList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.licenseListSuccess && nextProps.licenseListSuccess !== this.props.licenseListSuccess) {
      this.setState({
        licenseList: nextProps.licenseListSuccess,
        isFetching: false
      })
    }

    if (nextProps.licenseDeleteSuccess && nextProps.licenseDeleteSuccess !== this.props.licenseDeleteSuccess) {
      let licenseList = cloneDeep(this.state.licenseList);
      licenseList = licenseList.filter(
        val => val.id !== nextProps.licenseDeleteSuccess
      );
      this.setState({
        licenseList,
        isFetching: false,
        isOpen: true,
        message: <FormattedMessage {...messages.deleteMsg} children={(message => message)} />,
        type: "success",
      });
    }

    ['licenseListFailure', 'licenseDeleteFailure'].map(val => {
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

  copyTest = licenseKey => {
    let tempElement = document.createElement("textarea");
    let licenseList = cloneDeep(this.state.licenseList);
    tempElement.value = licenseKey;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
    licenseList.map(val => {
      if (val.licenseKey === licenseKey) {
        val.isCopied = true;
      } else {
        val.isCopied = false;
      }
    });
    this.setState({
      licenseList
    });
  };

  copydeviceId = deviceId => {
    let tempElement = document.createElement("textarea");
    let licenseList = cloneDeep(this.state.licenseList);
    tempElement.value = deviceId;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
    licenseList.map(val => {
      if (val.deviceId === deviceId) {
        val.isCopied = true;
      } else {
        val.isCopied = false;
      }
    });
    this.setState({
      licenseList
    });
  };


  showLicenseKeyHandler = id => {
    let licenseList = cloneDeep(this.state.licenseList);
    licenseList.map(license => {
      if (license.licenseKey === id) {
        license.isLicenseKeyDisplayed = !license.isLicenseKeyDisplayed;
      }
    });
    this.setState({
      licenseList
    });
  }

  showHideDeviceIdHandler = id => {
    let licenseList = cloneDeep(this.state.licenseList);
    licenseList.map(license => {
      if (license.deviceId === id) {
        license.isDeviceIdDisplayed = !license.isDeviceIdDisplayed;
      }
    });
    this.setState({
      licenseList
    });
  }

  getRestDays(timstamp) {
    var date_now = Date.now();
    var date_future = timstamp;
    var delta = Math.abs(date_future - date_now) / 1000;
    return Math.floor(delta / 86400);
  }

  handleConfirmDelete = (deleteId) => {
    this.setState({
      isOpen: true,
      message: <FormattedMessage {...commonMessages.deleteConfirmMessage} children={(message => message)} />,
      type: "confirm",
      deleteId,
    });
  };

  deleteHandler = (id) => {
    this.setState(
      {
        isFetching: true,
        isOpen: false,
        message: "",
        type: ""
      }, () => this.props.licenseDeleteHandler(id));
  };

  modalCloseHandler = () => {
    this.setState({
      isFetching: false,
      isOpen: false,
      message: "",
      type: ""
    })
  };

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageLicensePlan</title>
          <meta name="description" content="Description of ManageLicensePlan" />
        </Helmet>
        <div className="pageBreadcrumb">
          <div className="fx-b70">
            <p>
              <FormattedMessage {...commonMessages.manageLicense} children={(message => message)} />
            </p>
            <h5>
              <FormattedMessage {...commonMessages.manageLicensePlan} children={(message => message)} />
              {this.state.isFetching ? null :
                <span className="customCountBadge">
                  {this.state.licenseList.length}
                </span>
              }
            </h5>
          </div>
          <div className="fx-b30 text-right">
            {this.state.licenseList.length > 0 ?
              <button
                type="button"
                className="btn btn-create"
                onClick={() => { this.props.history.push('/addorEditLicence'); }}
              >
                <i className="far fa-plus" />
              </button>
              :
              null
            }
          </div>
        </div>
        {this.state.isFetching ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView" /> :
          this.state.licenseList.length > 0 ?
            <div className="customReactTableBox">
              <ReactTable
                columns={[
                  {
                    Header: <FormattedMessage {...commonMessages.customerName} children={(message => message)} />,
                    accessor: "customerName",
                    filterable: true,
                  },
                  {
                    Header: <FormattedMessage {...messages.deviceId} children={(message => message)} />,
                    accessor: "deviceId",
                    sortable: false,
                    Cell: row => {
                      return (
                        <div className="showHideContent">
                          {row.original.isDeviceIdDisplayed ? row.original.deviceId : "**********"}
                          <div className="button-group">
                            <button
                              className="btn-transparent text-info"
                              onClick={() =>
                                this.copydeviceId(row.original.deviceId)
                              }
                              data-tooltip
                              data-tooltip-text={row.original.isCopied ? "Copied" : "Copy"}
                            >
                              <i className="far fa-copy" />
                            </button>
                            <button
                              className="btn-transparent text-primary"
                              onClick={() =>
                                this.showHideDeviceIdHandler(
                                  row.original.deviceId
                                )
                              }
                              data-tooltip
                              data-tooltip-text={row.original.isDeviceIdDisplayed ? "Hide" : "Show"}
                            >
                              <i
                                className={
                                  row.original.isDeviceIdDisplayed
                                    ? "far fa-eye-slash"
                                    : "far fa-eye"
                                }
                              />
                            </button>
                          </div>
                        </div>
                      );
                    }
                  },

                  {
                    Header: <FormattedMessage {...commonMessages.licenseKey} children={(message => message)} />,
                    accessor: "licenseKey",
                    sortable: false,
                    Cell: row => {
                      return (
                        <div className="showHideContent">
                          {row.original.isLicenseKeyDisplayed ? row.original.licenseKey : "**********"}
                          <div className="button-group">
                            <button
                              className="btn-transparent text-info"
                              onClick={() =>
                                this.copyTest(row.original.licenseKey)
                              }
                              data-tooltip
                              data-tooltip-text={row.original.isCopied ? "Copied" : "Copy"}
                            >
                              <i className="far fa-copy" />
                            </button>
                            <button
                              className="btn-transparent text-primary"
                              onClick={() =>
                                this.showLicenseKeyHandler(
                                  row.original.licenseKey
                                )
                              }
                              data-tooltip
                              data-tooltip-text={row.original.isLicenseKeyDisplayed ? "Hide" : "Show"}
                            >
                              <i
                                className={
                                  row.original.isLicenseKeyDisplayed
                                    ? "far fa-eye-slash"
                                    : "far fa-eye"
                                }
                              />
                            </button>
                          </div>
                        </div>
                      );
                    }
                  },
                  {
                    Header: <FormattedMessage {...commonMessages.plan} children={(message => message)} />,
                    accessor: "activePlan",
                    filterable: false,
                  },
                  {
                    Header: <FormattedMessage {...commonMessages.mode} children={(message => message)} />,
                    accessor: "mode",
                    filterable: false
                  },
                  {
                    Header: <FormattedMessage {...messages.status} children={(message => message)} />,
                    filterable: false,
                    accessor: "status",
                    Cell: row => {
                      return (
                        <span className={row.original.status == "EXPIRED" ? "text-danger" : "text-success"}>
                          {this.getRestDays(row.original.validThru)} Days left
                        </span>
                      )
                    }
                  },
                  {
                    Header: <FormattedMessage {...commonMessages.actions} children={(message => message)} />,
                    filterable: false,
                    sortable: false,
                    Cell: row => {
                      return (
                        <div className="button-group">
                          <button
                            type="button"
                            className="btn-transparent text-danger"
                            data-tooltip
                            data-tooltip-text="Delete"
                            onClick={() => this.handleConfirmDelete(row.original.id)}
                          >
                            <i className="far fa-trash-alt" />
                          </button>
                        </div>
                      )
                    }
                  }
                ]}
                noDataText={this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="licence" dataImg="license" />}
                loading={this.state.isFetching}
                loadingText={<FormattedMessage {...commonMessages.loading} children={(message => message)} />}
                data={this.state.licenseList}
                defaultPageSize={10}
                defaultFilterMethod={filterCaseInsensitive}
                className="customReactTable"
                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
              >
              </ReactTable>
            </div>
            :
            <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="licence" dataImg="license" button="add" createHandler={() => { this.props.history.push('/addorEditLicence') }} />
        }
        {this.state.isOpen ? (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onConfirm={() => this.deleteHandler(this.state.deleteId)}
            onClose={() => this.modalCloseHandler()}
          />
        ) : null}
      </div>
    );
  }
}

ManageLicencePlan.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  manageLicencePlan: makeSelectManageLicencePlan(),
  licenseListSuccess: licenseListSuccess(),
  licenseListFailure: licenseListFailure(),
  licenseDeleteSuccess: licenseDeleteSuccess(),
  licenseDeleteFailure: licenseDeleteFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLicenseList: () => dispatch(getLicenseList()),
    licenseDeleteHandler: (id) => dispatch(licenseDeleteHandler(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageLicencePlan", reducer });
const withSaga = injectSaga({ key: "manageLicencePlan", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageLicencePlan);
