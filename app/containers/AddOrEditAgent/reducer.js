/*
 *
 * AddOrEditAgent reducer
 *
 */

import { fromJS } from "immutable";

import {
  CREATE_AGENT_REQUEST,
  CREATE_AGENT_SUCCESS,
  CREATE_AGENT_FAILURE,
  GET_AGENT_DETAILS_SUCCESS,
  GET_AGENT_DETAILS_FAILURE,
} from "./constants";

export const initialState = fromJS({});

function addOrEditAgentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_AGENT_REQUEST:
      return state.set("createAgentFailure",undefined)
    case CREATE_AGENT_SUCCESS:
      return state.set("createAgentSuccess", action.response);
    case CREATE_AGENT_FAILURE:
      return state.set("createAgentFailure", action.error);
    case GET_AGENT_DETAILS_SUCCESS:
      return state.set("agentDetailsSuccess", action.response);
    case GET_AGENT_DETAILS_FAILURE:
      return state.set("agentDetailsFailure", action.error);
    default:
      return state;
  }
}

export default addOrEditAgentReducer;
