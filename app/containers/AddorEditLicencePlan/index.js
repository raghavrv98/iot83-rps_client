/**
 *
 * AddorEditLicencePlan
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
import { onSubmitHandler, getPlansList } from './actions';
import { getSubmitSuccess, getSubmitError, getPlansSuccess, getPlansFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import MessageModal from "../../components/MessageModal/Loadable";
import SkeletonLoader from "../../components/SkeletonLoader";
import { cloneDeep } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class AddorEditLicencePlan extends React.Component {

  state = {
    payload: {
      "customerName": "",
      "planId": "",
      "applianceKey": "",
      "validFor": "6",
      "mode": "cloud"
    },
    isLoading: true,
    plansList: []
  }

  componentWillMount() {
    this.props.getPlansList()
  }

  onChangeHandler = event => {
    let id = event.target.id
    let payload = cloneDeep(this.state.payload)
    payload[id] = event.target.value
    this.setState({
      payload
    })
  }

  onSubmitHandler = event => {
    event.preventDefault()
    let payload = cloneDeep(this.state.payload)
    this.setState({
      isLoading: true
    }, () => this.props.onSubmitHandler(payload))
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.submitSuccess && nextprops.submitSuccess !== this.props.submitSuccess) {
      this.setState({
        isLoading: false,
        isOpen: true,
        message: <FormattedMessage {...messages.submitSuccessMessage} />,
        type: "success",
        modalSuccess: "success"
      });
    }

    if (nextprops.getPlansSuccess && nextprops.getPlansSuccess !== this.props.getPlansSuccess) {
      this.setState({
        isLoading: false,
        plansList: nextprops.getPlansSuccess.packages
      })
    }

    ['submitError', 'getPlansFailure'].map(val => {
      this.errorSetStateHandler(nextprops[val], this.props[val]);
    })
  }

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
      type: ""
    });
    if (this.state.modalSuccess === "success") {
      this.props.history.push('/manageLicense')
    }
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


  render() {
    return (
      <div className="appContent">
        <Helmet>
          <title>AddorEditLicensePlan</title>
          <meta
            name="description"
            content="Description of AddorEditLicensePlan"
          />
        </Helmet>
        <div className="pageBreadcrumb">
          <div className="fx-b70">
            <p className="pd-l-30">
              <span className="cursor-pointer" onClick={() => { this.props.history.push('/manageLicense'); }} >
                <button className="btn btn-transparent">
                  <i className="far fa-long-arrow-left"></i>
                </button>
                <FormattedMessage {...commonMessages.manageLicense} children={(message => message)} />
              </span>
            </p>
            <h5>
              <FormattedMessage {...messages.createLicense} children={(message => message)} />
            </h5>
          </div>
          <div className="fx-b30 text-right">
          </div>
        </div>
        {this.state.isLoading ? <SkeletonLoader skeleton="skeletonSettings" mode="fullView" /> :
          <form className="contentForm" onSubmit={this.onSubmitHandler}>
            <h5 className="formHeader">
              <FormattedMessage {...messages.createLicense} children={(message => message)} />
            </h5>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...commonMessages.customerName} children={(message => message)} />
                <sup className="mr-r-7">
                  <i className="fas fa-asterisk" />
                </sup>
                :
							</label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                onChange={this.onChangeHandler}
                value={this.state.payload.customerName}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...commonMessages.deviceId} children={(message => message)} />
                <sup className="mr-r-7">
                  <i className="fas fa-asterisk" />
                </sup>
                :
              </label>
              <input
                type="text"
                className="form-control"
                id="applianceKey"
                onChange={this.onChangeHandler}
                value={this.state.payload.applianceKey}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...commonMessages.plan} children={(message => message)} />
                <sup className="mr-r-7">
                  <i className="fas fa-asterisk" />
                </sup>
                :
                  </label>
              <select
                id="planId"
                onChange={this.onChangeHandler}
                value={this.state.payload.planId}
                className="form-control"
                required
              >
                <option value="">Select Plan</option>
                {
                  this.state.plansList.map(val => <option value={val.id}>{val.name}</option>)
                }
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...commonMessages.mode} children={(message => message)} />
                <sup className="mr-r-7">
                  <i className="fas fa-asterisk" />
                </sup>
                :
                  </label>
              <select
                id="mode"
                onChange={this.onChangeHandler}
                value={this.state.payload.mode}
                className="form-control"
                required
              >
                <option value="cloud">Cloud</option>
                <option value="appliance">Appliance</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                <FormattedMessage {...messages.duration} children={(message => message)} />
                <sup className="mr-r-7">
                  <i className="fas fa-asterisk" />
                </sup>
                :
                  </label>
              <select
                id="validFor"
                onChange={this.onChangeHandler}
                value={this.state.payload.validFor}
                className="form-control"
                required
              >
                <option value="6">6 Months</option>
                <option value="12">1 Year</option>
                <option value="24">2 Years</option>
              </select>
            </div>
            <div className="form-group justify-content-end mt-3">
              <button id="saveLicense" className="btn btn-danger">
                <i className="far fa-check-circle" />
                <FormattedMessage
                  {...commonMessages.save}
                  children={message => message}
                />
              </button>
            </div>
          </form>
        }
        {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
      </div>
    );
  }
}

AddorEditLicencePlan.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  submitSuccess: getSubmitSuccess(),
  submitError: getSubmitError(),
  getPlansSuccess: getPlansSuccess(),
  getPlansFailure: getPlansFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPlansList: () => dispatch(getPlansList()),
    onSubmitHandler: (payload) => dispatch(onSubmitHandler(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "addorEditLicencePlan", reducer });
const withSaga = injectSaga({ key: "addorEditLicencePlan", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AddorEditLicencePlan);
