/*
 *
 * AddOrEditUser reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  GET_ALL_GROUPS_FAILURE,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_ROLES_FAILURE,
  GET_ALL_ROLES_SUCCESS,
  ON_SUBMIT_REQUEST
} from "./constants";

export const initialState = fromJS({});

function addOrEditUserReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ON_SUBMIT_REQUEST:
      return state.set("onSubmitFailure", undefined);
    case ON_SUBMIT_REQUEST_SUCCESS:
      return state.set("onSubmitSuccess", action.response);
    case ON_SUBMIT_REQUEST_FAILURE:
      return state.set("onSubmitFailure", action.error);
    case GET_USER_DETAILS_SUCCESS:
      return state.set("userDetailsSuccess", action.response);
    case GET_USER_DETAILS_FAILURE:
      return state.set("userDetailsFailure", action.error);
    case GET_ALL_GROUPS_SUCCESS:
      return state.set("getAllGroupSuccess", action.response);
    case GET_ALL_GROUPS_FAILURE:
      return state.set("getAllGroupFailure", action.error);
    case GET_ALL_ROLES_SUCCESS:
      return state.set("getAllRolesSuccess", action.response);
    case GET_ALL_ROLES_FAILURE:
      return state.set("getAllRolesFailure", action.error);
    default:
      return state;
  }
}

export default addOrEditUserReducer;
