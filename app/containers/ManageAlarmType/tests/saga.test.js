import rootSaga, {
    watcherGetAlarmType,
    watcherAddAlarmType,
    watcherGetAlarmCategory,
    addAlarmType,
    manageAlarmTypeSaga,
    manageAlarmCategorySaga
} from '../saga';
import {
    ADD_ALARM_TYPE, ADD_ALARM_TYPE_SUCCESS, ADD_ALARM_TYPE_FAILURE,
    GET_ALARM_TYPE, GET_ALARM_TYPE_SUCCESS, GET_ALARM_TYPE_FAILURE,
    GET_ALARM_CATEGORY, GET_ALARM_CATEGORY_SUCCESS, GET_ALARM_CATEGORY_FAILURE
}
    from '../constants'
import { put, takeLatest, all } from 'redux-saga/effects';
import { errorHandler } from '../../../utils/commonUtils'

describe('manageAlarmTypeSaga Saga', () => {

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherGetAlarmType(),
            watcherGetAlarmCategory(),
            watcherAddAlarmType()
        ]))
    })

    it('should dispatch action "ADD_ALARM_TYPE" ', () => {
        const generator = watcherAddAlarmType();
        expect(generator.next().value).toEqual(takeLatest(ADD_ALARM_TYPE, addAlarmType));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALARM_TYPE" ', () => {
        const generator = watcherGetAlarmType();
        expect(generator.next().value).toEqual(takeLatest(GET_ALARM_TYPE, manageAlarmTypeSaga));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALARM_CATEGORY" ', () => {
        const generator = watcherGetAlarmCategory();
        expect(generator.next().value).toEqual(takeLatest(GET_ALARM_CATEGORY, manageAlarmCategorySaga));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "ADD_ALARM_TYPE_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const action = {
            types: "abc"
        }
        const generator = addAlarmType(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: ADD_ALARM_TYPE_SUCCESS, "response": true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('addAlarmType unit test case for ADD_ALARM_TYPE_FAILURE', () => {
        const action = {
            types: "abc"
        }
        const error = "error"
        let generator = addAlarmType(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, ADD_ALARM_TYPE_FAILURE));
    });

    it('should dispatch action "GET_ALARM_TYPE_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const generator = manageAlarmTypeSaga();
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_ALARM_TYPE_SUCCESS, "response": true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('manageAlarmTypeSaga unit test case for GET_ALARM_TYPE_FAILURE', () => {
        const error = "error"
        let generator = manageAlarmTypeSaga();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALARM_TYPE_FAILURE));
    });

    it('should dispatch action "GET_ALARM_CATEGORY_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const generator = manageAlarmCategorySaga();
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_ALARM_CATEGORY_SUCCESS, "response": true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('manageAlarmCategorySaga unit test case for GET_ALARM_CATEGORY_FAILURE', () => {
        const error = "error"
        let generator = manageAlarmCategorySaga();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALARM_CATEGORY_FAILURE));
    });
});