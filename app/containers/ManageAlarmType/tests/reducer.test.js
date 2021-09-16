import { fromJS } from 'immutable';
import manageAlarmTypeReducer from '../reducer';
import {
  ADD_ALARM_TYPE_SUCCESS,
  ADD_ALARM_TYPE_FAILURE,
  GET_ALARM_TYPE_SUCCESS,
  GET_ALARM_TYPE_FAILURE
} from '../constants'

describe('manageAlarmTypeReducer', () => {
  it('returns the initial state', () => {
    expect(manageAlarmTypeReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "ADD_ALARM_TYPE_SUCCESS" action', () => {
    let action = {
      type: ADD_ALARM_TYPE_SUCCESS,
      response: "Success"
    }
    expect(manageAlarmTypeReducer(fromJS({}),action).get("addAlarmsTypeSuccess")).toEqual("Success")
  });

  it('should handle "ADD_ALARM_TYPE_FAILURE" action', () => {
    let action = {
      type: ADD_ALARM_TYPE_FAILURE,
      error: "Exception",
    }
    expect(manageAlarmTypeReducer(fromJS({}),action).get("addAlarmsTypeFailure")).toEqual("Exception")
  })

  it('should handle "GET_ALARM_TYPE_SUCCESS" action', () => {
    let action = {
      type: GET_ALARM_TYPE_SUCCESS,
      response: "Success"
    }
    expect(manageAlarmTypeReducer(fromJS({}),action).get("getAlarmsTypeSuccess")).toEqual("Success")
  });

  it('should handle "GET_ALARM_TYPE_FAILURE" action', () => {
    let action = {
      type: GET_ALARM_TYPE_FAILURE,
      error: "Exception",
    }
    expect(manageAlarmTypeReducer(fromJS({}),action).get("getAlarmsTypeFailure")).toEqual("Exception")
  })
});
