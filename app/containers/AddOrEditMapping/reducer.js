/*
 *
 * AddOrEditMapping reducer
 *
 */

import { fromJS } from "immutable";
import { 
  GET_PLANTS_SUCCESS,GET_PLANTS_FAILURE,
  GET_EDIT_SAVE_MAP_FAILURE,GET_EDIT_SAVE_MAP_SUCCESS,
  GET_MAPPING_DATA_SUCCESS,GET_MAPPING_DATA_FAILURE, 
  GET_AGENT_DETAILS_SUCCESS, GET_AGENT_DETAILS_FAILURE
} from "./constants";

export const initialState = fromJS({});

function addOrEditMappingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS_SUCCESS:
      return state.set('plantsListSuccess', action.response);
    case GET_PLANTS_FAILURE:
      return state.set('plantsListFailure', action.error);
    case GET_EDIT_SAVE_MAP_SUCCESS:
      return state.set('editSaveSuccess', action.response);
    case GET_EDIT_SAVE_MAP_FAILURE:
      return state.set('editSaveFailure', action.error);
    case GET_MAPPING_DATA_SUCCESS:
      return state.set('fetchMappingDataSuccess', action.response);
    case GET_MAPPING_DATA_FAILURE:
      return state.set('fetchMappingDataFailure', action.error);
    case GET_AGENT_DETAILS_SUCCESS:
      return state.set('getAgentDetailsSuccess', action.response);
    case GET_AGENT_DETAILS_FAILURE:
      return state.set('getAgentDetailsFailure', action.error);
    default:
      return initialState;
  }
}

export default addOrEditMappingReducer;
