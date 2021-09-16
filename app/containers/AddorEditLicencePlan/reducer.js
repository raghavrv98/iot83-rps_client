/*
 *
 * AddorEditLicencePlan reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  ON_SUBMIT_REQUEST,
  GET_PLANS_LIST,
  GET_PLANS_LIST_SUCCESS,
  GET_PLANS_LIST_FAILURE
} from "./constants";

export const initialState = fromJS({});

function addorEditLicencePlanReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ON_SUBMIT_REQUEST:
      return state.set('onSubmitFailure', undefined);
    case ON_SUBMIT_REQUEST_SUCCESS:
      return state.set('onSubmitSuccess', action.response);
    case ON_SUBMIT_REQUEST_FAILURE:
      return state.set('onSubmitFailure', action.error);
      case GET_PLANS_LIST:
        return state.set('getPlansFailure', undefined);
    case GET_PLANS_LIST_SUCCESS:
      return state.set('getPlansSuccess', action.response);
    case GET_PLANS_LIST_FAILURE:
      return state.set('getPlansFailure', action.error);
    default:
      return state;
  }
}

export default addorEditLicencePlanReducer;
