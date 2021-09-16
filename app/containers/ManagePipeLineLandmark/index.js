/**
 *
 * ManagePipeLineLandmark
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
import { getLandmarkList, deleteHandler } from './actions'
import { getLandmarkSuccess, getLandmarkFailure, landmarkDeleteSuccess, landmarkDeleteFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import ReactTable from 'react-table';
import MessageModal from '../../components/MessageModal/Loadable';
import commonMessages from '../../messages';
import NoDataFound from "../../components/NoDataFound";
import SkeletonLoader from  "../../components/SkeletonLoader";


/* eslint-disable react/prefer-stateless-function */
export class ManagePipeLineLandmark extends React.Component {

  state = {
    landmarkList: [],
    isOpen: false,
    isFetching: true
  }

  componentDidMount() {
    this.props.getLandmarkList(this.props.match.params.plantId, this.props.match.params.pipelineId);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.getLandmarkSuccess && nextProps.getLandmarkSuccess !== this.props.getLandmarkSuccess) {
      this.setState({
        landmarkList: nextProps.getLandmarkSuccess.result,
        isFetching: false
      })
    }

    if (nextProps.landmarkDeleteSuccess && nextProps.landmarkDeleteSuccess !== this.props.landmarkDeleteSuccess) {
        this.setState({
          isFetching: false,
          isOpen: true,
          message: <FormattedMessage {...messages.landmarkDeleteSuccess} children={(message => message)} />,
          type: "success"
      },()=>{this.props.getLandmarkList(this.props.match.params.plantId, this.props.match.params.pipelineId)})
    }

    ['getLandmarkFailure', 'landmarkDeleteFailure'].map(val => {
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

  deleteHandler(id) {
    this.setState({
      isFetching: true,
      isOpen: false,
      message: "",
      type: ""
    }, () => {
      this.props.deleteHandler(this.props.match.params.plantId, this.props.match.params.pipelineId, id)
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isFetching: false,
      isOpen: false,
      message: "",
      type: ""
    });
  }

  confirmModalHandler(id) {
    this.setState({
      isOpen: true,
      message: <FormattedMessage {...messages.confirmDelateMessage} children={(message => message)} />,
      type: "confirm",
      deleteLandmarkId: id
    });
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManagePipeLineLandmark</title>
          <meta
            name="description"
            content="Description of ManagePipeLineLandmark"
          />
        </Helmet>

        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push('/pipeLineList/' + this.props.match.params.plantId); }}>
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left"></i>
                </button>
                <FormattedMessage {...commonMessages.managePipeline} children={(message => message)} />
              </span>
            </p>
            <h5><FormattedMessage {...messages.title} children={(message => message)} />
              {this.state.isFetching ?
                null
                :
                <span className="customCountBadge">
                  {this.state.landmarkList.length}
                </span>
              }
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center">
          {this.state.landmarkList.length > 0 ?
            <button type="button" className="btn btn-create" onClick={() => { this.props.history.push(`/addorEditPipeLineLandmark/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}`) }}>
              <i className="far fa-plus"></i>
            </button>
            :
            null
          }
          </div>
        </div>
        {this.state.isFetching ? <SkeletonLoader skeleton="skeletonReactTable" mode="fullView"/> :
        this.state.landmarkList.length > 0 ?
        <div className="customReactTableBox">
          <ReactTable
            columns={[
              {
                Header: <FormattedMessage {...messages.name} message={this.state.message} />,
                accessor: 'name',
                filterable: false
              },
              {
                Header: <FormattedMessage {...messages.chain} message={this.state.message} />,
                accessor: 'chain',
                Cell: row => (
                  <span>{row.original.chain + " m"}</span>
                ),
                Cell: row => (
                  <span>{row.original.chain + " m"}</span>
                ),
                filterable: false
              },
              {
                Header: <FormattedMessage {...messages.x} message={this.state.message} />,
                accessor: 'x',
                Cell: row => (
                  <span>{row.original.x ? row.original.x + " m" : row.original.x}</span>
                ),
                filterable: false
              },
              {
                Header: <FormattedMessage {...messages.y} message={this.state.message} />,
                accessor: 'y',
                Cell: row => (
                  <span>{row.original.y ? row.original.y + " m" : row.original.y}</span>
                ),
                filterable: false
              },
              {
                Header: <FormattedMessage {...commonMessages.actions} message={this.state.message} />, filterable: false, 
                Cell: row => (
                  <div className="button-group">
                    <button type="button" className="btn-transparent"
                      onClick={() => { this.props.history.push(`/addOrEditPipelineLandmark/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}/${row.original._id}`); }} 
                      data-tooltip
                      data-tooltip-text= "Edit"
                    >
                      <i className="far fa-pen text-primary"></i>
                    </button>
                    <button type="button" className="btn-transparent" onClick={() => this.confirmModalHandler(row.original._id)} 
                    data-tooltip
                    data-tooltip-text= "Delete"
                    >
                      <i className="far fa-trash-alt text-danger"></i>
                    </button>
                  </div>
                ),
                sortable: false,
              },
            ]}
            noDataText={this.state.isFetching ? "" : <NoDataFound mode="middleView" dataName="landmark" dataImg="landmark"/>}
            data={this.state.landmarkList}
            loading={this.state.isFetching}
            loadingText={<FormattedMessage {...commonMessages.loading} message={this.state.message} />}
            defaultPageSize={10}
            className="customReactTable"
            PreviousComponent={(props) => <button type="button"{...props}><i className="fas fa-angle-left"></i></button>}
            NextComponent={(props) => <button type="button" {...props}><i className="fas fa-angle-right"></i></button>}
          />
        </div>
        : 
        <NoDataFound skeleton="skeletonReactTable" mode="fullView" dataName="landmark" dataImg="landmark" button="add" createHandler={() => {this.props.history.push(`/addorEditPipeLineLandmark/${this.props.match.params.plantId}/${this.props.match.params.pipelineId}`)}}/>
        }
        {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onConfirm={() => this.deleteHandler(this.state.deleteLandmarkId)} onClose={this.modalCloseHandler} /> : null}
      </div>
    );
  }
}

ManagePipeLineLandmark.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  getLandmarkSuccess: getLandmarkSuccess(),
  getLandmarkFailure: getLandmarkFailure(),
  landmarkDeleteSuccess: landmarkDeleteSuccess(),
  landmarkDeleteFailure: landmarkDeleteFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLandmarkList: (plantId, pipelineId) => dispatch(getLandmarkList(plantId, pipelineId)),
    deleteHandler: (plantId, pipelineId, id) => dispatch(deleteHandler(plantId, pipelineId, id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "managePipeLineLandmark", reducer });
const withSaga = injectSaga({ key: "managePipeLineLandmark", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManagePipeLineLandmark);
