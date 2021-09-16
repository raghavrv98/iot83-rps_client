/*
 *
 * ManageAlarmsAndAlerts actions
 *
 */

import { DEFAULT_ACTION, 
         GET_PLANTLIST, 
         GET_PIPELINELIST, 
         GET_ALARM_TYPE, 
         GET_FILTERED_DATA, 
         ALARM_STATUS_CHANGE, 
         GET_ALARM_DETAILS,
         GET_ALARM_CATEGORY } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  }
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

export function getAlarmType() {
  return {
    type: GET_ALARM_TYPE
  };
}
export function getAlarmCategory() {
  return {
    type: GET_ALARM_CATEGORY
  };
}
export function apiApplyFilters(filters, plantId, pipelineId, limit, offset) {
    return {
    type: GET_FILTERED_DATA,
    filters,plantId, limit, offset, pipelineId
  };
}
export function alarmStatusChangeHandler(payload, seqId, plantId){
  return {
    type: ALARM_STATUS_CHANGE,
    payload, seqId, plantId
  }
}

export function getAlarmDetails(plantId,seqId){
  return {
    type: GET_ALARM_DETAILS,
    seqId, plantId
  }
}