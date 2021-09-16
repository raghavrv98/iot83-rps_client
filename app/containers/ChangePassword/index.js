/**
 *
 * ChangePassword
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getChangePasswordSuccess, getChangePasswordFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { changePasswordHandler } from "./actions";
import MessageModal from "../../components/MessageModal/Loadable";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import SkeletonLoader from "../../components/SkeletonLoader";

/* eslint-disable react/prefer-stateless-function */
export class ChangePassword extends React.Component {
    state = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        errors: {},
        errorMessage: ""
    }

    formValidate = () => {
        let oldPass = this.state.oldPassword
        let newPass = this.state.newPassword
        let confirmPass = this.state.confirmPassword
        const regex = /^(?=.*?[a-zA-Z0-9_-]).{5,}$/
        let errors = {}
        if (!regex.test(oldPass)) {
            errors.oldPassword = true
        } else {
            errors.oldPassword = false
        }
        if (!regex.test(newPass)) {
            errors.newPassword = true
        } else {
            errors.newPassword = false
        }
        if (!regex.test(confirmPass)) {
            errors.confirmPassword = true
        } else {
            errors.confirmPassword = false
        }
        if (regex.test(newPass) && regex.test(confirmPass)) {
            if (newPass !== confirmPass) {
                errors.matchError = true
            } else {
                errors.matchError = false
            }
        }
        return errors;
    }

    passwordChangeHandler = event => {
        event.preventDefault();
        let errors = this.formValidate();
        if (errors.oldPassword || errors.newPassword || errors.confirmPassword || errors.matchError) {
            this.setState({
                errors: errors
            })
        } else {
            let sendingJson = {
                newPassword: this.state.newPassword,
                oldPassword: this.state.oldPassword
            }
            this.setState({
                isLoading: true
            }, () => this.props.changePasswordHandler(sendingJson))
        }
    }

    inputChangeHandler = event => {
        let errors = {}
        this.setState({
            [event.target.id]: event.target.value,
            errors,
            errorMessage: "",
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.changePasswordSuccess && nextProps.changePasswordSuccess !== this.props.changePasswordSuccess) {
            this.setState({
                isLoading: false,
                isOpen: true,
                message: <FormattedMessage {...messages.changePasswordMessage} children={(message => message)} />,
                type: "success",
                modalSuccess: "success"
            });
        }
        if (nextProps.changePasswordError && nextProps.changePasswordError !== this.props.changePasswordError) {
            this.setState({
                isLoading: false,
                errorMessage: nextProps.changePasswordError
            })
        }
    }

    modalCloseHandler = () => {
        this.setState({
            isOpen: false,
            message: "",
            type: ""
        });
        if (this.state.modalSuccess === "success") {
            delete localStorage.tenant;
            delete localStorage.verified;
            delete localStorage.token;
            delete localStorage.email;
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="appContent">
                <Helmet>
                    <title>ChangePassword</title>
                    <meta name="description" content="Description of ChangePassword" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p><FormattedMessage {...messages.createNewPassword} children={(message => message)} /></p>
                        <h5><FormattedMessage {...messages.changePassword} children={(message => message)} /></h5>
                    </div>
                    <div className="flex-item fx-b30 text-right align-items-center"></div>
                </div>

                {this.state.isLoading ? <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView"/> : <React.Fragment>
                    <form className="contentForm" onSubmit={this.passwordChangeHandler}>
                        <h5 className="formHeader"><FormattedMessage {...messages.changePassword} children={(message => message)} /></h5>
                        <h6 className="text-center text-primary mb-3 f-12"><FormattedMessage {...messages.changePasswordNote} children={(message => message)} /></h6>
                        <div className="form-group">
                            <label className="form-label"><FormattedMessage {...messages.existingPassword} children={message => message} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                            <input
                                type="password"
                                className="form-control"
                                id="oldPassword"
                                onChange={this.inputChangeHandler}
                                required
                                autoFocus
                                style={{ borderColor: (this.state.errors.oldPassword) ? 'red' : '#c3c3c3' }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FormattedMessage {...messages.newPassword} children={message => message} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                onChange={this.inputChangeHandler}
                                required
                                style={{ borderColor: (this.state.errors.newPassword || this.state.errors.matchError) ? 'red' : '#c3c3c3' }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FormattedMessage {...messages.confirmPassword} children={message => message} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                onChange={this.inputChangeHandler}
                                required
                                style={{ borderColor: (this.state.errors.confirmPassword || this.state.errors.matchError) ? 'red' : '#c3c3c3' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label"></label>
                            <div className="fx-b80">
                                {this.state.errors.matchError || this.state.errorMessage ?
                                    <p className="f-13 text-red">
                                        <i className="far fa-exclamation-triangle mr-r-10"></i>{this.state.errorMessage ? this.state.errorMessage : <FormattedMessage {...messages.passwordMatchingError} children={(message => message)} />}
                                    </p> : ""
                                }
                            </div>
                        </div>

                        <div className="form-group justify-content-end mt-3">
                            <button id="changePassword" className="btn btn-danger">
                                <i className="far fa-check-circle"></i><FormattedMessage {...messages.changePassword} children={(message => message)} />
                            </button>
                        </div>
                    </form>
                </React.Fragment>}
                {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
            </div>
        );
    }
}

ChangePassword.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
    changePasswordSuccess: getChangePasswordSuccess(),
    changePasswordError: getChangePasswordFailure()
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        changePasswordHandler: (payload) => dispatch(changePasswordHandler(payload))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "changePassword", reducer });
const withSaga = injectSaga({ key: "changePassword", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(ChangePassword);
