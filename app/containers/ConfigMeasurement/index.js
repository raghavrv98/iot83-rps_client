/**
 *
 * ConfigMeasurement
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
import {
	getMeasurementsList, getMeasurementsListError,
	processMeasurementSuccess, processMeasurementFailure,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { getMeasurements, processMeasurement } from "./actions";
import MessageModal from "../../components/MessageModal/Loadable";
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import commonMessages from '../../messages';
import SkeletonLoader from "../../components/SkeletonLoader";
import { showInitials } from "../../utils/commonUtils";
import InfiniteScroll from 'react-infinite-scroll-component';
import NoDataFound from "../../components/NoDataFound";
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
export class ConfigMeasurement extends React.Component {
	state = {
		isLoading: true,
		measurements: [],
		isOpen: false,
		agentName: this.props.match.params.id.split("~")[0],
		agentType: this.props.match.params.id.split("~")[2],
		totalCount: 0,
		measurementCount: 10,
		offset: 0,
	}

	componentWillMount() {
    this.props.getMeasurements(this.props.match.params.id.split("~")[1], this.state.measurementCount, this.state.offset);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.measurementList && nextProps.measurementList !== this.props.measurementList) {
			this.setState({
				measurements: [...this.state.measurements, ...nextProps.measurementList.result],
				isLoading: false,
				totalCount: nextProps.measurementList.totalCount,
			})
		}

		if (nextProps.processMeasurementSuccess && nextProps.processMeasurementSuccess !== this.props.processMeasurementSuccess) {
			this.setState({
				isLoading: false,
				isOpen: true,
				message: nextProps.processMeasurementSuccess,
				type: "success",
			});
		}

		['measurementListError', 'processMeasurementFailure'].map(val => {
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
			message: "",
			type: "",
			measurementId: "",
			agentId: "",
		});
	}

	confirmModalHandler(measureId, agentId) {
		this.setState({
			measurementId: measureId,
			agentId: agentId,
			isOpen: true,
			message: "This action will generate/re-generate data and alarms as per the algorithms associated.",
			type: "confirm",
		});
	}

	confirmProcessMeasurement = () => {
		this.setState({
			isOpen: false,
			isLoading: true,
		}, () => this.props.processMeasurement(this.state.measurementId, this.state.agentId))
	}

	paginationHandler = () => {
		this.props.getMeasurements(this.props.match.params.id.split("~")[1], this.state.measurementCount, this.state.measurements.length)
	};

	reloadHandler = () => {
		this.props.getMeasurements(this.props.match.params.id.split("~")[1], 10, 0)
  }

	render() {
		return (
			<div className="appContent">
				<Helmet>
					<title>ConfigMeasurement</title>
					<meta name="description" content="Description of ConfigMeasurement" />
				</Helmet>

				<div className="pageBreadcrumb">
					<div className="flex-item fx-b70">
						<p className="pd-l-30">
							<span className="cursor-pointer" onClick={() => { this.props.history.push('/manageAgents'); }}>
								<button className="btn btn-transparent">
									<i className="far fa-long-arrow-left"></i>
								</button><FormattedMessage {...messages.title} children={(message => message)} />
							</span>
						</p>
						<h5>
							<FormattedMessage {...messages.totalMeasurements} children={(message => message)} />
							{this.state.isLoading ? null : <span className="customCountBadge">{this.state.totalCount}</span>}
							<span className="mx-3">|</span>
							<FormattedMessage {...commonMessages.agentName} children={(message => message)} /> - <span className="text-theme">{this.state.agentName}</span>
							<span className="mx-3">|</span>
							<FormattedMessage {...commonMessages.agentType} children={(message => message)} /> - <span className="text-theme">{this.state.agentType}</span>
						</h5>
					</div>
					<div className="flex-item fx-b30 text-right align-items-center" />
				</div>

				{this.state.isLoading ? <SkeletonLoader skeleton="skeletonListCount" mode="fullView" /> :
					this.state.measurements.length > 0 ?
						<InfiniteScroll
							dataLength={this.state.measurements.length}
							next={this.paginationHandler}
							hasMore={this.state.measurements.length == this.state.totalCount ? false : true}
							loader={<div className="alarmListLoader"><div className="pageLoader"> <FormattedMessage {...commonMessages.loading} children={(message => message)} /> </div></div>}
							hasChildren={this.state.measurements.length == 0 ? false : true}
							className="customInfiniteScroll"
						>
							<ul className="appListView">
								{this.state.measurements.map((measurement, index) => (
									<li key={index}>
										<div className="listIcon">
											<div className="contentIcon">
												<i className="fal fa-ruler-combined"></i>
												<sub>
													<h6>{showInitials(measurement.name)}</h6>
												</sub>
											</div>
										</div>
										<div className="listContent">
											<h6><FormattedMessage {...messages.mesureName} children={(message => message)} /></h6>
											<p>{measurement.name}</p>
										</div>
										<div className="listContent">
											<h6><FormattedMessage {...messages.mesureHash} children={(message => message)} /></h6>
											<p>{measurement.hash}</p>
										</div>
										<div className="listContent">
											<h6><FormattedMessage {...messages.mesureTime} children={(message => message)} /></h6>
											<p>{moment(measurement.measurementTime).format("DD MMM YYYY HH:mm:ss")}</p>
										</div>
										<div className="listContent">
											<h6><FormattedMessage {...commonMessages.createdAt} children={(message => message)} /></h6>
											<p>{moment(measurement.createdAt).format("DD MMM YYYY HH:mm:ss")}</p>
										</div>
										<div className="listContent">
											<h6><FormattedMessage {...commonMessages.actions} children={(message => message)} /></h6>
											<button
												type="button"
												className="btn-list"
												onClick={() => this.confirmModalHandler(measurement._id, measurement.agentId)}
											>
												<i className="far fa-cogs" />
												<FormattedMessage {...messages.process} children={(message => message)} />
											</button>
										</div>
									</li>

								))}
							</ul>
						</InfiniteScroll>
						:
						<NoDataFound skeleton="skeletonListCount" mode="fullView" dataName="measurement" dataImg="measurement" button="reload" reloadHandler={this.reloadHandler}/>
				}

				{this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onConfirm={this.confirmProcessMeasurement} onClose={this.modalCloseHandler} /> : null}
			</div>
		);
	}
}

ConfigMeasurement.propTypes = {
	dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
	measurementList: getMeasurementsList(),
	measurementListError: getMeasurementsListError(),
	processMeasurementSuccess: processMeasurementSuccess(),
	processMeasurementFailure: processMeasurementFailure(),
});

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		getMeasurements: (id, measurementCount, offset) => dispatch(getMeasurements(id, measurementCount, offset)),
		processMeasurement: (measurementId, agentId) => dispatch(processMeasurement(measurementId, agentId)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: "configMeasurement", reducer });
const withSaga = injectSaga({ key: "configMeasurement", saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(ConfigMeasurement);
