/*
 *
 * ManagePasswordRequest reducer
 *
 */

import { fromJS } from "immutable";
import {PASSWORDREQUESTLIST,PASSWORDREQUESTLIST_SUCCESS,PASSWORDREQUESTLIST_FAILURE} from "./constants"

export const initialState = fromJS({});

function managePasswordRequestReducer(state = initialState, action) {
  switch (action.type) {
    case PASSWORDREQUESTLIST:
      return state.set("getPasswordList", undefined);
    case PASSWORDREQUESTLIST_SUCCESS:
      return state.set("getPasswordListSuccess", action.response);
    case PASSWORDREQUESTLIST_FAILURE:
    return state.set("getPasswordListFailure", action.error);
    default:
      return state;
  }
}

export default managePasswordRequestReducer;
