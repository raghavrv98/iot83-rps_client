import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the changePassword state domain
 */

const selectChangePasswordDomain = state =>
  state.get("changePassword", initialState);

const getChangePasswordSuccess= () =>
  createSelector(selectChangePasswordDomain, substate => substate.get('changePasswordSuccess'));

const getChangePasswordFailure = () =>
  createSelector(selectChangePasswordDomain, substate => substate.get('changePasswordFailure'));

export { getChangePasswordSuccess, getChangePasswordFailure };
