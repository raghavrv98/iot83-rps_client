import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditMapping state domain
 */

const selectAddOrEditMappingDomain = state =>
  state.get("addOrEditMapping", initialState);

const plantsSuccess = () => createSelector(selectAddOrEditMappingDomain, substate => substate.get('plantsListSuccess'));
const plantsFailure = () => createSelector(selectAddOrEditMappingDomain, substate => substate.get('plantsListFailure'));

const editSaveSuccess = () => createSelector(selectAddOrEditMappingDomain, substate => substate.get('editSaveSuccess'));
const editSaveFailure = () => createSelector(selectAddOrEditMappingDomain, substate => substate.get('editSaveFailure'));

const fetchMappingDataSuccess = () => createSelector(selectAddOrEditMappingDomain, substate => substate.get('fetchMappingDataSuccess'));
const fetchMappingDataFailure = () => createSelector(selectAddOrEditMappingDomain, substate => substate.get('fetchMappingDataFailure'));

const getAgentDetailsSuccess = () => createSelector(selectAddOrEditMappingDomain, substate => substate.get('getAgentDetailsSuccess'));
const getAgentDetailsFailure = () => createSelector(selectAddOrEditMappingDomain, substate => substate.get('getAgentDetailsFailure'));

export { 
  plantsSuccess,plantsFailure,
  editSaveSuccess,editSaveFailure,
  fetchMappingDataSuccess,fetchMappingDataFailure,
  getAgentDetailsSuccess,getAgentDetailsFailure,
};

