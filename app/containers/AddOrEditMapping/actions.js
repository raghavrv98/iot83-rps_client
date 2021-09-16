/*
 *
 * AddOrEditMapping actions
 *
 */

import { DEFAULT_ACTION, GET_PLANTS,GET_PIPELINES,GET_EDIT_SAVE_MAP,GET_MAPPING_DATA,GET_AGENT_DETAILS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getPlantList() {
  return {
    type: GET_PLANTS
  };
}

export function handelMapping(payload,expId,mapId) {
  return {
    type: GET_EDIT_SAVE_MAP,
    payload,
    expId,
    mapId
  };
}

export function getmappingDetails(agentId,mapId) {
  return {
    type: GET_MAPPING_DATA,
    agentId,mapId
  };
}

export function getAgentDetails(id) {
  return {
    type: GET_AGENT_DETAILS,
    id
  };
}