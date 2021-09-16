/**
 *
 * DatabaseAndBackUps
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getDatabase, getDatabaseFailure, getTenant, getTenantFailure, createBackupListSucess, createBackupListFailure, activityStatus, activityStatusFailure } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import commonMessages from '../../messages';
import Select from 'react-select';
import { getDataBaseList, createBackupPayload, getTenantList, getActivityStatus } from "./actions"
import SkeletonLoader from '../../components/SkeletonLoader';
import MessageModal from "../../components/MessageModal/Loadable";
import ModalLoader from "../../components/ModalLoader";
import NoDataFound from "../../components/NoDataFound";
import $ from 'jquery';
import { capitalizeFirstLetter } from '../../utils/commonUtils';
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
export class DatabaseAndBackUps extends React.Component {
	state = {
		isOpen: false,
		databaseDetails: "",
		isFetching: true,
		selectedDb: "mysql",
		backupType: 'full',
		timing: 'now',
		scheduleBackup: "",
		options: [],
		selectedOption: "",
		weekOptions: ['Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'],
		backupData: "",
		activityStatusDetails: "",
		ismodalloader: true,
		host: window.API_URL,
	};

	componentWillMount() {
		this.props.getDataBaseList();
		this.props.getTenantList();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.getDatabase && nextProps.getDatabase !== this.props.getDatabase) {
			this.setState({
				isFetching: false,
				databaseDetails: nextProps.getDatabase.data ? nextProps.getDatabase.data : [],
				mongoPort: nextProps.getDatabase.mongoPort,
				mysqlPort: nextProps.getDatabase.mysqlPort,
				host: nextProps.getDatabase.host,
			})
		}

		if (nextProps.getTenant && nextProps.getTenant !== this.props.getTenant) {
			this.setState({
				isFetching: false,
				options: nextProps.getTenant.map((temp) => {
					return {
						value: temp,
						label: capitalizeFirstLetter(temp)
					}
				})
			})
		}

		if (nextProps.activityStatus && nextProps.activityStatus !== this.props.activityStatus) {
			this.setState({
				activityStatusDetails: nextProps.activityStatus,
				ismodalloader: false,
			})
		}

		if (nextProps.createBackupListSucess && nextProps.createBackupListSucess !== this.props.createBackupListSucess) {
			this.setState({
				isOpen: true,
				message: nextProps.createBackupListSucess.message,
				type: "success",
				isFetching: false,
			})
		}

		['getDatabaseFailure', 'getTenantFailure', 'activityStatusFailure', 'createBackupListFailure'].map(val => {
			this.errorSetStateHandler(nextProps[val], this.props[val]);
		})
	}

	errorSetStateHandler(nextError, currentError) {
		if (nextError && nextError !== currentError) {
			this.setState({
				isFetching: false,
				ismodalloader: false,
				isOpen: true,
				message: nextError,
				type: "error",
			});
		}
	}

	getArray(min, max) {
		var Options = [];
		for (let i = min; i < max; i++) {
			Options.push(i);
		}
		return Options;
	}

	backupTypeHandler = backupType => {
		this.setState({
			backupType,
			selectedOption: "",
		});
	}

	timingTypeHandler = timing => {
		this.setState({
			timing,
			scheduleBackup: "",
		});
	}

	change = event => {
		this.setState({
			scheduleBackup: event.target.value,
		});
	};

	handleChange = selectedOption => {
		this.setState({
			selectedOption
		});
	};

	modalCloseHandler = () => {
		this.setState({
			isOpen: false,
			message: "",
			type: "",
			scheduleBackup: "",
			selectedOption: "",
			backupType: 'full',
			timing: 'now',
		});
		this.props.getDataBaseList();
	};

	activityStatus = id => {
		this.props.getActivityStatus(id);
		this.setState({
			ismodalloader: true,
		})
	}

	createBackup = buttonType => event => {
		this.setState({
			isFetching: true,
		})
		event.preventDefault();
		$("#backUpModal").modal("hide");
		let backupPayload
		if (buttonType == "instantBackup") {
			backupPayload = {
				id: this.state.backupData.id,
				dbType: this.state.backupData.dbType,
				backupType: this.state.backupData.backupType,
				schedule: this.state.backupData.schedule,
				tenants: this.state.backupData.tenants,
				timing: 'now'
			}
		}
		else if (buttonType == "scheduleBackup") {
			backupPayload = {
				dbType: this.state.selectedDb,
				backupType: this.state.backupType,
				timing: this.state.timing,
				schedule: this.state.scheduleBackup,
				tenants: this.state.selectedOption ? this.state.selectedOption.map(val => val.value) : null,
			}
			if (backupPayload.schedule === "daily") {
				backupPayload.hour = this.refs.hour.value;
				backupPayload.minute = this.refs.minute.value;
			}
			else if (backupPayload.schedule === "weekly") {
				backupPayload.day = this.refs.weekly.value;
				backupPayload.hour = this.refs.hour.value;
				backupPayload.minute = this.refs.minute.value;
			}
			else if (backupPayload.schedule === "monthly") {
				backupPayload.date = this.refs.monthly.value;
				backupPayload.hour = this.refs.hour.value;
				backupPayload.minute = this.refs.minute.value;
			}
		}
		backupPayload.timeZone = new Date().getTimezoneOffset();
		this.props.createBackupPayload(backupPayload);
	}
	render() {
		return (
			<div className="appContent">
				<Helmet>
					<title>DatabaseAndBackUps</title>
					<meta name="description" content="Description of DatabaseAndBackUps" />
				</Helmet>
				<div className="pageBreadcrumb">
					<div className="flex-item fx-b70">
						<p><FormattedMessage {...commonMessages.devops} children={(message => message)} /></p>
						<h5><FormattedMessage {...commonMessages.databaseAndBackUps} children={(message => message)} /></h5>
					</div>
					<div className="flex-item fx-b30 text-right align-items-center" />
				</div>

					<React.Fragment>
						<ul className="nav nav-tabs customNavTab" role="tablist">
							<li className="nav-item fx-b50 pd-r-2" >
								<a
									className={`nav-link ${this.state.selectedDb === "mysql" ? "active" : null}`}
									onClick={() => this.setState({
										selectedDb: "mysql",
										scheduleBackup: "",
										selectedOption: "",
										backupType: 'full',
										timing: 'now',
									})}
								>
									<FormattedMessage {...messages.mySQL} children={(message => message)} />
								</a>
							</li>
							<li className="nav-item fx-b50 pd-l-2">
								<a
									className={`nav-link ${this.state.selectedDb === "mongo" ? "active" : null}`}
									onClick={() => this.setState({
										selectedDb: "mongo",
										scheduleBackup: "",
										selectedOption: "",
										backupType: 'full',
										timing: 'now',
									})}
								>
									<FormattedMessage {...messages.mongo} children={(message => message)} />
								</a>
							</li>
						</ul>

						<div className="tab-content tab-customContent">
							<div className="tab-pane active">
								<h6 className="contentHeader">
									<span className="text-theme"><FormattedMessage {...messages.host} children={(message => message)} /> : </span>
									<span>{this.state.host}</span>
									<span className="mx-2">|</span>
									<span className="text-theme"><FormattedMessage {...messages.port} children={(message => message)} /> : </span>
									<span>{this.state.selectedDb === "mysql" ? this.state.mysqlPort : this.state.mongoPort}</span>
									<button
										className="btn btn-transparent text-success bg-lightGreen float-right"
										data-toggle="modal"
										data-target="#backUpModal"
									>
										<FormattedMessage {...messages.backUp} children={(message => message)} /> <i className="far fa-database f-14 mr-l-6" />
									</button>
								</h6>

								{ this.state.isFetching ? <SkeletonLoader skeleton="skeletonHtmlTable" mode="middleView" /> :
								this.state.databaseDetails.length > 0 ?
								<table className="table customHTMLTable">
									<thead>
										<tr>
											<th width="20%"><FormattedMessage {...messages.backupType} children={(message => message)} /></th>
											<th width="20%"><FormattedMessage {...messages.databases} children={(message => message)} /></th>
											<th width="20%"><FormattedMessage {...messages.lastStatus} children={(message => message)} /></th>
											<th width="10%"><FormattedMessage {...messages.schedule} children={(message => message)} /></th>
											<th width="20%"><FormattedMessage {...commonMessages.createdAt} children={(message => message)} /></th>
											<th width="10%"><FormattedMessage {...commonMessages.action} children={(message => message)} /></th>
										</tr>
									</thead>
									<tbody>
											{this.state.databaseDetails.filter(val => val.dbType === this.state.selectedDb).length > 0 ? this.state.databaseDetails.filter(val => val.dbType === this.state.selectedDb).map((val, index) => (
												<tr key={index}>
													<td>{val.backupType}</td>
													<td>{val.tenants.toString()}</td>
													<td>
														{val.lastStatus === "SUCCESS" ?
															<button className="btn btn-link text-success" onClick={() => { this.activityStatus(val.id) }} data-toggle="modal" data-target="#statusModal"><FormattedMessage {...messages.success} children={(message => message)} /></button>
															:
															val.lastStatus === "FAILURE" ?
																<button className="btn btn-link text-danger" onClick={() => { this.activityStatus(val.id) }} data-toggle="modal" data-target="#statusModal"><FormattedMessage {...messages.failure} children={(message => message)} /></button>
																:
																val.lastStatus === "PARTIAL" ?
																	<button className="btn btn-link text-warning" onClick={() => { this.activityStatus(val.id) }} data-toggle="modal" data-target="#statusModal"><FormattedMessage {...messages.partial} children={(message => message)} /></button>
																	:
																	<button className="btn btn-link text-secondary cursor-notAllowed" onClick={() => { this.activityStatus(val.id) }} data-toggle="modal" data-target="#statusModal" disabled ><FormattedMessage {...messages.na} children={(message => message)} /></button>
														}</td>
													<td>{val.schedule}</td>
													<td>{moment(val.createdAt).format("DD MMM YYYY HH:mm:ss")}</td>
													<td>
														<button
															type="button"
															className="btn btn-transparent text-success"
															data-toggle="modal"
															data-target="#singleBackUpModal"
															data-tooltip
                                            				data-tooltip-text= "Create Backup"
															onClick={() => {
																this.setState(
																	{
																		backupData: val
																	}
																)
															}}
														>
															<i className="far fa-database" />
														</button>
													</td>
												</tr>
											))
											:
											null
											}										
									</tbody>
								</table>
								:
									<NoDataFound skeleton="skeletonHtmlTable" mode="middleView" dataName="database" dataImg="database"/>
								}
							</div>
						</div>

						{/****************** Complete Backup Modal Start ******************/}

						<div className="modal" id="backUpModal">
							<div className="modal-dialog modal-lg">
								<div className="modal-content">
									<div className="modal-header">
										<h4 className="modal-title"><FormattedMessage {...messages.createBackup} children={(message => message)} /> <button type="button" className="close" onClick={() => this.modalCloseHandler()} data-dismiss="modal">&times;</button></h4>
									</div>
									<div className="modal-body">
										<form className="contentForm shadowNone" onSubmit={this.createBackup("scheduleBackup")}>
											<div className="form-group">
												<label className="form-label pt-0"><FormattedMessage {...messages.backupType} children={(message => message)} /> :</label>
												<div className="flex-item fx-b80">
													<div className="flex">
														<div className="flex-item fx-b25">
															<label className="customRadioButton">
																<input
																	required
																	type="radio"
																	name="type"
																	onChange={() => {
																		this.backupTypeHandler('full');
																	}}
																	id="scheduleType"
																	checked={this.state.backupType == 'full'}
																/>
																<span className="radiomark" />
																<span className="radioText"><FormattedMessage {...messages.full} children={(message => message)} /></span>
															</label>
														</div>
														<div className="flex-item fx-b25">
															<label className="customRadioButton">
																<input
																	required
																	type="radio"
																	name="type"
																	onChange={() => {
																		this.backupTypeHandler('partial');
																	}}
																	id="scheduleType"
																	checked={this.state.backupType == 'partial'}
																/>
																<span className="radiomark" />
																<span className="radioText"><FormattedMessage {...messages.partial} children={(message => message)} /></span>
															</label>
														</div>
													</div>
												</div>
											</div>
											<div className="form-group">
												<label className="form-label pt-0"><FormattedMessage {...messages.timing} children={(message => message)} /> :</label>
												<div className="flex-item fx-b80">
													<div className="flex">
														<div className="flex-item fx-b25">
															<label className="customRadioButton">
																<input
																	required
																	type="radio"
																	name="time"
																	onChange={() => {
																		this.timingTypeHandler('now');
																	}}
																	id="roles"
																	checked={this.state.timing == 'now'}
																/>
																<span className="radiomark" />
																<span className="radioText"><FormattedMessage {...messages.now} children={(message => message)} /></span>
															</label>
														</div>
														<div className="flex-item fx-b25">
															<label className="customRadioButton">
																<input
																	required
																	type="radio"
																	onChange={() => {
																		this.timingTypeHandler('schedule');
																	}}
																	name="time"
																	checked={this.state.timing == 'schedule'}
																	id="roles"
																/>
																<span className="radiomark" />
																<span className="radioText"><FormattedMessage {...messages.schedule} children={(message => message)} /></span>
															</label>
														</div>
													</div>
												</div>
											</div>
											<div>
												{this.state.backupType == 'partial' ? <div className="form-group">
													<label className="form-label"><FormattedMessage {...messages.selectTenant} children={(message => message)} />:<sup><i className="fas fa-asterisk" /></sup></label>
													<Select
														className="form-control-multi-select fx-b80"
														value={this.state.selectedOption}
														onChange={this.handleChange}
														options={this.state.options}
														isMulti
													/>
												</div> : null
												}
												{this.state.timing == 'now' ? null : <div className="form-group">
													<label className="form-label"><FormattedMessage {...messages.scheduleBackup} children={(message => message)} />:<sup><i className="fas fa-asterisk" /></sup></label>
													<select
														onChange={this.change}
														value={this.state.scheduleBackup}
														className="form-control"
													>
														<FormattedMessage {...messages.select} children={(message) => <option value="">{message}</option>} />
														<FormattedMessage {...messages.daily} children={(message) => <option value="daily">{message}</option>} />
														<FormattedMessage {...messages.weekly} children={(message) => <option value="weekly">{message}</option>} />
														<FormattedMessage {...messages.monthly} children={(message) => <option value="monthly">{message}</option>} />
													</select>
												</div>
												}
												{this.state.scheduleBackup == "" ? (
													false
												) : (
														<div className="form-group">
															<label className="form-label"><FormattedMessage {...messages.scheduleTime} children={(message => message)} />:<sup><i className="fas fa-asterisk" /></sup></label>
															{this.state.scheduleBackup == 'weekly' ? <select ref="weekly" className="form-control fx-b30 mr-r-10" required>
																<FormattedMessage {...messages.day} children={(message) => <option value="">{message}</option>} />
																{this.state.weekOptions.map((temp, index) => <option value={index + 1} key={index}>{temp}</option>)}
															</select> : false}
															{this.state.scheduleBackup == 'monthly' ? <select ref="monthly" className="form-control fx-b15 mr-r-10" required>
																<FormattedMessage {...messages.date} children={(message) => <option value="">{message}</option>} />
																{this.getArray(1, 32).map((temp, index) => <option value={temp} key={index}>{temp}</option>)}
															</select> : false}
															<select ref="hour" className="form-control fx-b15 mr-r-10" required>
																<FormattedMessage {...messages.hour} children={(message) => <option value="">{message}</option>} />
																{this.getArray(0, 24).map((temp, index) => <option value={temp} key={index}>{temp}</option>)}
															</select>
															<select ref="minute" className="form-control fx-b20 mr-r-10" required>
																<FormattedMessage {...messages.minutes} children={(message) => <option value="">{message}</option>} />
																{this.getArray(0, 60).map((temp, index) => <option value={temp} key={index}>{temp}</option>)}
															</select>
														</div>
													)}
											</div>
											<div className="flex justify-content-end mt-5">
												<button
													id="saveBackup"
													disabled={this.state.timing != 'now' && this.state.scheduleBackup == ""}
													className="btn btn-danger"
												>
													<i className="far fa-check-circle" />
													{this.state.timing == 'now' ? <FormattedMessage {...messages.createBackup} children={(message => message)} /> : <FormattedMessage {...messages.scheduleBackup} children={(message => message)} />}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>

						{/****************** Complete Backup Modal End ******************/}

						{/****************** Single Backup Modal Start ******************/}

						<div className="modal" id="singleBackUpModal">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-body p-4 pd-t-30">
										<span className="close" data-dismiss="modal">
											<i className="far fa-times" />
										</span>
										<h5 className="text-center mb-5">
											<FormattedMessage {...messages.singleBackupMSG} children={(message => message)} />
										</h5>
										<div className="text-right">
											<button type="button" onClick={this.createBackup("instantBackup")} className="btn btn-danger" data-dismiss="modal">
												<FormattedMessage {...messages.yes} children={(message => message)} />
											</button>
											<button type="button" className="btn btn-secondary mr-l-10" data-dismiss="modal">
												<FormattedMessage {...messages.no} children={(message => message)} />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/****************** Single Backup Modal End ******************/}

						{/****************** Status Modal Start ******************/}

						<div className="modal" id="statusModal">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h4 className="modal-title"><FormattedMessage {...messages.status} children={(message => message)} /> <button className="close" data-dismiss="modal">&times;</button></h4>
									</div>
									<div className="modal-body position-relative minModalHight">
										{this.state.ismodalloader ? <ModalLoader /> :
											<table className="table customHTMLTable">
												<thead>
													<tr>
														<th width="34%"><FormattedMessage {...messages.database} children={(message => message)} /></th>
														<th width="33%"><FormattedMessage {...messages.status} children={(message => message)} /></th>
														<th width="33%"><FormattedMessage {...messages.size} children={(message => message)} /></th>
													</tr>
												</thead>
												<tbody>
													{this.state.activityStatusDetails && this.state.activityStatusDetails.map((val) => (
														<tr key={val.scheduleId}>
															<td>{val.tenant}</td>
															<td>{val.status}</td>
															<td>{val.size}</td>
														</tr>
													))}
												</tbody>
											</table>
										}
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>

				{/****************** Status Modal End ******************/}

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

DatabaseAndBackUps.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	getDatabaseFailure: getDatabaseFailure(),
	getDatabase: getDatabase(),
	getTenantFailure: getTenantFailure(),
	getTenant: getTenant(),
	createBackupListSucess: createBackupListSucess(),
	createBackupListFailure: createBackupListFailure(),
	activityStatus: activityStatus(),
	activityStatusFailure: activityStatusFailure()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		getDataBaseList: () => dispatch(getDataBaseList()),
		getTenantList: () => dispatch(getTenantList()),
		createBackupPayload: (backupPayload) => dispatch(createBackupPayload(backupPayload)),
		getActivityStatus: (id) => dispatch(getActivityStatus(id))
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: 'databaseAndBackUps', reducer });
const withSaga = injectSaga({ key: 'databaseAndBackUps', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(DatabaseAndBackUps);
