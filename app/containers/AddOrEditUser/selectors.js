import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditUser state domain
 */

const selectAddOrEditUserDomain = state =>
  state.get("addOrEditUser", initialState);

const getSubmitSuccess = () =>
createSelector(selectAddOrEditUserDomain, substate => substate.get('onSubmitSuccess'));

const getSubmitError = () =>
createSelector(selectAddOrEditUserDomain, substate => substate.get('onSubmitFailure'));

const getUserDetailsSuccess = () =>
createSelector(selectAddOrEditUserDomain, substate => substate.get('userDetailsSuccess'));

const getUserDetailsError = () =>
createSelector(selectAddOrEditUserDomain, substate => substate.get('userDetailsFailure'));


const getAllGroupSuccess = () =>
createSelector(selectAddOrEditUserDomain, substate => substate.get('getAllGroupSuccess'));

const getAllGroupError = () =>
createSelector(selectAddOrEditUserDomain, substate => substate.get('getAllGroupFailure'));


const getAllRolesSccess = () =>
createSelector(selectAddOrEditUserDomain, substate => substate.get('getAllRolesSuccess'));

const getAllRolesError = () =>
createSelector(selectAddOrEditUserDomain, substate => substate.get('getAllRolesFailure'));

export { 
  selectAddOrEditUserDomain ,getSubmitSuccess,getSubmitError,
  getUserDetailsSuccess,getUserDetailsError,getAllGroupSuccess,
  getAllGroupError,getAllRolesSccess,getAllRolesError
};
