/*
 *
 * ManageLicencePlan reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, 
         GET_LICENSE_LIST_SUCCESS, 
         GET_LICENSE_LIST_FAILURE, 
         LICENSE_DELETE_REQUEST_SUCCESS,
         LICENSE_DELETE_REQUEST_FAILURE } from "./constants";

export const initialState = fromJS({});

function manageLicencePlanReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case GET_LICENSE_LIST_SUCCESS:
        return state.set('licenseListSuccess', action.response);
      case GET_LICENSE_LIST_FAILURE:
        return state.set('licenseListFailure', action.error);
        case LICENSE_DELETE_REQUEST_SUCCESS:
        return state.set('licenseDeleteSuccess', action.response);
      case LICENSE_DELETE_REQUEST_FAILURE:
        return state.set('licenseDeleteFailure', action.error);
        
    default:
      return state;
  }
}

export default manageLicencePlanReducer;
