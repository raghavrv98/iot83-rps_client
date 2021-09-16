import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageOAuthConfig state domain
 */

const selectManageOAuthConfigDomain = state =>
  state.get("manageOAuthConfig", initialState);

const makeSelectManageOAuthConfig = () =>
  createSelector(selectManageOAuthConfigDomain, substate => substate.toJS());

const authConfigDetailsSuccess = () =>
  createSelector(selectManageOAuthConfigDomain, substate => substate.get('authConfigDetailsSuccess'));

const authConfigDetailsFailure = () =>
  createSelector(selectManageOAuthConfigDomain, substate => substate.get('authConfigDetailsFailure'));

const submitRequestSuccess = () =>
  createSelector(selectManageOAuthConfigDomain, substate => substate.get('submitRequestSuccess'));

const submitRequestFailure = () =>
  createSelector(selectManageOAuthConfigDomain, substate => substate.get('submitRequestFailure'));

const deleteConfigSuccess = () =>
  createSelector(selectManageOAuthConfigDomain, substate => substate.get('deleteConfigSuccess'));

const deleteConfigFailure = () =>
  createSelector(selectManageOAuthConfigDomain, substate => substate.get('deleteConfigFailure'));

export default makeSelectManageOAuthConfig;
export {
  selectManageOAuthConfigDomain,
  authConfigDetailsSuccess,
  authConfigDetailsFailure,
  submitRequestSuccess,
  submitRequestFailure,
  deleteConfigSuccess,
  deleteConfigFailure
};
