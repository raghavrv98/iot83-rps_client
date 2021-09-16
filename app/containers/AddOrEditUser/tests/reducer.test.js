import { fromJS } from 'immutable';
import addOrEditUserReducer from '../reducer';
import {DEFAULT_ACTION, ON_SUBMIT_REQUEST,
  ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE,
  GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_FAILURE,
  GET_ALL_GROUPS_FAILURE, GET_ALL_GROUPS_SUCCESS,
  GET_ALL_ROLES_FAILURE, GET_ALL_ROLES_SUCCESS
} from '../constants'

describe('addOrEditUserReducer', () => {

  it('returns the initial state', () => {
    expect(addOrEditUserReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      addOrEditUserReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });

  it('should handle "ON_SUBMIT_REQUEST" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST,
      error: undefined,
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("onSubmitFailure")).toEqual(undefined)
  });

  it('should handle "ON_SUBMIT_REQUEST_SUCCESS" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("onSubmitSuccess")).toEqual("Success")
  });

  it('should handle "ON_SUBMIT_REQUEST_FAILURE" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("onSubmitFailure")).toEqual("Exception")
  })

  it('should handle "GET_USER_DETAILS_SUCCESS" action', () => {
    let action = {
      type: GET_USER_DETAILS_SUCCESS,
      response: "Success",
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("userDetailsSuccess")).toEqual("Success")
  });

  it('should handle "GET_USER_DETAILS_FAILURE" action', () => {
    let action = {
      type: GET_USER_DETAILS_FAILURE,
      error: "Exception",
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("userDetailsFailure")).toEqual("Exception")
  })

  it('should handle "GET_ALL_GROUPS_SUCCESS" action', () => {
    let action = {
      type: GET_ALL_GROUPS_SUCCESS,
      response: "Success",
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("getAllGroupSuccess")).toEqual("Success")
  });

  it('should handle "GET_ALL_GROUPS_FAILURE" action', () => {
    let action = {
      type: GET_ALL_GROUPS_FAILURE,
      error: "Exception",
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("getAllGroupFailure")).toEqual("Exception")
  })

  it('should handle "GET_ALL_ROLES_SUCCESS" action', () => {
    let action = {
      type: GET_ALL_ROLES_SUCCESS,
      response: "Success",
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("getAllRolesSuccess")).toEqual("Success")
  });

  it('should handle "GET_ALL_ROLES_FAILURE" action', () => {
    let action = {
      type: GET_ALL_ROLES_FAILURE,
      error: "Exception",
    }
    expect(addOrEditUserReducer(fromJS({}),action).get("getAllRolesFailure")).toEqual("Exception")
  })

});
