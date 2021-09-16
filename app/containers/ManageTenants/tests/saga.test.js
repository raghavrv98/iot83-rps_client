/**
* Test sagas
*/

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest, all } from 'redux-saga/effects';
import {apiTenantsHandlerAsync,apiDeleteTenantHandlerAsync,watcherTenantsRequests, watcherTenantDeleteRequests} from '../saga';
import rootSaga from '../saga'
import { 
    GET_TENANTS, GET_TENANTS_SUCCESS, GET_TENANTS_FAILURE,
    DELETE_TENANT,DELETE_TENANT_FAILURE,DELETE_TENANT_SUCCESS 
} from '../constants';
import { errorHandler } from '../../../utils/commonUtils';

const mockAction = {
    id: "demoId",
}

const error = "error";

describe('manageTenantsSaga Saga', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('unit testing on rootSaga', () => {
        const generator = rootSaga();
        expect(generator.next().value).toEqual(all([
            watcherTenantsRequests(),
            watcherTenantDeleteRequests()
        ]))
    })

    it('should dispatch action "GET_TENANTS" ', () => {
        const generator = watcherTenantsRequests();
        expect(generator.next().value).toEqual(takeLatest(GET_TENANTS, apiTenantsHandlerAsync));
    })

    it('should dispatch action "DELETE_TENANT" ', () => {
        const generator = watcherTenantDeleteRequests();
        expect(generator.next().value).toEqual(takeLatest(DELETE_TENANT, apiDeleteTenantHandlerAsync));
    })

    it('should dispatch action "GET_TENANTS_SUCCESS" with result from fetch News API', () => {
        const response = {
            data: {
                data: true,
            }
        }
        const generator = apiTenantsHandlerAsync();
        generator.next()
        expect(generator.next(response).value)
            .toEqual(put({ type: GET_TENANTS_SUCCESS, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "GET_TENANTS_FAILURE" with result from fetch News API', () => {
        const generator = apiTenantsHandlerAsync(mockAction);
        generator.next()
        expect(generator.throw(error).value).toEqual(errorHandler(error, GET_TENANTS_FAILURE))
    })

    it('should dispatch action "DELETE_TENANT_SUCCESS" with result from fetch News API', () => {
        const generator = apiDeleteTenantHandlerAsync(mockAction);
        generator.next()
        expect(generator.next().value).toEqual(put({ type: DELETE_TENANT_SUCCESS, response: "demoId" }))
    })

    it('should dispatch action "DELETE_TENANT_FAILURE" with result from fetch News API', () => {
        const generator = apiDeleteTenantHandlerAsync(mockAction);
        generator.next()
        expect(generator.throw(error).value).toEqual(
            errorHandler(error, DELETE_TENANT_FAILURE)
        )
    })
    
});