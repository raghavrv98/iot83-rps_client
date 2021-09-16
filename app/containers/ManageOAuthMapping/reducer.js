/*
 *
 * ManageOAuthMapping reducer
 *
 */

import { fromJS } from "immutable";
import {
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_FAILURE,
  GET_GROUPS_LIST_SUCCESS,
  GET_GROUPS_LIST_FAILURE,
  GET_MAPPING_LIST_SUCCESS,
  GET_MAPPING_LIST_FAILURE,
  SUBMIT_MAPPING_REQUEST_SUCCESS,
  SUBMIT_MAPPING_REQUEST_FAILURE,
  SUBMIT_MAPPING_REQUEST
} from "./constants";

export const initialState = fromJS({});

function manageOAuthMappingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLES_LIST_SUCCESS:
      return state.set('getRolesListSuccess', action.response);
    case GET_ROLES_LIST_FAILURE:
      return state.set('getRolesListFailure', action.error);
    case GET_GROUPS_LIST_SUCCESS:
      return state.set('getGroupsListSuccess', action.response);
    case GET_GROUPS_LIST_FAILURE:
      return state.set('getGroupsListFailure', action.error);
    case GET_MAPPING_LIST_SUCCESS:
      return state.set('getMappingListSuccess', action.response);
    case GET_MAPPING_LIST_FAILURE:
      return state.set('getMappingListFailure', action.error);
    case SUBMIT_MAPPING_REQUEST_SUCCESS:
      return state.set('submitMappingRequestSuccess', action.response);
    case SUBMIT_MAPPING_REQUEST_FAILURE:
      return state.set('submitMappingRequestFailure', action.error);
      case SUBMIT_MAPPING_REQUEST:
        return state.set('submitMappingRequestFailure', undefined);
    default:
      return state;
  }
}

export default manageOAuthMappingReducer;
