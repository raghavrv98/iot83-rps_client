/*
 *
 * ConfigMeasurement actions
 *
 */

import { DEFAULT_ACTION, GET_MEASUREMENT_LIST, PROCESS_MEASUREMENT, } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getMeasurements(id,measurementCount, offset) {
  return {
    type: GET_MEASUREMENT_LIST,
    id,
    measurementCount,
    offset
  };
} 

export function processMeasurement(measureId,agentId) {
  return{
    type: PROCESS_MEASUREMENT,
    measureId,
    agentId,
  }
}
