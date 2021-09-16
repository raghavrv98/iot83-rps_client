import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  GET_LOGS_LIST,
  GET_LOGS_LIST_SUCCESS,
  GET_LOGS_LIST_FAILURE,
  GENERATE_LOGS,
  GENERATE_LOGS_SUCCESS,
  GENERATE_LOGS_FAILURE
} from "./constants";
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* apiGetLogsList(action) {
  const url = window.API_URL + "api/public/static/logs";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_LOGS_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_LOGS_LIST_FAILURE);
  }
}

export function* apiGenerateLogs(action) {
  const url = window.API_URL + "api/v1/platform/logs";
  try {
    const response = yield call(axios.post, url, action.payload, getHeaders());
    yield put({ type: GENERATE_LOGS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GENERATE_LOGS_FAILURE);
  }
}

export function* watcherGetLogsList() {
  yield takeLatest(GET_LOGS_LIST, apiGetLogsList);
}

export function* watcherGenerateLogs() {
  yield takeLatest(GENERATE_LOGS, apiGenerateLogs);
}

export default function* rootSaga() {
  yield all([watcherGetLogsList(), watcherGenerateLogs()]);
}
