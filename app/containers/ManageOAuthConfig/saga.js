import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_AUTH_CONFIG_DETAILS,
  GET_AUTH_CONFIG_DETAILS_SUCCESS,
  GET_AUTH_CONFIG_DETAILS_FAILURE,
  SUBMIT_REQUEST,
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_FAILURE,
  DELETE_CONFIG,
  DELETE_CONFIG_SUCCESS,
  DELETE_CONFIG_FAILURE

} from './constants';
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* apiGetAuthConfigDetailsHandlerAsync(action) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "isSecure": true,
      "apiKey": 'cG1tcC1hdXRoby1zZWNyZXRrZXk'
    }
    let url = window.API_URL + 'api/public/oauth2/config';
    const response = yield call(axios.get, url, { headers });
    yield put({ type: GET_AUTH_CONFIG_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_AUTH_CONFIG_DETAILS_FAILURE);
  }
}

export function* apiSubmitRequestHandlerAsync(action) {
  let url = window.API_URL + 'api/v1/oauth2/config';
  try {
    const response = yield call(axios.post, url, action.payload, getHeaders());
    yield put({ type: SUBMIT_REQUEST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, SUBMIT_REQUEST_FAILURE);
  }
}

export function* apiDeleteConfigHandlerAsync(action) {
  const url = window.API_URL + 'api/v1/oauth2/config/' + action.id;
  try {
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: DELETE_CONFIG_SUCCESS, response: action.id });
  } catch (error) {
    yield errorHandler(error, DELETE_CONFIG_FAILURE);
  }
}


export function* watcherGetAuthConfigDetails() {
  yield takeLatest(GET_AUTH_CONFIG_DETAILS, apiGetAuthConfigDetailsHandlerAsync);
}

export function* watcherSubmitRequest() {
  yield takeLatest(SUBMIT_REQUEST, apiSubmitRequestHandlerAsync);
}

export function* watcherDeleteConfig() {
  yield takeLatest(DELETE_CONFIG, apiDeleteConfigHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherGetAuthConfigDetails(),
    watcherSubmitRequest(),
    watcherDeleteConfig(),
  ]);
}