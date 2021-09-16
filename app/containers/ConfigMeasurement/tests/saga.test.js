/**
* Test sagas
*/

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest, all } from 'redux-saga/effects';
import rootSaga from '../saga';
import {
    GET_MEASUREMENT_LIST, MEASUREMENT_LIST_SUCCESS, MEASUREMENT_LIST_FAILURE,
    PROCESS_MEASUREMENT, PROCESS_MEASUREMENT_SUCCESS, PROCESS_MEASUREMENT_FAILURE
} from '../constants';
import {
    watcherGetMeasurementsRequests,
    watcherMeasurementProcess,
    apiGetMeasurementsAgentsHandlerAsync,
    apiMeasurementProcess
} from '../saga'
import { errorHandler } from '../../../utils/commonUtils'

// const generator = configMeasurementSaga();

describe('configMeasurementSaga Saga', () => {

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherGetMeasurementsRequests(),
            watcherMeasurementProcess()
        ]))
    })

    it('should dispatch action "GET_MEASUREMENT_LIST" ', () => {
        const generator = watcherGetMeasurementsRequests();
        expect(generator.next().value).toEqual(takeLatest(GET_MEASUREMENT_LIST, apiGetMeasurementsAgentsHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "PROCESS_MEASUREMENT" ', () => {
        const generator = watcherMeasurementProcess();
        expect(generator.next().value).toEqual(takeLatest(PROCESS_MEASUREMENT, apiMeasurementProcess));
        expect(generator.next().done).toBeTruthy();

    })

    it('should dispatch action "MEASUREMENT_LIST_SUCCESS" with result from fetch News API', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const action = {
            types: "abc"
        }
        const generator = apiGetMeasurementsAgentsHandlerAsync(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: MEASUREMENT_LIST_SUCCESS, "response": true }))
        expect(generator.next().done).toBeTruthy();

    })

    it('should dispatch action "PROCESS_MEASUREMENT_SUCCESS" with result from fetch News API', () => {

        const response = {
            data: {
                data: true,
            }
        }
        const action = {
            types: "abc"
        }
        const generator = apiMeasurementProcess(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: PROCESS_MEASUREMENT_SUCCESS, "response": 'Measurement Mapping has been triggered' }))
        expect(generator.next().done).toBeTruthy();

    })

    it('apiGetMeasurementsAgentsHandlerAsync unit test case for MEASUREMENT_LIST_FAILURE', () => {

        const mockResponse = {
            id: "demo",
            measurementCount: "demo",
            offset: "demo"
        };
        const error = "error"
        let generator = apiGetMeasurementsAgentsHandlerAsync(mockResponse);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, MEASUREMENT_LIST_FAILURE));
    });

    it('apiMeasurementProcess unit test case for PROCESS_MEASUREMENT_FAILURE', () => {

        const mockResponse = {
            measureId: "demo",
            agentId: "demo"
        };
        const error = "error"
        let generator = apiMeasurementProcess(mockResponse);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, PROCESS_MEASUREMENT_FAILURE));
    });

});