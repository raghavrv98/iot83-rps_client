/**
 * Test sagas
 */
import { errorHandler } from "../../../utils/commonUtils";
import {
  watcherSubmitRequests,
  watcherGetTenantById,
  apiTenantByIsHandlerAsync,
  apiSubmitHandlerAsync
} from "../saga";
import rootSaga from "../saga";
import {
  SUBMIT_HANDLER,
  SUBMIT_HANDLER_SUCCESS,
  SUBMIT_HANDLER_FAILURE,
  GET_TENANT_BY_ID,
  GET_TENANT_BY_ID_FAILURE,
  GET_TENANT_BY_ID_SUCCESS
} from "../constants";
import { put, takeLatest, all } from "redux-saga/effects";

describe("addOrEditTenantSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it('should dispatch action "SUBMIT_HANDLER" ', () => {
    const generator = watcherSubmitRequests();
    expect(generator.next().value).toEqual(
      takeLatest(SUBMIT_HANDLER, apiSubmitHandlerAsync)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("unit testing on rootSaga", () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherSubmitRequests(),
      watcherGetTenantById()
    ]));
  });

  it('should dispatch action "SUBMIT_HANDLER_SUCCESS" with result from fetch News API', () => {
    const mockResponse = { payload: "Some content" };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiSubmitHandlerAsync(mockResponse);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: SUBMIT_HANDLER_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "SUBMIT_HANDLER_FAILURE" with result from fetch News API', () => {
    const action = {
      payload: {
        id: "id"
      }
    };
    const error = "error";
    const gen = apiSubmitHandlerAsync(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, SUBMIT_HANDLER_FAILURE)
    );
  });

  it('should dispatch action "GET_TENANT_BY_ID" ', () => {
    const generator = watcherGetTenantById();
    expect(generator.next().value).toEqual(
      takeLatest(GET_TENANT_BY_ID, apiTenantByIsHandlerAsync)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_TENANT_BY_ID_SUCCESS" with result from fetch News API', () => {
    const mockResponse = { id: "23454323456dsfd4" };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiTenantByIsHandlerAsync(mockResponse);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_TENANT_BY_ID_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "GET_TENANT_BY_ID_FAILURE" with result from fetch News API', () => {
    const action = {
      id: "id"
    };
    const error = "error";
    const gen = apiTenantByIsHandlerAsync(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, GET_TENANT_BY_ID_FAILURE)
    );
  });
});
