/*
 *
 * PipeLineList actions
 *
 */

import {GET_PIPELINE_LIST,DELETE_PIPELINE,GET_PLANT_LIST, GET_ALARM_LIST, GET_PIPELINE_SEGMENT_DATA } from "./constants";

export function getPipelineList(id) {
  return {
    type: GET_PIPELINE_LIST,
    id
  };
}

export function pipelineDeleteHandler(plantId,pipeId) {
  return {
    type: DELETE_PIPELINE,
    plantId,pipeId
  };
}

export function managePlantList() {
  return {
    type: GET_PLANT_LIST,
  };
}

export function manageGetAlarmList(plantId, limit, offset) {
  return {
    type: GET_ALARM_LIST,
    plantId, 
    limit, 
    offset
  };
}
