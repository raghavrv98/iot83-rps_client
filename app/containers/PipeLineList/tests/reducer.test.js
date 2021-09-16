import { fromJS } from 'immutable';
import pipeLineListReducer from '../reducer';
import { DEFAULT_ACTION, 
  GET_PIPELINE_LIST_FAILURE, GET_PIPELINE_LIST_SUCCESS, 
  DELETE_PIPELINE_SUCCESS, DELETE_PIPELINE_FAILURE,
  GET_PLANT_LIST_SUCCESS, GET_PLANT_LIST_FAILURE,
  GET_ALARM_LIST_SUCCESS, GET_ALARM_LIST_FAILURE
} from "../constants";

describe('pipeLineListReducer', () => {
  it('returns the initial state', () => {
    expect(pipeLineListReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "DEFAULT_ACTION" action', () => {
    expect(pipeLineListReducer(undefined, { type: DEFAULT_ACTION })).toEqual(fromJS({}));
  });
  
  it('returns state for GET_PIPELINE_LIST_SUCCESS', () => {
    expect(
      pipeLineListReducer(undefined, {
        type: GET_PIPELINE_LIST_SUCCESS,
        response: "Request Completed Successfully"
      }).toJS(),
    ).toEqual({
      pipelineList:"Request Completed Successfully"
    })
  });

  it('returns state for GET_PIPELINE_LIST_FAILURE', () => {
    expect(
      pipeLineListReducer(undefined, {
        type: GET_PIPELINE_LIST_FAILURE,
        error: "Expection"
      }).toJS(),
    ).toEqual({
      pipelineListFailure: "Expection"
    })
  });
  it('returns state for DELETE_PIPELINE_SUCCESS', () => {
    expect(
      pipeLineListReducer(undefined, {
        type: DELETE_PIPELINE_SUCCESS,
        response: "success"
      }).toJS(),
    ).toEqual({
      pipeLineDelete: "success"
    })
  });
  
  it('returns state for DELETE_PIPELINE_FAILURE', () => {
    expect(
      pipeLineListReducer(undefined, {
        type: DELETE_PIPELINE_FAILURE,
        error: "Expection"
      }).toJS(),
    ).toEqual({
      pipeLineDeleteFailure: "Expection"
    })
  });

  it('returns state for GET_PLANT_LIST_SUCCESS', () => {
    expect(
      pipeLineListReducer(undefined, {
        type: GET_PLANT_LIST_SUCCESS,
        response: "Request Completed Successfully"
      }).toJS(),
    ).toEqual({
      plantList:"Request Completed Successfully"
    })
  });

  it('returns state for GET_PLANT_LIST_FAILURE', () => {
    expect(
      pipeLineListReducer(undefined, {
        type: GET_PLANT_LIST_FAILURE,
        error: "Expection"
      }).toJS(),
    ).toEqual({
      plantListFailure: "Expection"
    })
  });
  it('returns state for GET_ALARM_LIST_SUCCESS', () => {
    expect(
      pipeLineListReducer(undefined, {
        type: GET_ALARM_LIST_SUCCESS,
        response: "success"
      }).toJS(),
    ).toEqual({
      getAlarmList: "success"
    })
  });
  
  it('returns state for GET_ALARM_LIST_FAILURE', () => {
    expect(
      pipeLineListReducer(undefined, {
        type: GET_ALARM_LIST_FAILURE,
        error: "Expection"
      }).toJS(),
    ).toEqual({
      getAlarmListFailure: "Expection"
    })
  });
});
