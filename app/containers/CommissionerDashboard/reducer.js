/*
 *
 * CommissionerDashboard reducer
 *
 */

import { fromJS } from "immutable";
import {
  GET_SEGMENT_DATA_SUCCESS,
  GET_SEGMENT_DATA_FAILURE,
  GET_CHART_REQUEST_SUCCESS,
  GET_CHART_REQUEST_FAILURE,
  GET_PLANT_LIST_SUCCESS,
  GET_PLANT_LIST_FAILURE,
  GET_PIPELINE_DETAILS_SUCCESS,
  GET_PIPELINE_DETAILS_FAILURE,
  GET_ATTRIBUTES_SUCCESS,
  GET_ATTRIBUTES_FAILURE
} from "./constants";

export const initialState = fromJS({});

function commissionerDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEGMENT_DATA_FAILURE:
      return state.set('segmentDataError', action.error);
    case GET_SEGMENT_DATA_SUCCESS:
      return state.set('segmentDataSuccess', action.response);
    case GET_CHART_REQUEST_SUCCESS:
      return state.set("chartDetailsSuccess", action.response);
    case GET_CHART_REQUEST_FAILURE:
      return state.set("chartDetailsFailure", action.error);
    case GET_PLANT_LIST_SUCCESS:
      return state.set("plantList", action.response);
    case GET_PLANT_LIST_FAILURE:
      return state.set("plantListFailure", action.error);
    case GET_PIPELINE_DETAILS_SUCCESS:
      return state.set("pipelineList", action.response);
    case GET_PIPELINE_DETAILS_FAILURE:
      return state.set("pipelineListFailure", action.error);
    case GET_ATTRIBUTES_SUCCESS:
      return state.set("attributesList", action.response);
    case GET_ATTRIBUTES_FAILURE:
      return state.set("attributesListFailure", action.error);
    default:
      return state;
  }
}

export default commissionerDashboardReducer;
