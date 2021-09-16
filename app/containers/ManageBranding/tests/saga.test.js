import rootSaga,{
    watcherUsersRequests,
    watcherThemeRequests,
    manageBrandingSaga,
    manageThemeSaga
  } from '../saga';
  import {
    UPLOAD_LOGO_REQUEST, UPLOAD_LOGO_SUCCESS, UPLOAD_LOGO_FAILURE, 
    UPLOAD_THEME_REQUEST, UPLOAD_THEME_SUCCESS, UPLOAD_THEME_FAILURE
  } from '../constants';
  import { put, takeLatest, all } from 'redux-saga/effects';
  import { errorHandler } from '../../../utils/commonUtils'

describe('manageBrandingSaga Saga', () => {

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherUsersRequests(), watcherThemeRequests()
        ]))
    })

    it('should dispatch action "UPLOAD_LOGO_REQUEST" ', () => {
        const generator = watcherUsersRequests();
        expect(generator.next().value).toEqual(takeLatest(UPLOAD_LOGO_REQUEST, manageBrandingSaga));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "UPLOAD_THEME_REQUEST" ', () => {
        const generator = watcherThemeRequests();
        expect(generator.next().value).toEqual(takeLatest(UPLOAD_THEME_REQUEST, manageThemeSaga));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "UPLOAD_LOGO_SUCCESS" with result from fetch News API', () => {
        const response = {
            data:{
                message: "abc",
            }
        }
        const action = {
            filePayload: "abc"
        }
        const generator = manageBrandingSaga(action);
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({type: UPLOAD_LOGO_SUCCESS , "response": "abc"}))
        expect(generator.next().done).toBeTruthy();
    })

    it('manageBrandingSaga unit test case for UPLOAD_LOGO_FAILURE', () => {  
        const action = {
            filePayload: "abc"
        }
        const error = "error"
        let generator = manageBrandingSaga(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, UPLOAD_LOGO_FAILURE));
    });


    it('should dispatch action "UPLOAD_THEME_SUCCESS" with result from fetch News API', () => {
        const response = {
            data:{
                message: "abc",
            }
        }
        const action = {
            filePayload: "abc"
        }
        const generator = manageThemeSaga(action);
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({type: UPLOAD_THEME_SUCCESS , "response": "abc"}))
        expect(generator.next().done).toBeTruthy();
    })

    it('manageThemeSaga unit test case for UPLOAD_THEME_FAILURE', () => {  
        const action = {
            filePayload: "abc"
        }
        const error = "error"
        let generator = manageThemeSaga(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, UPLOAD_THEME_FAILURE));
    });
});