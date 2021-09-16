/*
 *
 * AddOrEditZone actions
 *
 */

import {
  ON_SUBMIT_REQUEST,
  RESET_TO_INITIAL_STATE,
  GET_ZONE_DETAILS
} from "./constants";



export function onSubmitHandler(payload, plantId, pipelineId, zoneId, isBulkUpload) {
  return {
    type: ON_SUBMIT_REQUEST,
    payload,
    plantId,
    pipelineId,
    zoneId,
    isBulkUpload
  };
}
export function getZoneDetails(plantId, pipelineId, zoneId) {
  return {
    type: GET_ZONE_DETAILS,
    plantId,
    pipelineId,
    zoneId
  };
}
export function resetToInitailState() {
  return {
    type: RESET_TO_INITIAL_STATE
  };
}
