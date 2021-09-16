/*
 *
 * AddOrEditRole reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, ON_SUBMIT_REQUEST ,ON_SUBMIT_REQUEST_SUCCESS,ON_SUBMIT_REQUEST_FAILURE,GET_ROLE_DETAILS_FAILURE,GET_ROLE_DETAILS_SUCCESS, GET_PERMISSIONS_SUCCESS, GET_PERMISSIONS_FAILURE, GET_ENTITLEMENTS_SUCCESS, GET_ENTITLEMENTS_FAILURE} from "./constants";

export const initialState = fromJS({});

function addOrEditRoleReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ON_SUBMIT_REQUEST:
      return state.set('onSubmitFailure', undefined);
    case ON_SUBMIT_REQUEST_SUCCESS:
      return state.set('onSubmitSuccess', action.response);
    case ON_SUBMIT_REQUEST_FAILURE:
      return state.set('onSubmitFailure', action.error);
    case GET_ROLE_DETAILS_SUCCESS:
      return state.set('roleDetailsSuccess', action.response);
    case GET_ROLE_DETAILS_FAILURE:
      return state.set('roleDetailsFailure', action.error);
    case GET_PERMISSIONS_SUCCESS:
      return state.set('getPermissionsDetails', action.response);
    case GET_PERMISSIONS_FAILURE:
        return state.set('permissionsDetailsFailure', action.error);
    case GET_ENTITLEMENTS_SUCCESS:
        return state.set('getEntitlementsSuccess', action.response);
    case GET_ENTITLEMENTS_FAILURE:
        return state.set('getEntitlementsFailure', action.error);
    default:
      return state;
  }
}

export default addOrEditRoleReducer;
