import { fromJS } from 'immutable';
import pipeLineDetailReducer from '../reducer';
import {
  GET_PIPELINES_SUCCESS,GET_PIPELINES_FAILURE, 
  SAVE_DETAILS_SUCCESS, SAVE_DETAILS_FAILURE,
  DELETE_DETAILS_SUCCESS, DELETE_DETAILS_FAILURE
} from '../constants';

describe('pipeLineDetailReducer', () => {
  it('returns the initial state', () => {
    expect(pipeLineDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
  it('returns the initial state for GET_PIPELINES_SUCCESS', () => {
    let mockAction  = {
      type: GET_PIPELINES_SUCCESS,
      response: "success"
    }
    expect(pipeLineDetailReducer(undefined, mockAction)).toEqual(fromJS({pipelinesDetails : "success"}));
  });
  it('returns the initial state', () => {
    let mockAction  = {
      type: GET_PIPELINES_FAILURE,
      error: "failure"
    }
    expect(pipeLineDetailReducer(undefined, mockAction)).toEqual(fromJS({pipelinesDetailsFailure : "failure"}));
  });
  it('returns the initial state for SAVE_DETAILS_SUCCESS', () => {
    let mockAction  = {
      type: SAVE_DETAILS_SUCCESS,
      response: "success"
    }
    expect(pipeLineDetailReducer(undefined, mockAction)).toEqual(fromJS({saveConfirm : "success"}));
  });
  it('returns the initial state SAVE_DETAILS_FAILURE', () => {
    let mockAction  = {
      type: SAVE_DETAILS_FAILURE,
      error: "failure"
    }
    expect(pipeLineDetailReducer(undefined, mockAction)).toEqual(fromJS({saveConfirmError : "failure"}));
  });
  it('returns the initial state for DELETE_DETAILS_SUCCESS', () => {
    let mockAction  = {
      type: DELETE_DETAILS_SUCCESS,
      response: "success"
    }
    expect(pipeLineDetailReducer(undefined, mockAction)).toEqual(fromJS({deleteDetails : "success"}));
  });
  it('returns the initial state DELETE_DETAILS_FAILURE', () => {
    let mockAction  = {
      type: DELETE_DETAILS_FAILURE,
      error: "failure"
    }
    expect(pipeLineDetailReducer(undefined, mockAction)).toEqual(fromJS({deleteDetailsFailure : "failure"}));
  });
});
