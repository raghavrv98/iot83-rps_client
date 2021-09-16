import { fromJS } from 'immutable';
import manageLicenceReducer from '../reducer';
import {
  GET_PLANS_SUCCESS, GET_PLANS_FAILURE,
  GET_SUBMIT_REQUEST, GET_SUBMIT_REQUEST_SUCCESS, GET_SUBMIT_REQUEST_FAILURE,
  LICENSE_KEY_DETAILS_SUCCESS, LICENSE_KEY_DETAILS_FAILURE
} from "../constants";
describe('manageLicenceReducer', () => {

describe('manageLicenceReducer', () => {
  it('returns the initial state', () => {
    expect(manageLicenceReducer(undefined, {})).toEqual(fromJS({}));
  });
});

  it('should handle "GET_SUBMIT_REQUEST" action', () => {
    let action = {
      type: GET_SUBMIT_REQUEST,
      error: undefined,
    }
    expect(manageLicenceReducer(fromJS({}),action).get("submitRequestFailure")).toEqual(undefined)
  });

  it('should handle "GET_SUBMIT_REQUEST_SUCCESS" action', () => {
    let action = {
      type: GET_SUBMIT_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(manageLicenceReducer(fromJS({}),action).get("submitRequestSuccess")).toEqual("Success")
  });

  it('should handle "GET_SUBMIT_REQUEST_FAILURE" action', () => {
    let action = {
      type: GET_SUBMIT_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(manageLicenceReducer(fromJS({}),action).get("submitRequestFailure")).toEqual("Exception")
  })

  it('should handle "GET_PLANS_SUCCESS" action', () => {
    let action = {
      type: GET_PLANS_SUCCESS,
      response: "Success",
    }
    expect(manageLicenceReducer(fromJS({}),action).get("plansList")).toEqual("Success")
  });

  it('should handle "GET_PLANS_FAILURE" action', () => {
    let action = {
      type: GET_PLANS_FAILURE,
      error: "Exception",
    }
    expect(manageLicenceReducer(fromJS({}),action).get("plansListError")).toEqual("Exception")
  })

  it('should handle "LICENSE_KEY_DETAILS_SUCCESS" action', () => {
    let action = {
      type: LICENSE_KEY_DETAILS_SUCCESS,
      response: "Success",
    }
    expect(manageLicenceReducer(fromJS({}),action).get("licenseKeySuccess")).toEqual("Success")
  });

  it('should handle "LICENSE_KEY_DETAILS_FAILURE" action', () => {
    let action = {
      type: LICENSE_KEY_DETAILS_FAILURE,
      error: "Exception",
    }
    expect(manageLicenceReducer(fromJS({}),action).get("licenseKeyFailure")).toEqual("Exception")
  })

})
