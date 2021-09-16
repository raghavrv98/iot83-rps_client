import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageLicencePlan state domain
 */

const selectManageLicencePlanDomain = state =>
  state.get("manageLicencePlan", initialState);

  const licenseListSuccess = () =>
  createSelector(selectManageLicencePlanDomain, substate => substate.get('licenseListSuccess'));

const licenseListFailure = () =>
  createSelector(selectManageLicencePlanDomain, substate => substate.get('licenseListFailure'));

  const licenseDeleteSuccess = () =>
  createSelector(selectManageLicencePlanDomain, substate => substate.get('licenseDeleteSuccess'));

const licenseDeleteFailure = () =>
  createSelector(selectManageLicencePlanDomain, substate => substate.get('licenseDeleteFailure'));

const makeSelectManageLicencePlan = () =>
  createSelector(selectManageLicencePlanDomain, substate => substate.toJS());

export { makeSelectManageLicencePlan, 
         selectManageLicencePlanDomain, 
         licenseListSuccess, 
         licenseListFailure,
         licenseDeleteSuccess, 
         licenseDeleteFailure };