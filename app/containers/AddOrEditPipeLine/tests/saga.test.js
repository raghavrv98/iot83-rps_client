/**
 * Test sagas
 */
import {
    ON_SUBMIT_REQUEST,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  GET_PIPELINE_REQUEST,
  GET_PIPELINE_REQUEST_SUCCESS,
  GET_PIPELINE_REQUEST_FAILURE
  } from "../constants";
  import { put, takeLatest, all } from "redux-saga/effects";
  import { errorHandler } from "../../../utils/commonUtils";
  import rootSaga, {
    watcherSubmitRequests,
    watcherGetPipelineDetails,
    addOrEditPipeLineSaga,
    apiGetPipelineDetailsHandlerAsync
  } from "../saga";
  
  describe("addOrEditPipeLineSaga Saga", () => {
    it("unit testing on rootSaga", () => {
      const generator = rootSaga();
      expect(generator.next().value).toEqual(all([
        watcherSubmitRequests(),
        watcherGetPipelineDetails()
      ]));
    });
    it('should dispatch action "CREATE_PIPELINE_REQUEST"', () => {
      const generator = watcherSubmitRequests();
      expect(generator.next().value).toEqual(
        takeLatest(ON_SUBMIT_REQUEST, addOrEditPipeLineSaga)
      );
    });
  
    it('should dispatch action "GET_PIPELINE_REQUEST" ', () => {
      const generator = watcherGetPipelineDetails();
      expect(generator.next().value).toEqual(
        takeLatest(GET_PIPELINE_REQUEST, apiGetPipelineDetailsHandlerAsync)
      );
    });
    it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API', () => {
      const action = {
        payload:{
            name: "demo",
            processFluid: "demo",
            overallGeometry: "demo",
            other: "demo"
        }
      };
      const response = {
        data: {
          message: "success"
        }
      };
      const generator = addOrEditPipeLineSaga(action);
      generator.next();
      expect(generator.next(response).value).toEqual(
        put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: "success" })
      );
      expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API', () => {
        const action = {
            pipelineId:'pipelineId',
          payload:{
              name: "demo",
              processFluid: "demo",
              overallGeometry: "demo",
              other: "demo"
          }
        };
        const response = {
          data: {
            message: "success"
          }
        };
        const generator = addOrEditPipeLineSaga(action);
        generator.next();
        expect(generator.next(response).value).toEqual(
          put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: "success" })
        );
        expect(generator.next().done).toBeTruthy();
      });
    it('should dispatch action "GET_PIPELINE_REQUEST_SUCCESS" with result from fetch News API', () => {
      const action = {
        pipelineId:"pipelineId"
      };
      const response = {
        data: {
          data: true
        }
      };
      const generator = apiGetPipelineDetailsHandlerAsync(action);
      generator.next();
      expect(generator.next(response).value).toEqual(
        put({ type: GET_PIPELINE_REQUEST_SUCCESS, response: true })
      );
      expect(generator.next().done).toBeTruthy();
    });
  
    it('should dispatch action "ON_SUBMIT_REQUEST_FAILURE" with result from fetch News API', () => {
      const mockAction = {
        id: "demoId"
      };
      const error = "error";
      const gen = addOrEditPipeLineSaga(mockAction);
      gen.next();
      expect(gen.throw(error).value).toEqual(
        errorHandler(error, ON_SUBMIT_REQUEST_FAILURE)
      );
    });
    it('should dispatch action "GET_PIPELINE_REQUEST_FAILURE" with result from fetch News API', () => {
        const action = {
            pipelineId:"pipelineId"
          };
      const error = "error";
      const gen = apiGetPipelineDetailsHandlerAsync(action);
      gen.next();
      expect(gen.throw(error).value).toEqual(
        errorHandler(error, GET_PIPELINE_REQUEST_FAILURE)
      );
    });
  });
  