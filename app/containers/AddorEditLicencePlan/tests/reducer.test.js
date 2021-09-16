import { fromJS } from 'immutable';
import addorEditLicencePlanReducer from '../reducer';
import {ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE, ON_SUBMIT_REQUEST, GET_PLANS_LIST, GET_PLANS_LIST_SUCCESS, GET_PLANS_LIST_FAILURE } from "../constants";

describe('addOrEditLicensePlanReducer', () => {

describe('addorEditLicencePlanReducer', () => {
  it('returns the initial state', () => {
    expect(addorEditLicencePlanReducer(undefined, {})).toEqual(fromJS({}));
  });
});

  it('should handle "ON_SUBMIT_REQUEST" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST,
      error: undefined,
    }
    expect(addorEditLicencePlanReducer(fromJS({}),action).get("onSubmitFailure")).toEqual(undefined)
  });

  it('should handle "ON_SUBMIT_REQUEST_SUCCESS" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(addorEditLicencePlanReducer(fromJS({}),action).get("onSubmitSuccess")).toEqual("Success")
  });

  it('should handle "ON_SUBMIT_REQUEST_FAILURE" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(addorEditLicencePlanReducer(fromJS({}),action).get("onSubmitFailure")).toEqual("Exception")
  })

  it('should handle "GET_PLANS_LIST" action', () => {
    let action = {
      type: GET_PLANS_LIST,
      error: undefined,
    }
    expect(addorEditLicencePlanReducer(fromJS({}),action).get("getPlansFailure")).toEqual(undefined)
  });

  it('should handle "GET_PLANS_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_PLANS_LIST_SUCCESS,
      response: "Success",
    }
    expect(addorEditLicencePlanReducer(fromJS({}),action).get("getPlansSuccess")).toEqual("Success")
  });

  it('should handle "GET_PLANS_LIST_FAILURE" action', () => {
    let action = {
      type: GET_PLANS_LIST_FAILURE,
      error: "Exception",
    }
    expect(addorEditLicencePlanReducer(fromJS({}),action).get("getPlansFailure")).toEqual("Exception")
  })



})
