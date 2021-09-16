/*
 *
 * ManageReport reducer
 *
 */

import { fromJS } from "immutable";
import { 
  GET_REPORT_LIST_FAILURE, GET_REPORT_LIST_SUCCESS,
  GET_PLANT_LIST_SUCCESS, GET_PLANT_LIST_FAILURE,
  GET_PIPELINE_DETAILS_SUCCESS, GET_PIPELINE_DETAILS_FAILURE
} from "./constants";

export const initialState = fromJS({});

function manageReportReducer(state = initialState, action) {
  switch (action.type) {
      case GET_REPORT_LIST_SUCCESS :
        return state.set('getReportListSuccess', action.response);
      case GET_REPORT_LIST_FAILURE :
        return state.set('getReportListFailure', action.error);
      case GET_PLANT_LIST_SUCCESS:
        return state.set('plantList', action.response);
      case GET_PLANT_LIST_FAILURE:
        return state.set('plantListFailure', action.error);
      case GET_PIPELINE_DETAILS_SUCCESS:
        return state.set('pipelineList', action.response);
      case GET_PIPELINE_DETAILS_FAILURE:
        return state.set('pipelineListFailure', action.error);
    default:
      return state;
  }
}

export default manageReportReducer;
