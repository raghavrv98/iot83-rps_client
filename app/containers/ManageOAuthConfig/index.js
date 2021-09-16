/**
 *
 * ManageOAuthConfig
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
import {
	getAuthConfigDetails,
	onSubmitHandler,
	deleteConfig
} from './actions';
import {
	authConfigDetailsSuccess,
	authConfigDetailsFailure,
	submitRequestSuccess,
	submitRequestFailure,
	deleteConfigSuccess,
	deleteConfigFailure
} from './selectors';
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import MessageModal from "../../components/MessageModal/Loadable";
import SkeletonLoader from "../../components/SkeletonLoader";
import commonMessages from '../../messages';
import { cloneDeep } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class ManageOAuthConfig extends React.Component {

	state = {
		isLoading: true,
		isOpen: false,
		payload: {},
	}


	componentDidMount() {
		this.props.getAuthConfigDetails()
	}

	componentWillReceiveProps(nextprops) {

		if (nextprops.authConfigDetailsSuccess && nextprops.authConfigDetailsSuccess !== this.props.authConfigDetailsSuccess) {
			let payload = nextprops.authConfigDetailsSuccess
			payload.clientSecret = "",
				this.setState({
					isLoading: false,
					payload: nextprops.authConfigDetailsSuccess
				})
		}

		if (nextprops.submitRequestSuccess && nextprops.submitRequestSuccess !== this.props.submitRequestSuccess) {
			this.setState({
				isLoading: false,
				isOpen: true,
				message: "Config Updated Successfully",
				type: "success",
			}, () => this.props.getAuthConfigDetails());
		}

		if (nextprops.deleteConfigSuccess && nextprops.deleteConfigSuccess !== this.props.deleteConfigSuccess) {
			this.setState({
				isLoading: false,
				isOpen: true,
				message: <FormattedMessage {...messages.configDeleteSuccessMessage} children={(message => message)} />,
				type: "success"
			}, () => this.props.getAuthConfigDetails())
		}

		['authConfigDetailsFailure', 'submitRequestFailure', 'deleteConfigFailure'].map(val => {
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

	nameChangeHandler = event => {
		let payload = cloneDeep(this.state.payload);
		payload[event.target.id] = event.target.value;
		this.setState({
			payload,
		});
	};

	modalCloseHandler = () => {
		this.setState({
			isOpen: false,
			message: "",
			type: ""
		})
	};


	submitHandler = event => {
		event.preventDefault()
		let payload = cloneDeep(this.state.payload);
		this.props.onSubmitHandler(payload)
		this.setState({ isLoading: true })
	}

	confirmModalHandler(id) {
		this.setState({
			isOpen: true,
			message: <FormattedMessage {...messages.confirmDeleteMessage} children={(message => message)} />,
			type: "confirm",
			deleteConfigId: id
		});
	}


	deleteConfigHandler = (id) => {
		this.setState({
			isLoading: true,
			isOpen: false,
			message: "",
			type: ""
		}, () => {
			this.props.deleteConfig(id)
		})
	}



	render() {
		return (
			<div className="appContent">
				<Helmet>
					<title>ManageOAuthConfig</title>
					<meta name="description" content="Description of ManageOAuthConfig" />
				</Helmet>
				<div className="pageBreadcrumb">
					<div className="flex-item fx-b70">
						<p><FormattedMessage {...commonMessages.manageOAuth} children={(message => message)} /></p>
						<h5><FormattedMessage {...messages.OAuthConfiguration} children={(message => message)} /></h5>
					</div>
					<div className="flex-item fx-b30 text-right align-items-center" />
				</div>
				{this.state.isLoading ?
					<SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" />
					:
					<form onSubmit={this.submitHandler} className="contentForm">
						<h5 className="formHeader">
							<FormattedMessage {...messages.OAuthConfiguration} children={(message => message)} />

					</h5>
						<div className="form-group">
							<label className="form-label">
								<FormattedMessage {...messages.selectProvider} children={(message => message)} />
									<sup className="mr-r-7">
									<i className="fas fa-asterisk" />
								</sup>
								:
								</label>
							<select id="oauthProvider" onChange={this.nameChangeHandler} value={this.state.payload.oauthProvider} className="form-control" required>
								<option value="">Select Auth Provider</option>
								<option value="Auth0">Auth0</option>
								<option value="Google">Google</option>
								<option value="Microsoft">Microsoft</option>
								<option value="Facebook">Facebook</option>
							</select>
						</div>
						<div className="form-group">
							<label className="form-label">
								<FormattedMessage {...messages.clientId} children={(message => message)} />
									<sup className="mr-r-7">
									<i className="fas fa-asterisk" />
								</sup>
								:
								</label>
							<input
								type="text"
								className="form-control"
								id="clientId"
								value={this.state.payload.clientId}
								onChange={this.nameChangeHandler}
								required
							/>
						</div>
						<div className="form-group">
							<label className="form-label">
								<FormattedMessage {...messages.clientSecret} children={(message => message)} />
									<sup className="mr-r-7">
									<i className="fas fa-asterisk" />
								</sup>
								:
								</label>
							<input
								type="password"
								className="form-control"
								id="clientSecret"
								value={this.state.payload.clientSecret}
								onChange={this.nameChangeHandler}
								required
							/>
						</div>

						<div className="form-group">
							<label className="form-label">
								<FormattedMessage {...messages.redirectURL} children={(message => message)} />
									<sup className="mr-r-7">
									<i className="fas fa-asterisk" />
								</sup>
								:
								</label>
							<input
								type="text"
								className="form-control"
								id="redirectUri"
								value={this.state.payload.redirectUri}
								onChange={this.nameChangeHandler}
								required
							/>
						</div>
						<div className="form-group">
							<label className="form-label">
								<FormattedMessage {...messages.wellKnownConfig} children={(message => message)} />
									<sup className="mr-r-7">
									<i className="fas fa-asterisk" />
								</sup>
								:
								</label>
							<input
								type="text"
								className="form-control"
								id="wellKnownConfig"
								value={this.state.payload.wellKnownConfig}
								onChange={this.nameChangeHandler}
								required
							/>
						</div>
						<div className="form-group">
							<label className="form-label">
								<FormattedMessage {...messages.responseType} children={(message => message)} />
									<sup className="mr-r-7">
									<i className="fas fa-asterisk" />
								</sup>
								:
								</label>
							<input
								type="text"
								className="form-control"
								id="respType"
								value={this.state.payload.respType}
								onChange={this.nameChangeHandler}
								disabled={true}
								required
							/>
						</div>
						<div className="form-group">
							<label className="form-label">
								<FormattedMessage {...messages.scope} children={(message => message)} />
									<sup className="mr-r-7">
									<i className="fas fa-asterisk" />
								</sup>
								:
								</label>
							<input
								type="text"
								className="form-control"
								id="scope"
								value={this.state.payload.scope}
								onChange={this.nameChangeHandler}
								disabled={true}
								required
							/>
						</div>

						<div className="form-group justify-content-end mt-3">
							<button id="saveConfig" className="btn btn-danger mr-r-5">
								<i className="far fa-check-circle" />
									<FormattedMessage {...commonMessages.save} children={(message => message)} />
								</button>
							<button type="button" disabled={this.state.payload.id === ""} id={this.state.payload.id} onClick={() => this.confirmModalHandler(this.state.payload.id)} className="btn btn-secondary">
								<i className="far fa-trash-alt" />
									<FormattedMessage {...commonMessages.delete} children={(message => message)} />
								</button>
						</div>
					</form>
				}
				{this.state.isOpen ?
					<MessageModal
						type={this.state.type}
						message={this.state.message}
						onConfirm={() => this.deleteConfigHandler(this.state.deleteConfigId)}
						onClose={this.modalCloseHandler} /> : null}
			</div>
		);
	}
}


const mapStateToProps = createStructuredSelector({
	authConfigDetailsSuccess: authConfigDetailsSuccess(),
	authConfigDetailsFailure: authConfigDetailsFailure(),
	submitRequestSuccess: submitRequestSuccess(),
	submitRequestFailure: submitRequestFailure(),
	deleteConfigSuccess: deleteConfigSuccess(),
	deleteConfigFailure: deleteConfigFailure()
});


export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		getAuthConfigDetails: () => dispatch(getAuthConfigDetails()),
		onSubmitHandler: (payload) => dispatch(onSubmitHandler(payload)),
		deleteConfig: (id) => dispatch(deleteConfig(id))
	};
}



const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: "manageOAuthConfig", reducer });
const withSaga = injectSaga({ key: "manageOAuthConfig", saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(ManageOAuthConfig);
