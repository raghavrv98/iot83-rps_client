/**
 *
 * ManageRtd
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
import NoDataFound from "../../components/NoDataFound"
import SkeletonLoader from "../../components/SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
export class ManageRtd extends React.Component {

  state = {
    fetchZonesList: [],
    isFetching: true,
    size: 10,
    page: 0,
    data: '',
    filteredSensorCount: "",
    multiple: false,
    multipleResponse: false,
    isTableLoading: true
  };

  componentWillMount() {
    this.props.getZoneList(this.props.match.params.plantId, this.props.match.params.pipelineId, { offset: 0, limit: 10 })

    this.setState({
      isInitialCall: false
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zonesList && nextProps.zonesList !== this.props.zonesList) {
      this.setState({
        isFetching: false,
        isTableLoading: false,
        fetchZonesList: nextProps.zonesList.devices,
        pipelineName: nextProps.zonesList.pipelineName,
        plantName: nextProps.zonesList.plantName,
        totalCounts: nextProps.zonesList.totalCounts,
        filteredSensorCount: nextProps.zonesList.filteredSensorCount,
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
      multiple,
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
    }, () => multiple && this.props.getZoneList(this.props.match.params.plantId, this.props.match.params.pipelineId, { limit: 10, offset: 0 }));
  };

  handelEdit = (plantId, pipelineId, zoneId) => {
    this.props.history.push(
      "/addorEditScadaSensor/" + plantId + "/" + pipelineId + "/" + zoneId
    );
  };

  downloadSample = () => {
    let fetchZonesList = JSON.parse(JSON.stringify(this.state.fetchZonesList))
    let finalJson = [];
    let jsonSequence = [
      "Name",
      "Type",
      "Chain",
      "Tag",
      "Units",
      "EquipId"
    ]
    fetchZonesList.map(val => {
      let obj = {}
      jsonSequence.map(key => {
        obj[key] = typeof key === "string" ? val[key] : key
      })
      finalJson.push(obj);
    })
    const parser = new Parser();
    const csvData = parser.parse(finalJson);
    var data = "text/csv;charset=utf-8," + encodeURIComponent(csvData);
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = "ScadaSensorsData.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  fetchUsers = (state, instance) => {
    const filter = state.filtered;
    const sorted = state.sorted;
    const offset =
      typeof instance.state.page === 'undefined' || instance.state.page === 0
        ? 0
        : instance.state.page * instance.state.pageSize;
    let payload = {
      offset,
      limit: instance.state.pageSize,
    };
    if (this.state.page != instance.state.page || this.state.size != instance.state.pageSize || filter.length >= 0 || sorted.length >= 0) {
      if (filter.length > 0) {
        filter.map(items => {
          payload[items.id] = items.value;
        });
      }
      if (sorted.length > 0) {
        payload.sortBy = sorted[0].id;
        payload.order = sorted[0].desc ? 'DESC' : 'ASC';
      }
      this.state.isInitialCall ? this.setState({ isFetching: true }, () => this.props.getZoneList(this.props.match.params.plantId, this.props.match.params.pipelineId, payload)) : this.setState({ isFetching: false })
      this.setState({
        page: instance.state.page,
        size: instance.state.pageSize,
        isInitialCall: true,
      });
    }
  };

  render() {
    const columns = [
      {
        Header: <FormattedMessage {...commonMessages.name} children={(message => message)} />,
        accessor: "Name",
        filterable: true,
      },
      {
        Header: <FormattedMessage {...commonMessages.type} children={(message => message)} />,
        accessor: "Type",
        filterable: true,
      },
      {
        Header: <FormattedMessage {...messages.chain} children={(message => message)} />,
        accessor: "Chain",
        Cell: row => (
          <React.Fragment>{row.original.Chain + " m"}</React.Fragment>
        ),
        filterable: true,
      },
      {
        Header: <FormattedMessage {...messages.tag} children={(message => message)} />,
        accessor: "Tag",
        filterable: true,
      },
      {
        Header: <FormattedMessage {...messages.units} children={(message => message)} />,
        accessor: "Units",
        filterable: true,
      },
      {
        Header: <FormattedMessage {...messages.equipId} children={(message => message)} />,
        accessor: "EquipId",
        filterable: true,
      },
      {
        Header: <FormattedMessage {...commonMessages.actions} children={(message => message)} />,
        accessor: "actions",
        filterable: false,
        sortable: false,
        Cell: row =>
          (
            <div className="button-group">
              <button
                type="button"
                className="btn-transparent"
                data-tooltip
                data-tooltip-text= "Edit"
                onClick={() =>
                  this.handelEdit(
                    this.props.match.params.plantId,
                    this.props.match.params.pipelineId,
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
                    this.props.match.params.plantId,
                    this.props.match.params.pipelineId,
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
    ]
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageScadaSensor</title>
          <meta name="description" content="Description of ManageScadaSensor" />
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
              <FormattedMessage {...commonMessages.manageRTDZone} children={(message => message)} />
              {this.state.isFetching ? null :
                <span className="customCountBadge">
                  {this.state.totalCounts}
                </span>
              }
              <span className="mr-l-15 mr-r-15">|</span>
              <FormattedMessage {...commonMessages.plantName} children={(message => message)} /> - <span className="text-theme">{this.state.plantName}</span>
              <span className="mr-l-15 mr-r-15">|</span>
              <FormattedMessage {...commonMessages.pipelineName} children={(message => message)} /> - <span className="text-theme">{this.state.pipelineName}</span>
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center">
            {this.state.totalCounts > 0 ?
              <button
                type="button"
                className="btn btn-create"
                onClick={() => {
                  this.props.history.push(
                    "/addorEditScadaSensor/"
                    +
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

        {this.state.isTableLoading ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView"/> :
          this.state.totalCounts > 0 ?
            <div className="customReactTableBox">
              <ReactTable
                data={this.state.fetchZonesList}
                noDataText={this.state.isFetching ? '' : <NoDataFound mode="middleView" dataName="sensor" dataImg="sensor" />}
                loading={this.state.isFetching}
                pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                defaultPageSize={this.state.size}
                pages={Math.ceil(this.state.filteredSensorCount / this.state.size)}
                className="customReactTable"
                manual
                columns={columns}
                onFetchData={this.fetchUsers}
                PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
              />
            </div>
            :
            <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="sensor" dataImg="sensor" button="add" createHandler={() => {
              this.props.history.push(
                "/addorEditScadaSensor/"
                +
                this.props.match.params.plantId +
                "/" +
                this.props.match.params.pipelineId
              )
            }} />
        }

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

        {this.state.isOpen ? (
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onConfirm={() => this.setState({
              isOpen: false,
              isFetching: true,
            }, () => this.deleteHandler(this.state.plantId, this.state.pipelineId, this.state.multiple, this.state.zoneId)
            )}
            onClose={() => this.modalCloseHandler(this.state.multipleResponse === "multiple")}
          />
        ) : null}
      </div>
    );
  }
}

ManageRtd.propTypes = {
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
    getZoneList: (plantId, pipelineId, payload) => dispatch(getZoneList(plantId, pipelineId, payload)),
    zoneDeleteHandler: (plantId, pipelineId, multiple, zoneId) => dispatch(zoneDeleteHandler(plantId, pipelineId, multiple, zoneId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageRtd", reducer });
const withSaga = injectSaga({ key: "manageRtd", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageRtd);
