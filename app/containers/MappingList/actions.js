/*
 *
 * MappingList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_MAPINGS,
  GET_AGENT,
  DELETE_MAPPING,
  SAVE_MAPPINGS,
  GET_PIPELINELIST,
  GET_PLANTLIST
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function fetchMappingsList(id) {
  return {
    type: GET_MAPINGS,
    id
  };
}

export function getAgentDetails(id) {
  return {
    type: GET_AGENT,
    id
  };
}

export function deleteConfirm(id, mappingId) {
  return {
    type: DELETE_MAPPING,
    id,
    mappingId
  };
}

export function saveMapping(payload, id) {
  return {
    type: SAVE_MAPPINGS,
    payload, id
  };
}

export function managePlantList() {
  return {
    type: GET_PLANTLIST
  };
}

export function managePipelineList() {
  return {
    type: GET_PIPELINELIST
  };
}