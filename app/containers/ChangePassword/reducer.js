/*
 *
 * ChangePassword reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST } from "./constants";

export const initialState = fromJS({});

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_PASSWORD_SUCCESS:
      return state.set('changePasswordSuccess', action.response);
    case CHANGE_PASSWORD_FAILURE:
      return state.set('changePasswordFailure', action.error);
    case CHANGE_PASSWORD_REQUEST:
      return state.set('changePasswordFailure', undefined);
    default:
      return state;
  }
}

export default changePasswordReducer;
