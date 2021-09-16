/**
 *
 * LoginPage
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
    getLoginSuccess,
    getLoginError,
    getResetPasswordSuccess,
    getResetPasswordFailure,
    authConfigDetailsSuccess,
    authConfigDetailsFailure
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { loginApiHandler, resetPasswordHandler, getAuthConfigDetails, getLoginToken } from './actions';
import JwtDecode from 'jwt-decode';
import { FormattedMessage } from "react-intl";
import commonMessages from '../../messages';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
    state = {
        email: "",
        password: "",
        loading: false,
        signInAs: "client",
        error: "",
        account: "",
        isLoginView: true,
        isMailSent: false,
        accountForResetPassword: "client",
        authConfigDetails: {}
    }

    componentWillMount() {
        this.props.getAuthConfigDetails()
        if (localStorage.token) {
            this.props.history.push("/")
        }
        const query = new URLSearchParams(this.props.location.search);
        if (query.get('code') && query.get('state')) {
            this.setState({ loading: true })
            this.props.getLoginToken(query.get('code'), query.get('state'))
        }
    }

    inputChangeHandler = event => {
        this.setState({ [event.target.id]: event.target.value, error: "" })
    }

    loginFormSubmitHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const payload = {
            "username": this.state.email,
            "password": this.state.password
        }
        this.props.loginApiHandler(payload, this.state.signInAs === "cloudstore" ? this.state.signInAs : this.state.account);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loginSuccess && this.props.loginSuccess !== nextProps.loginSuccess) {
            const tokenInfo = JwtDecode(nextProps.loginSuccess.accessToken)
            localStorage['email'] = tokenInfo.sub;
            localStorage['username'] = tokenInfo.firstName;
            localStorage['userId'] = tokenInfo.jti;
            localStorage['token'] = nextProps.loginSuccess.accessToken;
            localStorage['verified'] = nextProps.loginSuccess.verified
            localStorage['role'] = tokenInfo.scope[0].name
            localStorage['internalUser'] = tokenInfo.internalUser
            localStorage.setItem("client_id", this.state.authConfigDetails.clientId)
            localStorage.setItem("auth0URL", this.state.authConfigDetails.issuerUrl)
            if (!nextProps.loginSuccess.verified) {
                this.props.history.push("/changePassword")
            } else {
                this.props.history.push("/")
            }
        }
        if (nextProps.resetPasswordSuccess && this.props.resetPasswordSuccess !== nextProps.resetPasswordSuccess) {
            this.setState({
                loading: false,
                isMailSent: true
            });
        }

        if (nextProps.authConfigDetailsSuccess && nextProps.authConfigDetailsSuccess !== this.props.authConfigDetailsSuccess) {
            this.setState({
                authConfigDetails: nextProps.authConfigDetailsSuccess
            })
        }

        ['loginError', 'resetPasswordFailure', 'authConfigDetailsFailure'].map(val => {
            this.errorSetStateHandler(nextProps[val], this.props[val]);
        })

    }

    errorSetStateHandler(nextError, currentError) {
        if (nextError && nextError !== currentError) {
            this.setState({
                loading: false,
                error: nextError,
            });
        }
    }

    resetFormHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        let payload = {
            "username": this.state.email,
            "baseUrl": window.location.origin
        }
        this.props.resetPasswordHandler(this.state.accountForResetPassword === "cloudstore" ? "cloudstore" : this.state.account, payload)
    }

    authConfigHandler = () => {
        let client_id = this.state.authConfigDetails.clientId
        let scope = this.state.authConfigDetails.scope
        let response_type = this.state.authConfigDetails.respType
        let response_mode = 'query'
        let state = 'AmQFtlXPHU7DYi1XLS8ElBmjuYwBtBdVF74fb777e093f647b9a0ec8d6ff3ff2bd6'
        let redirect_uri = this.state.authConfigDetails.redirectUri
        let url = `${this.state.authConfigDetails.issuerUrl}authorize?client_id=${client_id}&scope=${scope}&response_type=${response_type}&response_mode=${response_mode}&state=${state}&redirect_uri=${redirect_uri}`;
        window.location.href = url
    }

    render() {
        return (
            <div className="loginBg">
                <Helmet>
                    <title>Login Page</title>
                    <meta name="description" content="Description of LoginPage" />
                </Helmet>

                <div className="loginFrame">

                    <div className="loginBranding">
                        <div className="brandingLogo">
                            <img src={`${window.API_URL}api/public/static/logo/pmmp.jpeg`}
                                onError={(e) => { e.target.onerror = null; e.target.src = require('../../assets/images/nVent-icon.png') }}
                            />
                        </div>
                        <h6 className="brandingText"><span className="brand">RAYCHEM</span> Pipeline Supervisor</h6>
                    </div>

                    <div className="loginInfo">
                        <div className="welcomeText">
                            <h4><FormattedMessage {...commonMessages.welcomText} children={(message => message)} /></h4>
                        </div>
                        <div className="loginForm">
                            {this.state.error && <p className="loginError">{this.state.error}</p>}
                            {this.state.loading ?
                                <div className="loginLoader">
                                    <i className="fas fa-cog fa-3x fa-spin"></i>
                                </div> : this.state.isLoginView ?
                                    <form onSubmit={this.loginFormSubmitHandler}>
                                        <div className="formRow flex align-items-center">
                                            <label className="fx-b25"><FormattedMessage {...messages.signIn} children={(message => message)} /> :</label>
                                            <label className="customRadioButton fx-b37_5">
                                                <input type="radio" name="role" value="client" checked={this.state.signInAs === "client"} onChange={(event) => this.setState({ signInAs: event.target.value, email: "", password: "" })} />
                                                <span className="radiomark" />
                                                <span className="radioText"><FormattedMessage {...commonMessages.operator} children={(message => message)} /></span>
                                            </label>
                                            <label className="customRadioButton fx-b37_5">
                                                <input type="radio" name="role" value="cloudstore" checked={this.state.signInAs === "cloudstore"} onChange={(event) => this.setState({ signInAs: event.target.value, email: "", password: "", account: "" })} />
                                                <span className="radiomark" />
                                                <span className="radioText"><FormattedMessage {...commonMessages.comissioner} children={(message => message)} /></span>
                                            </label>
                                        </div>
                                        {this.state.signInAs === "client" &&
                                            <div className="formRow">
                                                <input type="text" id="account" name="account" className="form-control" placeholder="Account ID"
                                                    value={this.state.account} onChange={this.inputChangeHandler} required
                                                />
                                            </div>
                                        }
                                        <div className="formRow">
                                            <input type="email" id="email" name="email" className="form-control" placeholder="Username"
                                                value={this.state.email} onChange={this.inputChangeHandler} required
                                            />
                                        </div>
                                        <div className="formRow">
                                            <input type="password" id="password" name="pswd" className="form-control" placeholder="Password"
                                                value={this.state.password} onChange={this.inputChangeHandler} required
                                            />
                                        </div>
                                        <div className="formRow">
                                            <button type="submit" className="btn-danger">
                                                <FormattedMessage {...messages.login} children={(message => message)} />
                                            </button>
                                        </div>
                                        <div className="formRow text-center">
                                            <a href="#" className="link" onClick={() => this.setState({ isLoginView: false, error: "", account: "", email: "", password: "" })}>
                                                <FormattedMessage {...messages.resetPass} children={(message => message)} />
                                            </a>
                                        </div>
                                        <div className="formRow">
                                            <h5><FormattedMessage {...messages.or} children={(message => message)} /></h5>
                                        </div>
                                        <div className="formRow text-center">
                                            <button type="button" onClick={this.authConfigHandler} className="btn-transparent">
                                                <img src={require('../../assets/images/auth.png')} />
                                                <FormattedMessage {...messages.authOLogin} children={(message => message)} />
                                            </button>
                                        </div>
                                    </form> : this.state.isMailSent ? <React.Fragment>
                                        <div className="formRow">
                                            <h5><FormattedMessage {...messages.mailSentMessage} children={(message => message)} /></h5>
                                        </div>
                                        <div className="formRow">
                                            <button type="button" className="btn-danger" onClick={() => this.setState({ isLoginView: true, isMailSent: false, account: "", email: "", password: "" })}><FormattedMessage {...messages.backLogin} /></button>
                                        </div>
                                    </React.Fragment> : <form onSubmit={this.resetFormHandler}>
                                            <div className="formRow">
                                                <h5><FormattedMessage {...messages.mailSubmitMessage} children={(message => message)} /></h5>
                                            </div>
                                            <input type="hidden" value="prayer" />
                                            <div className="formRow flex align-items-center">
                                                <label className="fx-b25"><FormattedMessage {...messages.signIn} children={(message => message)} /> :</label>
                                                <label className="customRadioButton fx-b37_5">
                                                    <input type="radio" name="role" value="client" checked={this.state.signInAs === "client"} onChange={(event) => this.setState({ signInAs: event.target.value })} />
                                                    <span className="radiomark" />
                                                    <span className="radioText"><FormattedMessage {...commonMessages.operator} children={(message => message)} /></span>
                                                </label>
                                                <label className="customRadioButton fx-b37_5">
                                                    <input type="radio" name="role" value="cloudstore" checked={this.state.signInAs === "cloudstore"} onChange={(event) => this.setState({ signInAs: event.target.value })} />
                                                    <span className="radiomark" />
                                                    <span className="radioText"><FormattedMessage {...commonMessages.comissioner} children={(message => message)} /></span>
                                                </label>
                                            </div>
                                            {this.state.signInAs === "client" &&
                                                <div className="formRow">
                                                    <input type="text" value={this.state.account} id="account" onChange={this.inputChangeHandler} className="form-control" placeholder="Account ID" required autoComplete="name" />
                                                </div>
                                            }
                                            <div className="formRow">
                                                <input type="email" value={this.state.email} id="email" onChange={this.inputChangeHandler} className="form-control" placeholder="Email" required autoComplete="email" />
                                            </div>
                                            <div className="formRow">
                                                <button className="btn-danger">
                                                    <FormattedMessage {...messages.resetPass} children={(message => message)} />
                                                </button>
                                            </div>
                                            <div className="formRow text-center">
                                                <a href="#" className="link" onClick={() => this.setState({ isLoginView: true, error: "" })}>
                                                    <FormattedMessage {...messages.backLogin} children={(message => message)} />
                                                </a>
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
    loginSuccess: getLoginSuccess(),
    loginError: getLoginError(),
    resetPasswordSuccess: getResetPasswordSuccess(),
    resetPasswordFailure: getResetPasswordFailure(),
    authConfigDetailsSuccess: authConfigDetailsSuccess(),
    authConfigDetailsFailure: authConfigDetailsFailure(),
});

export function mapDispatchToProps(dispatch) {
    return {
        loginApiHandler: (payload, tenant) => dispatch(loginApiHandler(payload, tenant)),
        resetPasswordHandler: (payload, tenant) => dispatch(resetPasswordHandler(tenant, payload)),
        getAuthConfigDetails: () => dispatch(getAuthConfigDetails()),
        getLoginToken: (code, state) => dispatch(getLoginToken(code, state))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "loginPage", reducer });
const withSaga = injectSaga({ key: "loginPage", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(LoginPage);
