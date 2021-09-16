import {put, takeLatest, all } from 'redux-saga/effects';
import {
  GET_MENU_REQUEST, GET_MENU_SUCCESS, GET_MENU_FAILURE,
  MENU_SAVE_HANDLER, MENU_SAVE_HANDLER_SUCCESS, MENU_SAVE_HANDLER_FAILURE
} from '../constants';
import rootSaga from '../saga';
import {
  watcherNavRequests, watcherMenuSaveHandler,
  apiNavHandlerAsync, apiMenuSaveHandler
} from '../saga';
import { errorHandler } from '../../../utils/commonUtils';

describe('manageNavigationSaga Saga', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });

  it("unit testing on rootSaga", () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherNavRequests(),
      watcherMenuSaveHandler()
    ]));
  });

  it('should dispatch action "GET_AGENTS" ', () => {
    const generator = watcherNavRequests();
    expect(generator.next().value).toEqual(takeLatest(GET_MENU_REQUEST, apiNavHandlerAsync));
  })

  it('should dispatch action "MENU_SAVE_HANDLER" ', () => {
    const generator = watcherMenuSaveHandler();
    expect(generator.next().value).toEqual(takeLatest(MENU_SAVE_HANDLER, apiMenuSaveHandler));
  })


  it('should dispatch action "GET_MENU_SUCCESS" with result from fetch News API for PUT call', () => {
    const response = {
      data: {
        data: true,
      }
    }
    const generator = apiNavHandlerAsync();
    generator.next()
    expect(generator.next(response).value)
      .toEqual(put({ type: GET_MENU_SUCCESS, "response": true }))
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_MENU_FAILURE" with result from fetch News API', () => {
    const error = "error";
    const generator = apiNavHandlerAsync();
    generator.next();
    expect(generator.throw(error).value)
      .toEqual(errorHandler(error, GET_MENU_FAILURE))
  })

  it('should dispatch action "MENU_SAVE_HANDLER_SUCCESS" with result from fetch News API for PUT call', () => {
    const action = {
      payload: "abc"
    }
    const response = {
      data: {
        message: true,
      }
    }
    const generator = apiMenuSaveHandler(action);
    generator.next()
    expect(generator.next(response).value)
      .toEqual(put({ type: MENU_SAVE_HANDLER_SUCCESS, "response": true }))
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "MENU_SAVE_HANDLER_FAILURE" with result from fetch News API', () => {
    const action = {
      payload: "abc"
    }
    const error = "error";
    const generator = apiMenuSaveHandler(action);
    generator.next();
    expect(generator.throw(error).value)
      .toEqual(errorHandler(error, MENU_SAVE_HANDLER_FAILURE))
  })

});