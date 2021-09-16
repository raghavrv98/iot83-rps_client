/**
 *
 * ManageAgents
 *
 **/
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  getAgentsList,
  getAgentsListError,
  getDeleteSuccess,
  getDeleteFailure,
  agentUpdateKeySuccess,
  agentUpdateKeyFailure,
  comparisonDetailsSuccess,
  comparisonDetailsFailure,
  saveToRPSSuccess,
  saveToRPSFailure,
  publishToDTSSuccess,
  publishToDTSFailure
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import ReactTable from "react-table";
import { fetchAgentsList, deleteHandler, activeDeactiveAgentKey, saveToRPS, getComparisonDetails, publishToDTS } from "./actions";
import MessageModal from "../../components/MessageModal/Loadable";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from "../../components/SkeletonLoader";
import { filterCaseInsensitive } from "../../utils/commonUtils";
import moment from 'moment';
import { cloneDeep } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class ManageAgents extends React.Component {
  state = {
    isFetching: true,
    agentsList: [],
    isOpen: false,
    isModalLoading: true,
    comparisonDetails: {
      dts: {},
      rps: {}
    },
    payload: {},
    isCompareConfiguration: false,
  };

  componentWillMount() {
    this.props.fetchAgentsList();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.agentsList &&
      nextProps.agentsList !== this.props.agentsList
    ) {
      let agentsList = nextProps.agentsList.result.map(val => {
        val.isCopied = false;
        return val;
      });
      this.setState({
        agentsList,
        isFetching: false
      });
    }

    if (
      nextProps.comparisonDetailsSuccess &&
      nextProps.comparisonDetailsSuccess !== this.props.comparisonDetailsSuccess
    ) {
      this.setState({
        comparisonDetails: nextProps.comparisonDetailsSuccess,
        isModalLoading: false
      });
    }

    if (
      nextProps.saveToRPSSuccess &&
      nextProps.saveToRPSSuccess !== this.props.saveToRPSSuccess
    ) {
      this.setState({
        isRPSModalLoading: false,
        isOpen: true,
        message: <FormattedMessage {...messages.saveToRPSSuccess} children={(message => message)} />,
        type: "success",
      });
    }

    if (
      nextProps.publishToDTSSuccess &&
      nextProps.publishToDTSSuccess !== this.props.publishToDTSSuccess
    ) {
      this.setState({
        isDTSModalLoading: false,
        isOpen: true,
        message: <FormattedMessage {...messages.publishToDTSSuccess} children={(message => message)} />,
        type: "success",
      });
    }

    if (
      nextProps.deleteSuccess &&
      nextProps.deleteSuccess !== this.props.deleteSuccess
    ) {
      let agentsList = this.state.agentsList.filter(
        temp => temp.agentId != nextProps.deleteSuccess
      );
      this.setState({
        isFetching: false,
        agentsList,
        isOpen: true,
        message: <FormattedMessage {...messages.agentDeleteSuccess} />,
        type: "success"
      });
    }

    if (
      nextProps.agentUpdateKey &&
      nextProps.agentUpdateKey !== this.props.agentUpdateKey
    ) {
      let message = this.state.activeAgent ? <FormattedMessage {...messages.activeMessage} children={(message => message)} /> : <FormattedMessage {...messages.inActiveMessage} children={(message => message)} />
      this.setState({
        isFetching: false,
        isOpen: true,
        message,
        type: "success"
      }, () => this.props.fetchAgentsList());
    }

    ['agentsListError', 'comparisonDetailsFailure', 'saveToRPSFailure', 'publishToDTSFailure', 'deleteFailure', 'agentUpdateKeyFailure'].map(val => {
      this.errorSetStateHandler(nextProps[val], this.props[val]);
    })
  }

  errorSetStateHandler(nextError, currentError) {
    if (nextError && nextError !== currentError) {
      this.setState({
        isFetching: false,
        isDTSModalLoading: false,
        isRPSModalLoading: false,
        isModalLoading: false,
        isOpen: true,
        message: nextError,
        type: "error",
      });
    }
  }

  deleteHandler(id) {
    this.setState(
      {
        isFetching: true,
        isOpen: false,
        message: "",
        type: ""
      }, () => this.props.deleteHandler(id));
  }

  modalCloseHandler = () => {
    this.setState({
      isFetching: false,
      isModalLoading: false,
      isDTSModalLoading: false,
      isRPSModalLoading: false,
      isOpen: false,
      message: "",
      type: ""
    });
  };

  confirmModalHandler = id => {
    this.setState({
      isOpen: true,
      message: <FormattedMessage {...messages.confirmDeleteMessage} />,
      type: "confirm",
      deleteAgentId: id
    });
  }

  showHideAgentIdHandler = id => {
    let agentsList = cloneDeep(this.state.agentsList);
    agentsList.map(agent => {
      if (agent.agentId === id) {
        agent.isAgentIdDisplayed = !agent.isAgentIdDisplayed;
      }
    });
    this.setState({
      agentsList
    });
  }

  dowloadKey = encAesKey => {
    var textToSave = encAesKey;
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:attachment/text," + encodeURI(textToSave);
    hiddenElement.target = "_blank";
    hiddenElement.download = "SecKey.txt";
    hiddenElement.click();
  }

  copyTest = agentId => {
    let tempElement = document.createElement("textarea");
    let agentsList = cloneDeep(this.state.agentsList);
    tempElement.value = agentId;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
    agentsList.map(val => {
      if (val.agentId === agentId) {
        val.isCopied = true;
      } else {
        val.isCopied = false;
      }
    });
    this.setState({
      agentsList
    });
  };

  activeDeactiveAgentKeyHandler = event => {
    let id = event.target.id
    let checked = event.target.checked
    this.setState({
      isFetching: true,
      activeAgent: event.target.checked
    }, () => this.props.activeDeactiveAgentKey(id, checked))
  }

  compareConfig = id => {
    this.setState({
      agentID: id,
      isModalLoading: true,
      isCompareConfiguration: true
    }, () => this.props.getComparisonDetails(id))
  }

  saveToRPSHandler = () => {
    let payload = JSON.stringify(this.state.comparisonDetails.dts)
    this.setState({
      isRPSModalLoading: true
    }, () => this.props.saveToRPS(this.state.agentID, payload))
  }

  publishToDTSHandler = () => {
    let payload = JSON.stringify(this.state.comparisonDetails.rps)
    this.setState({
      isDTSModalLoading: true
    }, () => this.props.publishToDTS(this.state.agentID, payload))
  }

  getDataForConfig = type => {
    let data = cloneDeep(this.state.comparisonDetails)
    if (type == "dts") {
      if (Object.keys(data.dts).length > 0) {
        delete data.dts._id
        delete data.dts.active
        delete data.dts.agentId
        delete data.dts.concurrencyVersion
        data = JSON.stringify(cloneDeep(data.dts), undefined, 2)
      } else {
        data = "Connection Lost From DTS."
      }
    } else {
      delete data.rps._id
      delete data.rps.active
      delete data.rps.agentId
      delete data.rps.concurrencyVersion
      data = JSON.stringify(cloneDeep(data.rps), undefined, 2)
    }
    return data
  }

  render() {

    return (
      <div className="appContent">
        <Helmet>
          <title>ManageAgents</title>
          <meta name="description" content="Description of ManageAgents" />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="fx-b70">
            <p>
              <FormattedMessage {...commonMessages.manageAgents} children={(message => message)} />
            </p>
            <h5>
              <FormattedMessage {...messages.title} children={(message => message)} />
              {this.state.isFetching ? null : <span className="customCountBadge">
                {this.state.agentsList.length}
              </span>}
            </h5>
          </div>
          <div className="fx-b30 text-right">
            {this.state.agentsList.length > 0 ?
              <button
                type="button"
                className="btn btn-create"
                onClick={() => {
                  this.props.history.push("/addOrEditAgent");
                }}
              >
                <i className="far fa-plus" />
              </button>
              : null
            }
          </div>
        </div>
        {this.state.isFetching ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView" /> :
          this.state.agentsList.length > 0 ?
            <div className="customReactTableBox">
              <ReactTable
                columns={[
                  {
                    Header: <FormattedMessage {...commonMessages.agentName} children={(message => message)} />,
                    accessor: "name",
                    filterable: true
                  },
                  {
                    Header: <FormattedMessage {...commonMessages.agentID} children={(message => message)} />,
                    accessor: "agentId",
                    sortable: false,
                    Cell: row => {
                      return (
                        <div className="showHideContent">
                          {row.original.isAgentIdDisplayed ? row.original.agentId : "**********"}
                          <div className="button-group">
                            <button
                              className="btn-transparent text-info"
                              onClick={() =>
                                this.copyTest(row.original.agentId)
                              }
                              data-tooltip
                              data-tooltip-text={row.original.isCopied ? "Copied" : "Copy"}
                            >
                              <i className="far fa-copy" />
                            </button>
                            <button
                              className="btn-transparent text-primary"
                              onClick={() =>
                                this.showHideAgentIdHandler(
                                  row.original.agentId
                                )
                              }
                              data-tooltip
                              data-tooltip-text={row.original.isAgentIdDisplayed ? "Hide" : "Show"}
                            >
                              <i
                                className={
                                  row.original.isAgentIdDisplayed
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
                    Header: <FormattedMessage {...messages.deviceTag} children={(message => message)} />,
                    accessor: "deviceTag",
                    filterable: false
                  },
                  {
                    Header: <FormattedMessage {...commonMessages.agentType} children={(message => message)} />,
                    accessor: "type",
                    filterable: true
                  },
                  {
                    Header: <FormattedMessage {...commonMessages.createdAt} children={(message => message)} />,
                    id: "createdAt",
                    accessor: d => {
                      return moment(d.createdAt).format("DD MMM YYYY HH:mm:ss");
                    }
                  },
                  {
                    Header: <FormattedMessage {...messages.activeInactive} children={(message => message)} />,
                    accessor: "action",
                    sortable: false,
                    width: 150,
                    Cell: row => {
                      return (
                        <div className="text-center">
                          <label className="switchLabel">
                            <input
                              type="checkbox"
                              id={row.original.agentId}
                              checked={row.original.active}
                              onChange={this.activeDeactiveAgentKeyHandler}
                            />
                            <span className="switchMark"></span>
                          </label>
                        </div>
                      );
                    }
                  },
                  {
                    Header: <FormattedMessage {...commonMessages.actions} children={(message => message)} />,
                    accessor: "action",
                    sortable: false,
                    Cell: row => {
                      return (
                        <div className="button-group">
                          <button
                            type="button"
                            className="btn-transparent text-success"
                            onClick={() => {
                              this.props.history.push(
                                "/configMeasurement/" +
                                row.original.name +
                                "~" +
                                row.original.agentId +
                                "~" +
                                row.original.type
                              );
                            }}
                            data-tooltip
                            data-tooltip-text="Measurements"
                          >
                            <i className="far fa-ruler-combined" />
                          </button>
                          <button
                            type="button"
                            className="btn-transparent text-secondary"
                            onClick={() => this.compareConfig(row.original.agentId)}
                            data-tooltip
                            data-tooltip-text="Compare Configuration"
                            disabled={row.original.type === "APSensingDTSPoller" ? false : true}
                          >
                            <i className="fa fa-file-code-o" />
                          </button>
                          <button
                            type="button"
                            className="btn-transparent text-orange"
                            onClick={() => {
                              this.props.history.push(
                                `/mappingList/${row.original.agentId}`
                              );
                            }}
                            data-tooltip
                            data-tooltip-text="Mappings"
                          >
                            <i className="far fa-link" />
                          </button>
                          {/* <button
                            type="button"
                            className="btn-transparent text-cyan"
                            data-tooltip
                            data-tooltip-text="Download Secret Key"
                            disabled={row.original.type === "APSensingDTSPoller" ? true : false}
                            onClick={() =>
                              this.dowloadKey(row.original.encAesKey)
                            }
                          >
                            <i className="far fa-download" />
                          </button> */}
                          <button
                            type="button"
                            className="btn-transparent text-primary"
                            onClick={() => {
                              this.props.history.push(
                                "/addOrEditAgent/" + row.original.agentId
                              );
                            }}
                            data-tooltip
                            data-tooltip-text="Edit"
                          >
                            <i className="far fa-pen" />
                          </button>
                          <button
                            type="button"
                            className="btn-transparent text-danger"
                            onClick={() =>
                              this.confirmModalHandler(row.original.agentId)
                            }
                            data-tooltip
                            data-tooltip-text="Delete"
                          >
                            <i className="far fa-trash-alt" />
                          </button>
                        </div>
                      );
                    }
                  }
                ]}
                noDataText={
                  this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="agent" dataImg="agent" />

                }
                defaultFilterMethod={filterCaseInsensitive}
                data={this.state.agentsList}
                loading={this.state.isFetching}
                loadingText={<FormattedMessage {...commonMessages.loading} children={(message => message)} />}
                defaultPageSize={10}
                className="customReactTable"
                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
              />
            </div>
            :
            <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="agent" dataImg="agent" button="add" createHandler={() => { this.props.history.push("/addOrEditAgent") }} />
        }

        {this.state.isCompareConfiguration ?
          <div className="modal d-block">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    <FormattedMessage {...messages.compareConfiguration} children={(message => message)} />
                    <button className="close" onClick={() => this.setState({ isCompareConfiguration: false })}><i className="far fa-times"></i></button>
                  </h4>
                </div>
                <div className="modal-body">
                  <div className="flex">
                    <div className="fx-b50 px-3 py-3">
                      <div className="jsonDisplay">
                        {/* JSON HEADER  */}
                        <h4 className="jsonTitle">
                          <FormattedMessage {...messages.DTSConfiguration} children={(message => message)} />
                        </h4>
                        {/* JSON BODY  */}
                        <div className="jsonBody">
                          {this.state.isModalLoading || this.state.isRPSModalLoading ?
                            <SkeletonLoader skeleton="compareConfigurationSkeleton"/> : <pre>{this.getDataForConfig('dts')}</pre>
                          }
                        </div>
                        <div className="jsonButton">
                          <button type="button" className="btn btn-danger" onClick={() => this.saveToRPSHandler()} disabled={Object.keys(this.state.comparisonDetails.dts).length === 0} >
                            <FormattedMessage {...messages.saveToRPS} children={(message => message)} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="fx-b50 px-3 py-3">
                      <div className="jsonDisplay">
                        {/* JSON HEADER  */}
                        <h4 className="jsonTitle"><FormattedMessage {...messages.RPSConfiguration} children={(message => message)} /></h4>
                        {/* JSON BODY  */}
                        <div className="jsonBody">
                          {this.state.isModalLoading || this.state.isDTSModalLoading ?
                            <SkeletonLoader skeleton="compareConfigurationSkeleton"/> : <pre>{this.getDataForConfig('rps')}</pre>
                          }
                        </div>
                        <div className="jsonButton">
                          <button type="button" className="btn btn-danger" onClick={() => this.publishToDTSHandler()} disabled={Object.keys(this.state.comparisonDetails.dts).length === 0} >
                            <FormattedMessage {...messages.publishToDTS} children={(message => message)} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null}

        {this.state.isOpen ? (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onConfirm={() => this.deleteHandler(this.state.deleteAgentId)}
            onClose={this.modalCloseHandler}
          />
        ) : null}
      </div>
    );
  }
}

ManageAgents.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  agentsList: getAgentsList(),
  agentsListError: getAgentsListError(),
  deleteSuccess: getDeleteSuccess(),
  deleteFailure: getDeleteFailure(),
  agentUpdateKey: agentUpdateKeySuccess(),
  agentUpdateKeyFailure: agentUpdateKeyFailure(),
  comparisonDetailsSuccess: comparisonDetailsSuccess(),
  comparisonDetailsFailure: comparisonDetailsFailure(),
  saveToRPSSuccess: saveToRPSSuccess(),
  saveToRPSFailure: saveToRPSFailure(),
  publishToDTSSuccess: publishToDTSSuccess(),
  publishToDTSFailure: publishToDTSFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchAgentsList: () => dispatch(fetchAgentsList()),
    deleteHandler: id => dispatch(deleteHandler(id)),
    activeDeactiveAgentKey: (id, status) => dispatch(activeDeactiveAgentKey(id, status)),
    saveToRPS: (id, payload) => dispatch(saveToRPS(id, payload)),
    publishToDTS: (id, payload) => dispatch(publishToDTS(id, payload)),
    getComparisonDetails: id => dispatch(getComparisonDetails(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageAgents", reducer });
const withSaga = injectSaga({ key: "manageAgents", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageAgents);
