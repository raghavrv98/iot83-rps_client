/**
 *
 * MessageModal
 *
 */

import React from "react";
import { FormattedMessage } from "react-intl";
import commonMessages from "../../messages";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function MessageModal(props) {
	return <div className="modal fade show d-block" id="modal">
		<div className="modal-dialog">
			<div className="modal-content">
				{props.type === "confirm" ?
					<div className="modal-body p-4 pd-t-30">
						<span className="close" onClick={() => { props.onClose() }}><i className="far fa-times"></i></span>
						<h5 className="text-center mb-5">{props.message}</h5>
						<div className="text-right">
							<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { props.onConfirm() }}><FormattedMessage {...commonMessages.confirmButton} /></button>
							<button type="button" className="btn btn-secondary mr-l-10" data-dismiss="modal" onClick={() => { props.onClose() }}><FormattedMessage {...commonMessages.cancelButton} /></button>
						</div>
					</div> :
					<div className="modal-body p-0 text-center position-relative">
						{props.type === "success" ?
							<div className="alert alert-success mb-0 p-5">
								<span className="close" onClick={() => { props.onClose() }}><i className="far fa-times"></i></span>
								<p className="text-success m-0 f-16">{props.message}</p>
							</div>
							:
							<div className="alert alert-danger mb-0 p-5">
								<span className="close" onClick={() => { props.onClose() }} ><i className="far fa-times"></i></span>
								<p className="text-danger m-0 f-16">{props.message}</p>
							</div>
						}
					</div>
				}
			</div>
		</div>
	</div>;
}

MessageModal.propTypes = {};

export default MessageModal;
