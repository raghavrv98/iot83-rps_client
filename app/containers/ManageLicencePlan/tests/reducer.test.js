import { fromJS } from 'immutable';
import manageLicencePlanReducer from '../reducer';
import {
  GET_LICENSE_LIST_SUCCESS,
  GET_LICENSE_LIST_FAILURE,
  LICENSE_DELETE_REQUEST_SUCCESS,
  LICENSE_DELETE_REQUEST_FAILURE
} from "../constants";

describe('manageLicencePlanReducer', () => {

  it('should handle "GET_LICENSE_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_LICENSE_LIST_SUCCESS,
      response: "Success",
    }
    expect(manageLicencePlanReducer(fromJS({}), action).get("licenseListSuccess")).toEqual("Success")
  });

  it('should handle "GET_LICENSE_LIST_FAILURE" action', () => {
    let action = {
      type: GET_LICENSE_LIST_FAILURE,
      error: "Exception",
    }
    expect(manageLicencePlanReducer(fromJS({}), action).get("licenseListFailure")).toEqual("Exception")
  })

  it('should handle "LICENSE_DELETE_REQUEST_SUCCESS" action', () => {
    let action = {
      type: LICENSE_DELETE_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(manageLicencePlanReducer(fromJS({}), action).get("licenseDeleteSuccess")).toEqual("Success")
  });

  it('should handle "LICENSE_DELETE_REQUEST_FAILURE" action', () => {
    let action = {
      type: LICENSE_DELETE_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(manageLicencePlanReducer(fromJS({}), action).get("licenseDeleteFailure")).toEqual("Exception")
  })



})
