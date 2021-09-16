import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the mappingList state domain
 */

const selectMappingListDomain = state => state.get("mappingList", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MappingList
 */

const mappingListSuccess = () => createSelector(selectMappingListDomain, substate => substate.get('mapingListSuccess'));
const mapingListFailure = () => createSelector(selectMappingListDomain, substate => substate.get('mapingListFailure'));

const agentDetailsSuccess = () => createSelector(selectMappingListDomain, substate => substate.get('agentDetailsSuccess'));
const agentDetailsFailure = () => createSelector(selectMappingListDomain, substate => substate.get('agentDetailsFailure'));

const deleteMappingSuccess = () => createSelector(selectMappingListDomain, substate => substate.get('deleteMappingSuccess'));
const deleteMappingFailure = () => createSelector(selectMappingListDomain, substate => substate.get('deleteMappingFailure'));

const saveMappingSuccess = () => createSelector(selectMappingListDomain, substate => substate.get('saveMappingSuccess'));
const saveMappingFailure = () => createSelector(selectMappingListDomain, substate => substate.get('saveMappingFailure'));

const getPlantListSuccess = () => createSelector(selectMappingListDomain, substate => substate.get('getPlantListSuccess'));
const getPlantListFailure = () => createSelector(selectMappingListDomain, substate => substate.get('getPlantListFailure'));

const getPipelineListSuccess = () => createSelector(selectMappingListDomain, substate => substate.get('getPipelineListSuccess'));
const getPipelineListFailure = () => createSelector(selectMappingListDomain, substate => substate.get('getPipelineListFailure'));


export {
  mappingListSuccess, mapingListFailure,
  agentDetailsSuccess, agentDetailsFailure,
  deleteMappingSuccess, deleteMappingFailure,
  saveMappingFailure, saveMappingSuccess,
  getPlantListSuccess, getPlantListFailure,
  getPipelineListSuccess, getPipelineListFailure,
};
