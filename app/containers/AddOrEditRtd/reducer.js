/*
 *
 * AddOrEditRtd reducer
 *
 */

import { fromJS } from "immutable";
import {
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  GET_ZONE_DETAILS_SUCCESS,
  GET_ZONE_DETAILS_FAILURE,
} from "./constants";

export const initialState = fromJS({});

function addOrEditRtdReducer(state = initialState, action) {
  switch (action.type) {
    case ON_SUBMIT_REQUEST_SUCCESS:
      return state.set("onSubmitSuccess", action.response);
    case ON_SUBMIT_REQUEST_FAILURE:
      return state.set("onSubmitFailure", action.error);
    case GET_ZONE_DETAILS_SUCCESS:
      return state.set("zoneDetailsSuccess", action.response);
    case GET_ZONE_DETAILS_FAILURE:
      return state.set("zoneDetailsFailure", action.error);
    default:
      return initialState;
  }
}

export default addOrEditRtdReducer;
