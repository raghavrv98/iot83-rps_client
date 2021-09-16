import { fromJS } from 'immutable';
import manageOAuthMappingReducer from '../reducer';
import {
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_FAILURE,
  GET_GROUPS_LIST_SUCCESS,
  GET_GROUPS_LIST_FAILURE,
  GET_MAPPING_LIST_SUCCESS,
  GET_MAPPING_LIST_FAILURE,
  SUBMIT_MAPPING_REQUEST_SUCCESS,
  SUBMIT_MAPPING_REQUEST_FAILURE,
} from "../constants";

describe('manageOAuthMappingReducer', () => {

  it('should handle "GET_ROLES_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_ROLES_LIST_SUCCESS,
      response: "Success",
    }
    expect(manageOAuthMappingReducer(fromJS({}), action).get("getRolesListSuccess")).toEqual("Success")
  });

  it('should handle "GET_ROLES_LIST_FAILURE" action', () => {
    let action = {
      type: GET_ROLES_LIST_FAILURE,
      error: "Exception",
    }
    expect(manageOAuthMappingReducer(fromJS({}), action).get("getRolesListFailure")).toEqual("Exception")
  })

  it('should handle "GET_GROUPS_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_GROUPS_LIST_SUCCESS,
      response: "Success",
    }
    expect(manageOAuthMappingReducer(fromJS({}), action).get("getGroupsListSuccess")).toEqual("Success")
  });

  it('should handle "GET_GROUPS_LIST_FAILURE" action', () => {
    let action = {
      type: GET_GROUPS_LIST_FAILURE,
      error: "Exception",
    }
    expect(manageOAuthMappingReducer(fromJS({}), action).get("getGroupsListFailure")).toEqual("Exception")
  })

  it('should handle "GET_MAPPING_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_MAPPING_LIST_SUCCESS,
      response: "Success",
    }
    expect(manageOAuthMappingReducer(fromJS({}), action).get("getMappingListSuccess")).toEqual("Success")
  });

  it('should handle "GET_MAPPING_LIST_FAILURE" action', () => {
    let action = {
      type: GET_MAPPING_LIST_FAILURE,
      error: "Exception",
    }
    expect(manageOAuthMappingReducer(fromJS({}), action).get("getMappingListFailure")).toEqual("Exception")
  })

  it('should handle "SUBMIT_MAPPING_REQUEST_SUCCESS" action', () => {
    let action = {
      type: SUBMIT_MAPPING_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(manageOAuthMappingReducer(fromJS({}), action).get("submitMappingRequestSuccess")).toEqual("Success")
  });

  it('should handle "SUBMIT_MAPPING_REQUEST_FAILURE" action', () => {
    let action = {
      type: SUBMIT_MAPPING_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(manageOAuthMappingReducer(fromJS({}), action).get("submitMappingRequestFailure")).toEqual("Exception")
  })
})
