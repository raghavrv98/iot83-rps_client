import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the resetPassword state domain
 */

const selectResetPasswordDomain = state =>
  state.get("resetPassword", initialState);

const getResetPasswordSuccess = () =>
  createSelector(selectResetPasswordDomain, substate => substate.get('resetPasswordSuccess'));

const getResetPasswordFailure = () =>
  createSelector(selectResetPasswordDomain, substate => substate.get('resetPasswordFailure'));

export {selectResetPasswordDomain, getResetPasswordSuccess, getResetPasswordFailure };
