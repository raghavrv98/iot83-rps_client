import { fromJS } from 'immutable';
import addOrEditTenantReducer from '../reducer';
import {
  DEFAULT_ACTION,
  SUBMIT_HANDLER,
  SUBMIT_HANDLER_SUCCESS, 
  SUBMIT_HANDLER_FAILURE, 
  GET_TENANT_BY_ID_SUCCESS,
  GET_TENANT_BY_ID_FAILURE,
} from '../constants'

describe('addOrEditTenantReducer', () => {
  it('returns the initial state', () => {
    expect(addOrEditTenantReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "DEFAULT_ACTION" action', () => {
    expect(
      addOrEditTenantReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });

  it('should handle "SUBMIT_HANDLER" action', () => {
    let action = {
      type: SUBMIT_HANDLER,
      error: undefined
    }
    expect(addOrEditTenantReducer(fromJS({}),action).get("submitFailure")).toEqual(undefined)
  });

  it('should handle "SUBMIT_HANDLER_SUCCESS" action', () => {
    let action = {
      type: SUBMIT_HANDLER_SUCCESS,
      response: "Success",
    }
    expect(addOrEditTenantReducer(fromJS({}),action).get("submitSuccess")).toEqual("Success")
  });

  it('should handle "SUBMIT_HANDLER_FAILURE" action', () => {
    let action = {
      type: SUBMIT_HANDLER_FAILURE,
      error: "Exception",
    }
    expect(addOrEditTenantReducer(fromJS({}),action).get("submitFailure")).toEqual("Exception")
  })

  it('should handle "GET_TENANT_BY_ID_SUCCESS" action', () => {
    let action = {
      type: GET_TENANT_BY_ID_SUCCESS,
      response: "Success",
    }
    expect(addOrEditTenantReducer(fromJS({}), action).get("tenantByIdSuccess")).toEqual("Success")
  })

  it('should handle "GET_TENANT_BY_ID_FAILURE" action', () => {
    let action = {
      type: GET_TENANT_BY_ID_FAILURE,
      error: "Exception",
    }
    expect(addOrEditTenantReducer(fromJS({}),action).get("tenantByIdFailure")).
    toEqual("Exception")
  })
  
});
