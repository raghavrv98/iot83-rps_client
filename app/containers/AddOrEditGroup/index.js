/**
 *
 * AddOrEditGroup
 *
 */

import React from "react";
import { Helmet } from "react-helmet";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { onSubmitHandler, getGroupDetails } from './actions';
import { getSubmitSuccess, getSubmitError, getGroupDetailsSuccess, getGroupDetailsError } from './selectors';
import reducer from "./reducer";
import saga from "./saga";
import MessageModal from "../../components/MessageModal/Loadable";
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commonMessage from '../../messages';
import SkeletonLoader from "../../components/SkeletonLoader";
import { cloneDeep } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditGroup extends React.Component {
    state = {
        isLoading: false,
        isOpen: false,
        payload: {
            description: "",
            name: "",
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({
                isLoading: true
            }, () => this.props.getGroupDetails(this.props.match.params.id))
        }
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.submitSuccess && nextprops.submitSuccess !== this.props.submitSuccess) {
            this.setState({
                isLoading: false,
                isOpen: true,
                message: this.props.match.params.id ?
                    <FormattedMessage {...messages.groupUpdate} /> :
                    <FormattedMessage {...messages.groupAdded} />,
                type: "success",
                modalSuccess: "success"
            });
        }

        if (nextprops.groupDetails && nextprops.groupDetails !== this.props.groupDetails) {
            this.setState({
                isLoading: false,
                payload: nextprops.groupDetails
            })
        }

        ['submitError', 'groupDetailsError'].map(val => {
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

    inputChangeHandler = event => {
        let payload = cloneDeep(this.state.payload);
        payload[event.target.id] = event.target.value;
        this.setState({
            payload
        })
    }

    onSubmitHandler = event => {
        event.preventDefault();
        this.setState({
            isLoading: true
        }, () => this.props.onSubmitHandler(this.state.payload, this.props.match.params.id))
    }

    modalCloseHandler = () => {
        this.setState({
            isOpen: false,
            message: "",
            type: ""
        });
        if (this.state.modalSuccess === "success") {
            this.props.history.push('/manageGroups')
        }
    }

    render() {
        return (
            <div className="appContent">
                <Helmet>
                    <title>AddOrEditGroup</title>
                    <meta name="description" content="Description of AddOrEditGroup" />
                </Helmet>

                <div className="pageBreadcrumb">
                    <div className="flex-item fx-b70">
                        <p className="pd-l-30">
                            <span className="cursor-pointer" onClick={() => { this.props.history.push('/manageGroups'); }}>
                                <button className="btn btn-transparent">
                                    <i className="far fa-long-arrow-left"></i>
                                </button>
                                <FormattedMessage {...messages.title} children={(message => message)} />
                            </span>
                        </p>
                        <h5>
                            {this.props.match.params.id ? <FormattedMessage {...messages.headingEdit} />
                                : <FormattedMessage {...messages.titleCreateGroup} />}
                        </h5>
                    </div>
                    <div className="flex-item fx-b30 text-right" />
                </div>

                {this.state.isLoading ? <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" /> :
                    <React.Fragment>
                        <form className="contentForm" onSubmit={this.onSubmitHandler}>
                            <h5 className="formHeader">{this.props.match.params.id ? <FormattedMessage {...messages.headingEdit} children={(message => message)} /> : <FormattedMessage {...messages.headingAdd} children={(message => message)} />}</h5>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.formName} /> :<sup><i className="fas fa-asterisk" /></sup></label>
                                <input type="text" className="form-control" id="name" disabled={this.state.payload.name == "DEFAULT"} value={this.state.payload.name} onChange={this.inputChangeHandler} required autoFocus />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><FormattedMessage {...messages.formDescription} /> :</label>
                                <textarea rows="4" className="form-control" id="description" value={this.state.payload.description} onChange={this.inputChangeHandler}></textarea>
                            </div>
                            <div className="form-group justify-content-end mt-3">
                                <button id="saveGroup" className="btn btn-danger">
                                    <i className="far fa-check-circle"></i>
                                    {this.props.match.params.id ? <FormattedMessage {...commonMessage.update} children={(message => message)} />
                                        : <FormattedMessage {...commonMessage.save} children={(message => message)} />}
                                </button>
                            </div>
                        </form>
                    </React.Fragment>
                }
                {this.state.isOpen ?
                    <MessageModal
                        type={this.state.type}
                        message={this.state.message}
                        onClose={this.modalCloseHandler}
                    /> : null}
            </div>
        );
    }
}


export const mapStateToProps = createStructuredSelector({
    submitSuccess: getSubmitSuccess(),
    submitError: getSubmitError(),
    groupDetails: getGroupDetailsSuccess(),
    groupDetailsError: getGroupDetailsError()
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        onSubmitHandler: (payload, id) => dispatch(onSubmitHandler(payload, id)),
        getGroupDetails: (id) => dispatch(getGroupDetails(id))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const withReducer = injectReducer({ key: "addOrEditGroup", reducer });
const withSaga = injectSaga({ key: "addOrEditGroup", saga });

export default compose(
    withReducer,
    withSaga,
    withConnect
)(AddOrEditGroup);
