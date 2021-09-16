/*
 *
 * CommissionerDashboard actions
 *
 */

import { DEFAULT_ACTION, GET_CHART_DATA, GET_SEGMENT_DATA, GET_PLANT_LIST,GET_PIPELINE_DETAILS, GET_ATTRIBUTES } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getSegmentData(pipelineId,plantId,sendingObject) {
  return {
    type: GET_SEGMENT_DATA,
    plantId, pipelineId, sendingObject
  };
}

export function getAlarmChart(pipelineId, plantId, distance, selectedAttribute) {
  return {
    type: GET_CHART_DATA,
    pipelineId, 
    plantId, 
    distance,
    selectedAttribute
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

export function getAttributes(plant, pipeline) {
  return {
    type: GET_ATTRIBUTES,
    plant, pipeline
  };
}
