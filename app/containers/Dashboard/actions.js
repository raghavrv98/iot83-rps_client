/*
 *
 * Dashboard actions
 *
 */

import { DEFAULT_ACTION, 
  GET_CHART_DATA, 
  GET_TIME_FREEZE_DATA, 
  GET_SEGMENT_DATA, 
  GET_PLANT_LIST,
  GET_PIPELINE_DETAILS, 
  GET_ATTRIBUTES} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getPipeLineSummary(pipelineId, plantId) {
  return {
    type: GET_TIME_FREEZE_DATA,
    pipelineId, plantId
  };
}

export function getSegmentData(pipelineId,plantId,segment, attribute,timestamp) {
if(segment.length > 1){
  segment =[segment[0],segment[segment.length - 1]]
}
  return {
    type: GET_SEGMENT_DATA,
    plantId, pipelineId, segment, attribute,timestamp
  };
}

export function getAlarmChart(pipelineId, plantId, distance, attributes) {
  return {
    type: GET_CHART_DATA,
    pipelineId, 
    plantId, 
    distance,
    attributes
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

export function getAttributes(plantId,pipelineId, attributesType, distance) {
  return {
    type: GET_ATTRIBUTES,
    plantId,
    pipelineId, 
    attributesType, 
    distance
  };
}