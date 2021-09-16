/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";

import {
  GET_ZONE_LIST,
  GET_ZONE_LIST_SUCCESS,
  GET_ZONE_LIST_FAILURE,
  ZONE_DELETE,
  ZONE_DELETE_SUCCESS,
  ZONE_DELETE_FAILURE
} from "../constants";

import rootSaga, {
  getmanageZonesSaga,
  apiDeleteZone,
  watcherGetmanageZonesSaga,
  watcherapiDeleteZone
} from "../saga";
// const generator = manageZonesSaga();

describe("manageZonesSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });
  it("unit testing on rootSaga", () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherGetmanageZonesSaga(),
      watcherapiDeleteZone()
    ]));
  });

  it('should dispatch action "GET_ZONE_LIST"', () => {
    const generator = watcherGetmanageZonesSaga();
    expect(generator.next().value).toEqual(
      takeLatest(GET_ZONE_LIST, getmanageZonesSaga)
    );
  });

  it('should dispatch action "ZONE_DELETE" ', () => {
    const generator = watcherapiDeleteZone();
    expect(generator.next().value).toEqual(
      takeLatest(ZONE_DELETE, apiDeleteZone)
    );
  });

  it('should dispatch action "ZONE_DELETE_SUCCESS" with result from fetch News API', () => {
    const action = {
      plantId: "plantId",
      pipelineId: "pipelineId",
      zoneId: "ZoneId"
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiDeleteZone(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: ZONE_DELETE_SUCCESS, response: "ZoneId" })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "ZONE_DELETE_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      plantId: "plantId",
      pipelineId: "pipelineId",
      zoneId: "ZoneId"
    };
    const error = "error";
    const gen = apiDeleteZone(mockAction);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, ZONE_DELETE_FAILURE)
    );
  });

  it('should dispatch action "GET_ZONE_LIST_SUCCESS" with result from fetch News API', () => {
    const action = {
      plantId: "plantId",
      pipelineId: "pipelineId",
      zoneId: "ZoneId"
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = getmanageZonesSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_ZONE_LIST_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_ZONE_LIST_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      plantId: "plantId",
      pipelineId: "pipelineId",
      zoneId: "ZoneId"
    };
    const error = "error";
    const gen = getmanageZonesSaga(mockAction);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, GET_ZONE_LIST_FAILURE)
    );
  });
  
});
