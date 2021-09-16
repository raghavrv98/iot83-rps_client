import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectCommissionerDashboardDomain = state =>state.get("commissionerDashboard", initialState);

const getSegmentDataSuccess = () =>
  createSelector(selectCommissionerDashboardDomain, commissionerDashboardState => commissionerDashboardState.get('segmentDataSuccess'));

const getSegmentDataFailure = () =>
  createSelector(selectCommissionerDashboardDomain, commissionerDashboardState => commissionerDashboardState.get('segmentDataError'));

const getChartDetailsSuccess = () =>
  createSelector(selectCommissionerDashboardDomain, substate => substate.get('chartDetailsSuccess'));

const getChartDetailsFailure = () =>
  createSelector(selectCommissionerDashboardDomain, substate => substate.get('chartDetailsFailure'));

const plantList = () =>
  createSelector(selectCommissionerDashboardDomain, substate => substate.get('plantList'));

const plantListFailure = () =>
  createSelector(selectCommissionerDashboardDomain, substate => substate.get('plantListFailure'));

const pipelineList = () =>
  createSelector(selectCommissionerDashboardDomain, substate => substate.get('pipelineList'));

const pipelineListFailure = () =>
  createSelector(selectCommissionerDashboardDomain, substate => substate.get('pipelineListFailure'));

const attributesList = () =>
  createSelector(selectCommissionerDashboardDomain, substate => substate.get('attributesList'));

const attributesListFailure = () =>
  createSelector(selectCommissionerDashboardDomain, substate => substate.get('attributesListFailure'));

export {
  getSegmentDataSuccess, getSegmentDataFailure,
  getChartDetailsSuccess, getChartDetailsFailure,
  plantList, plantListFailure,
  pipelineList, pipelineListFailure,
  attributesList, attributesListFailure
};