/*
 *
 * AddOrEditAgent actions
 *
 */

import { CREATE_AGENT_REQUEST,GET_AGENT_DETAILS } from "./constants";

export function createAgent(data) {
  return {
    type: CREATE_AGENT_REQUEST,
    payload: data,
  };
}
export function getAgentDetails(id) {
  return {
    type: GET_AGENT_DETAILS,
    id
  };
}
