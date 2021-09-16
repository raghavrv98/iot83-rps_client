/*
 *
 * ManageAlarmType reducer
 *
 */

import { fromJS } from "immutable";
import {
  ADD_ALARM_TYPE_SUCCESS,
  ADD_ALARM_TYPE_FAILURE,
  GET_ALARM_TYPE_SUCCESS,
  GET_ALARM_TYPE_FAILURE,
  GET_ALARM_CATEGORY_SUCCESS,
  GET_ALARM_CATEGORY_FAILURE
} from "./constants";

export const initialState = fromJS({});

function manageAlarmTypeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALARM_TYPE_SUCCESS:
      return state.set("getAlarmsTypeSuccess", action.response);
    case GET_ALARM_TYPE_FAILURE:
      return state.set("getAlarmsTypeFailure", action.error);
      case GET_ALARM_CATEGORY_SUCCESS:
        return state.set("getAlarmsCategorySuccess", action.response);
      case GET_ALARM_CATEGORY_FAILURE:
        return state.set("getAlarmsCategoryFailure", action.error);
    case ADD_ALARM_TYPE_SUCCESS:
      return state.set("addAlarmsTypeSuccess", action.response);
    case ADD_ALARM_TYPE_FAILURE:
      return state.set("addAlarmsTypeFailure", action.error);
    default:
      return initialState;
  }
}
export default manageAlarmTypeReducer;
