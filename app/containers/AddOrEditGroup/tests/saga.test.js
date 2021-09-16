/**
 * Test sagas
 */

import addOrEditGroupSaga from '../saga';
import { errorHandler } from '../../../utils/commonUtils'
import {put, takeLatest, all} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import rootSaga,{
  watcherSubmitRequests,watcherGetGroupDetails,
  apiSubmitHandlerAsync,apiGetGroupDetailsHandlerAsync,
} from '../saga';
import { 
  ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE,
   GET_GROUP_DETAILS, GET_GROUP_DETAILS_SUCCESS, GET_GROUP_DETAILS_FAILURE 
} from '../constants';

describe('addOrEditGroupSaga Saga', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });

  it('should dispatch action "ON_SUBMIT_REQUEST" ', () => {
      const generator = watcherSubmitRequests();
      expect(generator.next().value).toEqual(takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync));
      expect(generator.next().done).toBeTruthy();
  })

  it('unit testing on rootSaga', () => {
      const generator = rootSaga();
      expect(generator.next().value).toEqual(all([
        watcherSubmitRequests(),
        watcherGetGroupDetails()
      ]))
  })

  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API for PUT call', () => {
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
      generator.next()
      expect(generator.next(response).value)
      .toEqual(put({type: ON_SUBMIT_REQUEST_SUCCESS , "response": true}))
      expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API for POST call', () => {
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

  it('should dispatch action "GET_GROUP_DETAILS" ', () => {
      const generator = watcherGetGroupDetails();
      expect(generator.next().value).toEqual(takeLatest(GET_GROUP_DETAILS, apiGetGroupDetailsHandlerAsync));
      expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_GROUP_DETAILS_SUCCESS" with result from fetch News API', () => {
      const mockResponse = {
        id: "asdf3213"
      }; 
      const response = {
          data:{
              data: true,
          }
      }
      const generator = apiGetGroupDetailsHandlerAsync(mockResponse);
      generator.next()
      expect(generator.next(response).value)
      .toEqual(put({type: GET_GROUP_DETAILS_SUCCESS , "response": true}))
      expect(generator.next().done).toBeTruthy();
  })

  it('apiSubmitHandlerAsync unit test case for ON_SUBMIT_REQUEST_FAILURE', () => {
    const mockResponse = { 
      payload : "Some content", 
      id: "asdf3213"
    }; 
    const error = "error"
    let generator = apiSubmitHandlerAsync(mockResponse);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, ON_SUBMIT_REQUEST_FAILURE));
});

it('apiGetGroupDetailsHandlerAsync unit test case for GET_GROUP_DETAILS_FAILURE', () => {
  const mockResponse = { 
    id: "asdf3213"
  }; 
  const error = "error"
  let generator = apiGetGroupDetailsHandlerAsync(mockResponse);
  generator.next();
  expect(generator.throw(error).value).toEqual(errorHandler(error, GET_GROUP_DETAILS_FAILURE));
});

});
