/*
 *
 * ManageOAuthConfig reducer
 *
 */

import { fromJS } from "immutable";
import {
  GET_AUTH_CONFIG_DETAILS_SUCCESS,
  GET_AUTH_CONFIG_DETAILS_FAILURE,
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_FAILURE,
  DELETE_CONFIG_SUCCESS,
  DELETE_CONFIG_FAILURE
} from "./constants";

export const initialState = fromJS({});

function manageOAuthConfigReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTH_CONFIG_DETAILS_SUCCESS:
      return state.set('authConfigDetailsSuccess', action.response);
    case GET_AUTH_CONFIG_DETAILS_FAILURE:
      return state.set('authConfigDetailsFailure', action.error);
    case SUBMIT_REQUEST_SUCCESS:
      return state.set('submitRequestSuccess', action.response);
    case SUBMIT_REQUEST_FAILURE:
      return state.set('submitRequestFailure', action.error);
    case DELETE_CONFIG_SUCCESS:
      return state.set('deleteConfigSuccess', action.response);
    case DELETE_CONFIG_FAILURE:
      return state.set('deleteConfigFailure', action.error);
    default:
      return state;
  }
}

export default manageOAuthConfigReducer;
