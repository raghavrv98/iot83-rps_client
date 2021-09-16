/*
 *
 * ManageNavigation reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, GET_MENU_SUCCESS, GET_MENU_FAILURE, MENU_SAVE_HANDLER_SUCCESS, MENU_SAVE_HANDLER_FAILURE } from "./constants";

export const initialState = fromJS({});

function manageNavigationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_MENU_SUCCESS:
      return state.set('gotMenu', action.response);
    case GET_MENU_FAILURE:
      return state.set('notGotmenu', action.error);
    case MENU_SAVE_HANDLER_SUCCESS:
      return state.set('menuSaveSuccess', action.response);
    case MENU_SAVE_HANDLER_FAILURE:
      return state.set('menuSaveFailure', action.error);
    default:
      return initialState;
  }
}

export default manageNavigationReducer;
