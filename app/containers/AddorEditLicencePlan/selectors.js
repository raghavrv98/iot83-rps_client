import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addorEditLicencePlan state domain
 */

const selectAddorEditLicencePlanDomain = state =>
  state.get("addorEditLicencePlan", initialState);

const getSubmitSuccess = () =>
  createSelector(selectAddorEditLicencePlanDomain, substate => substate.get('onSubmitSuccess'));

const getSubmitError = () =>
  createSelector(selectAddorEditLicencePlanDomain, substate => substate.get('onSubmitFailure'));

  const getPlansSuccess = () =>
  createSelector(selectAddorEditLicencePlanDomain, substate => substate.get('getPlansSuccess'));

const getPlansFailure = () =>
  createSelector(selectAddorEditLicencePlanDomain, substate => substate.get('getPlansFailure'));


export { getSubmitSuccess, getSubmitError, getPlansSuccess, getPlansFailure };
