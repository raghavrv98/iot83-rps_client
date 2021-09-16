import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.get("dashboard", initialState);

const getTimeFreezeDataSuccess = () =>
  createSelector(selectDashboardDomain, dashboardState => dashboardState.get('timeFreezeDataSuccess'));

const getTimeFreezeDataFailure = () =>
  createSelector(selectDashboardDomain, dashboardState => dashboardState.get('timeFreezeDataFailure'));

const getSegmentDataSuccess = () =>
  createSelector(selectDashboardDomain, dashboardState => dashboardState.get('segmentDataSuccess'));
 
const getSegmentDataFailure = () =>
  createSelector(selectDashboardDomain, dashboardState => dashboardState.get('segmentDataError'));

const getChartDetailsSuccess = () =>
createSelector(selectDashboardDomain, substate => substate.get('chartDetailsSuccess'));

const getChartDetailsFailure = () =>
createSelector(selectDashboardDomain, substate => substate.get('chartDetailsFailure'));

const plantList = () =>
createSelector(selectDashboardDomain, substate => substate.get('plantList'));

const plantListFailure = () =>
createSelector(selectDashboardDomain, substate => substate.get('plantListFailure'));

const pipelineList = () =>
createSelector(selectDashboardDomain, substate => substate.get('pipelineList'));

const pipelineListFailure = () =>
createSelector(selectDashboardDomain, substate => substate.get('pipelineListFailure'));

const attributesList = () =>
createSelector(selectDashboardDomain, substate => substate.get('attributesList'));

const attributesListFailure = () =>
createSelector(selectDashboardDomain, substate => substate.get('attributesListFailure'));

export { 
  selectDashboardDomain, getTimeFreezeDataSuccess, 
  getTimeFreezeDataFailure, getSegmentDataSuccess, 
  getSegmentDataFailure,
  getChartDetailsSuccess, getChartDetailsFailure,
  plantList,plantListFailure,
  pipelineList,pipelineListFailure,
  attributesList,attributesListFailure
};