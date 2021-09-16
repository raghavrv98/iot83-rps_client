
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE, GET_PLANS_LIST, GET_PLANS_LIST_SUCCESS, GET_PLANS_LIST_FAILURE
} from './constants';
import { getHeaders, errorHandler } from "../../utils/commonUtils";


export function* apiSubmitHandlerAsync(action) {
  let url = window.API_URL + 'faas/api/v1/license';
  try {
    const response = yield call(axios.post, url, action.payload, getHeaders());
    yield put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, ON_SUBMIT_REQUEST_FAILURE);
  }
}

export function* apiGetHandlerAsync(action) {
  let url = window.API_URL + "api/v1/platform/license/plan?type=paid";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PLANS_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_PLANS_LIST_FAILURE);
  }
}

export function* watcherSubmitRequests() {
  yield takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync);
}

export function* watcherGetRequests() {
  yield takeLatest(GET_PLANS_LIST, apiGetHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherSubmitRequests(),
    watcherGetRequests(),
  ]);
}