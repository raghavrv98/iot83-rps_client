import {
    LOGIN_API_REQUEST, LOGIN_API_SUCCESS, LOGIN_API_FAILURE,
    RESET_PASSWORD_API_REQUEST, RESET_PASSWORD_API_SUCCESS, RESET_PASSWORD_API_FAILURE,
    GET_AUTH_CONFIG_DETAILS, GET_AUTH_CONFIG_DETAILS_SUCCESS, GET_AUTH_CONFIG_DETAILS_FAILURE,
    GET_LOGIN_TOKEN
} from '../constants';
import {
    watcherLoginRequests,
    watcherResetPasswordRequests,
    watcherGetAuthConfigDetails,
    watcherGetLoginToken,
    apiLoginHandlerAsync,
    apiResetPasswordHandlerAsync,
    apiGetAuthConfigDetailsHandlerAsync,
    apiGetLoginTokenHandlerAsync
} from '../saga';
import rootSaga from '../saga'
import { put, takeLatest, all } from "redux-saga/effects";

import { errorHandler } from '../../../utils/commonUtils'

const action = {
    payload: "demo",
    tenant: "demo",
}
describe('manageLoginSaga Saga', () => {

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherLoginRequests(),
            watcherResetPasswordRequests(),
            watcherGetAuthConfigDetails(),
            watcherGetLoginToken()
        ]))
    })

    it('should dispatch action "LOGIN_API_REQUEST" ', () => {
        const generator = watcherLoginRequests();
        expect(generator.next().value).toEqual(takeLatest(LOGIN_API_REQUEST, apiLoginHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "RESET_PASSWORD_API_REQUEST" ', () => {
        const generator = watcherResetPasswordRequests();
        expect(generator.next().value).toEqual(takeLatest(RESET_PASSWORD_API_REQUEST, apiResetPasswordHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })


    it('should dispatch action "GET_AUTH_CONFIG_DETAILS" ', () => {
        const generator = watcherGetAuthConfigDetails();
        expect(generator.next().value).toEqual(takeLatest(GET_AUTH_CONFIG_DETAILS, apiGetAuthConfigDetailsHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_LOGIN_TOKEN" ', () => {
        const generator = watcherGetLoginToken();
        expect(generator.next().value).toEqual(takeLatest(GET_LOGIN_TOKEN, apiGetLoginTokenHandlerAsync));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "LOGIN_API_SUCCESS" with result from fetch News API', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const action = {
            types: "abc"
        }
        const generator = apiLoginHandlerAsync(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: LOGIN_API_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "RESET_PASSWORD_API_SUCCESS" with result from fetch News API', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const action = {
            types: "abc"
        }
        const generator = apiResetPasswordHandlerAsync(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: RESET_PASSWORD_API_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_AUTH_CONFIG_DETAILS_SUCCESS" with result from fetch News API', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const action = {
            types: "abc"
        }
        const generator = apiGetAuthConfigDetailsHandlerAsync(action);
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_AUTH_CONFIG_DETAILS_SUCCESS, response: true }))
        expect(generator.next().done).toBeTruthy();
    })

    // it('should dispatch action "LOGIN_API_FAILURE" with result from fetch News API', () => {
    //     const error = "error"
    //     let generator = apiLoginHandlerAsync();
    //     generator.next();
    //     expect(generator.throw(error).value).toEqual(errorHandler(error, LOGIN_API_FAILURE));
    // });

    // it('should dispatch action "RESET_PASSWORD_API_FAILURE" with result from fetch News API', () => {
    //     const error = "error"
    //     let generator = apiResetPasswordHandlerAsync();
    //     generator.next();
    //     expect(generator.throw(error).value).toEqual(errorHandler(error, RESET_PASSWORD_API_FAILURE));

    // })

    it('should dispatch action "GET_AUTH_CONFIG_DETAILS_FAILURE" with result from fetch News API', () => {
        const error = "error"
        let generator = apiGetAuthConfigDetailsHandlerAsync();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_AUTH_CONFIG_DETAILS_FAILURE));

    })
})

