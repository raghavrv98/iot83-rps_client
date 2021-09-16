import { put, takeLatest, all } from 'redux-saga/effects';
import {
    GET_AGENTS,
    GET_AGENTS_SUCCESS,
    GET_AGENTS_FAILURE,
    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_FAILURE,
    AGENT_UPDATE_kEY,
    AGENT_UPDATE_kEY_SUCCESS,
    AGENT_UPDATE_kEY_FAILURE,
    GET_COMPARISON_DETAILS,
    GET_COMPARISON_DETAILS_SUCCESS,
    GET_COMPARISON_DETAILS_FAILURE,
    SAVE_TO_RPS_REQUEST,
    SAVE_TO_RPS_REQUEST_SUCCESS,
    SAVE_TO_RPS_REQUEST_FAILURE,
    PUBLISH_TO_DTS_REQUEST,
    PUBLISH_TO_DTS_REQUEST_SUCCESS,
    PUBLISH_TO_DTS_REQUEST_FAILURE
} from '../constants';
import {
    watcherAgentsRequests, apiAgentsHandlerAsync,
    watcherDeleteRequests, apiDeleteRequestHandlerAsync,
    watcherAgentActiveDeactiveKey, apiAgentActiveDeactiveKeyHandlerAsync,
    watcherComparisonDetails, apiGetComparisonRequestHandlerAsync,
    watcherSaveToRPS, apiSaveToRPSHandlerAsync,
    watcherPublishToDTS, apiPublishToDTSHandlerAsync
} from '../saga'
import rootSaga from '../saga'
import { errorHandler } from '../../../utils/commonUtils'

describe('manageAgentsSaga Saga', () => {

    // it('unit testing on rootSaga', () => {
    //     const generator = rootSaga();
    //     expect(generator.next().value).toEqual(all([
    //         watcherAgentsRequests(),
    //         watcherDeleteRequests(),
    //         watcherAgentActiveDeactiveKey(),
    //         watcherComparisonDetails(),
    //         watcherSaveToRPS(),
    //         watcherPublishToDTS(),
    //     ]))
    // })

    it('should dispatch action "GET_AGENTS" ', () => {
        const generator = watcherAgentsRequests();
        expect(generator.next().value).toEqual(takeLatest(GET_AGENTS, apiAgentsHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })


    it('should dispatch action "DELETE_REQUEST" ', () => {
        const generator = watcherDeleteRequests();
        expect(generator.next().value).toEqual(takeLatest(DELETE_REQUEST, apiDeleteRequestHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "AGENT_UPDATE_kEY" ', () => {
        const generator = watcherAgentActiveDeactiveKey();
        expect(generator.next().value).toEqual(takeLatest(AGENT_UPDATE_kEY, apiAgentActiveDeactiveKeyHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_COMPARISON_DETAILS" ', () => {
        const generator = watcherComparisonDetails();
        expect(generator.next().value).toEqual(takeLatest(GET_COMPARISON_DETAILS, apiGetComparisonRequestHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "SAVE_TO_RPS_REQUEST" ', () => {
        const generator = watcherSaveToRPS();
        expect(generator.next().value).toEqual(takeLatest(SAVE_TO_RPS_REQUEST, apiSaveToRPSHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "PUBLISH_TO_DTS_REQUEST" ', () => {
        const generator = watcherPublishToDTS();
        expect(generator.next().value).toEqual(takeLatest(PUBLISH_TO_DTS_REQUEST, apiPublishToDTSHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_AGENTS_SUCCESS" with result from fetch News API', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiAgentsHandlerAsync();
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_AGENTS_SUCCESS, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "DELETE_REQUEST_SUCCESS" with result from fetch News API', () => {
        const mockAction = {
            id: "sampleId"
        }
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiDeleteRequestHandlerAsync(mockAction);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: DELETE_REQUEST_SUCCESS, response: "sampleId" }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "AGENT_UPDATE_kEY_SUCCESS" with result from fetch News API', () => {
        const mockAction = {
            id: "sampleId",
            status: "demo"
        }
        const response = {
            id: "sampleId",
            status: "demo"
        }

        const generator = apiAgentActiveDeactiveKeyHandlerAsync(mockAction);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: AGENT_UPDATE_kEY_SUCCESS, response: { id: mockAction.id, status: mockAction.status } }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_COMPARISON_DETAILS_SUCCESS" with result from fetch News API', () => {
        const mockAction = {
            id: "sampleId",
        }
        const response = {
            data: {
                data: true,
            }
        }

        const generator = apiGetComparisonRequestHandlerAsync(mockAction);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_COMPARISON_DETAILS_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "SAVE_TO_RPS_REQUEST_SUCCESS" with result from fetch News API', () => {
        const mockAction = {
            id: "sampleId",
        }
        const response = {
            data: {
                data: true,
            }
        }

        const generator = apiSaveToRPSHandlerAsync(mockAction);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: SAVE_TO_RPS_REQUEST_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "PUBLISH_TO_DTS_REQUEST_SUCCESS" with result from fetch News API', () => {
        const mockAction = {
            id: "sampleId",
        }
        const response = {
            data: {
                data: true,
            }
        }

        const generator = apiPublishToDTSHandlerAsync(mockAction);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: PUBLISH_TO_DTS_REQUEST_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiAgentsHandlerAsync unit test case for GET_AGENTS_FAILURE', () => {
        const error = "error"
        let generator = apiAgentsHandlerAsync();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_AGENTS_FAILURE));
    });


    it('apiDeleteRequestHandlerAsync unit test case for DELETE_REQUEST_FAILURE', () => {
        const mockAction = {
            id: "sampleId"
        }
        const error = "error"
        let generator = apiDeleteRequestHandlerAsync(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, DELETE_REQUEST_FAILURE));
    });

    it('apiAgentActiveDeactiveKeyHandlerAsync unit test case for AGENT_UPDATE_kEY_FAILURE', () => {
        const mockAction = {
            id: "sampleId",
            status: "demo"
        }
        const error = "error"
        let generator = apiAgentActiveDeactiveKeyHandlerAsync(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, AGENT_UPDATE_kEY_FAILURE));
    });

    it('apiGetComparisonRequestHandlerAsync unit test case for GET_COMPARISON_DETAILS_FAILURE', () => {
        const mockAction = {
            id: "sampleId",
        }
        const error = "error"
        let generator = apiGetComparisonRequestHandlerAsync(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_COMPARISON_DETAILS_FAILURE));
    });

    it('apiGetComparisonRequestHandlerAsync unit test case for SAVE_TO_RPS_REQUEST_FAILURE', () => {
        const mockAction = {
            id: "sampleId",
        }
        const error = "error"
        let generator = apiSaveToRPSHandlerAsync(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, SAVE_TO_RPS_REQUEST_FAILURE));
    });

    it('apiGetComparisonRequestHandlerAsync unit test case for PUBLISH_TO_DTS_REQUEST_FAILURE', () => {
        const mockAction = {
            id: "sampleId",
        }
        const error = "error"
        let generator = apiPublishToDTSHandlerAsync(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, PUBLISH_TO_DTS_REQUEST_FAILURE));
    });

});