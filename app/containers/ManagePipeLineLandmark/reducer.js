/*
 *
 * ManagePipeLineLandmark reducer
 *
 */

import { fromJS } from "immutable";
import { GET_LANDMARK_LIST_SUCCESS, GET_LANDMARK_LIST_FAILURE, LANDMARK_DELETE_SUCCESS, LANDMARK_DELETE_FAILURE } from "./constants";

export const initialState = fromJS({});

function managePipeLineLandmarkReducer(state = initialState, action) {
  switch (action.type) {
      case GET_LANDMARK_LIST_SUCCESS:
        return state.set('getLandmarkSuccess', action.response);
      case GET_LANDMARK_LIST_FAILURE:
        return state.set('getLandmarkFailure', action.error);
        case LANDMARK_DELETE_SUCCESS:
          return state.set('landmarkDeleteSuccess', action.response);
        case LANDMARK_DELETE_FAILURE:
          return state.set('landmarkDeleteFailure', action.error);
    default:
      return state;
  }
}

export default managePipeLineLandmarkReducer;


