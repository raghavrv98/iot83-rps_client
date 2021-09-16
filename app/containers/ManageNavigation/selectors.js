import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageNavigation state domain
 */

const selectManageNavigationDomain = state =>
  state.get("manageNavigation", initialState);

const gotMenuSuccess = () =>
  createSelector(selectManageNavigationDomain, substate => substate.get('gotMenu'));

const gotMenuError = () =>
  createSelector(selectManageNavigationDomain, substate => substate.get('notGotmenu'));

const menuSaveSuccess = () =>
  createSelector(selectManageNavigationDomain, substate => substate.get('menuSaveSuccess'));

const menuSaveFailure = () =>
  createSelector(selectManageNavigationDomain, substate => substate.get('menuSaveFailure'));

export { 
  gotMenuSuccess, gotMenuError,
  menuSaveSuccess, menuSaveFailure
};
