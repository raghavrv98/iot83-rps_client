import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectAddOrEditRtdDomain = state =>
  state.get("addOrEditRtd", initialState);

const getSubmitSuccess = () =>
createSelector(selectAddOrEditRtdDomain, substate => substate.get('onSubmitSuccess'));

const getSubmitError = () =>
createSelector(selectAddOrEditRtdDomain, substate => substate.get('onSubmitFailure'));

const getDetailsSuccess = () =>
createSelector(selectAddOrEditRtdDomain, substate => substate.get('zoneDetailsSuccess'));

const getDetailsError = () =>
createSelector(selectAddOrEditRtdDomain, substate => substate.get('zoneDetailsFailure'));

export { getSubmitSuccess, getSubmitError,getDetailsSuccess, getDetailsError };