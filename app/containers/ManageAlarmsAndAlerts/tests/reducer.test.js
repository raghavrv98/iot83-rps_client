import { fromJS } from 'immutable';
import manageAlarmsAndAlertsReducer from '../reducer';
import {GET_PLANTLIST_SUCCESS,
  GET_PLANTLIST_FAILURE,
  GET_ALARM_TYPE_SUCCESS,
  GET_ALARM_TYPE_FAILURE,
  GET_FILTERED_DATA_SUCCESS,
  GET_FILTERED_DATA_FAILURE,
  ALARM_STATUS_CHANGE_SUCCESS, ALARM_STATUS_CHANGE_FAILURE
} from '../constants'

export const initialState = fromJS({});

describe('manageAlarmsAndAlertsReducer', () => {
  it('returns the initial state', () => {
    expect(manageAlarmsAndAlertsReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "GET_PLANTLIST_SUCCESS" action', () => {
    let action = {
      type: GET_PLANTLIST_SUCCESS,
      response: "Success",
    }
    expect(manageAlarmsAndAlertsReducer(fromJS({}),action).get("getPlantListSuccess")).toEqual("Success")
  });

  it('should handle "GET_PLANTLIST_FAILURE" action', () => {
    let action = {
      type: GET_PLANTLIST_FAILURE,
      error: "Exception",
    }
    expect(manageAlarmsAndAlertsReducer(fromJS({}),action).get("getPlantListFailure")).toEqual("Exception")
  })

  it('should handle "GET_ALARM_TYPE_SUCCESS" action', () => {
    let action = {
      type: GET_ALARM_TYPE_SUCCESS,
      response: "Success",
    }
    expect(manageAlarmsAndAlertsReducer(fromJS({}),action).get("getAlarmsTypeSuccess")).toEqual("Success")
  });

  it('should handle "GET_ALARM_TYPE_FAILURE" action', () => {
    let action = {
      type: GET_ALARM_TYPE_FAILURE,
      error: "Exception",
    }
    expect(manageAlarmsAndAlertsReducer(fromJS({}),action).get("getAlarmsTypeFailure")).toEqual("Exception")
  })

  it('should handle "GET_FILTERED_DATA_SUCCESS" action', () => {
    let action = {
      type: GET_FILTERED_DATA_SUCCESS,
      response: "Success",
    }
    expect(manageAlarmsAndAlertsReducer(fromJS({}),action).get("getFilterDataSuccess")).toEqual("Success")
  });

  it('should handle "GET_FILTERED_DATA_FAILURE" action', () => {
    let action = {
      type: GET_FILTERED_DATA_FAILURE,
      error: "Exception",
    }
    expect(manageAlarmsAndAlertsReducer(fromJS({}),action).get("getFilterDataFailure")).toEqual("Exception")
  })

  it('should handle "ALARM_STATUS_CHANGE_SUCCESS" action', () => {
    let action = {
      type: ALARM_STATUS_CHANGE_SUCCESS,
      response: "Success",
    }
    expect(manageAlarmsAndAlertsReducer(fromJS({}),action).get("getAlarmStatusSuccess")).toEqual("Success")
  });

  it('should handle "ALARM_STATUS_CHANGE_FAILURE" action', () => {
    let action = {
      type: ALARM_STATUS_CHANGE_FAILURE,
      error: "Exception",
    }
    expect(manageAlarmsAndAlertsReducer(fromJS({}),action).get("getAlarmStatusFailure")).toEqual("Exception")
  })
});
