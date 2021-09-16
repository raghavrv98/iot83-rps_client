/*
 *
 * AddOrEditGroup reducer
 *
 */

import { fromJS } from "immutable";
import { ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE,GET_GROUP_DETAILS_SUCCESS,GET_GROUP_DETAILS_FAILURE } from "./constants";

export const initialState = fromJS({});

function addOrEditGroupReducer(state = initialState, action) {
  switch (action.type) {
    case ON_SUBMIT_REQUEST:
      return state.set('onSubmitFailure', undefined);
    case ON_SUBMIT_REQUEST_SUCCESS:
      return state.set('onSubmitSuccess', action.response);
    case ON_SUBMIT_REQUEST_FAILURE:
      return state.set('onSubmitFailure', action.error);
    case GET_GROUP_DETAILS_SUCCESS:
      return state.set('groupDetailsSuccess', action.response);
    case GET_GROUP_DETAILS_FAILURE:
      return state.set('groupDetailsFailure', action.error);
    default:
      return state;
  }
}

export default addOrEditGroupReducer;
