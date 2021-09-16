import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditZone state domain
 */

const selectAddOrEditZoneDomain = state =>
  state.get("addOrEditZone", initialState);

const getSubmitSuccess = () =>
createSelector(selectAddOrEditZoneDomain, substate => substate.get('onSubmitSuccess'));

const getSubmitError = () =>
createSelector(selectAddOrEditZoneDomain, substate => substate.get('onSubmitFailure'));

const getDetailsSuccess = () =>
createSelector(selectAddOrEditZoneDomain, substate => substate.get('zoneDetailsSuccess'));

const getDetailsError = () =>
createSelector(selectAddOrEditZoneDomain, substate => substate.get('zoneDetailsFailure'));

export { getSubmitSuccess, getSubmitError,getDetailsSuccess, getDetailsError };