/*
 *
 * AddOrEditRtd actions
 *
 */

import { ON_SUBMIT_REQUEST, GET_ZONE_DETAILS } from "./constants";

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
