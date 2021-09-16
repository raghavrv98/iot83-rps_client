import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditRole state domain
 */

const selectAddOrEditRoleDomain = state =>
  state.get("ManageRolePermission", initialState);

const getSubmitSuccess = () =>
createSelector(selectAddOrEditRoleDomain, substate => substate.get('onSubmitSuccess'));

const getSubmitError = () =>
createSelector(selectAddOrEditRoleDomain, substate => substate.get('onSubmitFailure'));

const getRoleDetailsSuccess = () =>
createSelector(selectAddOrEditRoleDomain, substate => substate.get('roleDetailsSuccess'));

const getRoleDetailsError = () =>
createSelector(selectAddOrEditRoleDomain, substate => substate.get('roleDetailsFailure'));

const getPermissionsDetails = () =>
createSelector(selectAddOrEditRoleDomain, substate => substate.get('getPermissionsDetails'));

const getPermissionsFailure = () =>
createSelector(selectAddOrEditRoleDomain, substate => substate.get('getPermissionsFailure'));

const getEntitlementsSuccess = () =>
createSelector(selectAddOrEditRoleDomain, substate => substate.get('getEntitlementsSuccess'));

const getEntitlementsFailure = () =>
createSelector(selectAddOrEditRoleDomain, substate => substate.get('getEntitlementsFailure'));

export { 
  selectAddOrEditRoleDomain ,getSubmitSuccess,
  getSubmitError,getRoleDetailsError,
  getRoleDetailsSuccess,getPermissionsDetails,
  getPermissionsFailure,
  getEntitlementsFailure,getEntitlementsSuccess,
};
