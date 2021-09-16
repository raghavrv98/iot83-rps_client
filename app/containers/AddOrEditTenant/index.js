/**
 *
 * AddOrEditTenant
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { getSubmitFailure, getSubmitSuccess, getTenantByIdSuccess, getTenantByIdFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { onSubmitHandler, fetchTenantInfo } from './actions';
import MessageModal from "../../components/MessageModal/Loadable";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages"
import SkeletonLoader from "../../components/SkeletonLoader";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
/* eslint-disable react/prefer-stateless-function */

export class AddOrEditTenant extends React.Component {
    state = {
        isLoading: false,
        isOpen: false,
        mobilePhoneError: "",
        payload: {
            assignedMenus: [
                {}
            ],
            companyName: "",
            defaultAccount: true,
            description: "",
            email: "",
            mobile: "",
            tenantName: ""
        },
        phone: "",
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            { this.setState({ isLoading: true }) }
            this.props.fetchTenantInfo(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.submitSuccess && nextProps.submitSuccess !== this.props.submitSuccess) {
            this.setState({
                isLoading: false,
                isOpen: true,
                message: this.props.match.params.id ? <FormattedMessage {...messages.tenantUpdateMessage} children={(message => message)} /> : <FormattedMessage {...messages.tenantCreateMessage} children={(message => message)} />,
                type: "success",
                modalSuccess: "success",
            });
        }

        if (nextProps.tenantSuccess && nextProps.tenantSuccess !== this.props.tenantSuccess) {
            this.setState({
                payload: nextProps.tenantSuccess,
                phone: nextProps.tenantSuccess.mobile,
                isLoading: false
            })
        }
        
        ['submitFailure', 'tenantFailure'].map(val => {
            this.errorSetStateHandler(nextProps[val], this.props[val]);
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

    inputChangeHandler = event => {
        const payload = JSON.parse(JSON.stringify(this.state.payload));
        payload[event.target.id] = event.target.value;
        this.setState({
            payload
        })
    }

    onSubmitHandler = event => {
        event.preventDefault();
        let payload = JSON.parse(JSON.stringify(this.state.payload));
        payload.mobile = this.state.phone;
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
            this.props.history.push('/manageTenants')
        }
    }

    render() {
        return (
            <div className="appContent">
                <Helmet>
                    <title>AddOrEditTenant</title>
                    <meta name="description" content="Description of AddOrEditTenant" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p className="pd-l-30">
                            <span className="cursor-pointer" onClick={() => { this.props.history.push('/manageTenants'); }}>
                                <button className="btn btn-transparent">
                                    <i className="far fa-long-arrow-left"></i>
                                </button>
                                <FormattedMessage {...commonMessages.manageTenants} children={(message => message)} />
                            </span>
                        </p>
                        <h5>{this.props.match.params.id ?
                            <FormattedMessage {...messages.updateTenant} children={(message => message)} />
                            :
                            <FormattedMessage {...messages.createTenant} children={(message => message)} />}
                        </h5>
                    </div>
                    <div className="flex-item fx-b30 text-right align-items-center"></div>
                </div>

                {this.state.isLoading ? <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" /> : <React.Fragment>
                    <form className="contentForm" onSubmit={this.onSubmitHandler}>
                        <h5 className="formHeader">{this.props.match.params.id ? <FormattedMessage {...messages.editTenant} children={(message => message)} /> : <FormattedMessage {...messages.addTenant} children={(message => message)} />}</h5>
                        <div className="form-group">
                            <label className="form-label"><FormattedMessage {...commonMessages.companyName} /> <sup><i className="fas fa-asterisk text-danger f-8 pd-l-2" /></sup> :</label>
                            <input type="text" className="form-control" value={this.state.payload.companyName} id="companyName" onChange={this.inputChangeHandler} required autoFocus />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FormattedMessage {...commonMessages.tenantName} /> <sup><i className="fas fa-asterisk text-danger f-8 pd-l-2" /></sup> :</label>
                            <input disabled={this.props.match.params.id} type="text" minLength="5" className="form-control" value={this.state.payload.tenantName} id="tenantName" onChange={this.inputChangeHandler} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FormattedMessage {...commonMessages.email} /> <sup><i className="fas fa-asterisk text-danger f-8 pd-l-2" /></sup> :</label>
                            <input disabled={this.props.match.params.id} type="text" title="Email should contain '@' and '.'" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" className="form-control" value={this.state.payload.email} id="email" onChange={this.inputChangeHandler} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><FormattedMessage {...commonMessages.contact} /> <sup><i className="fas fa-asterisk text-danger f-8 pd-l-2" /></sup> :</label>
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
                            <label className="form-label"><FormattedMessage {...commonMessages.description} />  :</label>
                            <textarea rows="4" className="form-control" value={this.state.payload.description} id="description" onChange={this.inputChangeHandler}></textarea>
                        </div>
                        <div className="form-group justify-content-end mt-3">
                            <button id="saveTenant" className="btn btn-danger">
                                <i className="far fa-check-circle"></i>{this.props.match.params.id ? <FormattedMessage {...commonMessages.update} children={(message => message)} /> : <FormattedMessage {...commonMessages.save} children={(message => message)} />}
                            </button>
                        </div>
                    </form>
                </React.Fragment>}
                {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    submitSuccess: getSubmitSuccess(),
    submitFailure: getSubmitFailure(),
    tenantSuccess: getTenantByIdSuccess(),
    tenantFailure: getTenantByIdFailure()
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        onSubmitHandler: (payload) => dispatch(onSubmitHandler(payload)),
        fetchTenantInfo: (id) => dispatch(fetchTenantInfo(id))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditTenant", reducer });
const withSaga = injectSaga({ key: "addOrEditTenant", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(AddOrEditTenant);
