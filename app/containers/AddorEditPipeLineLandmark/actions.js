/*
 *
 * AddorEditPipeLineLandmark actions
 *
 */

import { GET_LANDMARK_DETAILS, CREATE_LANDMARK_DETAILS, UPLOAD_LANDMARK_IMAGE } from "./constants";

export function fetchLandmarkDetails(plantId,pipelineId,id) {
  return {
    type: GET_LANDMARK_DETAILS,
    plantId,
    pipelineId,
    id
  }
  };


  export function createLandmarkHandler(payload,plantId,pipelineId,id) {
    return {
      type: CREATE_LANDMARK_DETAILS,
      payload,
      plantId,
      pipelineId,
      id
    }
    };

    export function uploadLandmarkImage(image) {
      return {
        type: UPLOAD_LANDMARK_IMAGE,
        image,
      };
    }