/*
 *
 * ManageAgents reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, 
  GET_AGENTS_SUCCESS, 
  GET_AGENTS_FAILURE, 
  DELETE_REQUEST_SUCCESS, 
  DELETE_REQUEST_FAILURE, 
  DELETE_REQUEST,
  AGENT_UPDATE_kEY_FAILURE, 
  AGENT_UPDATE_kEY_SUCCESS, 
  GET_COMPARISON_DETAILS_SUCCESS,
  GET_COMPARISON_DETAILS_FAILURE,
  SAVE_TO_RPS_REQUEST_SUCCESS,
  SAVE_TO_RPS_REQUEST_FAILURE, 
  PUBLISH_TO_DTS_REQUEST_SUCCESS,
  PUBLISH_TO_DTS_REQUEST_FAILURE} from "./constants";

export const initialState = fromJS({});

function manageAgentsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_AGENTS_SUCCESS:
      return state.set('agentsList', action.response);
    case GET_AGENTS_FAILURE:
      return state.set('agentsListError', action.error);
    case DELETE_REQUEST_SUCCESS:
      return state.set('deleteSuccess', action.response);
    case DELETE_REQUEST_FAILURE:
      return state.set('deleteFailure', action.error);
      case AGENT_UPDATE_kEY_SUCCESS:
        return state.set('agentUpdateKeySuccess', action.response);
      case AGENT_UPDATE_kEY_FAILURE:
        return state.set('agentUpdateKeyFailure', action.error);
        case GET_COMPARISON_DETAILS_SUCCESS:
          return state.set('comparisonDetailsSuccess', action.response);
        case GET_COMPARISON_DETAILS_FAILURE:
          return state.set('comparisonDetailsFailure', action.error);
          case SAVE_TO_RPS_REQUEST_SUCCESS:
            return state.set('saveToRPSSuccess', action.response);
          case SAVE_TO_RPS_REQUEST_FAILURE:
            return state.set('saveToRPSFailure', action.error);
            case PUBLISH_TO_DTS_REQUEST_SUCCESS:
              return state.set('publishToDTSSuccess', action.response);
            case PUBLISH_TO_DTS_REQUEST_FAILURE:
              return state.set('publishToDTSFailure', action.error);
    default:
      return initialState;
  }
}

export default manageAgentsReducer;
