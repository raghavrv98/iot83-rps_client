/**
 *
 * ManageOAuthMapping
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { getRolesList, getGroupsList, getMappingList, mappingSubmitRequest } from './actions';
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  getRolesListSuccess,
  getRolesListFailure,
  getGroupsListSuccess,
  getGroupsListFailure,
  getMappingListSuccess,
  getMappingListFailure,
  submitMappingRequestSuccess,
  submitMappingRequestFailure
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import MessageModal from "../../components/MessageModal/Loadable";
import SkeletonLoader from "../../components/SkeletonLoader";
import commonMessages from "../../messages";
import { cloneDeep } from 'lodash';


/* eslint-disable react/prefer-stateless-function */
export class ManageOAuthMapping extends React.Component {

  state = {
    roleList: [],
    groupList: [],
    payload: [],
    isLoading: true,
    isDefaultOAuth: true
  }
  componentWillMount() {
    this.props.getRolesList()
    this.props.getGroupsList()
    this.props.getMappingList()
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.getRolesListSuccess && nextprops.getRolesListSuccess !== this.props.getRolesListSuccess) {
      this.setState({
        roleList: nextprops.getRolesListSuccess
      })
    }
    if (nextprops.getGroupsListSuccess && nextprops.getGroupsListSuccess !== this.props.getGroupsListSuccess) {
      this.setState({
        isLoading: false,
        groupList: nextprops.getGroupsListSuccess
      })
    }
    if (nextprops.getMappingListSuccess && nextprops.getMappingListSuccess !== this.props.getMappingListSuccess) {
      let payload = nextprops.getMappingListSuccess
      this.setState({
        isLoading: false,
        payload,
      })
    }
    if (nextprops.submitMappingRequestSuccess && nextprops.submitMappingRequestSuccess !== this.props.submitMappingRequestSuccess) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: "Mapping Updated Successfully",
        type: "success",
      }, () => this.props.getMappingList());
    }
    ['getRolesListFailure', 'getGroupsListFailure', 'getMappingListFailure', 'submitMappingRequestFailure'].map(val => {
      this.errorSetStateHandler(nextprops[val], this.props[val]);
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

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: ""
    })
  };

  nameChangeHandler = (event, index) => {
    let payload = this.state.payload;
    payload[index][event.target.id] = event.target.value;
    this.setState({
      payload,
    });
  };


  addNewMapping = (status, index) => {
    let payload = cloneDeep(this.state.payload)
    if (status === "add") {
      payload.push({
        oauthRole: "",
        pmmpGroup: "",
        pmmpRole: "",
      })
    }
    else {
      payload.splice(index, 1)
    }

    this.setState({
      payload
    })
  }

  mappingSubmitHandler = event => {
    event.preventDefault()
    let payload = cloneDeep(this.state.payload)
    this.setState({
      isLoading: true,
      isDefaultOAuth: true
    }, () => this.props.mappingSubmitRequest(payload))
  }

  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>ManageOAuthMapping</title>
          <meta
            name="description"
            content="Description of ManageOAuthMapping"
          />
        </Helmet>
        <div className="pageBreadcrumb">
          <div className="flex-item fx-b70">
            <p>{localStorage.getItem('tenant') === "cloudstore" ?
              <FormattedMessage {...commonMessages.manageOAuth} children={(message => message)} />
              :
              <FormattedMessage {...messages.OAuthMapping} children={(message => message)} />
            }</p>
            <h5>
              <FormattedMessage {...messages.allAvailableOAuthMapping} children={(message => message)} />
              {this.state.isLoading ? null : <span className="customCountBadge">{this.state.payload.length}</span>}
            </h5>
          </div>
          <div className="flex-item fx-b30 text-right align-items-center">
            <button type="button" onClick={() => this.addNewMapping("add")} className="btn btn-create">
              <i className="far fa-plus"></i>
            </button>
          </div>
        </div>
        {this.state.isLoading ?
          <SkeletonLoader skeleton="skeletonHtmlTable" mode="fullView" /> :
          <div className="contentForm shadowNone" onSubmit={() => { this.mappingSubmitHandler }}>
            <div className="oAuthHeader">
              <div className="mappingRow">
                <h6><FormattedMessage {...messages.oAuthRoleName} children={(message => message)} /></h6>
              </div>
              <div className="mappingRow">
                <h6><FormattedMessage {...messages.IAMRole} children={(message => message)} /></h6>
              </div>
              <div className="mappingRow">
                <h6><FormattedMessage {...messages.IAMGroup} children={(message => message)} /></h6>
              </div>
              <div className="mappingRow">
                <h6><FormattedMessage {...commonMessages.actions} children={(message => message)} /></h6>
              </div>
            </div>
            <form onSubmit={this.mappingSubmitHandler}>
              <ul className="oAuthBody">
                {this.state.payload.map((val, index) =>
                  <li key={index}>
                    <div className="mappingRow">
                      <input type="text"
                        onChange={() => this.nameChangeHandler(event, index)}
                        disabled={val.oauthRole === "DEFAULT" && true}
                        value={val.oauthRole}
                        id="oauthRole"
                        className={`form-control ${val.oauthRole === "DEFAULT" ? "borderNone" : ""}`}
                        required
                      />
                    </div>
                    <div className="mappingRow">
                      <select
                        className={`form-control ${val.oauthRole === "DEFAULT" ? "borderNone" : ""}`}
                        disabled={val.oauthRole === "DEFAULT" ? this.state.isDefaultOAuth : false}
                        required
                        value={val.pmmpRole}
                        id="pmmpRole"
                        onChange={(event) => this.nameChangeHandler(event, index)}
                      >
                        <option value="">Select Role</option>
                        {this.state.roleList.map((val, index) => <option key={index} value={val.id}>{val.name}</option>)}
                      </select>
                    </div>
                    <div className="mappingRow">
                      <select
                        value={val.pmmpGroup}
                        onChange={() => this.nameChangeHandler(event, index)}
                        id="pmmpGroup"
                        className={`form-control ${val.oauthRole === "DEFAULT" ? "borderNone" : ""}`}
                        disabled={val.oauthRole === "DEFAULT" ? this.state.isDefaultOAuth : false}
                        required
                      >
                        <option value="">Select Group </option>
                        {this.state.groupList.map((val, index) => <option value={val.id} key={index}>{val.name}</option>)}
                      </select>
                    </div>
                    <div className="mappingRow">
                      {val.oauthRole === "DEFAULT" ?
                        this.state.isDefaultOAuth ?
                          <button type="button" onClick={() => this.setState({ isDefaultOAuth: false })} className="btn-transparent text-danger mr-r-10"
                            data-tooltip
                            data-tooltip-text="Edit"
                          >
                            <i className="far fa-pen" />
                          </button>
                          :
                          <button type="button" onClick={() => this.setState({ isDefaultOAuth: true })} className="btn-transparent text-secondary mr-r-10"
                            data-tooltip
                            data-tooltip-text="Cancel"
                          >
                            <i className="far fa-times"></i>
                          </button>
                        :
                        null
                      }
                      <button type="button" disabled={val.oauthRole === "DEFAULT"} onClick={() => this.addNewMapping("delete", index)} className="btn-transparent text-success"
                        data-tooltip
                        data-tooltip-text="Delete"
                      >
                        <i className="far fa-trash-alt" />
                      </button>
                    </div>
                  </li>
                )}
              </ul>
              <div className="flex justify-content-end mt-3">
                <button className="btn btn-danger">
                  <i className="far fa-check-circle" />
                  <FormattedMessage {...commonMessages.save} children={(message => message)} />
                </button>
              </div>
            </form>
          </div>
        }
        {
          this.state.isOpen ?
            <MessageModal
              type={this.state.type}
              message={this.state.message}
              onClose={this.modalCloseHandler} /> : null
        }
      </div >
    );
  }
}

ManageOAuthMapping.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  getRolesListSuccess: getRolesListSuccess(),
  getRolesListFailure: getRolesListFailure(),
  getGroupsListSuccess: getGroupsListSuccess(),
  getGroupsListFailure: getGroupsListFailure(),
  getMappingListSuccess: getMappingListSuccess(),
  getMappingListFailure: getMappingListFailure(),
  submitMappingRequestSuccess: submitMappingRequestSuccess(),
  submitMappingRequestFailure: submitMappingRequestFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getRolesList: () => dispatch(getRolesList()),
    getGroupsList: () => dispatch(getGroupsList()),
    getMappingList: () => dispatch(getMappingList()),
    mappingSubmitRequest: (payload) => dispatch(mappingSubmitRequest(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageOAuthMapping", reducer });
const withSaga = injectSaga({ key: "manageOAuthMapping", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageOAuthMapping);
