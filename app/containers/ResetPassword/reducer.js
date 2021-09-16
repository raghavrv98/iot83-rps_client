/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, RESET_PASSWORD_SUCCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST } from "./constants";

export const initialState = fromJS({});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESET_PASSWORD_REQUEST: 
      return state;
    case RESET_PASSWORD_SUCCCESS:
      return state.set('resetPasswordSuccess', action.response);
    case RESET_PASSWORD_FAILURE:
      return state.set('resetPasswordFailure', action.error);
    default:
      return state;
  }
}

export default resetPasswordReducer;
