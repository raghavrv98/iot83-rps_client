import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { 
  ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, 
  ON_SUBMIT_REQUEST_FAILURE, GET_ROLE_DETAILS, 
  GET_ROLE_DETAILS_SUCCESS, GET_ROLE_DETAILS_FAILURE, 
  GET_PERMISSIONS, GET_PERMISSIONS_SUCCESS, 
  GET_PERMISSIONS_FAILURE, GET_ENTITLEMENTS, 
  GET_ENTITLEMENTS_FAILURE , GET_ENTITLEMENTS_SUCCESS
} from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";


export function* apiSubmitHandlerAsync(action) {
  let url = window.API_URL + 'api/v1/roles';
  try {
    if(action.id)
    url = url + '/' +action.id
    const response = yield call(action.id? axios.put:axios.post, url, action.payload, getHeaders());
    yield put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, ON_SUBMIT_REQUEST_FAILURE);
  }
}

export function* apiGetRoleDetailsHandlerAsync(action) {
  try {
    const url = window.API_URL + 'api/v1/roles/' + action.id;
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_ROLE_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_ROLE_DETAILS_FAILURE);
  }
}

export function* apiGetPermissions(action) {
  try {
    const url = window.API_URL + 'api/v1/permissions';
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PERMISSIONS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_PERMISSIONS_FAILURE);
  }
}

export function* apiGetEntitlements(action) {
  try {
    const url = window.API_URL + 'api/v1/entitlements';
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_ENTITLEMENTS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_ENTITLEMENTS_FAILURE);
  }
}

export function* watcherSubmitRequests() {
  yield takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync);
}

export function* watcherGetRoleDetails() {
  yield takeLatest(GET_ROLE_DETAILS, apiGetRoleDetailsHandlerAsync);
}

export function* watcherGetPermissions() {
  yield takeLatest(GET_PERMISSIONS, apiGetPermissions);
}

export function* watcherGetEntitlements() {
  yield takeLatest(GET_ENTITLEMENTS, apiGetEntitlements);
}

export default function* rootSaga() {
  yield all([
    watcherSubmitRequests(),
    watcherGetRoleDetails(),
    watcherGetPermissions(),
    watcherGetEntitlements()
  ]);
}