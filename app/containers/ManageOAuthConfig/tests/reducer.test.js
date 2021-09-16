import { fromJS } from 'immutable';
import manageOAuthConfigReducer from '../reducer';
import {
  GET_AUTH_CONFIG_DETAILS_SUCCESS,
  GET_AUTH_CONFIG_DETAILS_FAILURE,
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_FAILURE,
  DELETE_CONFIG_SUCCESS,
  DELETE_CONFIG_FAILURE
} from "../constants";

describe('manageOAuthConfigReducer', () => {

  it('should handle "GET_AUTH_CONFIG_DETAILS_SUCCESS" action', () => {
    let action = {
      type: GET_AUTH_CONFIG_DETAILS_SUCCESS,
      response: "Success",
    }
    expect(manageOAuthConfigReducer(fromJS({}), action).get("authConfigDetailsSuccess")).toEqual("Success")
  });

  it('should handle "GET_AUTH_CONFIG_DETAILS_FAILURE" action', () => {
    let action = {
      type: GET_AUTH_CONFIG_DETAILS_FAILURE,
      error: "Exception",
    }
    expect(manageOAuthConfigReducer(fromJS({}), action).get("authConfigDetailsFailure")).toEqual("Exception")
  })

  it('should handle "SUBMIT_REQUEST_SUCCESS" action', () => {
    let action = {
      type: SUBMIT_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(manageOAuthConfigReducer(fromJS({}), action).get("submitRequestSuccess")).toEqual("Success")
  });

  it('should handle "SUBMIT_REQUEST_FAILURE" action', () => {
    let action = {
      type: SUBMIT_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(manageOAuthConfigReducer(fromJS({}), action).get("submitRequestFailure")).toEqual("Exception")
  })

  it('should handle "DELETE_CONFIG_SUCCESS" action', () => {
    let action = {
      type: DELETE_CONFIG_SUCCESS,
      response: "Success",
    }
    expect(manageOAuthConfigReducer(fromJS({}), action).get("deleteConfigSuccess")).toEqual("Success")
  });

  it('should handle "DELETE_CONFIG_FAILURE" action', () => {
    let action = {
      type: DELETE_CONFIG_FAILURE,
      error: "Exception",
    }
    expect(manageOAuthConfigReducer(fromJS({}), action).get("deleteConfigFailure")).toEqual("Exception")
  })
})
