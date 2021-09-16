import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the pipeLineDetail state domain
 */

const selectPipeLineDetailDomain = state =>
  state.get("pipeLineDetail", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PipeLineDetail
 */

const pipelinesDetails = () => createSelector(selectPipeLineDetailDomain, substate => substate.get('pipelinesDetails'))
const pipelinesDetailsError = () => createSelector(selectPipeLineDetailDomain, substate => substate.get('pipelinesDetailsFailure'))

const saveConfirm = () => createSelector(selectPipeLineDetailDomain, substate => substate.get('saveConfirm'))
const saveConfirmError = () => createSelector(selectPipeLineDetailDomain, substate => substate.get('saveConfirmError'))

const deleteDetails = () => createSelector(selectPipeLineDetailDomain, substate => substate.get('deleteDetails'))
const deleteDetailsFailure = () => createSelector(selectPipeLineDetailDomain, substate => substate.get('deleteDetailsFailure'))

export { 
  pipelinesDetails,pipelinesDetailsError, 
  saveConfirm, saveConfirmError,
  deleteDetails,deleteDetailsFailure,
};
