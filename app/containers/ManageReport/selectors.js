import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectManageReportDomain = state => state.get("manageReport", initialState);

const getReportListSuccess = () =>
  createSelector(selectManageReportDomain, substate => substate.get('getReportListSuccess'));

const getReportListFailure = () =>
  createSelector(selectManageReportDomain, substate => substate.get('getReportListFailure'));

const plantList = () =>
  createSelector(selectManageReportDomain, substate => substate.get('plantList'));

const plantListFailure = () =>
  createSelector(selectManageReportDomain, substate => substate.get('plantListFailure'));

const pipelineList = () =>
  createSelector(selectManageReportDomain, substate => substate.get('pipelineList'));

const pipelineListFailure = () =>
  createSelector(selectManageReportDomain, substate => substate.get('pipelineListFailure'));

export { selectManageReportDomain, getReportListSuccess, getReportListFailure, plantList, plantListFailure, pipelineList, pipelineListFailure };