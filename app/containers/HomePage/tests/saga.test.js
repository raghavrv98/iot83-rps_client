
import { put, takeLatest, all } from 'redux-saga/effects';
import { errorHandler } from '../../../utils/commonUtils';
import rootSaga,{
    watcherGetNav, apiNavHandler,
    watcherGetVersion, apiVersionHandler
  } from '../saga';
  import {
    GET_NAVIGATION, GET_NAVIGATION_SUCCESS, GET_NAVIGATION_FAILURE,
    GET_VERSION, GET_VERSION_FAILURE, GET_VERSION_SUCCESS
} from '../constants';  
describe('homePageSaga Saga', () => {

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherGetNav(),
            watcherGetVersion()
        ]))
    })

    it('should dispatch action "GET_NAVIGATION" ', () => {
        const generator = watcherGetNav();
        expect(generator.next().value).toEqual(takeLatest(GET_NAVIGATION, apiNavHandler));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_VERSION" ', () => {
        const generator = watcherGetVersion();
        expect(generator.next().value).toEqual(takeLatest(GET_VERSION, apiVersionHandler));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_NAVIGATION_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data:{
                data: true,
            }
        }
        const generator = apiNavHandler();
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({type: GET_NAVIGATION_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiNavHandler unit test case for GET_NAVIGATION_FAILURE', () => { 
        const error = "error"
        let generator = apiNavHandler();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_NAVIGATION_FAILURE));
    });

    it('should dispatch action "GET_VERSION_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data:{
                data: true,
            }
        }
        const generator = apiVersionHandler();
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({type: GET_VERSION_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiNavHandler unit test case for GET_VERSION_FAILURE', () => { 
        const error = "error"
        let generator = apiVersionHandler();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_VERSION_FAILURE));
    });
});