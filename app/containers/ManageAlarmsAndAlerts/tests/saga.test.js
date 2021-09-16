import rootSaga, {
    watcherGetPlantList,
    watcherGetPipelineList,
    watcherGetAlarmCategory,
    watcherGetAlarmType,
    watcherFilterType,
    watcherAlarmStatusChange,
    watcherGetAlarmDetails,
    apiGetPipelineList,
    getAlarmCategory,
    apiGetPlantList,
    getAlarmType,
    getFilterData,
    apiAlarmStatusChangeHandler,
    apiAlarmDetails
} from '../saga';
import {
    GET_PLANTLIST,
    GET_PLANTLIST_SUCCESS,
    GET_PLANTLIST_FAILURE,
    GET_PIPELINELIST,
    GET_PIPELINELIST_SUCCESS,
    GET_PIPELINELIST_FAILURE,
    GET_ALARM_TYPE,
    GET_ALARM_TYPE_SUCCESS,
    GET_ALARM_TYPE_FAILURE,
    GET_FILTERED_DATA,
    GET_FILTERED_DATA_SUCCESS,
    GET_FILTERED_DATA_FAILURE,
    ALARM_STATUS_CHANGE,
    ALARM_STATUS_CHANGE_SUCCESS,
    ALARM_STATUS_CHANGE_FAILURE,
    GET_ALARM_DETAILS,
    GET_ALARM_DETAILS_SUCCESS,
    GET_ALARM_DETAILS_FAILURE,
    GET_ALARM_CATEGORY,
    GET_ALARM_CATEGORY_SUCCESS,
    GET_ALARM_CATEGORY_FAILURE
} from '../constants';
import { put, takeLatest, all } from 'redux-saga/effects';
import { errorHandler } from '../../../utils/commonUtils'

describe('manageAlarmsAndAlertsSaga Saga', () => {
    
    // it('unit testing on rootSaga', () => {
    //     const generator = rootSaga();
    //     expect(generator.next().value).toEqual(all([
    //         watcherGetPlantList(),
    //         watcherGetAlarmType(),
    //         watcherFilterType(),
    //         watcherAlarmStatusChange(),
    //         watcherGetAlarmDetails(),
    //         watcherGetPipelineList(),
    //         watcherGetAlarmCategory(),
    //     ]))
    // })

    it('should dispatch action "GET_PLANTLIST" ', () => {
        const generator = watcherGetPlantList();
        expect(generator.next().value).toEqual(takeLatest(GET_PLANTLIST, apiGetPlantList));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALARM_TYPE" ', () => {
        const generator = watcherGetAlarmType();
        expect(generator.next().value).toEqual(takeLatest(GET_ALARM_TYPE, getAlarmType));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_FILTERED_DATA" ', () => {
        const generator = watcherFilterType();
        expect(generator.next().value).toEqual(takeLatest(GET_FILTERED_DATA, getFilterData));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "ALARM_STATUS_CHANGE" ', () => {
        const generator = watcherAlarmStatusChange();
        expect(generator.next().value).toEqual(takeLatest(ALARM_STATUS_CHANGE, apiAlarmStatusChangeHandler));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALARM_DETAILS" ', () => {
        const generator = watcherGetAlarmDetails();
        expect(generator.next().value).toEqual(takeLatest(GET_ALARM_DETAILS, apiAlarmDetails));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_PIPELINELIST" ', () => {
        const generator = watcherGetPipelineList();
        expect(generator.next().value).toEqual(takeLatest(GET_PIPELINELIST, apiGetPipelineList));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALARM_CATEGORY" ', () => {
        const generator = watcherGetAlarmCategory();
        expect(generator.next().value).toEqual(takeLatest(GET_ALARM_CATEGORY, getAlarmCategory));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_PLANTLIST_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiGetPlantList();
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_PLANTLIST_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALARM_TYPE_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const generator = getAlarmType();
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_ALARM_TYPE_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_FILTERED_DATA_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const action = {
            plantId : "demo",
            filters : "demo",
            limit : "demo",
            offset : "demo",
            pipelineId : "demo"
        }
        const generator = getFilterData(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_FILTERED_DATA_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "ALARM_STATUS_CHANGE_SUCCESS" with result from fetch News API for PUT call', () => {
        const action = {
            seqId: 1,
            plantId: 1,
            payload: "demo"
        }
        const response = 1;
        const generator = apiAlarmStatusChangeHandler(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: ALARM_STATUS_CHANGE_SUCCESS, response: 1 }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALARM_DETAILS_SUCCESS" with result from fetch News API for PUT call', () => {
        const action = {
            seqId: 1,
            plantId: 1
        }
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiAlarmDetails(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_ALARM_DETAILS_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_PIPELINELIST_SUCCESS" with result from fetch News API for PUT call', () => {
        
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiGetPipelineList();
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_PIPELINELIST_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALARM_CATEGORY_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const generator = getAlarmCategory();
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_ALARM_CATEGORY_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiGetPlantList unit test case for GET_PLANTLIST_FAILURE', () => {
        const error = "error"
        let generator = apiGetPlantList();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PLANTLIST_FAILURE));
    });

    it('getAlarmType unit test case for GET_ALARM_TYPE_FAILURE', () => {
        const error = "error"
        let generator = getAlarmType();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALARM_TYPE_FAILURE));
    });

    it('getAlarmType unit test case for GET_FILTERED_DATA_FAILURE', () => {
        const error = "error";
        const action = {
            plantId : "demo",
            filters : "demo",
            limit : "demo",
            offset : "demo",
            pipelineId : "demo"
        }
        let generator = getFilterData(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_FILTERED_DATA_FAILURE));
    });

    it('apiAlarmStatusChangeHandler unit test case for ALARM_STATUS_CHANGE_FAILURE', () => {
        const action = {
            seqId: 1,
            plantId: 1,
            payload: "demo"
        }
        const error = "error"
        let generator = apiAlarmStatusChangeHandler(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, ALARM_STATUS_CHANGE_FAILURE));
    });

    it('apiAlarmStatusChangeHandler unit test case for GET_ALARM_DETAILS_FAILURE', () => {
        const action = {
            seqId: 1,
            plantId: 1
        }
        const error = "error"
        let generator = apiAlarmDetails(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALARM_DETAILS_FAILURE));
    });

    it('apiAlarmStatusChangeHandler unit test case for GET_PIPELINELIST_FAILURE', () => {
        const error = "error"
        let generator = apiGetPipelineList();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PIPELINELIST_FAILURE));
    });

    it('apiAlarmStatusChangeHandler unit test case for GET_ALARM_CATEGORY_FAILURE', () => {
        const error = "error"
        let generator = getAlarmCategory();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALARM_CATEGORY_FAILURE));
    });

});