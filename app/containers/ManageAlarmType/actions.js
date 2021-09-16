/*
 *
 * ManageAlarmType actions
 *
 */

import {ADD_ALARM_TYPE, GET_ALARM_TYPE, GET_ALARM_CATEGORY} from './constants'

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


export function addAlarmType(payload) {
  return {
    type: ADD_ALARM_TYPE,
    payload
  };
}

