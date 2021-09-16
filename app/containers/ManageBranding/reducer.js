/*
 *
 * ManageBranding reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, 
         UPLOAD_LOGO_REQUEST, 
         UPLOAD_LOGO_SUCCESS, 
         UPLOAD_LOGO_FAILURE,
         UPLOAD_THEME_REQUEST,
         UPLOAD_THEME_FAILURE,
         UPLOAD_THEME_SUCCESS,
         UPLOAD_RESET_STATE
         } from "./constants";

export const initialState = fromJS({});

function manageBrandingReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPLOAD_LOGO_REQUEST: 
      return state.set('uploadSuccess', undefined);
    case UPLOAD_LOGO_SUCCESS:
      return state.set('uploadSuccess', action.response);
    case UPLOAD_LOGO_FAILURE:
      return state.set('uploadFailure', action.error);
      case UPLOAD_THEME_REQUEST: 
      return state.set('uploadThemeSuccess', undefined);
    case UPLOAD_THEME_SUCCESS:
      return state.set('uploadThemeSuccess', action.response);
    case UPLOAD_THEME_FAILURE:
      return state.set('uploadThemeFailure', action.error);
      case UPLOAD_RESET_STATE:
        return state.set('uploadFailure', undefined);
    default:
      return state;
  }
}

export default manageBrandingReducer;
