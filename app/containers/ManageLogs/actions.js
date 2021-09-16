/*
 *
 * ManageLogs actions
 *
 */

import { DEFAULT_ACTION, GET_LOGS_LIST, GENERATE_LOGS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getLogsList() {
  return {
    type: GET_LOGS_LIST
  };
}

export function generateLogs(payload) {
  return {
    type: GENERATE_LOGS,
    payload
  };
}