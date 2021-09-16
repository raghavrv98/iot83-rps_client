import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the managePasswordRequest state domain
 */

const selectManagePasswordRequestDomain = state =>
  state.get("managePasswordRequest", initialState);

const getPasswordListSuccess = () =>
  createSelector(selectManagePasswordRequestDomain, substate => substate.get('getPasswordListSuccess'));

const getPasswordListFailure = () =>
createSelector(selectManagePasswordRequestDomain, substate => substate.get('getPasswordListFailure'));

export { getPasswordListSuccess, getPasswordListFailure };
