/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION,
         GET_NAVIGATION_SUCCESS,
         GET_NAVIGATION_FAILURE, 
         GET_VERSION_SUCCESS, 
         GET_VERSION_FAILURE, 
      } from "./constants";

export const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_NAVIGATION_SUCCESS:
      return state.set('navSuccess',action.response);
    case GET_NAVIGATION_FAILURE:
      return state.set('navFailure',action.error);
      case GET_VERSION_SUCCESS:
        return state.set('versionSuccess',action.response);
      case GET_VERSION_FAILURE:
        return state.set('versionFailure',action.error);
    default:
      return state;
  }
}

export default homePageReducer;