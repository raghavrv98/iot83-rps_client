import { fromJS } from 'immutable';
import managePipeLineLandmarkReducer from '../reducer';
import { GET_LANDMARK_LIST_SUCCESS, GET_LANDMARK_LIST_FAILURE, LANDMARK_DELETE_SUCCESS, LANDMARK_DELETE_FAILURE } from "../constants";

describe('managePipeLineLandmarkReducer', () => {

  it('should handle "GET_LANDMARK_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_LANDMARK_LIST_SUCCESS,
      response: "Success",
    }
    expect(managePipeLineLandmarkReducer(fromJS({}), action).get("getLandmarkSuccess")).toEqual("Success")
  });

  it('should handle "GET_LANDMARK_LIST_FAILURE" action', () => {
    let action = {
      type: GET_LANDMARK_LIST_FAILURE,
      error: "Exception",
    }
    expect(managePipeLineLandmarkReducer(fromJS({}), action).get("getLandmarkFailure")).toEqual("Exception")
  })

  it('should handle "LANDMARK_DELETE_SUCCESS" action', () => {
    let action = {
      type: LANDMARK_DELETE_SUCCESS,
      response: "Success",
    }
    expect(managePipeLineLandmarkReducer(fromJS({}), action).get("landmarkDeleteSuccess")).toEqual("Success")
  });

  it('should handle "LANDMARK_DELETE_FAILURE" action', () => {
    let action = {
      type: LANDMARK_DELETE_FAILURE,
      error: "Exception",
    }
    expect(managePipeLineLandmarkReducer(fromJS({}), action).get("landmarkDeleteFailure")).toEqual("Exception")
  })

})
