/*
 *
 * MappingList reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  GET_MAPINGS_SUCCESS,
  GET_MAPINGS_FAILURE,
  GET_AGENT_SUCCESS,
  GET_AGENT_FAILURE,
  DELETE_MAPPING_SUCCESS,
  DELETE_MAPPING_FAILURE,
  SAVE_MAPPINGS_SUCCESS,
  SAVE_MAPPINGS_FAILURE,
  GET_PLANTLIST_SUCCESS,
  GET_PLANTLIST_FAILURE,
  GET_PIPELINELIST_SUCCESS,
  GET_PIPELINELIST_FAILURE,
} from "./constants";

export const initialState = fromJS({});

function mappingListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_MAPINGS_SUCCESS:
      return state.set('mapingListSuccess', action.response);
    case GET_MAPINGS_FAILURE:
      return state.set('mapingListFailure', action.error);
    case GET_AGENT_SUCCESS:
      return state.set('agentDetailsSuccess', action.response);
    case GET_AGENT_FAILURE:
      return state.set('agentDetailsFailure', action.error);
    case DELETE_MAPPING_SUCCESS:
      return state.set('deleteMappingSuccess', action.response);
    case DELETE_MAPPING_FAILURE:
      return state.set('deleteMappingFailure', action.error);
    case SAVE_MAPPINGS_SUCCESS:
      return state.set('saveMappingSuccess', action.response);
    case SAVE_MAPPINGS_FAILURE:
      return state.set('saveMappingFailure', action.error);
    case GET_PLANTLIST_SUCCESS:
      return state.set("getPlantListSuccess", action.response);
    case GET_PLANTLIST_FAILURE:
      return state.set("getPlantListFailure", action.error);
    case GET_PIPELINELIST_SUCCESS:
      return state.set("getPipelineListSuccess", action.response);
    case GET_PIPELINELIST_FAILURE:
      return state.set("getPipelineListFailure", action.error);
    default:
      return initialState;
  }
}

export default mappingListReducer;
