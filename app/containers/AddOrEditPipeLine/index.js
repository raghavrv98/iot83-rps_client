/**
 *
 * AddOrEditPipeLine
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MessageModal from '../../components/MessageModal/Loadable';
import { onSubmitHandler, getPipelineDetails } from './actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getSubmitSuccess, getSubmitError, getpipelineDetailsSuccess, getpipelineDetailsFailure } from './selectors';
import reducer from './reducer';
import saga from './saga';
import SkeletonLoader from '../../components/SkeletonLoader';
import messages from './messages';
import commonMessages from '../../messages';
import { cloneDeep } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class AddOrEditPipeLine extends React.Component {
	state = {
		isLoading: false,
		isOpen: false,
		payload: {
			name: '',
			processFluid: '',
			overallGeometry: '',
			other: '',
			Hot_HH_Limit: '',
			Cold_LL_Limit: '',
			maxAlarmDistance: '',
			TimeToFreeze_LL_Limit: '',
			FreezeBandHighLimit: '',
			Freeze_Temperature: '',
			FreezeBandLowLimit: '',
			anchorShiftThreshold: '',
			generateReport: false,
		},
		error: {
			coldHHlimitError: false,
			freezeBandLowError: false,
			freezeBandHighError: false,
			coldHHFreezeBandHighLimitError: false
		},
	};
	componentDidMount() {
		if (this.props.match.params.pipelineId) {
			this.setState({
				isLoading: true,
			}, () => this.props.getPipelineDetails(this.props.match.params.id, this.props.match.params.pipelineId));
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.submitSuccess && nextProps.submitSuccess !== this.props.submitSuccess) {
			this.setState({
				isLoading: false,
				isOpen: true,
				message: nextProps.submitSuccess,
				type: 'success',
				modalSuccess: 'success',
			});
		}
		if (
			nextProps.pipelineDetailsSuccess &&
			nextProps.pipelineDetailsSuccess !== this.props.pipelineDetailsSuccess
		) {
			this.setState({
				payload: nextProps.pipelineDetailsSuccess,
				isLoading: false,
			});
		}
		['submitError', 'pipelineDetailsFailure'].map(val => {
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
	modalCloseHandler = () => {
		this.setState({
			isOpen: false,
			message: '',
			type: '',
		});
		if (this.state.modalSuccess === 'success') {
			this.props.history.push(`/pipeLineList/${this.props.match.params.id}`);
		}
	};

	nameChangeHandler = event => {
		let payload = cloneDeep(this.state.payload);
		if ((event.target.id === 'anchorShiftThreshold') && event.target.value) {
			payload[event.target.id] = parseFloat(event.target.value);
		}
		else {
			if (event.target.type === "checkbox") {
				payload[event.target.id] = event.target.checked;
			}
			else {
				payload[event.target.id] = event.target.value;
			}
		}
		this.setState({
			payload,
			error: {
				coldHHlimitError: false,
				freezeBandLowError: false,
				freezeBandHighError: false,
				coldHHFreezeBandHighLimitError: false
			}
		});
	};

	formSubmitHandler = event => {
		event.preventDefault();
		let hotHHLimit = parseFloat(this.state.payload.Hot_HH_Limit);
		let coldHHLimit = parseFloat(this.state.payload.Cold_LL_Limit);
		let freezeBandHighLimit = parseFloat(this.state.payload.FreezeBandHighLimit);
		let freezeBandLowLimit = parseFloat(this.state.payload.FreezeBandLowLimit);
		let freezeTemperature = parseFloat(this.state.payload.Freeze_Temperature);
		if (
			// as per Dave Parman FreezeBandLowLimit + 1 <= Freeze_Temperature + 1 <= FreezeBandHighLimit + 1 <=
			// Cold LL + 1 <= Hot HH + 1
			hotHHLimit >= coldHHLimit + 1.0 &&
			coldHHLimit >= freezeBandHighLimit + 1.0 &&
			freezeBandHighLimit >= freezeTemperature + 1.0 &&
			freezeTemperature >= freezeBandLowLimit + 1.0
		) {
			this.setState({
				isLoading: true
			}, () => this.props.onSubmitHandler(this.state.payload, this.props.match.params.id, this.props.match.params.pipelineId));
		} else {
			if (hotHHLimit < coldHHLimit + 1.0) {
				this.setState({
					error: {
						coldHHlimitError: true,
					},
				});
			}

			if (coldHHLimit < freezeBandHighLimit + 1.0) {
				this.setState({
					error: {
						coldHHFreezeBandHighLimitError: true,
					},
				});
			}

			if (freezeTemperature < freezeBandLowLimit + 1.0) {
				this.setState({
					error: {
						freezeBandLowError: true,
					}
				})
			}
			if (freezeBandHighLimit < freezeTemperature + 1.0) {
				this.setState({
					error: {
						freezeBandHighError: true,
					}
				})
			}
		}
	};

	render(ctx) {
		return (
			<div className="appContent">
				<Helmet>
					<title>AddOrEditPipeLine</title>
					<meta name="description" content="Description of AddOrEditPipeLine" />
				</Helmet>

				<div className="pageBreadcrumb">
					<div className="flex-item fx-b70">
						<p className="pd-l-30">
							<span className="cursor-pointer" onClick={() => { this.props.history.push(`/pipeLineList/${this.props.match.params.id}`); }}>
								<button className="btn btn-transparent">
									<i className="far fa-long-arrow-left" />
								</button>
								<FormattedMessage {...commonMessages.managePipeline} children={(message => message)} />
							</span>
						</p>
						<h5>
							{this.props.match.params.pipelineId ? <FormattedMessage {...messages.editpipeline} children={(message => message)} /> : <FormattedMessage {...messages.addnewpipeline} children={(message => message)} />}
						</h5>
					</div>
				</div>
				{this.state.isLoading ? <SkeletonLoader skeleton="skeletonNestedFormUpload" mode="fullView" /> :
					<React.Fragment>
						<form className="contentForm" onSubmit={this.formSubmitHandler}>
							<h5 className="formHeader">
								{this.props.match.params.pipelineId ? <FormattedMessage {...messages.editpipeline} children={(message => message)} /> : <FormattedMessage {...messages.addnewpipeline} children={(message => message)} />}
								<div className="headerItemRight">
									<div className="switchButtonLabel">
										<label className="switchLabelText"><FormattedMessage {...messages.generateReport} children={(message => message)} /> :</label>
										<label className="switchLabel">
											<input
												type="checkbox"
												id="generateReport"
												checked={this.state.payload.generateReport}
												onChange={this.nameChangeHandler}
											/>
											<span className="switchMark" />
										</label>
									</div>
								</div>
							</h5>
							<div className="form-group">
								<label className="form-label">
									<FormattedMessage {...messages.pipelinename} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<input
									type="text"
									className="form-control"
									id="name"
									value={this.state.payload.name}
									onChange={this.nameChangeHandler}
									required
									autoFocus
								/>
							</div>

							<div className="form-group">
								<label className="form-label">
									<FormattedMessage {...commonMessages.processfluid} children={(message => message)}/>:
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<input
									type="text"
									className="form-control"
									id="processFluid"
									value={this.state.payload.processFluid}
									onChange={this.nameChangeHandler}
									required
								/>
							</div>

							<div className="form-group position-relative">
								<label className="form-label">
									<FormattedMessage {...commonMessages.hotHHLimit} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										id="Hot_HH_Limit"
										value={this.state.payload.Hot_HH_Limit}
										onChange={this.nameChangeHandler}
										min="0"
										max="250.0"
										required
									/>

									<div className="input-group-append">
										<span className="input-group-text">&#8451;</span>
									</div>
								</div>


							</div>

							<div className="form-group position-relative">
								<label className="form-label">
									<FormattedMessage {...commonMessages.coldLLLimit} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										id="Cold_LL_Limit"
										value={this.state.payload.Cold_LL_Limit}
										onChange={this.nameChangeHandler}
										min="-120.0"
										max="250.0"
										required
									/>
									<div className="input-group-append">
										<span className="input-group-text">&#8451;</span>
									</div>
								</div>

								{this.state.error.coldHHlimitError ? (
									<span className="inputErrorMsg">
										<FormattedMessage {...messages.coldHHlimitError} children={(message => message)} />
									</span>
								) : null}

							</div>

							<div className="form-group">
								<label className="form-label">
									<FormattedMessage {...commonMessages.maxAlarmDistance} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										id="maxAlarmDistance"
										value={this.state.payload.maxAlarmDistance}
										min="1"
										onChange={this.nameChangeHandler}
										required
									/>
									<div className="input-group-append">
										<span className="input-group-text"><FormattedMessage {...commonMessages.m} children={(message => message)}/></span>
									</div>
								</div>
							</div>

							<div className="form-group position-relative">
								<label className="form-label">
									<FormattedMessage {...commonMessages.FreezeBandLowLimit} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										id="FreezeBandLowLimit"
										value={this.state.payload.FreezeBandLowLimit}
										min="-120.0"
										max="250.0"
										onChange={this.nameChangeHandler}
										required
									/>
									<div className="input-group-append">
										<span className="input-group-text">&#8451;</span>
									</div>
								</div>
								{this.state.error.freezeBandLowError ? (
									<span className="inputErrorMsg">
										<FormattedMessage {...messages.freezeBandLowError} children={(message => message)} />
									</span>
								) : null}
							</div>

							<div className="form-group position-relative">
								<label className="form-label">
									<FormattedMessage {...commonMessages.freezeTemperature} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										id="Freeze_Temperature"
										value={this.state.payload.Freeze_Temperature}
										min="-120.0"
										max="250.0"
										onChange={this.nameChangeHandler}
										required
									/>
									<div className="input-group-append">
										<span className="input-group-text">&#8451;</span>
									</div>
								</div>
								{this.state.error.freezeTemperatureError ? (
									<span className="inputErrorMsg">
										<FormattedMessage {...messages.freezeTemperaturelimitError} children={(message => message)} />
									</span>
								) : null}

								{this.state.error.freezeBandHighError ? (
									<span className="inputErrorMsg">
										<FormattedMessage {...messages.freezeBandHighError} children={(message => message)} />
									</span>
								) : null}
							</div>

							<div className="form-group position-relative">
								<label className="form-label">
									<FormattedMessage {...commonMessages.FreezeBandHighLimit} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										id="FreezeBandHighLimit"
										value={this.state.payload.FreezeBandHighLimit}
										min="-120.0"
										max="250.0"
										onChange={this.nameChangeHandler}
										required
									/>
									<div className="input-group-append">
										<span className="input-group-text">&#8451;</span>
									</div>
								</div>

								{this.state.error.coldHHFreezeBandHighLimitError ? (
									<span className="inputErrorMsg">
										<FormattedMessage {...messages.coldHHFreezeBandHighLimitError} children={(message => message)} />
									</span>
								) : null}
							</div>

							<div className="form-group position-relative">
								<label className="form-label">
									<FormattedMessage {...commonMessages.timeToFreezeLLLimit} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										id="TimeToFreeze_LL_Limit"
										value={this.state.payload.TimeToFreeze_LL_Limit}
										min="2.0"
										max="16.0"
										step="any"
										onChange={this.nameChangeHandler}
										required
									/>
									<div className="input-group-append">
										<span className="input-group-text"><FormattedMessage {...commonMessages.hours} children={(message => message)}/></span>
									</div>
								</div>
							</div>

							<div className="form-group">
								<label className="form-label">
									<FormattedMessage {...messages.anchorShiftThreshold} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<input
									type="number"
									className="form-control"
									id="anchorShiftThreshold"
									value={this.state.payload.anchorShiftThreshold}
									onChange={this.nameChangeHandler}
									step="any"
									required
								/>
							</div>
							<div className="form-group">
								<label className="form-label">
									<FormattedMessage {...messages.geometry} children={(message => message)}/>
									<sup className="mr-r-7">
										<i className="fas fa-asterisk" />
									</sup>
									:
								</label>
								<textarea
									className="form-control"
									type="text"
									rows="3"
									id="overallGeometry"
									value={this.state.payload.overallGeometry}
									onChange={this.nameChangeHandler}
									required
								/>
							</div>
							<div className="form-group">
								<label className="form-label">
									<FormattedMessage {...messages.otherinfo} children={(message => message)}/>
								</label>
								<textarea
									className="form-control"
									type="text"
									rows="3"
									id="other"
									value={this.state.payload.other}
									onChange={this.nameChangeHandler}
								/>
							</div>
							<div className="flex">
								<div className="fx-b20" />
								<div className="fx-b80">
									<p className="note">
										<span className="noteText"> <FormattedMessage {...commonMessages.note} children={(message => message)} /> : </span>
										<b><FormattedMessage {...messages.note1Bold} children={(message => message)} /></b> <FormattedMessage {...messages.note1} children={(message => message)} />
									</p>
									<p className="note pd-l-40">
										<b><FormattedMessage {...messages.note2Bold} children={(message => message)} /></b> <FormattedMessage {...messages.note2} children={(message => message)} />
									</p>
								</div>
							</div>
							<div className="form-group justify-content-end mt-3">
								<button type="submit" id="savePipeline" className="btn btn-danger">
									<i className="far fa-check-circle" />
									{this.props.match.params.pipelineId ? (
										<FormattedMessage {...commonMessages.update} children={(message => message)} />
									) : (
											<FormattedMessage {...commonMessages.save} children={(message => message)} />
										)}
								</button>
							</div>
						</form>
					</React.Fragment>}
				{this.state.isOpen ? (
					<MessageModal
						type={this.state.type}
						message={this.state.message}
						onClose={this.modalCloseHandler}
					/>
				) : null}
			</div>
		);
	}
}

AddOrEditPipeLine.propTypes = {
	dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	submitSuccess: getSubmitSuccess(),
	submitError: getSubmitError(),
	pipelineDetailsSuccess: getpipelineDetailsSuccess(),
	pipelineDetailsFailure: getpipelineDetailsFailure(),
});

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		onSubmitHandler: (payload, id, pipelineId) => dispatch(onSubmitHandler(payload, id, pipelineId)),
		getPipelineDetails: (id, pipelineId) => dispatch(getPipelineDetails(id, pipelineId)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: 'addOrEditPipeLine', reducer });
const withSaga = injectSaga({ key: 'addOrEditPipeLine', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(AddOrEditPipeLine);
