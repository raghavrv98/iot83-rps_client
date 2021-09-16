/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import manageGroupsSaga from '../saga';

// const generator = manageGroupsSaga();

import { put, takeLatest, all } from 'redux-saga/effects';
import { 
  GET_LIST, GOT_LIST, NOT_GOT_LIST , 
  DELETE_REQUEST, DELETE_REQUEST_SUCCESS, 
  DELETE_REQUEST_FAILURE} from '../constants'
import { 
  watcherUsersRequests, 
  apiUsersHandlerAsync, 
  watcherDeleteRequests, 
  apiDeleteRequestHandlerAsync 
} from '../saga'
import rootSaga from '../saga'
import { errorHandler } from '../../../utils/commonUtils'

describe('manageGroupsSaga Saga', () => {
  const sampleAction = {
    id: "demoId",
    payload: "demoPayload",
  }
  const error = "error"

  it('unit testing on rootSaga', () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherUsersRequests(), watcherDeleteRequests()
    ]))
  })

  it('should dispatch action "GET_LIST" ', () => {
    const generator = watcherUsersRequests();
    expect(generator.next().value).toEqual(takeLatest(GET_LIST, apiUsersHandlerAsync));
  })

  it('should dispatch action "DELETE_REQUEST" ', () => {
    const generator = watcherDeleteRequests();
    expect(generator.next().value).toEqual(takeLatest(DELETE_REQUEST, apiDeleteRequestHandlerAsync));
  })

  it('should dispatch action "GOT_LIST" with result from fetch News API', () => {
    const response = {
      data: {
        data: true,
      }
    }
    const generator = apiUsersHandlerAsync(sampleAction);
    generator.next()
    expect(generator.next(response).value).toEqual(
      put({ type: GOT_LIST, response: true })
    )
  })

  it('should dispatch action "NOT_GOT_LIST" with result from fetch News API', () => {
    const generator = apiUsersHandlerAsync(sampleAction);
    generator.next()
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, NOT_GOT_LIST)
    )
  })

  it('should dispatch action "DELETE_REQUEST_SUCCESS" with result from fetch News API', () => {
    const generator = apiDeleteRequestHandlerAsync(sampleAction);
    generator.next()
    expect(generator.next().value).toEqual(
      put({ type: DELETE_REQUEST_SUCCESS, response: "demoId" })
    )
  })

  it('should dispatch action "DELETE_REQUEST_FAILURE" with result from fetch News API', () => {
    const generator = apiDeleteRequestHandlerAsync(sampleAction);
    generator.next()
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, DELETE_REQUEST_FAILURE)
    )
  })

})
