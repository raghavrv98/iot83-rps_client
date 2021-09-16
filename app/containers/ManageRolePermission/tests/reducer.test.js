import { fromJS } from 'immutable';
import manageRolePermissionReducer from '../reducer';
import {
  DEFAULT_ACTION, GET_PERMISSIONS_SUCCESS, GET_ENTITLEMENTS_SUCCESS, GET_ENTITLEMENTS_FAILURE, GET_PERMISSIONS_FAILURE, 
  ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE, GET_ROLE_DETAILS_SUCCESS, GET_ROLE_DETAILS_FAILURE
} from '../constants';



describe('manageRolePermissionReducer', () => {

  it('returns the initial state', () => {
    expect(manageRolePermissionReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      manageRolePermissionReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });

  it('returns the GET_PERMISSIONS_SUCCESS', () => {
    let mockAction = {
      type: GET_PERMISSIONS_SUCCESS,
      response: "Success"
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      getPermissionsDetails: 'Success'
    }));
  });

  it('returns the GET_PERMISSIONS_FAILURE', () => {
    let mockAction = {
      type: GET_PERMISSIONS_FAILURE,
      error: "Exception"
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      permissionsDetailsFailure: 'Exception'
    }));
  });

  it('returns the GET_ENTITLEMENTS_SUCCESS', () => {
    let mockAction = {
      type: GET_ENTITLEMENTS_SUCCESS,
      response: "Success"
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      getEntitlementsSuccess: 'Success'
    }));
  });

  it('returns the GET_ENTITLEMENTS_FAILURE', () => {
    let mockAction = {
      type: GET_ENTITLEMENTS_FAILURE,
      error: "Exception"
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      getEntitlementsFailure: 'Exception'
    }));
  });

  it('returns the ON_SUBMIT_REQUEST', () => {
    let mockAction = {
      type: ON_SUBMIT_REQUEST,
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      onSubmitFailure: undefined
    }));
  });

  it('returns the ON_SUBMIT_REQUEST_SUCCESS', () => {
    let mockAction = {
      type: ON_SUBMIT_REQUEST_SUCCESS,
      response: "Success"
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      onSubmitSuccess: 'Success'
    }));
  });

  it('returns the ON_SUBMIT_REQUEST_FAILURE', () => {
    let mockAction = {
      type: ON_SUBMIT_REQUEST_FAILURE
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      onSubmitFailure: undefined
    }));
  });

  it('returns the GET_ROLE_DETAILS_SUCCESS', () => {
    let mockAction = {
      type: GET_ROLE_DETAILS_SUCCESS,
      response: "Success"
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      roleDetailsSuccess: 'Success'
    }));
  });

  it('returns the GET_ROLE_DETAILS_FAILURE', () => {
    let mockAction = {
      type: GET_ROLE_DETAILS_FAILURE
    }
    expect(manageRolePermissionReducer(fromJS({}), mockAction)).toEqual(fromJS({
      roleDetailsFailure: undefined
    }));
  });

});
