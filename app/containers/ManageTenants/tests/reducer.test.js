import { fromJS } from 'immutable';
import manageTenantsReducer from '../reducer';
import { DEFAULT_ACTION, GET_TENANTS_SUCCESS, GET_TENANTS_FAILURE, DELETE_TENANT_FAILURE, DELETE_TENANT_SUCCESS } from "../constants";

describe('manageTenantsReducer', () => {
  it('returns the initial state', () => {
    expect(manageTenantsReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "DEFAULT_ACTION" action', () => {
    expect(manageTenantsReducer(undefined, { type: DEFAULT_ACTION })).toEqual(fromJS({}));
  });

  it('should handle "GET_TENANTS_SUCCESS" action', () => {
    expect(manageTenantsReducer(undefined, { type: GET_TENANTS_SUCCESS, response: "Success" }).toJS()).
    toEqual({tenantsList:"Success"})
  })

  it('should handle "GET_TENANTS_FAILURE" action', () => {
    expect(manageTenantsReducer(undefined, { type: GET_TENANTS_FAILURE, error: "Exception" }).toJS()).
    toEqual({tenantsListError:"Exception"})
  })

  it('should handle "DELETE_TENANT_SUCCESS" action', () => {
    expect(manageTenantsReducer(undefined, { type: DELETE_TENANT_SUCCESS, response: "Success" }).toJS()).
    toEqual({deleteSuccess:"Success"})
  })

  it('should handle "DELETE_TENANT_FAILURE" action', () => {
    expect(manageTenantsReducer(undefined, { type: DELETE_TENANT_FAILURE, error: "Exception" }).toJS()).
    toEqual({deleteFailure:"Exception"})
  })
});
