/**
 * Test sagas
 */

import rootSaga,{
    watcherSubmitRequests,
    watcherGetRoleDetails,
    watcherGetPermissions,
    watcherGetEntitlements,
    apiSubmitHandlerAsync,
    apiGetPermissions,
    apiGetRoleDetailsHandlerAsync,
    apiGetEntitlements,
} from '../saga';
import { 
    ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, 
    ON_SUBMIT_REQUEST_FAILURE, GET_ROLE_DETAILS, 
    GET_ROLE_DETAILS_SUCCESS, GET_ROLE_DETAILS_FAILURE, 
    GET_PERMISSIONS, GET_PERMISSIONS_SUCCESS, 
    GET_PERMISSIONS_FAILURE, GET_ENTITLEMENTS, 
    GET_ENTITLEMENTS_FAILURE , GET_ENTITLEMENTS_SUCCESS
} from '../constants';
import {errorHandler} from '../../../utils/commonUtils'
import { put, takeLatest, all } from 'redux-saga/effects';

describe('addOrEditRoleSaga Saga', () => {

  it('should dispatch action "ON_SUBMIT_REQUEST" ', () => {
      const generator = watcherSubmitRequests();
      expect(generator.next().value).toEqual(takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync));
      expect(generator.next().done).toBeTruthy();
  })

  it('unit testing on rootSaga', () => {
      const generator = rootSaga();
      expect(generator.next().value).toEqual(all([
        watcherSubmitRequests(),
        watcherGetRoleDetails(),
        watcherGetPermissions(),
        watcherGetEntitlements()
      ]))
  })

  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from PUT call', () => {
      const mockResponse = { 
        payload : "Some content", 
        id: "asdf3213"
      }; 
      const response = {
          data:{
              data: true,
          }
      }
      const generator = apiSubmitHandlerAsync(mockResponse);
      generator.next();
      expect(generator.next(response).value)
      .toEqual(put({type: ON_SUBMIT_REQUEST_SUCCESS , "response": true}))
      expect(generator.next().done).toBeTruthy();
  })

  it('catch apiSubmitHandlerAsync errorHandler', () => {
    const error = "error";
    const action = {
        payload: "demo",
        id: '12123adsfd'
    }
    const gen = apiSubmitHandlerAsync(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(errorHandler(error,ON_SUBMIT_REQUEST_FAILURE))
  });

  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from POST call', () => {
    const mockResponse = { 
      payload : "Some content", 
      id: undefined
    }; 
    const response = {
        data:{
            data: true,
        }
    }
    const generator = apiSubmitHandlerAsync(mockResponse);
    generator.next()
    expect(generator.next(response).value)
    .toEqual(put({type: ON_SUBMIT_REQUEST_SUCCESS , "response": true}))
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_ROLE_DETAILS_SUCCESS" with result from POST call', () => {
    const mockResponse = { 
      id: "demo"
    }; 
    const response = {
        data:{
            data: true,
        }
    }
    const generator = apiGetRoleDetailsHandlerAsync(mockResponse);
    generator.next()
    expect(generator.next(response).value)
    .toEqual(put({ type: GET_ROLE_DETAILS_SUCCESS, response: true }))
    expect(generator.next().done).toBeTruthy();
  })

  it('catch apiGetRoleDetailsHandlerAsync errorHandler', () => {
    const error = "error";
    const action = {
        id: "demo"
    }
    const gen = apiGetRoleDetailsHandlerAsync(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(errorHandler(error,GET_ROLE_DETAILS_FAILURE))
  });

  it('should dispatch action "GET_PERMISSIONS_SUCCESS" with result from POST call', () => {
    const response = {
        data:{
            data: true,
        }
    }
    const generator = apiGetPermissions();
    generator.next()
    expect(generator.next(response).value)
    .toEqual(put({ type: GET_PERMISSIONS_SUCCESS, response: true }))
    expect(generator.next().done).toBeTruthy();
  })

  it('catch apiGetPermissions errorHandler', () => {
    const error = "error";
    const gen = apiGetPermissions();
    gen.next();
    expect(gen.throw(error).value).toEqual(errorHandler(error,GET_PERMISSIONS_FAILURE))
  });

  it('should dispatch action "GET_ENTITLEMENTS_SUCCESS" apiGetEntitlements GET Api', () => {
    const response = {
        data:{
            data: true,
        }
    }
    const generator = apiGetEntitlements();
    generator.next()
    expect(generator.next(response).value)
    .toEqual(put({ type: GET_ENTITLEMENTS_SUCCESS, response: true }))
    expect(generator.next().done).toBeTruthy();
  })

  it('catch apiGetEntitlements errorHandler', () => {
    const error = "error";
    const gen = apiGetEntitlements();
    gen.next();
    expect(gen.throw(error).value).toEqual(errorHandler(error,GET_ENTITLEMENTS_FAILURE))
  });

});
