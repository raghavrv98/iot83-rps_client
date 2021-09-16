/**
 *
 * PipeLineList
 *
 */
import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  pipelineList,
  pipelineListFailure,
  getpipeLineDelete,
  getpipeLineDeleteFailure,
  plantList,
  plantListFailure,
  getAlarmList,
  getAlarmListFailure,
  getPipelineSegmentDataSuccess,
  getPipelineSegmentDataFailure
} from "./selectors";
import { getPipelineList, pipelineDeleteHandler, managePlantList, manageGetAlarmList } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import SkeletonLoader from "../../components/SkeletonLoader";
import MessageModal from "../../components/MessageModal/Loadable";
import ReactTable from "react-table";
import $ from 'jquery';
import Select from 'react-select';
import { getGaugeConfig } from '../../utils/commonUtils';
import SchematicView from '../../components/SchematicView';
import NoDataFound from "../../components/NoDataFound";
import moment from 'moment';
import { cloneDeep } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class PipeLineList extends React.Component {
  state = {
    pipelineList: [],
    isFetching: true,
    isLoading: false,
    clickedPipelineIndex: -1,
    selectedPlant: { value: "all", label: "ALL" },
    size: 10,
    page: 0,
    chartMin: 0,
    chartMax: 100,
    gaugeConfig: [],
    isSchematicViewExpand: false,
    plantsList: [],
  };

  componentWillMount() {
    this.props.managePlantList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      this.setState({
        pipelineList: [],
        isFetching: true,
        isLoading: false,
        clickedPipelineIndex: -1,
        selectedPlant: { value: "all", label: "ALL" },
        size: 10,
        page: 0
      }, () => this.props.managePlantList());
    }
    if (
      nextProps.pipelineList &&
      nextProps.pipelineList !== this.props.pipelineList
    ) {

      let pipelineList = nextProps.pipelineList.result.map((pipeline, index) => {

        pipeline.isSegmentFetching = true;
        pipeline.segmentData = [];
        return pipeline;
      })
      this.setState({
        pipelineList,
        isFetching: false,
        plantName: nextProps.pipelineList.plantName,
      });
    }
    if (
      nextProps.getPipelineSegmentDataSuccess &&
      nextProps.getPipelineSegmentDataSuccess !== this.props.getPipelineSegmentDataSuccess
    ) {
      let pipelineList = this.state.pipelineList.map(pipeline => {
        if (pipeline._id == nextProps.getPipelineSegmentDataSuccess.pipelineId) {
          pipeline.isSegmentFetching = false;
          pipeline.segmentData = nextProps.getPipelineSegmentDataSuccess.data.summary
        }
        return pipeline;
      })
      this.setState({
        pipelineList,
        distanceUnit: nextProps.getPipelineSegmentDataSuccess.data.units.distance,
        isFetching: false,
      }, () => pipelineList.map(val => {
        val.segmentData.length > 0 && val.healthScore != null && getGaugeConfig("gaugechart" + val._id, val.healthScore, nextProps.pipelineList.gaugeConfig, val.badDTS, this.state.chartMin, this.state.chartMax);
      }))
    }

    if (
      nextProps.getAlarmList &&
      nextProps.getAlarmList !== this.props.getAlarmList
    ) {
      this.setState({
        getAlarmList: nextProps.getAlarmList.result,
        filteredCount: nextProps.getAlarmList.filteredCount,
        isLoading: false,
      });
    }
    if (
      nextProps.pipeLineDelete &&
      nextProps.pipeLineDelete !== this.props.pipeLineDelete
    ) {
      let pipelineList = cloneDeep(this.state.pipelineList);
      pipelineList = pipelineList.filter(
        val => val._id !== nextProps.pipeLineDelete
      );
      this.props.manageGetAlarmList(this.state.selectedPlant.value, 10, 0)
      this.setState({
        pipelineList,
        clickedPipelineIndex: -1,
        isFetching: false,
        isOpen: true,
        message: <FormattedMessage {...messages.pipelineDeletedSuccess} children={message => message} />,
        type: "success"
      });
    }
    if (
      nextProps.plantList &&
      nextProps.plantList !== this.props.plantList
    ) {
      let plantsList = [{ value: "all", label: "ALL" }]
      nextProps.plantList.result.map(val => {
        plantsList.push({
          value: val._id,
          label: val.name
        });
      })
      let selectedPlant = this.props.match.params.id ? plantsList.find(val => val.value === this.props.match.params.id) : { value: "all", label: "ALL" }
      this.setState({
        plantsList,
        selectedPlant,
      }, () => this.props.getPipelineList(selectedPlant.value), this.props.manageGetAlarmList(selectedPlant.value, 10, 0)
      );
    }
    ['pipelineListFailure', 'getAlarmListFailure', 'pipeLineDeleteFailure', 'plantListFailure', 'getPipelineSegmentDataFailure'].map(val => {
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

  fetchUsers = (state, instance) => {
    const offset =
      typeof instance.state.page === 'undefined' || instance.state.page === 0
        ? 0
        : instance.state.page * instance.state.pageSize;
    const limit = instance.state.pageSize
    if (this.state.page != instance.state.page || this.state.size != instance.state.pageSize) {
      this.setState({
        page: typeof instance.state.page === 'undefined' ? 0 : instance.state.page,
        size: instance.state.pageSize,
        isLoading: true
      }, () => this.props.manageGetAlarmList(this.state.selectedPlant.value, limit, offset))
    }
  };

  handleChange = (option) => {
    if (this.state.selectedPlant.value !== option.value) {
      this.setState({
        selectedPlant: option,
        page: 0,
        size: 10,
        clickedPipelineIndex: -1,
        isFetching: true
      }, () => {
        this.props.getPipelineList(this.state.selectedPlant.value), this.props.manageGetAlarmList(this.state.selectedPlant.value, 10, 0)
      })
    }
  }

  handelEdit = pipelineId => {
    this.props.history.push("/addOrEditPipeLine/" + this.props.match.params.id + "/" + pipelineId);
  };

  handleConfirmDelete = id => {
    this.setState({
      isOpen: true,
      message: <FormattedMessage {...commonMessages.deleteConfirmMessage} children={message => message} />,
      type: "confirm",
      pipelineId: id
    });
  };

  modalCloseHandler = () => {
    this.setState(
      {
        isOpen: false,
        message: "",
        type: ""
      });
  };

  toggleDetails(index) {
    if (index === "") {
      this.setState({ clickedPipelineIndex: -1 }, () => {
        $(".pipelineDetailPage").removeClass('slideInRight');
        $(".pipelineDetailPage").addClass('slideInLeft').css({ right: '1px' });
      });
    } else {
      this.setState({ clickedPipelineIndex: index }, () => {
        $(".pipelineDetailPage").removeClass('slideInLeft');
        $(".pipelineDetailPage").css({ right: '1px' }).addClass('slideInRight');
      })
    }
  }

  updateClickedPipeline = (pipelineId, plantId, distance) => {
    this.props.history.push("/operatorDashboard/" + plantId + "/" + pipelineId + "/" + distance + "/list")
  }

  expandToogleClick = (view) => {
    this.setState({
      isSchematicViewExpand: view
    });
  }

  deleteHandler = () => {
    this.setState({
      isFetching: true,
      isOpen: false,
      message: "",
      type: ""
    }, () => this.props.pipelineDeleteHandler(this.props.match.params.id, this.state.pipelineId))
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>PipeLineList</title>
          <meta name="description" content="Description of PipeLineList" />
        </Helmet>

        <div className="pageBreadcrumb ">
          <div className="flex-item fx-b70">
            {this.props.match.params.id ?
              <p className="pd-l-30">
                <span className="cursor-pointer" onClick={() => { this.props.history.push("/managePlant"); }}>
                  <button className="btn btn-transparent">
                    <i className="far fa-long-arrow-left" />
                  </button>
                  <FormattedMessage {...commonMessages.managePlant} children={(message => message)} />
                </span>
              </p>
              :
              <p><FormattedMessage {...commonMessages.dashboard} children={(message => message)} /></p>
            }
            <h5>
              <FormattedMessage {...messages.allAvailablePipelines} children={(message => message)} />
              {this.state.isFetching ? null :
                <span className="customCountBadge">
                  {this.state.pipelineList.length}
                </span>
              }
              {this.state.plantName ?
                <React.Fragment>
                  <span className="mx-3">|</span>
                  <FormattedMessage {...commonMessages.plantName} children={(message => message)} /> - <span className="text-theme">{this.state.plantName}</span>
                </React.Fragment>
                :
                null
              }
            </h5>
          </div>
          <div className={this.props.match.params.id && this.state.plantsList.length > 0 && this.state.pipelineList.length > 0 ? "flex-item fx-b25" : "flex-item fx-b30"} >
            <div className="form-group mr-b-0 flex align-items-baseline">
              <label className="form-label f-13 fx-b40 pd-r-10 text-right">
                <FormattedMessage {...commonMessages.selectPlant} children={message => message} /> :
							</label>
              <Select
                className="form-control-multi-select fx-b60"
                id="selectedPlant"
                isDisabled={this.state.isFetching ? true : false}
                value={this.state.selectedPlant}
                onChange={this.handleChange}
                options={this.state.plantsList}
              />
            </div>
          </div>

          {this.props.match.params.id && this.state.plantsList.length > 0 && this.state.pipelineList.length > 0 ? <div className="fx-b5 align-items-center text-right">
            <button
              type="button"
              className="btn btn-create"
              onClick={() => {
                this.props.history.push(
                  `/addOrEditPipeLine/${this.props.match.params.id}`
                );
              }}
            >
              <i className="far fa-plus" />
            </button>
          </div> : null}
        </div>

        {this.state.isFetching ?
          <SkeletonLoader skeleton="skeletonFullView" mode="fullView" /> :
          this.state.plantsList.length > 0 && this.state.pipelineList.length > 0 ?
            <React.Fragment>
              <ul className="pipelineListView">
                {this.state.pipelineList.map((pipeline, index) => (
                  <li className="pipelineView" key={pipeline._id}>
                    <div className="pipelineInfo">
                      <div className={pipeline.badDTS ? "pipelineStatusChart statusAlarm" : "pipelineStatusChart"}>
                        {pipeline.segmentData.length > 0 && pipeline.healthScore != null ?
                          <div className="statusChartFrame">
                            {pipeline.badDTS ? <span className="gaugeAalrm" /> : null}
                            <div id={"gaugechart" + pipeline._id}>
                            </div>
                          </div>
                          :
                          <div className="gaugeSkeleton">
                            <div className="pipeInfo"></div>
                          </div>
                        }
                      </div>
                      <p className="pipelineTitle"
                        data-tooltip
                        data-tooltip-text={pipeline.name}
                      >
                        {pipeline.name}
                      </p>
                    </div>
                    <div className={this.state.isSchematicViewExpand ? "card pipeLineListViewBox expandBox" : "card pipeLineListViewBox"}>
                      <div className="card-body pipelineListViewBody">
                        <SchematicView
                          noDataSkeleton={<NoDataFound noDataCommonMsg={false} skeleton="skeletonPipeline" dataName="data" dataImg="pipelineDetail" />}
                          isFetching={pipeline.isSegmentFetching}
                          data={pipeline.segmentData}
                          isViewExpanded={this.state.isSchematicViewExpand}
                          expandToogleClick={this.expandToogleClick}
                          ShowExpandButton={false}
                          showAlarms={true}
                          onSegmentClick={(clickedSegment, data) => {
                            let segmentIn = Math.ceil(data[clickedSegment].in)
                            this.props.history.push("/operatorDashboard/" + pipeline.plantId + "/" + pipeline._id + "/" + segmentIn + "/list")
                          }}
                          categoryAxisUnit={this.state.distanceUnit}
                          plantId={this.state.selectedPlant}
                          pipelineId={{ value: pipeline._id, label: pipeline.name }}
                        />
                      </div>
                    </div>
                    <div className="action">
                      <button type="button" onMouseOver={() => this.toggleDetails(index)} className="btn btn-create"><i className="far fa-angle-double-left"></i></button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="customReactTableBox">
                <ReactTable
                  columns={[
                    {
                      Header: <FormattedMessage {...messages.activeAlarms} children={message => message} />,
                      accessor: "activeAlarms",
                      sortable: false,
                      Cell: row => {
                        return (
                          <p className="mr-b-0 text-danger f-12 detail">
                            <span>{row.original.linksToDomain.name} : </span>
                            <span>{row.original.latestAlarm.description}</span>
                          </p>
                        );
                      }
                    },
                    {
                      Header: <FormattedMessage {...commonMessages.type} children={message => message} />,
                      accessor: "type",
                      sortable: false,
                    },
                    {
                      Header: <FormattedMessage {...commonMessages.generated} children={message => message} />,
                      sortable: false,
                      accessor: "generated",
                      Cell: row => {
                        return moment(row.original.createdAt).format("DD MMM YYYY HH:mm:ss");
                      }
                    },
                    {
                      Header: <FormattedMessage {...commonMessages.lastRenewed} children={message => message} />,
                      accessor: "lastRenewed",
                      sortable: false,
                      Cell: row => {
                        return moment(row.original.updatedAt).format("DD MMM YYYY HH:mm:ss");
                      }
                    },
                    {
                      Header: <FormattedMessage {...commonMessages.status} children={message => message} />,
                      accessor: "status",
                      sortable: false,
                      Cell: row => {
                        return (
                          (row.original.currentStatus) === 0 ? <p className="mr-b-0">Raised</p> : (row.original.currentStatus) === 1 ? <p className="mr-b-0">Acknowledged</p> : <p className="mr-b-0">Addressed</p>
                        );
                      }
                    },
                  ]}
                  manual
                  noDataText={this.state.isLoading ? '' : <NoDataFound mode="middleView" dataName="alarm" dataImg="notification" />}
                  loading={this.state.isLoading}
                  showPagination={true}
                  pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                  defaultPageSize={this.state.size}
                  pages={Math.ceil(this.state.filteredCount / this.state.size)}
                  nextText={<FormattedMessage {...commonMessages.next} children={message => message} />}
                  previousText={<FormattedMessage {...commonMessages.previous} children={message => message} />}
                  data={this.state.getAlarmList}
                  loadingText={<FormattedMessage {...commonMessages.loading} children={message => message} />}
                  onFetchData={this.fetchUsers}
                  className="customReactTable"
                  PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
                  NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
                />
              </div>

              {this.state.clickedPipelineIndex !== -1 ? <div className="pipelineDetailPage animated" onMouseLeave={() => this.toggleDetails('')}>
                {this.props.match.params.id ? <div className="button-group">
                  <button
                    type="button"
                    id="viewDetails"
                    className="btn-transparent text-orange"
                    onClick={() =>
                      this.props.history.push(
                        "/pipeLineDetail/" +
                        this.props.match.params.id +
                        "/" +
                        this.state.pipelineList[this.state.clickedPipelineIndex]._id
                      )
                    }
                    data-tooltip
                    data-tooltip-text="View Details"
                  >
                    <i className="far fa-info" />
                  </button>
                  <button
                    type="button"
                    id="viewLandMarks"
                    className="btn-transparent text-orange"
                    onClick={() =>
                      this.props.history.push(
                        "/managePipeLineLandmark/" +
                        this.props.match.params.id +
                        "/" +
                        this.state.pipelineList[this.state.clickedPipelineIndex]._id
                      )
                    }
                    data-tooltip
                    data-tooltip-text="View Landmarks"
                  >
                    <i className="fas fa-map-marked-alt"></i>
                  </button>
                  <button
                    type="button"
                    className="btn-transparent text-green"
                    onClick={() =>
                      this.props.history.push(
                        "/manageScadaSensor/" +
                        this.props.match.params.id +
                        "/" +
                        this.state.pipelineList[this.state.clickedPipelineIndex]._id
                      )
                    }
                    data-tooltip
                    data-tooltip-text="Scada Sensor Details"
                  >
                    <i className="far fa-thermometer"></i>
                  </button>
                  <button
                    type="button"
                    className="btn-transparent text-red"
                    onClick={() =>
                      this.props.history.push(
                        "/manageZones/" +
                        this.props.match.params.id +
                        "/" +
                        this.state.pipelineList[this.state.clickedPipelineIndex]._id
                      )
                    }
                    data-tooltip
                    data-tooltip-text="EHT Details"
                  >
                    <i className="far fa-thermometer-half" />
                  </button>
                  <button
                    type="button"
                    className="btn-transparent text-primary"
                    onClick={() => this.handelEdit(this.state.pipelineList[this.state.clickedPipelineIndex]._id)}
                    data-tooltip
                    data-tooltip-text="Edit"
                  >
                    <i className="far fa-pen" />
                  </button>
                  <button
                    type="button"
                    className="btn-transparent text-danger "
                    onClick={() => this.handleConfirmDelete(this.state.pipelineList[this.state.clickedPipelineIndex]._id)}
                    data-tooltip
                    data-tooltip-text="Delete"
                  >
                    <i className="far fa-trash-alt" />
                  </button>
                </div> : null}

                <div className="detailPageContent">
                  <h5>{this.state.pipelineList[this.state.clickedPipelineIndex].name}</h5>
                  <p><strong ><FormattedMessage {...messages.processfluid} children={(message => message)} /></strong> {this.state.pipelineList[this.state.clickedPipelineIndex].processFluid}</p>
                  <p><strong><FormattedMessage {...commonMessages.createdAt} children={(message => message)} /></strong> {moment(this.state.pipelineList[this.state.clickedPipelineIndex].createdAt).format("DD MMM YYYY HH:mm:ss")}</p>
                  <p><strong><FormattedMessage {...commonMessages.hotHHLimit} children={(message => message)} /></strong>{this.state.pipelineList[this.state.clickedPipelineIndex].Hot_HH_Limit} &#8451;</p>
                  <p><strong><FormattedMessage {...commonMessages.coldLLLimit} children={(message => message)} /></strong>{this.state.pipelineList[this.state.clickedPipelineIndex].Cold_LL_Limit} &#8451;</p>
                  <p><strong><FormattedMessage {...commonMessages.timeToFreezeLLLimit} children={(message => message)} /></strong>{this.state.pipelineList[this.state.clickedPipelineIndex].TimeToFreeze_LL_Limit} Hours</p>
                  <p><strong><FormattedMessage {...commonMessages.FreezeBandHighLimit} children={(message => message)} /></strong>{this.state.pipelineList[this.state.clickedPipelineIndex].FreezeBandHighLimit} &#8451;</p>
                  <p><strong><FormattedMessage {...commonMessages.freezeTemperature} children={(message => message)} /></strong>{this.state.pipelineList[this.state.clickedPipelineIndex].Freeze_Temperature} &#8451;</p>
                  <p><strong><FormattedMessage {...commonMessages.FreezeBandLowLimit} children={(message => message)} /></strong>{this.state.pipelineList[this.state.clickedPipelineIndex].FreezeBandLowLimit} &#8451;</p>
                  <p><strong><FormattedMessage {...commonMessages.maxAlarmDistance} children={(message => message)} /></strong>{this.state.pipelineList[this.state.clickedPipelineIndex].maxAlarmDistance} m</p>
                </div>
              </div> : null}
            </React.Fragment>
            :
            this.props.match.params.id ?
              <NoDataFound skeleton="skeletonFullView" mode="fullView" dataName="pipeline" dataImg="pipeline-img" button="add" createHandler={() => { this.props.history.push(`/addOrEditPipeLine/${this.props.match.params.id}`) }} /> :
              <NoDataFound skeleton="skeletonFullView" mode="fullView" dataName="pipeline" dataImg="pipeline-img" button="reload" reloadHandler={() => { this.props.managePlantList() }} />
        }
        {this.state.isOpen ?
          <MessageModal
            type={this.state.type}
            message={this.state.message}
            onConfirm={this.deleteHandler}
            onClose={this.modalCloseHandler}
          />
          : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  pipelineList: pipelineList(),
  pipelineListFailure: pipelineListFailure(),
  pipeLineDelete: getpipeLineDelete(),
  pipeLineDeleteFailure: getpipeLineDeleteFailure(),
  plantList: plantList(),
  plantListFailure: plantListFailure(),
  getAlarmList: getAlarmList(),
  getAlarmListFailure: getAlarmListFailure(),
  getPipelineSegmentDataSuccess: getPipelineSegmentDataSuccess(),
  getPipelineSegmentDataFailure: getPipelineSegmentDataFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPipelineList: id => dispatch(getPipelineList(id)),
    managePlantList: () => dispatch(managePlantList()),
    manageGetAlarmList: (plantId, limit, offset) => dispatch(manageGetAlarmList(plantId, limit, offset)),
    pipelineDeleteHandler: (plantId, pipeId) => dispatch(pipelineDeleteHandler(plantId, pipeId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "pipeLineList", reducer });
const withSaga = injectSaga({ key: "pipeLineList", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(PipeLineList);
