/*
 *
 * ManageAgents actions
 *
 */

import { DEFAULT_ACTION, 
         GET_AGENTS, 
         DELETE_REQUEST, 
         AGENT_UPDATE_kEY, 
         GET_COMPARISON_DETAILS, 
         SAVE_TO_RPS_REQUEST,
         PUBLISH_TO_DTS_REQUEST } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function fetchAgentsList() {
  return {
    type: GET_AGENTS
  };
}

export function deleteHandler(id) {
  return {
    type: DELETE_REQUEST,
    id
  }
}

export function activeDeactiveAgentKey(id, status) {
  return {
    type: AGENT_UPDATE_kEY,
    id,
    status
  }
}

export function saveToRPS(id, payload) {
  return {
    type: SAVE_TO_RPS_REQUEST,
    id,
    payload
  }
}

export function publishToDTS(id, payload) {
  return {
    type: PUBLISH_TO_DTS_REQUEST,
    id,
    payload
  }
}

export function getComparisonDetails(id) {
  return {
    type: GET_COMPARISON_DETAILS,
    id
  }
}