/**
 *
 * ResetPassword
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getResetPasswordSuccess, getResetPasswordFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import qs from "query-string";
import { resetPasswordHandler } from './actions';
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";

/* eslint-disable react/prefer-stateless-function */
export class ResetPassword extends React.Component {
  state = {
    errorMessage: "",
    resetSuccess: false,
  }

  resetFormHandler = event => {
    event.preventDefault();
    if (this.refs.newPassword.value != this.refs.confirmPassword.value) {
      this.setState({
        errorMessage: "Both password should be same."
      })
    } else {
      const payload = {
        "newPassword": this.refs.newPassword.value,
        "token": qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token,
        "tokenId": qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
      }
      this.props.resetPasswordHandler(payload);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetPasswordSuccess && nextProps.resetPasswordSuccess !== this.props.resetPasswordSuccess) {
      this.setState({
        resetSuccess: true
      })
    }

    if (nextProps.resetPasswordFailure && nextProps.resetPasswordFailure !== this.props.resetPasswordFailure) {
      this.setState({
        resetSuccess: false,
        resetErrorMessage: nextProps.resetPasswordFailure
      })
    }
  }

  render() {
    return (
      <div className="loginBg">
        <Helmet>
          <title>ResetPassword</title>
          <meta name="description" content="Description of ResetPassword" />
        </Helmet>


        <div className="loginFrame">

          <div className="loginBranding">
            <div className="brandingLogo">
              <img src={`${window.API_URL}api/public/static/logo/pmmp.jpeg`}
                onError={(e) => { e.target.onerror = null; e.target.src = require('../../assets/images/nVent-icon.png') }}
              />
            </div>
            <h6 className="brandingText">
                <span className="brand">
                  RAYCHEM
                </span> 
                Pipeline Supervisor
            </h6>
          </div>

          <div className="loginInfo">
            <div className="welcomeText">
              <h4><FormattedMessage {...commonMessages.welcomText} children={(message => message)} /></h4>
            </div>
            <div className="loginForm">
              {this.state.resetErrorMessage && <p className="loginError">{this.state.resetErrorMessage}</p>}
              {this.state.resetSuccess ? <React.Fragment>
                <div className="formRow">
                  <h5><FormattedMessage {...messages.passwordUpdated} children={(message => message)} /></h5>
                </div>
                <div className="formRow">
                  <button type="button" className="btn-danger" onClick={() => this.props.history.push('/login')}>
                    <FormattedMessage {...messages.backToLogin} children={(message => message)} />
                  </button>
                </div>
              </React.Fragment> :
                <form onSubmit={this.resetFormHandler}>
                  <div className="formRow">
                    <input type="password" ref="newPassword" className="form-control" placeholder="New Password" required />
                  </div>
                  <div className="formRow">
                    <input type="password" ref="confirmPassword" className="form-control" placeholder="Confirm Password" required />
                  </div>
                  <div className="formRow">
                    <button className="btn-danger">
                      <FormattedMessage {...messages.resetPassword} children={(message => message)} />
                    </button>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  resetPasswordSuccess: getResetPasswordSuccess(),
  resetPasswordFailure: getResetPasswordFailure()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetPasswordHandler: (payload) => dispatch(resetPasswordHandler(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "resetPassword", reducer });
const withSaga = injectSaga({ key: "resetPassword", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ResetPassword);
