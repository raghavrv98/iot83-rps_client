/*
 *
 * ManagePipeLineLandmark actions
 *
 */

import { DEFAULT_ACTION, GET_LANDMARK_LIST, LANDMARK_DELETE_REQUEST} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getLandmarkList(plantId, pipelineId) {
  return {
    type: GET_LANDMARK_LIST,
    plantId, 
    pipelineId
  };
}

export function deleteHandler(plantId, pipelineId,id) {
  return {
    type: LANDMARK_DELETE_REQUEST,
    plantId, 
    pipelineId,
    id
  };
}