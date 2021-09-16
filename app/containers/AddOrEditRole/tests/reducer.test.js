import { fromJS } from 'immutable';
import addOrEditRoleReducer from '../reducer';
import { 
  DEFAULT_ACTION, ON_SUBMIT_REQUEST ,ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,GET_ROLE_DETAILS_FAILURE,
  GET_ROLE_DETAILS_SUCCESS, GET_PERMISSIONS_SUCCESS, 
  GET_PERMISSIONS_FAILURE, GET_ENTITLEMENTS_SUCCESS, 
  GET_ENTITLEMENTS_FAILURE
} from "../constants";

describe('addOrEditRoleReducer', () => {

  it('returns the initial state', () => {
    expect(addOrEditRoleReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      addOrEditRoleReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });

  it('returns initial state for ON_SUBMIT_REQUEST', () => {
    let action = {
      type: ON_SUBMIT_REQUEST
    }
    expect(addOrEditRoleReducer(fromJS({}),action).get("onSubmitFailure")).toEqual(undefined)
  });

  it('should handle "ON_SUBMIT_REQUEST_SUCCESS" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(addOrEditRoleReducer(fromJS({}),action).get("onSubmitSuccess")).toEqual("Success")
  });

  it('should handle "ON_SUBMIT_REQUEST_FAILURE" action', () => {
    let action = {
      type: ON_SUBMIT_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(addOrEditRoleReducer(fromJS({}),action).get("onSubmitFailure")).toEqual("Exception")
  })

  it('should handle "GET_ROLE_DETAILS_SUCCESS" action', () => {
    let action = {
      type: GET_ROLE_DETAILS_SUCCESS,
      response: "Success",
    }
    expect(addOrEditRoleReducer(fromJS({}), action).get("roleDetailsSuccess")).toEqual("Success")
  })

  it('should handle "GET_ROLE_DETAILS_FAILURE" action', () => {
    let action = {
      type: GET_ROLE_DETAILS_FAILURE,
      error: "Exception",
    }
    expect(addOrEditRoleReducer(fromJS({}),action).get("roleDetailsFailure")).
    toEqual("Exception")
  })

  it('should handle "GET_PERMISSIONS_SUCCESS" action', () => {
    let action = {
      type: GET_PERMISSIONS_SUCCESS,
      response: "Success",
    }
    expect(addOrEditRoleReducer(fromJS({}), action).get("getPermissionsDetails")).toEqual("Success")
  })

  it('should handle "GET_PERMISSIONS_FAILURE" action', () => {
    let action = {
      type: GET_PERMISSIONS_FAILURE,
      error: "Exception",
    }
    expect(addOrEditRoleReducer(fromJS({}),action).get("permissionsDetailsFailure")).
    toEqual("Exception")
  })

  it('should handle "GET_ENTITLEMENTS_SUCCESS" action', () => {
    let action = {
      type: GET_ENTITLEMENTS_SUCCESS,
      response: "Success",
    }
    expect(addOrEditRoleReducer(fromJS({}), action).get("getEntitlementsSuccess")).toEqual("Success")
  })

  it('should handle "GET_ENTITLEMENTS_FAILURE" action', () => {
    let action = {
      type: GET_ENTITLEMENTS_FAILURE,
      error: "Exception",
    }
    expect(addOrEditRoleReducer(fromJS({}),action).get("getEntitlementsFailure")).toEqual("Exception")
  })

});
