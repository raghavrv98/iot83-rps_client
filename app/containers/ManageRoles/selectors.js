import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageRoles state domain
 */

const selectManageRolesDomain = state => state.get("manageRoles", initialState);

const getList = () =>
  createSelector(selectManageRolesDomain, substate => substate.get('gotList'));

const getListError = () =>
  createSelector(selectManageRolesDomain, substate => substate.get('notGetList'));

const getDeleteSuccess = () =>
  createSelector(selectManageRolesDomain, substate => substate.get('deleteSuccess'));

const getDeleteFailure = () =>
  createSelector(selectManageRolesDomain, substate => substate.get('deleteFailure'));
  
export { getList, getListError, selectManageRolesDomain, getDeleteSuccess, getDeleteFailure };
