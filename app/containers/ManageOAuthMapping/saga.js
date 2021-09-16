import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_ROLES_LIST,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_FAILURE,
  GET_GROUPS_LIST,
  GET_GROUPS_LIST_SUCCESS,
  GET_GROUPS_LIST_FAILURE,
  GET_MAPPING_LIST,
  GET_MAPPING_LIST_SUCCESS,
  GET_MAPPING_LIST_FAILURE,
  SUBMIT_MAPPING_REQUEST,
  SUBMIT_MAPPING_REQUEST_SUCCESS,
  SUBMIT_MAPPING_REQUEST_FAILURE
} from './constants';
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* apiGetRolesListHandlerAsync(action) {
  try {
    let url = window.API_URL + 'api/v1/roles';
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_ROLES_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_ROLES_LIST_FAILURE);
  }
}

export function* apiGetGroupsListHandlerAsync(action) {
  try {
    let url = window.API_URL + 'api/v1/compartments';
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_GROUPS_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_GROUPS_LIST_FAILURE);
  }
}

export function* apiGetMappingListHandlerAsync(action) {
  try {
    let url = window.API_URL + 'api/v1/oauth2/mapping';
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_MAPPING_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_MAPPING_LIST_FAILURE);
  }
}

export function* apiSubmitMappingRequestHandlerAsync(action) {
  let url = window.API_URL + 'api/v1/oauth2/mapping';
  try {
    const response = yield call(axios.post, url, action.payload, getHeaders());
    yield put({ type: SUBMIT_MAPPING_REQUEST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, SUBMIT_MAPPING_REQUEST_FAILURE);
  }
}

export function* watcherGetRolesList() {
  yield takeLatest(GET_ROLES_LIST, apiGetRolesListHandlerAsync);
}

export function* watcherGetGroupsList() {
  yield takeLatest(GET_GROUPS_LIST, apiGetGroupsListHandlerAsync);
}

export function* watcherGetMappingList() {
  yield takeLatest(GET_MAPPING_LIST, apiGetMappingListHandlerAsync);
}

export function* watcherSubmitMappingRequest() {
  yield takeLatest(SUBMIT_MAPPING_REQUEST, apiSubmitMappingRequestHandlerAsync);
}


export default function* rootSaga() {
  yield all([
    watcherGetRolesList(),
    watcherGetGroupsList(),
    watcherGetMappingList(),
    watcherSubmitMappingRequest(),
  ]);
}