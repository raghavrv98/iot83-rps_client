import rootSaga,{
  watcherSubmitRequests,
  watcherGetUserDetails,
  watcherGetAllRoles,
  watcherGetAllGroups,
  apiSubmitHandlerAsync,
  apiGetUserDetailsHandlerAsync,
  apiGetAllRolesHandlerAsync,
  apiGetAllGroupsHandlerAsync
} from '../saga';
import {
    ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE,
    GET_USER_DETAILS, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_FAILURE,
    GET_ALL_GROUPS,GET_ALL_GROUPS_FAILURE,GET_ALL_GROUPS_SUCCESS,
    GET_ALL_ROLES,GET_ALL_ROLES_FAILURE,GET_ALL_ROLES_SUCCESS,
} from '../constants';
import { put, takeLatest, all } from 'redux-saga/effects';
import { errorHandler } from '../../../utils/commonUtils'


describe('addOrEditUserSaga Saga', () => {

  it('unit testing on rootSaga', () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherSubmitRequests(),
      watcherGetUserDetails(),
      watcherGetAllRoles(),
      watcherGetAllGroups()
    ]))
  })

  it('should dispatch action "ON_SUBMIT_REQUEST" ', () => {
      const generator = watcherSubmitRequests();
      expect(generator.next().value).toEqual(takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync));
      expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_USER_DETAILS" ', () => {
    const generator = watcherGetUserDetails();
    expect(generator.next().value).toEqual(takeLatest(GET_USER_DETAILS, apiGetUserDetailsHandlerAsync));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "ON_SUBMIT_REQUEST" ', () => {
    const generator = watcherGetAllRoles();
    expect(generator.next().value).toEqual(takeLatest(GET_ALL_ROLES, apiGetAllRolesHandlerAsync));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "ON_SUBMIT_REQUEST" ', () => {
    const generator = watcherGetAllGroups();
    expect(generator.next().value).toEqual(takeLatest(GET_ALL_GROUPS, apiGetAllGroupsHandlerAsync));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API for PUT call', () => {
      const mockResponse = { 
        payload : "Some content",
        id: "123qwe",
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

  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API for POST call', () => {
    const mockResponse = { 
      payload : "Some content",
      id: undefined,
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

  it('should dispatch action "GET_USER_DETAILS_SUCCESS" with result from fetch News API', () => {
    const mockResponse = { id : "123qwe" }; 
    const response = {
        data:{
            data: true,
        }
    }
    const generator = apiGetUserDetailsHandlerAsync(mockResponse);
    generator.next()
    expect(generator.next(response).value)
    .toEqual(put({type: GET_USER_DETAILS_SUCCESS , "response": true}))
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_ALL_GROUPS_SUCCESS" with result from fetch News API', () => {
    const response = {
        data:{
            data: true,
        }
    }
    const generator = apiGetAllGroupsHandlerAsync();
    generator.next()
    expect(generator.next(response).value)
    .toEqual(put({type: GET_ALL_GROUPS_SUCCESS , "response": true}))
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_ALL_ROLES_SUCCESS" with result from fetch News API', () => {
    const response = {
        data:{
            data: true,
        }
    }
    const generator = apiGetAllRolesHandlerAsync();
    generator.next()
    expect(generator.next(response).value)
    .toEqual(put({type: GET_ALL_ROLES_SUCCESS , "response": true}))
    expect(generator.next().done).toBeTruthy();
  })

  it('apiSubmitHandlerAsync unit test case for ON_SUBMIT_REQUEST_FAILURE', () => {
    const mockResponse = { 
      payload : "Some content",
      id: undefined,
    };  
    const error = "error"
    let generator = apiSubmitHandlerAsync(mockResponse);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, ON_SUBMIT_REQUEST_FAILURE));
  });

  it('apiSubmitHandlerAsync unit test case for GET_USER_DETAILS_FAILURE', () => {
    const mockResponse = { 
      id: 1
    };  
    const error = "error"
    let generator = apiGetUserDetailsHandlerAsync(mockResponse);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, GET_USER_DETAILS_FAILURE));
  });

  it('apiGetAllGroupsHandlerAsync unit test case for GET_ALL_GROUPS_FAILURE', () => {  
    const error = "error"
    let generator = apiGetAllGroupsHandlerAsync();
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALL_GROUPS_FAILURE));
  });

  it('apiGetAllRolesHandlerAsync unit test case for GET_ALL_ROLES_FAILURE', () => {  
    const error = "error"
    let generator = apiGetAllRolesHandlerAsync();
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALL_ROLES_FAILURE));
  });
});
