/*
 *
 * AddorEditPipeLineLandmark reducer
 *
 */

import { fromJS } from "immutable";
import { GET_LANDMARK_DETAILS_SUCCESS, 
         GET_LANDMARK_DETAILS_FAILURE, 
         CREATE_LANDMARK_DETAILS_SUCCESS,
         CREATE_LANDMARK_DETAILS_FAILURE, 
         UPLOAD_LANDMARK_IMAGE_SUCCESS,
         UPLOAD_LANDMARK_IMAGE_FAILURE} from "./constants";

export const initialState = fromJS({});

function addorEditPipeLineLandmarkReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LANDMARK_DETAILS_SUCCESS:
      return state.set('getLandmarkDetailsSuccess', action.response);
    case GET_LANDMARK_DETAILS_FAILURE:
      return state.set('getLandmarkDetailsFailure', action.error);
      case CREATE_LANDMARK_DETAILS_SUCCESS:
        return state.set('createLandmarkDetailsSuccess', action.response);
      case CREATE_LANDMARK_DETAILS_FAILURE:
        return state.set('createLandmarkDetailsFailure', action.error);
        case UPLOAD_LANDMARK_IMAGE_SUCCESS:
          return state.set('uploadLandmarkImageSuccess', action.response);
        case UPLOAD_LANDMARK_IMAGE_FAILURE:
          return state.set('uploadLandmarkImageFailure', action.error);
    default:
      return state;
  }
}

export default addorEditPipeLineLandmarkReducer;
