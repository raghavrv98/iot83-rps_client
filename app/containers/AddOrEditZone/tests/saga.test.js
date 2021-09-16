/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, all } from "redux-saga/effects";
import {
  ON_SUBMIT_REQUEST,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  GET_ZONE_DETAILS,
  GET_ZONE_DETAILS_SUCCESS,
  GET_ZONE_DETAILS_FAILURE
} from "../constants";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
  watcherAddOrEditZoneSaga,
  watcherGetDetailsZoneSaga,
  addOrEditZoneSaga,
  apiGetZoneDetailsHandlerAsync
} from "../saga";

describe("addOrEditZoneSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });
  it("unit testing on rootSaga", () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherAddOrEditZoneSaga(),
      watcherGetDetailsZoneSaga()
    ]));
  });

  it('should dispatch action "ON_SUBMIT_REQUEST"', () => {
    const generator = watcherAddOrEditZoneSaga();
    expect(generator.next().value).toEqual(
      takeLatest(ON_SUBMIT_REQUEST, addOrEditZoneSaga)
    );
  });
  it('should dispatch action "GET_ZONE_DETAILS"', () => {
    const generator = watcherGetDetailsZoneSaga();
    expect(generator.next().value).toEqual(
      takeLatest(GET_ZONE_DETAILS, apiGetZoneDetailsHandlerAsync)
    );
  });

  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API', () => {
    const action = {
      plantId: "plantId",
      pipelineId: "pipelineId"
    };
    const response = {
      data: {
        message: true
      }
    };
    const generator = addOrEditZoneSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API', () => {
    const action = {
      plantId: "plantId",
      pipelineId: "pipelineId",
      zoneId: "ZoneId"
    };
    const response = {
      data: {
        message: true
      }
    };
    const generator = addOrEditZoneSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API', () => {
    const action = {
      plantId: "plantId",
      pipelineId: "pipelineId",
      zoneId: "ZoneId",
      isBulkUpload: "IsBulkUpload"
    };
    const response = {
      data: {
        message: true
      }
    };
    const generator = addOrEditZoneSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "GET_ZONE_DETAILS_SUCCESS" with result from fetch News API', () => {
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
    const generator = apiGetZoneDetailsHandlerAsync(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_ZONE_DETAILS_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "ON_SUBMIT_REQUEST_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      plantId: "plantId",
      pipelineId: "pipelineId",
      zoneId: "ZoneId"
    };
    const error = "error";
    const gen = addOrEditZoneSaga(mockAction);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, ON_SUBMIT_REQUEST_FAILURE)
    );
  });
  it('should dispatch action "GET_ZONE_DETAILS_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      plantId: "plantId",
      pipelineId: "pipelineId",
      zoneId: "ZoneId"
    };
    const error = "error";
    const gen = apiGetZoneDetailsHandlerAsync(mockAction);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, GET_ZONE_DETAILS_FAILURE)
    );
  });
});
