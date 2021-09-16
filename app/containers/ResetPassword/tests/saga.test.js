import { put, takeLatest, all } from 'redux-saga/effects';
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCCESS, RESET_PASSWORD_FAILURE } from '../constants';
import {watcherResetPasswordRequests, apiResetPasswordHandlerAsync} from '../saga'
import rootSaga from '../saga'
import { errorHandler } from '../../../utils/commonUtils';

const error = "error";

describe('manageAgentsSaga Saga', () => {
    const mockAction = {
        payload: "sample payload"
    }
    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([ watcherResetPasswordRequests() ]))
    })

    it('should dispatch action "RESET_PASSWORD_REQUEST" ', () => {
        const generator = watcherResetPasswordRequests();
        expect(generator.next().value).toEqual(takeLatest(RESET_PASSWORD_REQUEST, apiResetPasswordHandlerAsync));
    })

    it('should dispatch action "RESET_PASSWORD_SUCCCESS" with result from fetch News API', () => {
        const response = {
            data:{
                data: true,
            }
        }
        const generator = apiResetPasswordHandlerAsync(mockAction);
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({ type: RESET_PASSWORD_SUCCCESS, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "RESET_PASSWORD_FAILURE" with result from fetch News API', () => {
        const generator = apiResetPasswordHandlerAsync(mockAction);
        generator.next()
        expect(generator.throw(error).value)
        .toEqual(errorHandler(error, RESET_PASSWORD_FAILURE))
    })
});