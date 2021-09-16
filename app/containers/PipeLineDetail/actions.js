/*
 *
 * PipeLineDetail actions
 *
 */

import { DEFAULT_ACTION, GET_PIPELINES,SAVE_DETAILS,DELETE_DETAILS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getPipelineDetails(plantId,pipelineId,payload) {
  return {
    type: GET_PIPELINES,
    plantId,pipelineId,payload
  };
}

export function savePipelineDetails(fileDetails,modifyPipeline) {
  return {
    type: SAVE_DETAILS,
    fileDetails,
    modifyPipeline,
  };
}

export function deleteFileHandler(plantId,pipelineId) {
  return {
    type: DELETE_DETAILS,
    plantId,
    pipelineId
  };
}