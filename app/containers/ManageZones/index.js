/**
 *
 * ManageZones
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { getZoneList, zoneDeleteHandler } from "./actions";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import ReactTable from "react-table";
import {
  zonesList,
  zonesListFailure,
  getzonesDelete,
  getzoneDeleteFailure
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import MessageModal from "../../components/MessageModal/Loadable";
import { Parser } from 'json2csv';
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from  "../../components/SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
export class ManageZones extends React.Component {
  state = {
    csvSequence: [],
    fetchZonesList: [],
    isFetching: true,
    multipleResponse: false,
  };

  componentWillMount() {
    this.props.getZoneList(
      this.props.match.params.plantId,
      this.props.match.params.pipelineId
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.zonesList && nextProps.zonesList !== this.props.zonesList) {
      let fetchZonesList = nextProps.zonesList.result.map(val => {
        return {
          CircuitId: val.CircuitId.value,
          DesignPF: val.DesignPF.value,
          DesignVolts: val.DesignVolts.value,
          EndChain: val.EndChain.value,
          FeedChain: val.FeedChain.value,
          MaintainAmps: val.MaintainAmps.value,
          MaintainTemp: val.MaintainTemp.value,
          PanelId: val.PanelId.value,
          StartupAmps: val.StartupAmps.value,
          StartupTemp: val.StartupTemp.value,
          _id: val._id,
          pipelineId: val.pipelineId,
          plantId: val.plantId
        }
      })
      let unitObject = {
        "PanelId": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].PanelId.unit : null,
        "CircuitId": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].CircuitId.unit : null,
        "FeedChain": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].FeedChain.unit : null,
        "EndChain": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].EndChain.unit : null,
        "DesignVolts": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].DesignVolts.unit : null,
        "DesignPF": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].DesignPF.unit : null,
        "MaintainAmps": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].MaintainAmps.unit : null,
        "StartupAmps": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].StartupAmps.unit : null,
        "MaintainTemp": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].MaintainTemp.unit : null,
        "StartupTemp": nextProps.zonesList.result.length > 0 ? nextProps.zonesList.result[0].StartupTemp.unit : null,
      }
      this.setState({
        isFetching: false,
        fetchZonesList,
        fetchZonesListUnit: nextProps.zonesList.result,
        pipelineName: nextProps.zonesList.pipelineName,
        plantName: nextProps.zonesList.plantName,
        unitObject
      });
    }
    if (nextProps.getzonesDelete && nextProps.getzonesDelete !== this.props.getzonesDelete) {
      let fetchZonesList = JSON.parse(JSON.stringify(this.state.fetchZonesList));
      fetchZonesList = fetchZonesList.filter(
        val => val._id !== nextProps.getzonesDelete
      );
      this.setState({
        fetchZonesList,
        isFetching: false,
        isOpen: true,
        message: <FormattedMessage {...messages.deleteMsg} children={(message => message)} />,
        type: "success",
        multipleResponse: nextProps.getzonesDelete
      });
    }
    ['zonesListFailure', 'getzoneDeleteFailure'].map(val => {
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

  handleConfirmDelete = (plantId, pipelineId, multiple, zoneId) => {
    this.setState({
      isOpen: true,
      message: <FormattedMessage {...commonMessages.deleteConfirmMessage} children={(message => message)} />,
      type: "confirm",
      zoneId,
      pipelineId,
      plantId,
      multiple
    });
  };

  deleteHandler = (plantId, pipelineId, multiple, zoneId) => {
    this.setState(
      {
        isFetching: true,
        isOpen: false,
        message: "",
        type: ""
      },
      () => {
        this.props.zoneDeleteHandler(plantId, pipelineId, multiple, zoneId);
      }
    );
  };

  modalCloseHandler = multiple => {
    this.setState({
      isFetching: multiple,
      isOpen: false,
      message: "",
      type: ""
    }, () => multiple && this.props.getZoneList(this.props.match.params.plantId, this.props.match.params.pipelineId));
  };

  handelEdit = (plantId, pipelineId, zoneId) => {
    this.props.history.push(
      "/addOrEditZone/" + plantId + "/" + pipelineId + "/" + zoneId
    );
  };

  downloadSample = () => {
    let fetchZonesList = JSON.parse(JSON.stringify(this.state.fetchZonesList))
    let finalJson = [];
    let jsonSequence = [
      "PanelId",
      "CircuitId",
      "FeedChain",
      "EndChain",
      "DesignVolts",
      "DesignPF",
      "MaintainAmps",
      "StartupAmps",
      "MaintainTemp",
      "StartupTemp",
    ]
    finalJson.unshift(this.state.unitObject);
    fetchZonesList.map(val => {
      let obj = {}
      jsonSequence.map(key => {
        obj[key] = typeof val[key] === "object" ? val[key].value : val[key]
      })
      finalJson.push(obj);
    })
    const parser = new Parser();
    const csvData = parser.parse(finalJson);
    var data = "text/csv;charset=utf-8," + encodeURIComponent(csvData);
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = "ehtZoneData.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageZones</title>
          <meta name="description" content="Description of ManageZones" />
        </Helmet>
        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push("/pipeLineList/" + this.props.match.params.plantId); }}>
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left" />
                </button>
                <FormattedMessage {...commonMessages.managePipeline} children={(message => message)} />
              </span>
            </p>
            <h5>
              <FormattedMessage {...commonMessages.manageZones} children={(message => message)} />
              {this.state.isFetching ? null :
                <span className="customCountBadge">
                  {this.state.fetchZonesList.length}
                </span>
              }
              <span className="mr-l-15 mr-r-15">|</span>
              <FormattedMessage {...commonMessages.plantName} children={(message => message)} /> - <span className="text-theme">{this.state.plantName}</span>
              <span className="mr-l-15 mr-r-15">|</span>
              <FormattedMessage {...commonMessages.pipelineName} children={(message => message)} /> - <span className="text-theme">{this.state.pipelineName}</span>
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center">
          {this.state.fetchZonesList.length > 0 ?
            <button
              type="button"
              className="btn btn-create"
              onClick={() => {
                this.props.history.push(
                  "/addOrEditZone/" +
                  this.props.match.params.plantId +
                  "/" +
                  this.props.match.params.pipelineId
                );
              }}
            >
              <i className="far fa-plus" />
            </button>
            :
            null
            }
          </div>
        </div>
        {this.state.isFetching ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView"/> : 
        this.state.fetchZonesList.length > 0 ?
        <React.Fragment>
          <div className="customReactTableBox">
            <ReactTable
              defaultPageSize={10}
              className="customReactTable"
              noDataText={this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="zone" dataImg="zones"/>}
              loading={this.state.isFetching}
              PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
              NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
              data={this.state.fetchZonesList}
              columns={[
                {
                  Header: <FormattedMessage {...messages.PanelId} children={(message => message)} />,
                  accessor: "PanelId",
                  filterable: true,
                },
                {
                  Header: <FormattedMessage {...messages.CircuitId} children={(message => message)} />,
                  accessor: "CircuitId",
                  filterable: true,
                },
                {
                  Header: <FormattedMessage {...messages.FeedChain} children={(message => message)} />,
                  accessor: "FeedChain",
                  filterable: true,
                  Cell: row => (
                    <React.Fragment>{row.original.FeedChain + " " + this.state.unitObject.FeedChain}</React.Fragment>
                  ),
                },
                {
                  Header: <FormattedMessage {...messages.EndChain} children={(message => message)} />,
                  accessor: "EndChain",
                  Cell: row => (
                    <React.Fragment>{row.original.EndChain + " " + this.state.unitObject.EndChain}</React.Fragment>
                  ),
                  filterable: true,
                },
                {
                  Header: <FormattedMessage {...messages.DesignVolts} children={(message => message)} />,
                  accessor: "DesignVolts",
                  Cell: row => (
                    <React.Fragment>{row.original.DesignVolts + " " + this.state.unitObject.DesignVolts}</React.Fragment>
                  ),
                  filterable: true,
                },
                {
                  Header: <FormattedMessage {...messages.DesignPF} children={(message => message)} />,
                  accessor: "DesignPF",
                  filterable: true,
                },
                {
                  Header: <FormattedMessage {...messages.MaintainAmps} children={(message => message)} />,
                  accessor: "MaintainAmps",
                  filterable: true,
                  Cell: row => (
                    <React.Fragment>{row.original.MaintainAmps + " " + this.state.unitObject.MaintainAmps}</React.Fragment>
                  ),
                },
                {
                  Header: <FormattedMessage {...messages.StartupAmps} children={(message => message)} />,
                  accessor: "StartupAmps",
                  Cell: row => (
                    <React.Fragment>{row.original.StartupAmps + " " + this.state.unitObject.StartupAmps}</React.Fragment>
                  ),
                  filterable: true,
                },
                {
                  Header: <FormattedMessage {...messages.MaintainTemp} children={(message => message)} />,
                  accessor: "MaintainTemp",
                  Cell: row => (
                    <React.Fragment>{row.original.MaintainTemp + this.state.unitObject.MaintainTemp}</React.Fragment>
                  ),
                  filterable: true,
                },
                {
                  Header: <FormattedMessage {...messages.StartupTemp} children={(message => message)} />,
                  accessor: "StartupTemp",
                  Cell: row => (
                    <React.Fragment>{row.original.StartupTemp + this.state.unitObject.StartupTemp}</React.Fragment>
                  ),
                  filterable: true,
                },
                {
                  Header: <FormattedMessage {...commonMessages.actions} children={(message => message)} />,
                  accessor: "actions",
                  sortable: false,
                  Cell: row => (
                    <div className="button-group">
                      <button
                        type="button"
                        className="btn-transparent"
                        data-tooltip
                        data-tooltip-text= "Edit"
                        onClick={() =>
                          this.handelEdit(
                            row.original.plantId,
                            row.original.pipelineId,
                            row.original._id
                          )
                        }
                      >
                        <i className="far fa-pen text-primary" />
                      </button>
                      <button
                        type="button"
                        className="btn-transparent"
                        data-tooltip
                        data-tooltip-text= "Delete"
                        onClick={() =>
                          this.handleConfirmDelete(
                            row.original.plantId,
                            row.original.pipelineId,
                            false,
                            row.original._id
                          )
                        }
                      >
                        <i className="far fa-trash-alt text-danger" />
                      </button>
                    </div>
                  )
                }
              ]}
            />
          </div>
          {this.state.fetchZonesList.length > 0 &&
            <div className="btn-fixed-group">
              <button type="button" className="btn btn-fixed" onClick={this.downloadSample}>
                <i className="far fa-file-export"></i>
                <span className="btn-fixed-text">
                  <FormattedMessage {...commonMessages.export} children={(message => message)} />
                </span>
              </button>
              <button type="button" className="btn btn-fixed" onClick={() => this.handleConfirmDelete(this.props.match.params.plantId, this.props.match.params.pipelineId, true)} >
                <i className="far fa-undo"></i>
                <span className="btn-fixed-text">
                  <FormattedMessage {...messages.reSetAllDetails} children={(message => message)} />
                </span>
              </button>
            </div>
          }
        </React.Fragment>
        :
        <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="zone" dataImg="zones" button="add" createHandler={() => {this.props.history.push(
          "/addOrEditZone/" +
          this.props.match.params.plantId +
          "/" +
          this.props.match.params.pipelineId
        )}}/>
        }
        {this.state.isOpen ? (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onConfirm={() => this.deleteHandler(this.state.plantId, this.state.pipelineId, this.state.multiple, this.state.zoneId)}
            onClose={() => this.modalCloseHandler(this.state.multipleResponse === "multiple")}
          />
        ) : null}
      </div>
    );
  }
}

ManageZones.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  zonesList: zonesList(),
  zonesListFailure: zonesListFailure(),
  getzonesDelete: getzonesDelete(),
  getzoneDeleteFailure: getzoneDeleteFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getZoneList: (plantId, pipelineId) =>
      dispatch(getZoneList(plantId, pipelineId)),
    zoneDeleteHandler: (plantId, pipelineId, multiple, zoneId) =>
      dispatch(zoneDeleteHandler(plantId, pipelineId, multiple, zoneId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageZones", reducer });
const withSaga = injectSaga({ key: "manageZones", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageZones);
