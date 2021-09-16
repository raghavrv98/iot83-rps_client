import { fromJS } from 'immutable';
import homePageReducer from '../reducer';
import {DEFAULT_ACTION, GET_NAVIGATION_SUCCESS, GET_NAVIGATION_FAILURE, GET_VERSION_SUCCESS, 
  GET_VERSION_FAILURE
} from '../constants'

describe('homePageReducer', () => {
  it('returns the initial state', () => {
    expect(homePageReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      homePageReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });

  it('should handle "GET_NAVIGATION_SUCCESS" action', () => {
    let action = {
      type: GET_NAVIGATION_SUCCESS,
      response: "Success",
    }
    expect(homePageReducer(fromJS({}),action).get("navSuccess")).toEqual("Success")
  });

  it('should handle "GET_NAVIGATION_FAILURE" action', () => {
    let action = {
      type: GET_NAVIGATION_FAILURE,
      error: "Exception",
    }
    expect(homePageReducer(fromJS({}),action).get("navFailure")).toEqual("Exception")
  })

  it('should handle "GET_VERSION_SUCCESS" action', () => {
    let action = {
      type: GET_VERSION_SUCCESS,
      response: "Success",
    }
    expect(homePageReducer(fromJS({}),action).get("versionSuccess")).toEqual("Success")
  });

  it('should handle "GET_VERSION_FAILURE" action', () => {
    let action = {
      type: GET_VERSION_FAILURE,
      error: "Exception",
    }
    expect(homePageReducer(fromJS({}),action).get("versionFailure")).toEqual("Exception")
  })
});
