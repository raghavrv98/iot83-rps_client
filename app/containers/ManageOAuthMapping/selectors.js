import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageOAuthMapping state domain
 */

const selectManageOAuthMappingDomain = state =>
  state.get("manageOAuthMapping", initialState);

const getRolesListSuccess = () =>
  createSelector(selectManageOAuthMappingDomain, substate => substate.get('getRolesListSuccess'));

const getRolesListFailure = () =>
  createSelector(selectManageOAuthMappingDomain, substate => substate.get('getRolesListFailure'));


const getGroupsListSuccess = () =>
  createSelector(selectManageOAuthMappingDomain, substate => substate.get('getGroupsListSuccess'));

const getGroupsListFailure = () =>
  createSelector(selectManageOAuthMappingDomain, substate => substate.get('getGroupsListFailure'));

const getMappingListSuccess = () =>
  createSelector(selectManageOAuthMappingDomain, substate => substate.get('getMappingListSuccess'));

const getMappingListFailure = () =>
  createSelector(selectManageOAuthMappingDomain, substate => substate.get('getMappingListFailure'));

const submitMappingRequestSuccess = () =>
  createSelector(selectManageOAuthMappingDomain, substate => substate.get('submitMappingRequestSuccess'));

const submitMappingRequestFailure = () =>
  createSelector(selectManageOAuthMappingDomain, substate => substate.get('submitMappingRequestFailure'));

export {
  selectManageOAuthMappingDomain,
  getRolesListSuccess,
  getRolesListFailure,
  getGroupsListSuccess,
  getGroupsListFailure,
  getMappingListSuccess,
  getMappingListFailure,
  submitMappingRequestSuccess,
  submitMappingRequestFailure
};
