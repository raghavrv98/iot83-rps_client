import rootSaga,{
    watcherGetMenus,
    watcherGetAllMenus,
    watcherSaveMenus,
    apiGetMenus,
    apiAllGetMenus,
    apiSaveMenus
  } from '../saga';
  import {
    GET_MENUS, GET_MENUS_SUCCESS, GET_MENUS_FAILURE, 
    GET_ALL_MENUS, GET_ALL_MENUS_SUCCESS, GET_ALL_MENUS_FAILURE, 
    SAVE_MENUS, SAVE_MENUS_SUCCESS, SAVE_MENUS_FAILURE
  } from '../constants';
  import { put, takeLatest, all } from 'redux-saga/effects';
  import { errorHandler } from '../../../utils/commonUtils'

describe('manageRoleNavigationSaga Saga', () => {
    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherGetMenus(),
            watcherGetAllMenus(),
            watcherSaveMenus()
        ]))
    })

    it('should dispatch action "GET_MENUS" ', () => {
        const generator = watcherGetMenus();
        expect(generator.next().value).toEqual(takeLatest(GET_MENUS, apiGetMenus));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALL_MENUS" ', () => {
        const generator = watcherGetAllMenus();
        expect(generator.next().value).toEqual(takeLatest(GET_ALL_MENUS, apiAllGetMenus));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "SAVE_MENUS" ', () => {
        const generator = watcherSaveMenus();
        expect(generator.next().value).toEqual(takeLatest(SAVE_MENUS, apiSaveMenus));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_MENUS_SUCCESS" with result from fetch News API', () => {
        const action = {
            id : 1
        }
        const response = {
            data:{
                data: true,
            }
        }
        const generator = apiGetMenus(action);
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({type: GET_MENUS_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ALL_MENUS_SUCCESS" with result from fetch News API', () => {
        const response = {
            data:{
                data: true,
            }
        }
        const generator = apiAllGetMenus();
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({type: GET_ALL_MENUS_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "SAVE_MENUS_SUCCESS" with result from fetch News API', () => {
        const response = {
            data:{
                message: true,
            }
        }
        const action = {
            id : 1,
            payload: "demo"
        }
        const generator = apiSaveMenus(action);
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({type: SAVE_MENUS_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiGetMenus unit test case for GET_MENUS_FAILURE', () => {
        const action = {
            id : 1
        }
        const error = "error"
        let generator = apiGetMenus(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_MENUS_FAILURE));
    });

    it('apiAllGetMenus unit test case for GET_ALL_MENUS_FAILURE', () => {
        const error = "error"
        let generator = apiAllGetMenus();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALL_MENUS_FAILURE));
    });

    it('apiSaveMenus unit test case for SAVE_MENUS_FAILURE', () => {
        const action = {
            id : 1,
            payload: "demo"
        }
        const error = "error"
        let generator = apiSaveMenus(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, SAVE_MENUS_FAILURE));
    });
});