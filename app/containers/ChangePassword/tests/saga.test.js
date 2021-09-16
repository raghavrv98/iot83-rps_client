import { put, takeLatest, all } from 'redux-saga/effects';
import rootSaga from '../saga';
import {watcherChangePasswordRequests, apiChangePasswordHandlerAsync} from '../saga';
import {
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE
} from '../constants';
import { errorHandler } from '../../../utils/commonUtils'

describe('changePasswordSaga Saga', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherChangePasswordRequests()
        ]))
    })

    it('should dispatch action "CHANGE_PASSWORD_REQUEST" ', () => {
        const generator = watcherChangePasswordRequests();
        expect(generator.next().value).toEqual(takeLatest(CHANGE_PASSWORD_REQUEST, apiChangePasswordHandlerAsync));
    })

    it('should dispatch action "CHANGE_PASSWORD_SUCCESS" with result from fetch News API', () => {
        const mockResponse = { payload : "Some content" }; 
        const response = {
            data:{
                data: true,
            }
        }
        const generator = apiChangePasswordHandlerAsync(mockResponse);
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({ type: CHANGE_PASSWORD_SUCCESS, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiChangePasswordHandlerAsync unit test case for CHANGE_PASSWORD_FAILURE', () => {  
        const mockResponse = { payload : "Some content" };
        const error = "error"
        let generator = apiChangePasswordHandlerAsync(mockResponse);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, CHANGE_PASSWORD_FAILURE));
      });
    

});