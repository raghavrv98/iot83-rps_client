/*
 *
 * ManageLicence reducer
 *
 */

import { fromJS } from "immutable";
import {
  GET_PLANS_SUCCESS, GET_PLANS_FAILURE,
  GET_SUBMIT_REQUEST, GET_SUBMIT_REQUEST_SUCCESS, GET_SUBMIT_REQUEST_FAILURE,
  LICENSE_KEY_DETAILS_SUCCESS, LICENSE_KEY_DETAILS_FAILURE
} from "./constants";

export const initialState = fromJS({});

function manageLicenceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANS_SUCCESS:
      return state.set('plansList', action.response);
    case GET_PLANS_FAILURE:
      return state.set('plansListError', action.error);
    case GET_SUBMIT_REQUEST_SUCCESS:
      return state.set('submitRequestSuccess', action.response);
    case GET_SUBMIT_REQUEST:
      return state.set('submitRequestFailure', undefined);
    case GET_SUBMIT_REQUEST_FAILURE:
      return state.set('submitRequestFailure', action.error);
      case LICENSE_KEY_DETAILS_SUCCESS:
        return state.set('licenseKeySuccess',action.response);
      case LICENSE_KEY_DETAILS_FAILURE:
        return state.set('licenseKeyFailure',action.error);
    default:
      return state;
  }
}

export default manageLicenceReducer;
