/*
 *
 * ManageReport actions
 *
 */

import { GET_REPORT_LIST, GET_PLANT_LIST, GET_PIPELINE_DETAILS } from "./constants";

export function getReportList(plantId,pipelineId) {
  return {
    type: GET_REPORT_LIST,
    plantId,
    pipelineId
  };
}

export function managePlantList() {
  return {
    type: GET_PLANT_LIST,
  };
}

export function fetchPipelinesDetails(plantId) {
  return {
    type: GET_PIPELINE_DETAILS,
    plantId
  };
}