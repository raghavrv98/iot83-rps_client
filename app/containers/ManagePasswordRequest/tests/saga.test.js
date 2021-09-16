/**
 * Test sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import {
  PASSWORDREQUESTLIST,
  PASSWORDREQUESTLIST_SUCCESS,
  PASSWORDREQUESTLIST_FAILURE
} from "../constants";
import rootSaga, {
  watcherGetPasswordListRequest,
  managePasswordRequestSaga
} from "../saga";
// const generator = managePasswordRequestSaga();
describe("managePasswordRequestSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });
  describe("managePasswordRequestSaga Saga", () => {
    it("unit testing on rootSaga", () => {
      const generator = rootSaga();
      expect(generator.next().value).toEqual(all([watcherGetPasswordListRequest()]));
    });
    it('should dispatch action "PASSWORDREQUESTLIST"', () => {
      const generator = watcherGetPasswordListRequest();
      expect(generator.next().value).toEqual(
        takeLatest(PASSWORDREQUESTLIST, managePasswordRequestSaga)
      );
    });
    it('should dispatch action "PASSWORDREQUESTLIST_SUCCESS" with result from fetch News API', () => {
      const action = {
        payload: "true"
      };
      const response = {
        data: true
      };
      const generator = managePasswordRequestSaga(action);
      generator.next();
      expect(generator.next(response).value).toEqual(
        put({ type: PASSWORDREQUESTLIST_SUCCESS, response: true })
      );
      expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "PASSWORDREQUESTLIST_SUCCESS" with result from fetch News API', () => {
      const action = {
        payload: {
          userId: "true"
        },
        id: "id"
      };
      const response = {
        data: {
          message: true
        }
      };
      const generator = managePasswordRequestSaga(action);
      generator.next();
      expect(generator.next(response).value).toEqual(
        put({ type: PASSWORDREQUESTLIST_SUCCESS, response: true })
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('should dispatch action "PASSWORDREQUESTLIST_FAILURE" with result from fetch News API', () => {
      const mockAction = {
        payload: {
          userId: "true"
        },
        id: "id"
      };
      const error = "error";
      const gen = managePasswordRequestSaga(mockAction);
      gen.next();
      expect(gen.throw(error).value).toEqual(
        errorHandler(error, PASSWORDREQUESTLIST_FAILURE)
      );
    });
  });
});
