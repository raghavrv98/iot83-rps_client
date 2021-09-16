/**
 *
 * HomePage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import messages from "./messages";
import commonMessages from '../../messages';

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { navSuccess, versionSuccess, navFailure, versionFailure } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { getNav, getVersion } from "./actions";

import { Helmet } from "react-helmet";
import { Route, Switch, Link } from 'react-router-dom';

import About from "../../components/About/Loadable";
import AddOrEditGroup from "../AddOrEditGroup";
import AddOrEditRole from "../AddOrEditRole/Loadable";
import AddOrEditUser from "../AddOrEditUser/Loadable";
import AddOrEditTenant from "../AddOrEditTenant/Loadable";
import AddOrEditAgent from "../AddOrEditAgent/Loadable";
import AddOrEditPlant from "../AddOrEditPlant/Loadable";
import AddorEditLicencePlan from "../AddorEditLicencePlan/Loadable"
import AddOrEditPipeLine from "../AddOrEditPipeLine/Loadable";
import AddorEditPipeLineLandmark from "../AddorEditPipeLineLandmark/Loadable";
import AddOrEditRtd from "../AddOrEditRtd/Loadable";
import AddOrEditMapping from "../AddOrEditMapping/Loadable";
import AddOrEditZone from '../AddOrEditZone/Loadable';
import ChangePassword from "../ChangePassword/Loadable";
import CommissionerDashboard from "../CommissionerDashboard/Loadable";
import ConfigMeasurement from "../ConfigMeasurement/Loadable";
import Contact from "../../components/Contact/Loadable";
import Dashboard from "../Dashboard/Loadable";
import DatabaseAndBackUps from '../DatabaseAndBackUps/Loadable';
import ErrorPage403 from '../../components/ErrorPage403';
import ErrorPage404 from '../../components/ErrorPage404';
import HelpPage from "../HelpPage";
import Licence from "../../components/Licence/Loadable";
import Loader from '../../components/Loader/Loadable'
import ManageGroups from "../ManageGroups/Loadable";
import ManageRoles from "../ManageRoles/Loadable";
import ManageUsers from "../ManageUsers/Loadable";
import ManageLogs from "../ManageLogs";
import ManageTenants from "../ManageTenants/Loadable";
import ManageAgents from "../ManageAgents/Loadable";
import ManagePlant from "../ManagePlant/Loadable";
import ManagePipeLineLandmark from '../ManagePipeLineLandmark/Loadable';
import ManageNavigation from "../ManageNavigation/Loadable";
import ManageBranding from "../ManageBranding/Loadable";
import ManageRolePermission from "../ManageRolePermission/Loadable";
import ManageZones from '../ManageZones/Loadable';
import ManageOAuthConfig from "../ManageOAuthConfig";
import ManageOAuthMapping from "../ManageOAuthMapping";
import ManagePasswordRequest from '../ManagePasswordRequest/Loadable';
import ManageAlarmsAndAlerts from '../ManageAlarmsAndAlerts/Loadable';
import ManageAlarmType from '../ManageAlarmType/Loadable';
import ManageLicence from '../ManageLicence/Loadable';
import ManageLicencePlan from '../ManageLicencePlan/Loadable';
import ManageRoleNavigation from '../ManageRoleNavigation/Loadable';
import MappingList from "../MappingList/Loadable";
import ManageRTD from "../ManageRtd/Loadable";
import MessageModal from "../../components/MessageModal/Loadable";
import PipeLineList from "../PipeLineList/Loadable";
import PipeLineDetail from "../PipeLineDetail/Loadable";
import ResetPassword from "../ResetPassword/Loadable";
import Settings from "../Settings/Loadable";
import SideNav from "../../components/SideNav/Loadable";
import ManageReport from "../ManageReport";

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {

  state = {
    navList: [],
    versionDetails: "",
    isOpen: false,
    type: "",
    message: ""
  }

  componentWillMount() {
    if (!localStorage.token) {
      this.props.history.push('/login');
    } else {
      if(localStorage.verified === "true") {
        this.setState({
          isFetching: true
        })
        this.props.getNav();
      }
      this.props.getVersion();
    }
  }

  modalCloseHandler = () => {
    this.setState({
      isOpen: false,
      message: "",
    });
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.location.pathname === "/" || nextProps.location.pathname === "/login") && this.state.navList.length > 0) {
      const navUrl = this.state.navList[0].subMenus.length > 0 ? this.state.navList[0].subMenus[0].url : this.state.navList[0].url;
      this.props.history.push("./" + navUrl);
    };
    if (nextProps.navSuccess && nextProps.navSuccess !== this.props.navSuccess) {
      this.setState({
        navList: nextProps.navSuccess,
        isFetching: false
      })
      if (this.props.location.pathname === "/") {
        const navUrl = nextProps.navSuccess.length > 0 ? nextProps.navSuccess[0].subMenus.length > 0 ? nextProps.navSuccess[0].subMenus[0].url : nextProps.navSuccess[0].url : '';
        this.props.history.push("./" + navUrl);
      }
    }

    if (nextProps.versionSuccess && nextProps.versionSuccess !== this.props.versionSuccess) {
      this.setState({
        versionDetails: nextProps.versionSuccess,
      })
    }

    ['navFailure', 'versionFailure'].map(val => {
      this.errorSetStateHandler(nextProps[val], this.props[val]);
    })

  }

  errorSetStateHandler(nextError, currentError) {
    if (nextError && nextError !== currentError) {
      this.setState({
        isOpen: true,
        message: nextError,
        type: "error",
        isFetching: false
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <SideNav {...this.props} navItems={this.state.navList} tenant={localStorage.tenant} verified={localStorage['verified']} username={localStorage['username']} role={localStorage['role']} />
        {this.state.isFetching ? <Loader /> : <Switch>
          {/* <Route exact path='/' render={props => localStorage.tenant === "cloudstore" ? <ManageTenants {...props} /> : <Dashboard {...props} />} /> */}
          <Route exact path='/about' render={props => <About {...props} />} />
          <Route exact path='/addOrEditGroup/:id?' render={props => <AddOrEditGroup {...props} />} />
          <Route exact path='/addOrEditRole/:id?' render={props => <AddOrEditRole {...props} />} />
          <Route exact path='/addOrEditUser/:id?' render={props => <AddOrEditUser {...props} />} />
          <Route exact path='/addOrEditTenant/:id?' render={props => <AddOrEditTenant {...props} />} />
          <Route exact path='/addOrEditAgent/:id?' render={props => <AddOrEditAgent {...props} />} />
          <Route exact path='/addOrEditPlant/:id?' render={props => <AddOrEditPlant {...props} />} />
          <Route exact path='/addorEditLicence' render={props => <AddorEditLicencePlan {...props} />} />
          <Route exact path='/addOrEditMapping/:agentId?/:mapId?' render={props => <AddOrEditMapping {...props} />} />
          <Route exact path='/addOrEditZone/:plantId/:pipelineId/:zoneId?' render={props => <AddOrEditZone {...props} />} />
          <Route exact path='/addOrEditPipeLine/:id?/:pipelineId?' render={props => <AddOrEditPipeLine {...props} />} />
          <Route exact path='/addorEditPipeLineLandmark/:plantId?/:pipelineId?/:id?' render={props => <AddorEditPipeLineLandmark {...props} />} />
          <Route exact path='/addOrEditScadaSensor/:plantId/:pipelineId/:zoneId?' render={props => <AddOrEditRtd {...props} />} />
          <Route exact path='/analystDashboard/:plantId?/:pipelineId?' render={props => <CommissionerDashboard {...props} />} />
          <Route exact path='/configMeasurement/:id' render={props => <ConfigMeasurement {...props} />} />
          <Route exact path='/changePassword' render={props => <ChangePassword {...props} />} />
          <Route exact path='/contact' render={props => <Contact {...props} />} />
          <Route exact path='/databaseAndBackUps' render={props => <DatabaseAndBackUps {...props} />} />
          <Route exact path='/error403' render={props => <ErrorPage403 {...props} />} />
          <Route exact path='/error404' render={props => <ErrorPage404 {...props} />} />
          <Route exact path='/help' render={props => <HelpPage {...props} />} />
          <Route exact path='/licence' render={props => <Licence {...props} />} />
          <Route exact path='/manageGroups' render={props => <ManageGroups {...props} />} />
          <Route exact path='/manageReport' render={props => <ManageReport {...props} />} />
          <Route exact path='/manageRoles' render={props => <ManageRoles {...props} />} />
          <Route exact path='/manageScadaSensor/:plantId/:pipelineId' render={props => <ManageRTD {...props} />} />
          <Route exact path='/manageUsers' render={props => <ManageUsers {...props} />} />
          <Route exact path='/manageLogs' render={props => <ManageLogs {...props} />} />
          <Route exact path='/manageTenants' render={props => <ManageTenants {...props} />} />
          <Route exact path='/manageAgents' render={props => <ManageAgents {...props} />} />
          <Route exact path='/managePlant' render={props => <ManagePlant {...props} />} />
          <Route exact path='/manageNavigation' render={props => <ManageNavigation {...props} />} />
          <Route exact path='/manageBranding' render={props => <ManageBranding {...props} />} />
          <Route exact path='/manageRolePermission/:id' render={props => <ManageRolePermission {...props} />} />
          <Route exact path='/mappingList/:id?' render={props => <MappingList {...props} />} />
          <Route exact path='/manageZones/:plantId/:pipelineId?' render={props => <ManageZones {...props} />} />
          <Route exact path='/manageOAuthConfig' render={props => <ManageOAuthConfig {...props} />} />
          <Route exact path='/manageOAuthMapping' render={props => <ManageOAuthMapping {...props} />} />
          <Route exact path='/managePlan/:activePlan?' render={props => <ManageLicence {...props} />} />
          <Route exact path='/manageLicense' render={props => <ManageLicencePlan {...props} />} />
          <Route exact path='/managePasswordRequest/:id?' render={props => <ManagePasswordRequest {...props} />} />
          <Route exact path='/manageAlarmsAndAlerts/:id?' render={props => <ManageAlarmsAndAlerts {...props} />} />
          <Route exact path='/manageAlarmType' render={props => <ManageAlarmType {...props} />} />
          <Route exact path='/manageRoleNavigation/:roleId' render={props => <ManageRoleNavigation {...props} />} />
          <Route exact path='/managePipeLineLandmark/:plantId/:pipelineId' render={props => <ManagePipeLineLandmark {...props} />} />
          <Route exact path='/operatorDashboard/:plantId?/:pipelineId?/:distance?/:lastPage?' render={props => <Dashboard {...props} />} />
          <Route exact path='/pipeLineList/:id?' render={props => <PipeLineList {...props} />} />
          <Route exact path='/pipeLineDetail/:id?/:pipelineId?' render={props => <PipeLineDetail {...props} />} />
          <Route exact path='/pipeLinePoc' render={props => <PipelineChart {...props} />} />
          <Route exact path='/resetPassword' render={props => <ResetPassword {...props} />} />
          <Route exact path='/settings' render={props => <Settings {...props} />} />
          <Route component={ErrorPage404} />
        </Switch>}
        {this.state.isOpen ? <MessageModal type={this.state.type} message={this.state.message} onClose={this.modalCloseHandler} /> : null}
        <footer className="footer">
          <div className="container flex justify-content-between">
            <p>&copy; {this.state.versionDetails.version} </p>
            <ul>
              <li><Link to="/about" target="_blank"><FormattedMessage {...commonMessages.about} children={(message => message)} /></Link></li>
              <li><Link to="/contact" target="_blank"><FormattedMessage {...commonMessages.contact} children={(message => message)} /></Link></li>
              <li><Link to="/licence" target="_blank"><FormattedMessage {...commonMessages.license} children={(message => message)} /></Link></li>
            </ul>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}


HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  navSuccess: navSuccess(),
  navFailure: navFailure(),
  versionSuccess: versionSuccess(),
  versionFailure: versionFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getNav: () => dispatch(getNav()),
    getVersion: () => dispatch(getVersion())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "homePage", reducer });
const withSaga = injectSaga({ key: "homePage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
