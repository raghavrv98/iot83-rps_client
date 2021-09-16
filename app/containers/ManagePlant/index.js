/**
 *
 * ManagePlant
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import injectSaga from "utils/injectSaga";
import { managePlantList, deleteHandler } from "./actions";
import { getPlantListSuccess, getPlantListFailure, deletePlantSuccess, deletePlantFailure } from './selectors';
import MessageModal from "../../components/MessageModal/Loadable";
import injectReducer from "utils/injectReducer";
import makeSelectManagePlant from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from './messages';
import commonMessages from '../../messages';
import { FormattedMessage } from 'react-intl';
import SkeletonLoader from "../../components/SkeletonLoader";
import { showInitials } from "../../utils/commonUtils";
import NoDataFound from "../../components/NoDataFound";


/* eslint-disable react/prefer-stateless-function */
export class ManagePlant extends React.Component {

	state = {
		plantList: [],
		isLoading: true,
	}

	componentWillMount() {
    this.props.managePlantList()
	}

	componentWillReceiveProps(nextprops) {
		if (nextprops.getPlantListSuccess && nextprops.getPlantListSuccess !== this.props.getPlantListSuccess) {
			this.setState({
				plantList: nextprops.getPlantListSuccess.result,
				isLoading: false
			})
		}
		if (nextprops.deletePlantSuccess && nextprops.deletePlantSuccess !== this.props.deletePlantSuccess) {
			let plantList = [...this.state.plantList]
			plantList = plantList.filter(val => val._id !== nextprops.deletePlantSuccess);
			this.setState({
				plantList,
				isLoading: false,
				isOpen: true,
				message: <FormattedMessage {...messages.plantDeleteSuccessMessage} children={(message => message)} />,
				type: "success",
			})
		}
		['getPlantListFailure', 'deletePlantFailure'].map(val => {
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

	confirmModalHandler(val) {
		this.setState({
			isOpen: true,
			message: <FormattedMessage {...messages.confirmmessage} children={(message => <span>{message + " " + val.name + "?"} </span>)} />,
			type: "confirm",
			plantId: val._id
		});
	}

	deleteHandler(id) {
		this.setState({
			isLoading: true,
			isOpen: false,
			message: "",
			type: ""
		}, () => {
			this.props.deleteHandler(id)
		})
	}

	modalCloseHandler = () => {
		this.setState({
			isOpen: false,
			message: "",
			type: ""
		});
  }
  
	render() {
		return (
			<div className="appContent">
				<Helmet>
					<title>ManagePlant</title>
					<meta name="description" content="Description of ManagePlant" />
				</Helmet>

				<div className="pageBreadcrumb">
					<div className="flex-item fx-b70">
						<p><FormattedMessage {...commonMessages.managePlant} children={(message => message)} /></p>
						<h5><FormattedMessage {...messages.title} children={(message => message)} /> {this.state.isLoading ?
							null : <span className="customCountBadge">
								{this.state.plantList.length}
							</span>
						}</h5>
					</div>
					<div className="flex-item fx-b30 text-right align-items-center">
					{this.state.plantList.length > 0 ?
						<button type="button" className="btn btn-create" onClick={() => { this.props.history.push('/addOrEditPlant') }}>
							<i className="far fa-plus"></i>
						</button>
						: null
					}
					</div>
				</div>

				{this.state.isLoading ?
					<SkeletonLoader skeleton="cardSkeleton" mode="fullView"/> :
						this.state.plantList.length > 0 ?
						 <ul className="plantList">
						{this.state.plantList.map((val, index) => {
							return <li key={index}>
								<div className="card">
									<div className="card-header" style={{ "backgroundImage": val.plantImage == null ? "URL(" + require('../../assets/images/no-image-found.png') + ")" : "URL(" + `${window.API_URL}api/public/static${val.plantImage}` + ")" }}>
										<div className="customPlantHeader">
											<div className="headerLayout" />
											<div className="flex headerContent">
												<div className="fx-b60">
													<h4 className="plantTitle">{val.name}</h4>
												</div>
												<div className="fx-b40">
													<div className="button-group text-right">
														<button type="button" className={val.alarmCount > 0 ? "btn-transparent text-light mr-r-15" : "btn-transparent text-light"} onClick={() => this.props.history.push(`/manageAlarmsAndAlerts/${val._id}`)}>
															<i className="far fa-bell"></i>
															{val.alarmCount > 0 ? < sup className="customCountBadge f-10">{val.alarmCount}</sup> : null}
														</button>
														<button type="button" className="btn-transparent text-primary" onClick={() => this.props.history.push(`/addOrEditPlant/${val._id}`)} 
														data-tooltip
														data-tooltip-text= "Edit"
														>
															<i className="far fa-pen"></i>
														</button>
														<button type="button" className="btn-transparent text-danger" onClick={() => this.confirmModalHandler(val)} 
														data-tooltip
														data-tooltip-text= "Delete"
														>
															<i className="far fa-trash-alt"></i>
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className="btn-viewPipelineBox">
											<div className="btnLayout" />
											<button className="btn-viewPipeline" onClick={() => this.props.history.push(`./pipeLineList/${val._id}`)}>
												<FormattedMessage {...messages.viewPipelines} children={(message => message)} />
												<span className="customCountBadge f-10">{val.pipelineCount}</span>
											</button>
										</div>
									</div>
									<div className="card-body">
										<div className="flex">
											<h6 className="fx-b35"><FormattedMessage {...messages.cardPlantName} children={(message => message)} /></h6>
											<p className="fx-b65 text-theme font-weight-bold">{val.name}</p>
										</div>
										<div className="flex">
											<h6 className="fx-b35"><FormattedMessage {...commonMessages.ownerName} children={(message => message)} /></h6>
											<p className="fx-b65">{val.ownerName}</p>
										</div>
										<div className="flex">
											<h6 className="fx-b35"><FormattedMessage {...commonMessages.ownerEmail} children={(message => message)} /></h6>
											<p className="fx-b65">{val.ownerEmail}</p>
										</div>
										<div className="flex">
											<h6 className="fx-b35"><FormattedMessage {...commonMessages.plantShift} children={(message => message)} /></h6>
											<ul className="name-list">
												{val.shifts.map((value, ind) => {
													return <li key={ind} className={value.active ? "active" : ""} 
													data-tooltip
													data-tooltip-text= 
													{`
													<div class="tooltipText">
														<h6>
															<strong>Shift Name</strong>
															${value.name}
														</h6>
														<h6>
															<strong>Crew Name</strong>
															${value.crewName}
														</h6>
														<h6>
															<strong>Start Time</strong>
															${value.startTime}
														</h6>
														<h6>
															<strong>End Time</strong>
															${value.endTime}
														</h6>
													</div>
													`}
													>
														<p className="name-details">{showInitials(value.name)}</p>
													</li>
												})
												}
											</ul>
										</div>
									</div>
								</div>
							</li>
						})
					} 
					</ul>
					:
					<NoDataFound skeleton="cardSkeleton" mode="fullView" dataName="plant" dataImg="plant" button="add" createHandler={() => {this.props.history.push('/addOrEditPlant')}}/>
				}
				{this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onConfirm={() => this.deleteHandler(this.state.plantId)} onClose={this.modalCloseHandler} /> : null}
			</div >
		);
	}
}

ManagePlant.propTypes = {
	dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
	getPlantListSuccess: getPlantListSuccess(),
	getPlantListFailure: getPlantListFailure(),
	deletePlantSuccess: deletePlantSuccess(),
	deletePlantFailure: deletePlantFailure(),
});

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		managePlantList: () => dispatch(managePlantList()),
		deleteHandler: (id) => dispatch(deleteHandler(id))
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: "managePlant", reducer });
const withSaga = injectSaga({ key: "managePlant", saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(ManagePlant);
