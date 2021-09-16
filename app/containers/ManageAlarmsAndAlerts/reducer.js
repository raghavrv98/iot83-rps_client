/*
 *
 * ManageAlarmsAndAlerts reducer
 *
 */

import { fromJS } from "immutable";
import {
  GET_PLANTLIST_SUCCESS,
  GET_PLANTLIST_FAILURE,
  GET_PIPELINELIST_SUCCESS,
  GET_PIPELINELIST_FAILURE,
  GET_ALARM_TYPE_SUCCESS,
  GET_ALARM_TYPE_FAILURE,
  GET_FILTERED_DATA_SUCCESS,
  GET_FILTERED_DATA_FAILURE,
  ALARM_STATUS_CHANGE_SUCCESS,
  ALARM_STATUS_CHANGE_FAILURE,
  GET_ALARM_DETAILS_SUCCESS,
  GET_ALARM_DETAILS_FAILURE,
  GET_ALARM_CATEGORY_SUCCESS,
  GET_ALARM_CATEGORY_FAILURE
} from "./constants";
export const initialState = fromJS({});

function manageAlarmsAndAlertsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTLIST_SUCCESS:
      return state.set("getPlantListSuccess", action.response);
    case GET_PLANTLIST_FAILURE:
      return state.set("getPlantListFailure", action.error);
    case GET_PIPELINELIST_SUCCESS:
      return state.set("getPipelineListSuccess", action.response);
    case GET_PIPELINELIST_FAILURE:
      return state.set("getPipelineListFailure", action.error);
    case GET_ALARM_TYPE_SUCCESS:
      return state.set("getAlarmsTypeSuccess", action.response);
    case GET_ALARM_TYPE_FAILURE:
      return state.set("getAlarmsTypeFailure", action.error);
    case GET_ALARM_CATEGORY_SUCCESS:
      return state.set("getAlarmsCategorySuccess", action.response);
    case GET_ALARM_CATEGORY_FAILURE:
      return state.set("getAlarmsCategoryFailure", action.error);
    case GET_FILTERED_DATA_SUCCESS:
      return state.set("getFilterDataSuccess", action.response);
    case GET_FILTERED_DATA_FAILURE:
      return state.set("getFilterDataFailure", action.error);
    case ALARM_STATUS_CHANGE_SUCCESS:
      return state.set("getAlarmStatusSuccess", action.response)
    case ALARM_STATUS_CHANGE_FAILURE:
      return state.set("getAlarmStatusFailure", action.error)
    case GET_ALARM_DETAILS_SUCCESS:
      return state.set("alarmDetailSuccess", action.response)
    case GET_ALARM_DETAILS_FAILURE:
      return state.set("alarmDetailFailure", action.error)
    default:
      return initialState;
  }
}

export default manageAlarmsAndAlertsReducer;
