/**
 *
 * InstallLicence
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";


/* eslint-disable react/prefer-stateless-function */
class InstallLicence extends React.Component {
	state = {
		licenseKey: ""
	}
	licenceKeyHandler = event => {
		let licenseKey = event.target.value
		this.setState({
			licenseKey
		})
	}
	render() {
		return (
			<div className="modal fade show d-block">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">
								<FormattedMessage {...messages.updateLicence} children={(message => message)} />
								<button type="button" onClick={() => { this.props.onClose() }} className="close"> &times;</button>
							</h4>
						</div>
						<div className="modal-body pd-30">
							<div className="flex">
								<div className="upgrade-content">
									<h6>
										<span><i className="far fa-building"></i></span>
										<FormattedMessage {...commonMessages.companyName} children={(message => message)} />
									</h6>
									<p>{this.props.companyName}</p>
								</div>
								<div className="upgrade-content">
									<h6>
										<span><i className="far fa-user"></i></span>
										<FormattedMessage {...commonMessages.tenant} children={(message => message)} />
									</h6>
									<p>{this.props.tenant}</p>
								</div>
								<div className="upgrade-content">
									<h6>
										<span><i className="far fa-id-badge"></i></span>
										<FormattedMessage {...messages.licenceName} children={(message => message)} />
									</h6>
									<p>{this.props.licenseName}</p>
								</div>
								<div className="upgrade-content fx-b100">
									<h6>
										<span><i className="far fa-key"></i></span>
										<FormattedMessage {...commonMessages.licenseKey} children={(message => message)} />
										</h6>
									<textarea onChange={this.licenceKeyHandler} value={this.state.licenseKey} className="form-control" rows="4"></textarea>
								</div>
								<div className="fx-b100 text-right">
									<button type="button" disabled={this.state.licenseKey.length === 0} onClick={() => { this.props.installHandlerComponent(this.state.licenseKey) }} className="btn btn-danger">
										<i className="far fa-download"></i>
										<FormattedMessage {...messages.install} children={(message => message)} />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

InstallLicence.propTypes = {};

export default InstallLicence;
