import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageGroups state domain
 */

const selectManageGroupsDomain = state =>
  state.get("manageGroups", initialState);

const getList = () =>
  createSelector(selectManageGroupsDomain, substate => substate.get('gotList'));

const getListError = () =>
  createSelector(selectManageGroupsDomain, substate => substate.get('notGetList'));

const getDeleteSuccess = () =>
  createSelector(selectManageGroupsDomain, substate => substate.get('deleteSuccess'));

const getDeleteFailure = () =>
  createSelector(selectManageGroupsDomain, substate => substate.get('deleteFailure'));

export { getList, getListError, selectManageGroupsDomain, getDeleteSuccess, getDeleteFailure };
