import { fromJS } from 'immutable';
import addOrEditGroupReducer from '../reducer';
import { 
  ON_SUBMIT_REQUEST,ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE,
  GET_GROUP_DETAILS_SUCCESS,GET_GROUP_DETAILS_FAILURE 
} from "../constants";

describe('addOrEditGroupReducer', () => {

  it('returns the initial state', () => {
    expect(addOrEditGroupReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "ON_SUBMIT_REQUEST" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST,
      error: undefined,
    }
    expect(addOrEditGroupReducer(fromJS({}),action).get("onSubmitFailure")).toEqual(undefined)
  });

  it('should handle "ON_SUBMIT_REQUEST_SUCCESS" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(addOrEditGroupReducer(fromJS({}),action).get("onSubmitSuccess")).toEqual("Success")
  });

  it('should handle "ON_SUBMIT_REQUEST_FAILURE" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(addOrEditGroupReducer(fromJS({}),action).get("onSubmitFailure")).toEqual("Exception")
  })

  it('should handle "GET_GROUP_DETAILS_SUCCESS" action', () => {
    let action = {
      type: GET_GROUP_DETAILS_SUCCESS,
      response: "Success",
    }
    expect(addOrEditGroupReducer(fromJS({}), action).get("groupDetailsSuccess")).toEqual("Success")
  })

  it('should handle "GET_GROUP_DETAILS_FAILURE" action', () => {
    let action = {
      type: GET_GROUP_DETAILS_FAILURE,
      error: "Exception",
    }
    expect(addOrEditGroupReducer(fromJS({}),action).get("groupDetailsFailure")).
    toEqual("Exception")
  })

});
