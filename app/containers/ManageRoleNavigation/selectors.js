import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectManageRoleNavigationDomain = state =>
  state.get("manageRoleNavigation", initialState);

const fetchMenus = () => createSelector(selectManageRoleNavigationDomain, substate => substate.get("fetchMenus"));
const fetchMenusError = () => createSelector(selectManageRoleNavigationDomain, substate => substate.get("fetchMenusError"));

const fetchAllMenus = () => createSelector(selectManageRoleNavigationDomain, substate => substate.get("fetchAllMenus"));
const fetchAllMenusError = () => createSelector(selectManageRoleNavigationDomain, substate => substate.get("fetchAllMenusError"));

const saveMenuSuccess = () => createSelector(selectManageRoleNavigationDomain, substate => substate.get("saveMenuSuccess"));
const saveMenuError = () => createSelector(selectManageRoleNavigationDomain, substate => substate.get("saveMenuError"));

export { 
  fetchMenus,fetchMenusError,
  fetchAllMenus,fetchAllMenusError,
  saveMenuSuccess,saveMenuError
};
