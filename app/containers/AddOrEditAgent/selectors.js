import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditAgent state domain
 */

const selectAddOrEditAgentDomain = state =>
  state.get("addOrEditAgent", initialState);

export const getAgentSuccess = () =>
  createSelector(selectAddOrEditAgentDomain, substate =>
    substate.get("createAgentSuccess")
  );
export const getAgentFailure = () =>
  createSelector(selectAddOrEditAgentDomain, substate =>
    substate.get("createAgentFailure")
  );
export const getAgentDataSuccess = () =>
  createSelector(selectAddOrEditAgentDomain, substate =>
    substate.get("agentDetailsSuccess")
  );

export const getAgentDataFailure = () =>
  createSelector(selectAddOrEditAgentDomain, substate =>
    substate.get("agentDetailsFailure")
  );

