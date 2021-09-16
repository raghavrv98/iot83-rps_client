/*
 *
 * AddOrEditPipeLine actions
 *
 */

import { ON_SUBMIT_REQUEST, GET_PIPELINE_REQUEST } from "./constants";

export function onSubmitHandler(payload, id, pipelineId) {
  return {
    type: ON_SUBMIT_REQUEST,
    payload,
    pipelineId,
    id
  };
}

export function getPipelineDetails(id, pipelineId) {
  return {
    type: GET_PIPELINE_REQUEST,
    id,
    pipelineId
  };
}

