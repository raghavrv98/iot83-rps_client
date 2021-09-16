import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditGroup state domain
 */

const selectAddOrEditGroupDomain = state =>
  state.get("addOrEditGroup", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddOrEditGroup
 */

const getSubmitSuccess = () =>
  createSelector(selectAddOrEditGroupDomain, substate => substate.get('onSubmitSuccess'));

const getSubmitError = () =>
  createSelector(selectAddOrEditGroupDomain, substate => substate.get('onSubmitFailure'));

const getGroupDetailsSuccess = () =>
  createSelector(selectAddOrEditGroupDomain, substate => substate.get('groupDetailsSuccess'));

const getGroupDetailsError = () =>
  createSelector(selectAddOrEditGroupDomain, substate => substate.get('groupDetailsFailure'));


export { selectAddOrEditGroupDomain, getSubmitSuccess, getSubmitError, getGroupDetailsSuccess, getGroupDetailsError };
