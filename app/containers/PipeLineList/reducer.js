/*
 *
 * PipeLineList reducer
 *
 */

import { fromJS } from "immutable";
import {GET_PIPELINE_LIST_FAILURE,
        GET_PIPELINE_LIST_SUCCESS,
        DELETE_PIPELINE_SUCCESS,
        DELETE_PIPELINE_FAILURE,
        GET_PLANT_LIST_SUCCESS,
        GET_PLANT_LIST_FAILURE,
        GET_ALARM_LIST_SUCCESS, 
        GET_ALARM_LIST_FAILURE, 
        GET_PIPELINE_SEGMENT_DATA_SUCCESS,
        GET_PIPELINE_SEGMENT_DATA_FAILURE } from './constants'
export const initialState = fromJS({});

function pipeLineListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PIPELINE_LIST_SUCCESS:
      return state.set('pipelineList', action.response);
    case GET_PIPELINE_LIST_FAILURE:
      return state.set('pipelineListFailure', action.error);
    case DELETE_PIPELINE_SUCCESS:
      return state.set('pipeLineDelete', action.response);
    case DELETE_PIPELINE_FAILURE:
      return state.set('pipeLineDeleteFailure', action.error);
    case GET_PLANT_LIST_SUCCESS:
      return state.set('plantList', action.response);
    case GET_PLANT_LIST_FAILURE:
      return state.set('plantListFailure', action.error);
    case GET_ALARM_LIST_SUCCESS:
      return state.set('getAlarmList', action.response);
    case GET_ALARM_LIST_FAILURE:
      return state.set('getAlarmListFailure', action.error);
      case GET_PIPELINE_SEGMENT_DATA_SUCCESS:
        return state.set('getPipelineSegmentDataSuccess', action.response);
      case GET_PIPELINE_SEGMENT_DATA_FAILURE:
        return state.set('getPipelineSegmentDataFailure', action.error);
      default:
      return state;
  }
}

export default pipeLineListReducer;
