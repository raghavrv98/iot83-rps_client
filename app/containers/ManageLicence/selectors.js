import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageLicence state domain
 */

const selectManageLicenceDomain = state =>
  state.get("manageLicence", initialState);

const getPlansList = () =>
  createSelector(selectManageLicenceDomain, substate => substate.get('plansList'));

const getPlansListError = () =>
  createSelector(selectManageLicenceDomain, substate => substate.get('plansListError'));

const submitRequestSuccess = () =>
  createSelector(selectManageLicenceDomain, substate => substate.get('submitRequestSuccess'));

const submitRequestFailure = () =>
  createSelector(selectManageLicenceDomain, substate => substate.get('submitRequestFailure'));

const licenseKeySuccess = () => createSelector(selectManageLicenceDomain, substate => substate.get('licenseKeySuccess'));
const licenseKeyFailure = () => createSelector(selectManageLicenceDomain, substate => substate.get('licenseKeyFailure'));


export { getPlansList, getPlansListError, submitRequestSuccess, submitRequestFailure, licenseKeySuccess, licenseKeyFailure};
