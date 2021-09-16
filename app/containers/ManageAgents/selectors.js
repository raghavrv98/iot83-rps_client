import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageAgents state domain
 */

const selectManageAgentsDomain = state =>
  state.get("manageAgents", initialState);

const getAgentsList = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('agentsList'));

const getAgentsListError = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('agentsListError'));

const getDeleteSuccess = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('deleteSuccess'));

const getDeleteFailure = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('deleteFailure'));

  const agentUpdateKeySuccess = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('agentUpdateKeySuccess'));

const agentUpdateKeyFailure = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('agentUpdateKeyFailure'));
  
  const comparisonDetailsSuccess = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('comparisonDetailsSuccess'));

const comparisonDetailsFailure = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('comparisonDetailsFailure'));
  
  const saveToRPSSuccess = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('saveToRPSSuccess'));

const saveToRPSFailure = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('saveToRPSFailure'));
  
  const publishToDTSSuccess = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('publishToDTSSuccess'));

const publishToDTSFailure = () =>
  createSelector(selectManageAgentsDomain, substate => substate.get('publishToDTSFailure'));

  export { getAgentsList, getAgentsListError, 
           getDeleteSuccess, getDeleteFailure, 
           agentUpdateKeySuccess, agentUpdateKeyFailure, 
           comparisonDetailsSuccess, comparisonDetailsFailure, 
           saveToRPSSuccess, saveToRPSFailure,
           publishToDTSSuccess, publishToDTSFailure};
