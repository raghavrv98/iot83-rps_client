/*
 *
 * ManageLogs reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  GET_LOGS_LIST_SUCCESS,
  GET_LOGS_LIST_FAILURE,
  GENERATE_LOGS_SUCCESS,
  GENERATE_LOGS_FAILURE
} from "./constants";

export const initialState = fromJS({});

function manageLogsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_LOGS_LIST_SUCCESS:
      return state.set('getLogsListSuccess', action.response);
    case GET_LOGS_LIST_FAILURE:
      return state.set('getLogsListFailure', action.error);
    case GENERATE_LOGS_SUCCESS:
      return state.set('generateLogsSuccess', action.response);
    case GENERATE_LOGS_FAILURE:
      return state.set('generateLogsFailure', action.error);
    default:
      return state;
  }
}

export default manageLogsReducer;
