/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, 
         LOGIN_API_FAILURE, 
         LOGIN_API_SUCCESS, 
         RESET_PASSWORD_API_SUCCESS, 
         RESET_PASSWORD_API_FAILURE,
         GET_AUTH_CONFIG_DETAILS_SUCCESS,
         GET_AUTH_CONFIG_DETAILS_FAILURE } from "./constants";

export const initialState = fromJS({});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_API_FAILURE:
      return state.set('login_failed_message', action.error);
    case LOGIN_API_SUCCESS:
      return state.set('login_success', action.response);
      case RESET_PASSWORD_API_FAILURE:
        return state.set('resetPasswordFailure', action.error);
      case RESET_PASSWORD_API_SUCCESS:
        return state.set('resetPasswordSuccess', action.response);
        case GET_AUTH_CONFIG_DETAILS_SUCCESS:
          return state.set('authConfigDetailsSuccess', action.response);
        case GET_AUTH_CONFIG_DETAILS_FAILURE:
          return state.set('authConfigDetailsFailure', action.error);

    default:
      return initialState;
  }
}

export default loginPageReducer;
