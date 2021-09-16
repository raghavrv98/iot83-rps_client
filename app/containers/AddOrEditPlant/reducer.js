/*
 *
 * AddOrEditPlant reducer
 *
 */

import { fromJS } from "immutable";
import {
  CREATE_PLANT_SUCCESS, CREATE_PLANT_FAILURE,
  GET_DETAILS_FAILURE, GET_DETAILS_SUCCESS, UPLOAD_PLANT_IMAGE_SUCCESS, UPLOAD_PLANT_IMAGE_FAILURE
} from "./constants";

export const initialState = fromJS({});

function addOrEditPlantReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLANT_SUCCESS:
      return state.set('createPlantSuccess', action.response);
    case CREATE_PLANT_FAILURE:
      return state.set('createPlantFailure', action.error);
    case GET_DETAILS_SUCCESS:
      return state.set('getDetailsSuccess', action.response);
    case GET_DETAILS_FAILURE:
      return state.set('getDetailsFailure', action.error);
    case UPLOAD_PLANT_IMAGE_SUCCESS:
      return state.set('plantImageUplaod', action.response);
    case UPLOAD_PLANT_IMAGE_FAILURE:
      return state.set('plantImageUplaodFailure', action.error);
    default:
      return initialState;
  }
}

export default addOrEditPlantReducer;
