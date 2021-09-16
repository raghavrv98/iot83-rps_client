/*
 *
 * ManageZones reducer
 *
 */

import { fromJS } from "immutable";
import {
  GET_ZONE_LIST_SUCCESS,
  GET_ZONE_LIST_FAILURE,
  ZONE_DELETE_SUCCESS,
  ZONE_DELETE_FAILURE
} from "./constants";
export const initialState = fromJS({});

function manageZonesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ZONE_LIST_SUCCESS:
      return state.set("zonesList", action.response);
    case GET_ZONE_LIST_FAILURE:
      return state.set("zonesListFailure", action.error);
    case ZONE_DELETE_SUCCESS:
      return state.set("zoneDelete", action.response);
    case ZONE_DELETE_FAILURE:
      return state.set("zoneDeleteFailure", action.error);
    default:
      return state;
  }
}

export default manageZonesReducer;
