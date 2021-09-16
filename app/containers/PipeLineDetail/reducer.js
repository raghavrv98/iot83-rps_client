/*
 *
 * PipeLineDetail reducer
 *
 */

import { fromJS } from "immutable";
import { GET_PIPELINES_SUCCESS,GET_PIPELINES_FAILURE, 
  SAVE_DETAILS_SUCCESS, SAVE_DETAILS_FAILURE,
  DELETE_DETAILS_SUCCESS, DELETE_DETAILS_FAILURE,
} from "./constants";

export const initialState = fromJS({});

function pipeLineDetailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PIPELINES_SUCCESS:
      return state.set('pipelinesDetails', action.response);
    case GET_PIPELINES_FAILURE:
      return state.set('pipelinesDetailsFailure', action.error);
    case SAVE_DETAILS_SUCCESS:
      return state.set('saveConfirm', action.response);
    case SAVE_DETAILS_FAILURE:
      return state.set('saveConfirmError', action.error);
    case DELETE_DETAILS_SUCCESS:
      return state.set('deleteDetails', action.response);
    case DELETE_DETAILS_FAILURE:
      return state.set('deleteDetailsFailure', action.error);
    default:
      return initialState;
  }
}

export default pipeLineDetailReducer;
