import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get("loginPage", initialState);

const getLoginSuccess = () =>
  createSelector(selectLoginPageDomain, loginState => loginState.get('login_success'));

const getLoginError = () =>
  createSelector(selectLoginPageDomain, loginState => loginState.get('login_failed_message'));
  
const getResetPasswordSuccess = () =>
  createSelector(selectLoginPageDomain, loginState => loginState.get('resetPasswordSuccess'));

const getResetPasswordFailure = () =>
  createSelector(selectLoginPageDomain, loginState => loginState.get('resetPasswordFailure'));

  const authConfigDetailsSuccess = () =>
  createSelector(selectLoginPageDomain, substate => substate.get('authConfigDetailsSuccess'));

const authConfigDetailsFailure = () =>
  createSelector(selectLoginPageDomain, substate => substate.get('authConfigDetailsFailure'));

export { getResetPasswordSuccess, 
         getResetPasswordFailure,  
         getLoginSuccess, 
         getLoginError, 
         authConfigDetailsSuccess, 
        authConfigDetailsFailure};
