/*
 *
 * ManageRoleNavigation reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, GET_MENUS_SUCCESS, GET_MENUS_FAILURE, GET_ALL_MENUS_SUCCESS, GET_ALL_MENUS_FAILURE, SAVE_MENUS_SUCCESS, SAVE_MENUS_FAILURE } from "./constants";

export const initialState = fromJS({});

function manageRoleNavigationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_MENUS_SUCCESS:
      return state.set("fetchMenus",action.response)
    case GET_MENUS_FAILURE:
      return state.set("fetchMenusError",action.error)
    case GET_ALL_MENUS_SUCCESS:
      return state.set("fetchAllMenus",action.response)
    case GET_ALL_MENUS_FAILURE:
      return state.set("fetchAllMenusError",action.error)
    case SAVE_MENUS_SUCCESS:
      return state.set("saveMenuSuccess",action.response)
    case SAVE_MENUS_FAILURE:
      return state.set("saveMenuError",action.error)
    default:
      return initialState;
  }
}

export default manageRoleNavigationReducer;
