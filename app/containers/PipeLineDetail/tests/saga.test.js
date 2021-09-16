/**
* Test sagas
*/

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, all } from 'redux-saga/effects';
import {
    GET_PIPELINES, GET_PIPELINES_SUCCESS, GET_PIPELINES_FAILURE,
    SAVE_DETAILS, SAVE_DETAILS_SUCCESS, SAVE_DETAILS_FAILURE,
    DELETE_DETAILS, DELETE_DETAILS_SUCCESS, DELETE_DETAILS_FAILURE,
} from '../constants';
import { errorHandler } from '../../../utils/commonUtils';
import rootSaga, {
    watcherGetPipelines,
    watcherSaveDetails,
    watcherDeleteHandler,
    apiGetPipelinesDetails,
    apiSaveDetails,
    apiDeleteDetails,
} from '../saga';

const error = "error";

describe('pipeLineDetailSaga Saga', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('Expect to have unit tests rootSaga', () => {
        expect(rootSaga().next().value).toEqual(all([
            watcherGetPipelines(),
            watcherSaveDetails(),
            watcherDeleteHandler()
        ]));
    });

    it('Expect to have unit tests for watcherGetPipelines', () => {
        expect(watcherGetPipelines().next().value).toEqual(takeLatest(GET_PIPELINES, apiGetPipelinesDetails));
    });

    it('Expect to have unit tests for watcherSaveDetails', () => {
        expect(watcherSaveDetails().next().value).toEqual(takeLatest(SAVE_DETAILS, apiSaveDetails));
    });

    it('Expect to have unit tests for watcherDeleteHandler', () => {
        expect(watcherDeleteHandler().next().value).toEqual(takeLatest(DELETE_DETAILS, apiDeleteDetails));
    });

    it('Expect to have unit tests of apiGetPipelinesDetails for GET_PIPELINES_SUCCESS', () => {
        let mockAction = {
            plantId: "demoId",
            pipelineId: "demoId",
        }
        let response = {
            data: {
                data: "Success"
            }
        }
        const generator = apiGetPipelinesDetails(mockAction);
        generator.next()
        expect(generator.next(response).value).toEqual(
            put({ type: GET_PIPELINES_SUCCESS, response: "Success" })
        );
    });

    it('Expect to have unit tests of apiGetPipelinesDetails for GET_PIPELINES_FAILURE', () => {
        let mockAction = {
            plantId: "demoId",
            pipelineId: "demoId",
        }
        const generator = apiGetPipelinesDetails(mockAction);
        generator.next()
        expect(generator.throw(error).value).toEqual(
            errorHandler("error", GET_PIPELINES_FAILURE)
        );
    });

    it('Expect to have unit tests of apiSaveDetails for SAVE_DETAILS_SUCCESS', () => {
        let mockAction = {
            fileDetails: {
                plantId: "demoId",
                pipelineId: "demoId",
                data: "demo"
            }
        }
        let response = {
            data: {
                message: "Success"
            }
        }
        const generator = apiSaveDetails(mockAction);
        generator.next()
        expect(generator.next(response).value).toEqual(
            put({ type: SAVE_DETAILS_SUCCESS, response: "Success" })
        );
    });

    it('Expect to have unit tests of apiSaveDetails for SAVE_DETAILS_FAILURE', () => {
        let mockAction = {
            fileDetails: {
                plantId: "demoId",
                pipelineId: "demoId",
                data: "demo"
            }
        }
        const generator = apiSaveDetails(mockAction);
        generator.next()
        expect(generator.throw(error).value).toEqual(
            errorHandler("error", SAVE_DETAILS_FAILURE)
        );
    });

    it('Expect to have unit tests of apiDeleteDetails for DELETE_DETAILS_SUCCESS', () => {
        let mockAction = {
            plantId: "demoId",
            pipelineId: "demoId",
        }
        const generator = apiDeleteDetails(mockAction);
        generator.next()
        expect(generator.next().value).toEqual(
            put({ type: DELETE_DETAILS_SUCCESS, response: "demoId" })
        );
    });

    it('Expect to have unit tests of apiDeleteDetails for DELETE_DETAILS_FAILURE', () => {
        let mockAction = {
            plantId: "demoId",
            pipelineId: "demoId",
        }
        const generator = apiDeleteDetails(mockAction);
        generator.next()
        expect(generator.throw(error).value).toEqual(
            errorHandler("error", DELETE_DETAILS_FAILURE)
        );
    });
});