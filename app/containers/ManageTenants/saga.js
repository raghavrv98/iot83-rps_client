import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { GET_TENANTS, GET_TENANTS_SUCCESS, GET_TENANTS_FAILURE,DELETE_TENANT,DELETE_TENANT_FAILURE,DELETE_TENANT_SUCCESS } from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";


export function* apiTenantsHandlerAsync(action) {
    const url = window.API_URL + 'api/v1/accounts';
    try {
        const response = yield call(axios.get, url, getHeaders());
        yield put({ type: GET_TENANTS_SUCCESS, response: response.data.data });
    } catch (error) {
        yield errorHandler(error, GET_TENANTS_FAILURE);
    }
}

export function* apiDeleteTenantHandlerAsync(action) {
    try {
        const url = window.API_URL + 'api/v1/accounts/' + action.id;
        const response = yield call(axios.delete, url, getHeaders());
        yield put({ type: DELETE_TENANT_SUCCESS, response: action.id });
    } catch (error) {
        yield errorHandler(error, DELETE_TENANT_FAILURE);
    }
}

export function* watcherTenantsRequests() {
    yield takeLatest(GET_TENANTS, apiTenantsHandlerAsync);
}

export function* watcherTenantDeleteRequests() {
    yield takeLatest(DELETE_TENANT, apiDeleteTenantHandlerAsync);
}

export default function* rootSaga() {
    yield all([
        watcherTenantsRequests(),
        watcherTenantDeleteRequests()
    ]);
}