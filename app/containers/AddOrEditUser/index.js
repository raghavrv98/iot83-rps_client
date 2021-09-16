/**
 *
 * AddOrEditUser
 *
 */

import React from "react";
import { Helmet } from "react-helmet";
import { compose } from "redux";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { onSubmitHandler, getUserDetails, getAllRole, getAllGroup } from './actions';
import {
    getSubmitSuccess, getSubmitError,
    getUserDetailsSuccess, getUserDetailsError,
    getAllGroupSuccess, getAllGroupError,
    getAllRolesSccess, getAllRolesError
} from './selectors';
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import saga from "./saga";
import MessageModal from "../../components/MessageModal/Loadable";
import SideNav from '../../components/SideNav/index'
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commonMessage from '../../messages';
import SkeletonLoader from "../../components/SkeletonLoader";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { clearLocalStorage } from "../../utils/commonUtils";

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditUser extends React.Component {
    state = {
        roles: [],
        isLoading: false,
        isOpen: false,
        groups: [],
        payload: {
            company: "pmmp ",
            compartments: [],
            email: "",
            firstName: "",
            lastName: "",
            mobilePhone: "",
            roles: [],
            title: "",
        },
        mobilePhoneError: "",
        phone: ""
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.getGroups();
        this.props.getRoles();
        if (this.props.match.params.id) {
            this.props.getUserDetails(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.submitSuccess && nextprops.submitSuccess !== this.props.submitSuccess) {
            this.setState({
                isLoading: false,
                isOpen: true,
                message: this.props.match.params.id ? <FormattedMessage {...messages.updateSuccessMessage} children={message => message} /> : <FormattedMessage {...messages.addSuccessMessage} children={message => message} />,
                type: "success",
                modalSuccess: "success",
            });
        }

        if (nextprops.userDetails && nextprops.userDetails !== this.props.userDetails) {
            this.setState({
                isLoading: false,
                payload: nextprops.userDetails,
                phone: nextprops.userDetails.mobilePhone
            })
        }

        if (nextprops.roles && nextprops.roles !== this.props.roles) {
            this.setState({
                isLoading: false,
                roles: nextprops.roles
            })
        }

        if (nextprops.groups && nextprops.groups !== this.props.groups) {
            this.setState({
                isLoading: false,
                groups: nextprops.groups
            })
        }

        ['submitError', 'userDetailsError', 'rolesError', 'groupsError'].map(val => {
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

    inputChangeHandler = (event) => {
        let payload = JSON.parse(JSON.stringify(this.state.payload));
        if (event.target.id === "roles" || event.target.id === "compartments") {
            payload[event.target.id] = [];
            payload[event.target.id].push(event.target.value);
        } else {
            payload[event.target.id] = event.target.value;
        }
        this.setState({
            payload
        })
    }

    onSubmitHandler = event => {
        event.preventDefault();
        let payload = JSON.parse(JSON.stringify(this.state.payload));
        payload.mobilePhone = this.state.phone;
        if (!this.state.mobilePhoneError) {
            this.setState({ isLoading: true })
            this.props.onSubmitHandler(payload, this.props.match.params.id);
        }
    }

    modalCloseHandler = () => {
        this.setState({
            isOpen: false,
            message: "",
            type: ""
        });
        if (this.state.modalSuccess === "success") {
            if (this.props.match.params.id == localStorage['userId']) {
                clearLocalStorage();
            } else {
                this.props.history.push('/manageUsers')
            }
        }
    }

    render() {
        let isDisabled = false;
        if (this.props.match.params.id) {
            if (this.state.payload.roles[0] && this.state.roles.length > 0) {
                isDisabled = this.state.roles.find(role => role.id === this.state.payload.roles[0]).name === "ACCOUNT_ADMIN" ? true : false
            }
        }
        return (
            <div className="appContent">
                <Helmet>
                    <title>AddOrEditUser</title>
                    <meta name="description" content="Description of AddOrEditUser" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p className="pd-l-30">
                            <span className="cursor-pointer" onClick={() => { this.props.history.push('/manageUsers'); }}>
                                <button className="btn btn-transparent">
                                    <i className="far fa-long-arrow-left"></i>
                                </button>
                                <FormattedMessage {...messages.title} children={(message => message)} />
                            </span>
                        </p>
                        <h5>
                            {this.props.match.params.id ? <FormattedMessage {...messages.headingEdit} children={(message => message)} /> :
                                <FormattedMessage {...messages.titleCreateUser} children={(message => message)} />}</h5>
                    </div>
                    <div className="flex-item fx-b30 text-right align-items-center"></div>
                </div>

                {this.state.isLoading ?
                    <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" /> :
                    <React.Fragment>
                        <form className="contentForm" onSubmit={this.onSubmitHandler}>
                            <h5 className="formHeader">{this.props.match.params.id ? <FormattedMessage {...messages.headingEdit} children={(message => message)} /> : <FormattedMessage {...messages.headingAdd} children={(message => message)} />}</h5>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.formName} children={message => message} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                                <input type="text" className="form-control" id="firstName" value={this.state.payload.firstName} onChange={this.inputChangeHandler} required autoFocus />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.formLastName} children={message => message} /> :</label>
                                <input type="text" className="form-control" id="lastName" value={this.state.payload.lastName} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.formMobile} children={message => message} /> :</label>
                                <PhoneInput
                                    className="form-control pd-5"
                                    value={this.state.phone}
                                    error={this.state.mobilePhoneError}
                                    onChange={phone => {
                                        let mobilePhoneError = "Please input valid phone number"
                                        if (isValidPhoneNumber(phone)) {
                                            mobilePhoneError = ""
                                        }
                                        this.setState({ phone, mobilePhoneError })
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.fromEmail} children={message => message} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                                <input type="text" disabled={this.props.match.params.id} className="form-control" id="email" value={this.state.payload.email} onChange={this.inputChangeHandler} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.formTitle} children={message => message} /> :</label>
                                <input type="text" className="form-control" id="title" value={this.state.payload.title} onChange={this.inputChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label className="form-label pt-0"><FormattedMessage {...messages.formRole} children={message => message} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                                <div className="flex-item fx-b80">
                                    <div className="flex">
                                        {this.state.roles && this.state.roles.map((temp, index) => (<div className="fx-b25" key={index}>
                                            <label className="customRadioButton">
                                                <input disabled={this.state.payload.createdBy === "SYSTEM"} required type="radio" name="roles" value={temp.id} checked={this.state.payload.roles.some(obj => obj === temp.id)} id="roles" onChange={this.inputChangeHandler} />
                                                <span className="radiomark" />
                                                <span className="radioText">{temp.name}</span>
                                            </label>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label pt-0"><FormattedMessage {...messages.formGroup} children={message => message} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                                <div className="flex-item fx-b80">
                                    <div className="flex">
                                        {this.state.groups && this.state.groups.map((temp, index) => (<div className="fx-b25" key={index}>
                                            <label className="customRadioButton">
                                                <input disabled={this.state.payload.createdBy === "SYSTEM"} required type="radio" name="compartments" value={temp.id} checked={this.state.payload.compartments.some(obj => obj === temp.id)} id="compartments" onChange={this.inputChangeHandler} />
                                                <span className="radiomark" />
                                                <span className="radioText">{temp.name}</span>
                                            </label>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group justify-content-end mt-3">
                                <button className="btn btn-danger">
                                    <i className="far fa-check-circle"></i>
                                    {this.props.match.params.id ? <FormattedMessage {...commonMessage.update} children={(message => message)} />
                                        : <FormattedMessage {...commonMessage.save} children={(message => message)} />}
                                </button>
                            </div>
                        </form>
                    </React.Fragment>
                }
                {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
            </div >
        );
    }
}


const mapStateToProps = createStructuredSelector({
    submitSuccess: getSubmitSuccess(),
    submitError: getSubmitError(),
    userDetails: getUserDetailsSuccess(),
    userDetailsError: getUserDetailsError(),
    roles: getAllRolesSccess(),
    rolesError: getAllRolesError(),
    groups: getAllGroupSuccess(),
    groupsError: getAllGroupError()
});

export function mapDispatchToProps(dispatch) {
    return {
        onSubmitHandler: (payload, id) => dispatch(onSubmitHandler(payload, id)),
        getUserDetails: (id) => dispatch(getUserDetails(id)),
        getGroups: () => dispatch(getAllGroup()),
        getRoles: () => dispatch(getAllRole())
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditUser", reducer });
const withSaga = injectSaga({ key: "addOrEditUser", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(AddOrEditUser);
