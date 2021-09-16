/*
 *
 * ManageUsers reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, GOT_LIST, NOT_GOT_LIST, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE } from "./constants";

export const initialState = fromJS({});

function manageUsersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GOT_LIST:
      return state.set('gotList', action.response);
    case NOT_GOT_LIST:
      return state.set('notGetList', action.error);
    case DELETE_REQUEST_SUCCESS:
      return state.set('deleteSuccess', action.response);
    case DELETE_REQUEST_FAILURE:
      return state.set('deleteFailure', action.error);
    default:
      return initialState;
  }
}

export default manageUsersReducer;
