import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageUsers state domain
 */

const selectManageUsersDomain = state => state.get("manageUsers", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageUsers
 */

const getList = () =>
  createSelector(selectManageUsersDomain, substate => substate.get('gotList'));

const getListError = () =>
  createSelector(selectManageUsersDomain, substate => substate.get('notGetList'));


const getDeleteSuccess = () =>
  createSelector(selectManageUsersDomain, substate => substate.get('deleteSuccess'));

const getDeleteFailure = () =>
  createSelector(selectManageUsersDomain, substate => substate.get('deleteFailure'));
export { getList, getListError, selectManageUsersDomain, getDeleteSuccess, getDeleteFailure };
