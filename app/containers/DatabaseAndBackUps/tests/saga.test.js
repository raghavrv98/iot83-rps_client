import rootSaga,{
    watcherGetDatabaseList,
    watcherCreateBackupPayload,
    watcherGetTenantList,
    watcherGetActivityStatus,
    apiGetDatabaseListHandler,
    apiCreateBackupPayloadHandler,
    apiGetTenantListHandler,
    apiGetActivityStatusHandler
} from '../saga';
import {GET_DATABASE_LIST_SUCCESS, GET_DATABASE_LIST_FAILURE, GET_DATABASE_LIST,
        CREATE_BACKUP_LIST_FAILURE,CREATE_BACKUP_LIST_SUCCESS,CREATE_BACKUP_LIST,
        GET_TENANT_LIST_SUCCESS,GET_TENANT_LIST_FAILURE,GET_TENANT_LIST,
        GET_ACTIVITY_STATUS,GET_ACTIVITY_STATUS_SUCCESS,GET_ACTIVITY_STATUS_FAILURE,
} from  '../constants'
import { put, takeLatest, all } from 'redux-saga/effects';
import { errorHandler } from '../../../utils/commonUtils'

describe('databaseAndBackUpsSaga Saga', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherGetDatabaseList(),
            watcherCreateBackupPayload(),
            watcherGetTenantList(),
            watcherGetActivityStatus()
        ]))
    })

    it('should dispatch action "GET_DATABASE_LIST" ', () => {
        const generator = watcherGetDatabaseList();
        expect(generator.next().value).toEqual(takeLatest(GET_DATABASE_LIST, apiGetDatabaseListHandler));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "CREATE_BACKUP_LIST" ', () => {
        const generator = watcherCreateBackupPayload();
        expect(generator.next().value).toEqual(takeLatest(CREATE_BACKUP_LIST, apiCreateBackupPayloadHandler));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_TENANT_LIST" ', () => {
        const generator = watcherGetTenantList();
        expect(generator.next().value).toEqual(takeLatest(GET_TENANT_LIST, apiGetTenantListHandler));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ACTIVITY_STATUS" ', () => {
        const generator = watcherGetActivityStatus();
        expect(generator.next().value).toEqual(takeLatest(GET_ACTIVITY_STATUS, apiGetActivityStatusHandler));
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_DATABASE_LIST_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data:{
                data: true
            }
        }
        const generator = apiGetDatabaseListHandler();
        generator.next();
        expect(generator.next(response).value)
        .toEqual(put({type: GET_DATABASE_LIST_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "CREATE_BACKUP_LIST_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: true
        }
        const action = {
            backupPayload: "demo"
        }
        const generator = apiCreateBackupPayloadHandler(action);
        generator.next();
        expect(generator.next(response).value)
        .toEqual(put({type: CREATE_BACKUP_LIST_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_TENANT_LIST_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true
            }
        }
        const generator = apiGetTenantListHandler();
        generator.next();
        expect(generator.next(response).value)
        .toEqual(put({type: GET_TENANT_LIST_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_ACTIVITY_STATUS_SUCCESS" with result from fetch News API for PUT call', () => {
        const response = {
            data: {
                data: true
            }
        }
        const action = {
            id: 1
        }
        const generator = apiGetActivityStatusHandler(action);
        generator.next();
        expect(generator.next(response).value)
        .toEqual(put({type: GET_ACTIVITY_STATUS_SUCCESS , "response": true}))
        expect(generator.next().done).toBeTruthy();
    })

    it('apiGetDatabaseListHandler unit test case for GET_DATABASE_LIST_FAILURE', () => {  
        const error = "error"
        let generator = apiGetDatabaseListHandler();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_DATABASE_LIST_FAILURE));
    });

    it('apiCreateBackupPayloadHandler unit test case for CREATE_BACKUP_LIST_FAILURE', () => { 
        const action = {
            backupPayload: "demo"
        } 
        const error = "error"
        let generator = apiCreateBackupPayloadHandler(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, CREATE_BACKUP_LIST_FAILURE));
    });

    it('apiGetTenantListHandler unit test case for GET_TENANT_LIST_FAILURE', () => {  
        const error = "error"
        let generator = apiGetTenantListHandler();
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_TENANT_LIST_FAILURE));
    });

    it('apiGetDatabaseListHandler unit test case for GET_ACTIVITY_STATUS_FAILURE', () => {  
        const action = {
            id: "demo"
        } 
        const error = "error"
        let generator = apiGetActivityStatusHandler(action);
        generator.next();
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ACTIVITY_STATUS_FAILURE));
    });

});