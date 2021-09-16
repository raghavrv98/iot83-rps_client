/*
 *
 * ManageRtd actions
 *
 */

import { GET_ZONE_LIST, ZONE_DELETE } from "./constants";

export function getZoneList(plantId, pipelineId, payload) {
  return {
    type: GET_ZONE_LIST,
    plantId, pipelineId, payload
  }
}

export function zoneDeleteHandler(plantId, pipelineId, multiple, zoneId) {
  return {
    type: ZONE_DELETE,
    plantId, pipelineId, zoneId, multiple
  }
}