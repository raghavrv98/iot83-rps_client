import { put, takeLatest, all } from 'redux-saga/effects';
import {
    GET_SEGMENT_DATA, GET_SEGMENT_DATA_SUCCESS, GET_SEGMENT_DATA_FAILURE,
    GET_CHART_DATA, GET_CHART_REQUEST_SUCCESS, GET_CHART_REQUEST_FAILURE,
    GET_PLANT_LIST, GET_PLANT_LIST_SUCCESS, GET_PLANT_LIST_FAILURE,
    GET_PIPELINE_DETAILS, GET_PIPELINE_DETAILS_SUCCESS, GET_PIPELINE_DETAILS_FAILURE,
    GET_ATTRIBUTES, GET_ATTRIBUTES_SUCCESS, GET_ATTRIBUTES_FAILURE
} from '../constants';
import {
    watcherGetSegmentData, apiGetSegmentDataHandlerAsync,
    watcherGetChartDetails, apiGetChartDetailsHandlerAsync,
    watcherGetPlantList, apiGetPlantList,
    watcherFetchPipeline, apiGetPipelines,
    watcherGetAttributes, apiGetAttributes
} from '../saga'
import { errorHandler } from '../../../utils/commonUtils'
import rootSaga from '../saga'
describe('commissionerDashboardSaga Saga', () => {
    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherGetSegmentData(),
            watcherGetChartDetails(),
            watcherGetPlantList(),
            watcherFetchPipeline(),
            watcherGetAttributes()
        ]))
    })

    it('should dispatch action "GET_PIPELINE_DETAILS" ', () => {
        const generator = watcherFetchPipeline();
        expect(generator.next().value).toEqual(takeLatest(GET_PIPELINE_DETAILS, apiGetPipelines));
    })

    it('should dispatch action "GET_SEGMENT_DATA" ', () => {
        const generator = watcherGetSegmentData();
        expect(generator.next().value).toEqual(takeLatest(GET_SEGMENT_DATA, apiGetSegmentDataHandlerAsync));
    })

    it('should dispatch action "GET_PIPELINE_REQUEST" ', () => {
        const generator = watcherGetPlantList();
        expect(generator.next().value).toEqual(takeLatest(GET_PLANT_LIST, apiGetPlantList));
    })

    it('should dispatch action "GET_CHART_DATA" ', () => {
        const generator = watcherGetChartDetails();
        expect(generator.next().value).toEqual(takeLatest(GET_CHART_DATA, apiGetChartDetailsHandlerAsync));
    })

    it('should dispatch action "GET_ATTRIBUTES" ', () => {
        const generator = watcherGetAttributes();
        expect(generator.next().value).toEqual(takeLatest(GET_ATTRIBUTES, apiGetAttributes));
    })

    it('should dispatch action "GET_SEGMENT_DATA_SUCCESS" with result from fetch News API', () => {
        const action = {
            plantId: 1,
            pipelineId: 1,
            segment: "abc"
        }
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiGetSegmentDataHandlerAsync(action);
        generator.next()
        expect(generator.next(response).value).toEqual(put({ type: GET_SEGMENT_DATA_SUCCESS, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiGetSegmentDataHandlerAsync unit test case for GET_SEGMENT_DATA_FAILURE', () => {
        const action = {
            plantId: 1,
            pipelineId: 1,
            segment: "abc"
        }
        let generator = apiGetSegmentDataHandlerAsync(action);
        const error = "error";
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_SEGMENT_DATA_FAILURE));
    });

    it('should dispatch action "GET_CHART_REQUEST_SUCCESS" with result from fetch News API', () => {
        const action = {
            plantId: 1,
            pipelineId: 1,
            distance: 1
        }
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiGetChartDetailsHandlerAsync(action);
        generator.next()
        expect(generator.next(response).value).toEqual(put({ type: GET_CHART_REQUEST_SUCCESS, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiGetPipelineDetailsHandlerAsync unit test case for GET_CHART_REQUEST_FAILURE', () => {
        const action = {
            plantId: 1,
            pipelineId: 1,
            distance: 1
        }
        let generator = apiGetChartDetailsHandlerAsync(action);
        const error = "error";
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_CHART_REQUEST_FAILURE));
    });

    it('should dispatch action "GET_PLANT_LIST_SUCCESS" with result from fetch News API', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiGetPlantList();
        generator.next()
        expect(generator.next(response).value).toEqual(put({ type: GET_PLANT_LIST_SUCCESS, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiGetPlantList unit test case for GET_CHART_REQUEST_FAILURE', () => {
        let generator = apiGetPlantList();
        const error = "error";
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PLANT_LIST_FAILURE));
    });

    it('should dispatch action "GET_PIPELINE_DETAILS_SUCCESS" with result from fetch News API', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const action = {
            plantId: "demo"
        }
        const generator = apiGetPipelines(action);
        generator.next()
        expect(generator.next(response).value).toEqual(put({ type: GET_PIPELINE_DETAILS_SUCCESS, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiGetPipelines unit test case for GET_PIPELINE_DETAILS_FAILURE', () => {
        const action = {
            plantId: "demo"
        }
        let generator = apiGetPipelines(action);
        const error = "error";
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PIPELINE_DETAILS_FAILURE));
    });

    // it('should dispatch action "GET_ATTRIBUTES_SUCCESS" with result from fetch News API', () => {
    //     const response = {
    //         data: {
    //             data: true,
    //         }
    //     }
    //     const generator = apiGetAttributes();
    //     console.log('generator.next(response): ', generator.next(response));
    //     generator.next();
    //     expect(generator.next(response).value).toEqual(put({ type: GET_ATTRIBUTES_SUCCESS, response: response.data.data }))
    //     expect(generator.next().done).toBeTruthy();
    // })

    // it('apiGetPlantList unit test case for GET_ATTRIBUTES_FAILURE', () => {
    //     let generator = apiGetAttributes();
    //     const error = "error";
    //     generator.next();
    //     expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ATTRIBUTES_FAILURE));
    // });
});