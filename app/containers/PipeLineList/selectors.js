import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the pipeLineList state domain
 */

const selectPipeLineListDomain = state =>
  state.get("pipeLineList", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PipeLineList
 */

const pipelineList = () =>
  createSelector(selectPipeLineListDomain, substate =>
    substate.get("pipelineList")
  );
const pipelineListFailure = () =>
  createSelector(selectPipeLineListDomain, substate =>
    substate.get("pipelineListFailure")
  );

const getpipeLineDelete = () =>
  createSelector(selectPipeLineListDomain, substate =>
    substate.get("pipeLineDelete")
  );
const getpipeLineDeleteFailure = () =>
  createSelector(selectPipeLineListDomain, substate =>
    substate.get("pipeLineDeleteFailure")
  );

const plantList = () =>
createSelector(selectPipeLineListDomain, substate => substate.get('plantList'));

const plantListFailure = () =>
createSelector(selectPipeLineListDomain, substate => substate.get('plantListFailure'));

const getAlarmList = () =>
createSelector(selectPipeLineListDomain, substate => substate.get('getAlarmList'));

const getAlarmListFailure = () =>
createSelector(selectPipeLineListDomain, substate => substate.get('getAlarmListFailure'));

const getPipelineSegmentDataSuccess = () =>
createSelector(selectPipeLineListDomain, substate => substate.get('getPipelineSegmentDataSuccess'));

const getPipelineSegmentDataFailure = () =>
createSelector(selectPipeLineListDomain, substate => substate.get('getPipelineSegmentDataFailure'));

export {
  pipelineList,
  pipelineListFailure,
  getpipeLineDelete,
  getpipeLineDeleteFailure,
  plantList,
  plantListFailure,
  getAlarmList,
  getAlarmListFailure,
  getPipelineSegmentDataSuccess,
  getPipelineSegmentDataFailure
};
