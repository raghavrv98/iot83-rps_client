/*
 *
 * ManagePlant reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION,GET_PLANTLIST_FAILURE,GET_PLANTLIST_SUCCESS, DELETE_PLANT_SUCCESS, DELETE_PLANT_FAILURE } from "./constants";

export const initialState = fromJS({});

function managePlantReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_PLANTLIST_SUCCESS:
      return state.set('getPlantListSuccess', action.response);
    case GET_PLANTLIST_FAILURE:
      return state.set('getPlantListFailure', action.error);
    case DELETE_PLANT_SUCCESS:
      return state.set('deletePlantSuccess', action.response);
    case DELETE_PLANT_FAILURE:
      return state.set('deletePlantFailure', action.error);
    default:
      return state;
  }
}

export default managePlantReducer;
