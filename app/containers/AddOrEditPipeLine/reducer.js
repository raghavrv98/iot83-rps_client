/*
 *
 * AddOrEditPipeLine reducer
 *
 */

import { fromJS } from "immutable";
import {
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  ON_SUBMIT_REQUEST,
  GET_PIPELINE_REQUEST_SUCCESS,
  GET_PIPELINE_REQUEST_FAILURE,
} from "./constants";

export const initialState = fromJS({});

function addOrEditPipeLineReducer(state = initialState, action) {
  switch (action.type) {
    case ON_SUBMIT_REQUEST:
      return state.set("onSubmitFailure", undefined)
        .set("onSubmitSuccess", undefined);
    case ON_SUBMIT_REQUEST_SUCCESS:
      return state.set("onSubmitSuccess", action.response);
    case ON_SUBMIT_REQUEST_FAILURE:
      return state.set("onSubmitFailure", action.error);
    case GET_PIPELINE_REQUEST_SUCCESS:
      return state.set("pipelineDetailsSuccess", action.response);
    case GET_PIPELINE_REQUEST_FAILURE:
      return state.set("pipelineDetailsFailure", action.error);
    default:
      return state;
  }
}
export default addOrEditPipeLineReducer;
