import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditPipeLine state domain
 */

const selectAddOrEditPipeLineDomain = state =>
  state.get("addOrEditPipeLine", initialState);

/**
 * Other specific selectors
 */
const getSubmitSuccess = () =>
createSelector(selectAddOrEditPipeLineDomain, substate => substate.get('onSubmitSuccess'));

const getSubmitError = () =>
createSelector(selectAddOrEditPipeLineDomain, substate => substate.get('onSubmitFailure'));

const getpipelineDetailsSuccess = () =>
createSelector(selectAddOrEditPipeLineDomain, substate => substate.get('pipelineDetailsSuccess'));

const getpipelineDetailsFailure = () =>
createSelector(selectAddOrEditPipeLineDomain, substate => substate.get('pipelineDetailsFailure'));
/**
 * Default selector used by AddOrEditPipeLine
 */
export { getSubmitSuccess, getSubmitError, getpipelineDetailsSuccess, getpipelineDetailsFailure};
