/**
* Test sagas
*/

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, all } from 'redux-saga/effects';
import rootSaga,{
    watcherSubmitRequests,
    watcherGetRoleDetails,
    watcherGetPermissions,
    watcherGetEntitlements,
    apiSubmitHandlerAsync,
    apiGetEntitlements,
    apiGetRoleDetailsHandlerAsync,
    apiGetPermissions
} from '../saga';
import {
    ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS,ON_SUBMIT_REQUEST_FAILURE,
    GET_ROLE_DETAILS, GET_ROLE_DETAILS_SUCCESS, GET_ROLE_DETAILS_FAILURE,
    GET_PERMISSIONS, GET_PERMISSIONS_SUCCESS, GET_PERMISSIONS_FAILURE,
    GET_ENTITLEMENTS, GET_ENTITLEMENTS_SUCCESS, GET_ENTITLEMENTS_FAILURE
} from '../constants';
import { errorHandler } from '../../../utils/commonUtils'

const error = "error"

describe('manageRolePermissionSaga Saga', () => {   
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('rootSaga unit test case', () => {
        expect(rootSaga().next().value).toEqual(all([
            watcherSubmitRequests(),
            watcherGetRoleDetails(),
            watcherGetPermissions(),
            watcherGetEntitlements()
        ]))
    });

    it('watcherSubmitRequests unit test case', () => {
        expect(watcherSubmitRequests().next().value).toEqual(takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync))
    });

    it('watcherGetEntitlements unit test case', () => {
        expect(watcherGetEntitlements().next().value).toEqual(takeLatest(GET_ENTITLEMENTS, apiGetEntitlements))
    });

    it('watcherGetRoleDetails unit test case', () => {
        expect(watcherGetRoleDetails().next().value).toEqual(takeLatest(GET_ROLE_DETAILS, apiGetRoleDetailsHandlerAsync))
    });

    it('watcherGetPermissions unit test case', () => {
        expect(watcherGetPermissions().next().value).toEqual(takeLatest(GET_PERMISSIONS, apiGetPermissions))
    });

    it('apiSubmitHandlerAsync unit test case for ON_SUBMIT_REQUEST_SUCCESS', () => {
        let mockAction = {
            id: "demoId",
        }
        let mockResponse = {
            data: {
                data: "success",
            }
        }
        let generator = apiSubmitHandlerAsync(mockAction);
        generator.next();
        expect(generator.next(mockResponse).value).toEqual(put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: "success" }));
    });

    it('apiSubmitHandlerAsync unit test case for ON_SUBMIT_REQUEST_SUCCESS', () => {
        let mockAction = {
            id: undefined
        }
        let mockResponse = {
            data: {
                data: "success",
            }
        }
        let generator = apiSubmitHandlerAsync(mockAction);
        generator.next();
        expect(generator.next(mockResponse).value).toEqual(put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: "success" }));
    });

    it('apiSubmitHandlerAsync unit test case for ON_SUBMIT_REQUEST_FAILURE', () => {
        let mockAction = {
            id: "demoId",
        }
        let generator = apiSubmitHandlerAsync(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, ON_SUBMIT_REQUEST_FAILURE));
    });

    it('apiGetEntitlements unit test case for GET_ENTITLEMENTS_SUCCESS', () => {
        let mockResponse = {
            data: {
                data: "success",
            }
        }
        let generator = apiGetEntitlements();
        generator.next();
        expect(generator.next(mockResponse).value).toEqual(put({ type: GET_ENTITLEMENTS_SUCCESS, response: "success" }));
    });

    it('apiGetEntitlements unit test case for GET_ENTITLEMENTS_FAILURE', () => {
        let generator = apiGetEntitlements();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ENTITLEMENTS_FAILURE));
    });

    it('apiGetRoleDetailsHandlerAsync unit test case for GET_ROLE_DETAILS_SUCCESS', () => {
        let mockAction = {
            id: 1
        }
        let mockResponse = {
            data: {
                data: "success",
            }
        }
        let generator = apiGetRoleDetailsHandlerAsync(mockAction);
        generator.next();
        expect(generator.next(mockResponse).value).toEqual(put({ type: GET_ROLE_DETAILS_SUCCESS, response: "success" }));
    });

    it('apiGetRoleDetailsHandlerAsync unit test case for GET_ROLE_DETAILS_FAILURE', () => {
        let mockAction = {
            id: "demoId",
        }
        let generator = apiGetRoleDetailsHandlerAsync(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ROLE_DETAILS_FAILURE));
    });

    it('apiGetPermissions unit test case for GET_PERMISSIONS_SUCCESS', () => {
        let mockResponse = {
            data: {
                data: "success",
            }
        }
        let generator = apiGetPermissions();
        generator.next();
        expect(generator.next(mockResponse).value).toEqual(put({ type: GET_PERMISSIONS_SUCCESS, response: "success" }));
    });

    it('apiGetPermissions unit test case for GET_PERMISSIONS_FAILURE', () => {
        let mockAction = {
            id: "demoId",
        }
        let generator = apiGetPermissions(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PERMISSIONS_FAILURE));
    });
});