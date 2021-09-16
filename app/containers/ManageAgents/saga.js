import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_AGENTS,
  GET_AGENTS_SUCCESS,
  GET_AGENTS_FAILURE,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAILURE,
  AGENT_UPDATE_kEY,
  AGENT_UPDATE_kEY_SUCCESS,
  AGENT_UPDATE_kEY_FAILURE,
  GET_COMPARISON_DETAILS,
  GET_COMPARISON_DETAILS_SUCCESS,
  GET_COMPARISON_DETAILS_FAILURE,
  SAVE_TO_RPS_REQUEST,
  SAVE_TO_RPS_REQUEST_SUCCESS,
  SAVE_TO_RPS_REQUEST_FAILURE,
  PUBLISH_TO_DTS_REQUEST,
  PUBLISH_TO_DTS_REQUEST_SUCCESS,
  PUBLISH_TO_DTS_REQUEST_FAILURE
} from './constants';
import { getHeaders, errorHandler } from "../../utils/commonUtils";


export function* apiAgentsHandlerAsync(action) {
  const url = window.API_URL + 'faas/api/v1/agents';
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_AGENTS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_AGENTS_FAILURE);
  }
}

export function* apiDeleteRequestHandlerAsync(action) {
  const url = window.API_URL + 'faas/api/v1/agents/' + action.id;
  try {
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: DELETE_REQUEST_SUCCESS, response: action.id });
  } catch (error) {
    yield errorHandler(error, DELETE_REQUEST_FAILURE);
  }
}

export function* apiGetComparisonRequestHandlerAsync(action) {
  const url = window.API_URL + `faas/api/v1/agents/${action.id}?dts=true`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_COMPARISON_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_COMPARISON_DETAILS_FAILURE);
  }
}


export function* apiAgentActiveDeactiveKeyHandlerAsync(action) {
  try {
    let payload = {
      active: action.status
    };
    const url = `${window.API_URL}faas/api/v1/agents/${action.id}`;
    const response = yield call(axios.put, url, payload, getHeaders());
    yield put({ type: AGENT_UPDATE_kEY_SUCCESS, response: { id: action.id, status: action.status } });
  } catch (error) {
    yield errorHandler(error, AGENT_UPDATE_kEY_FAILURE);
  }
}

export function* apiSaveToRPSHandlerAsync(action) {
  try {
    const url = `${window.API_URL}faas/api/v1/agents/${action.id}`;
    const response = yield call(axios.put, url, action.payload, getHeaders());
    yield put({ type: SAVE_TO_RPS_REQUEST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, SAVE_TO_RPS_REQUEST_FAILURE);
  }
}

export function* apiPublishToDTSHandlerAsync(action) {
  try {
    const url = `${window.API_URL}faas/api/v1/agents/${action.id}/config`;
    const response = yield call(axios.put, url, action.payload, getHeaders());
    yield put({ type: PUBLISH_TO_DTS_REQUEST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, PUBLISH_TO_DTS_REQUEST_FAILURE);
  }
}
export function* watcherAgentsRequests() {
  yield takeLatest(GET_AGENTS, apiAgentsHandlerAsync);
}

export function* watcherDeleteRequests() {
  yield takeLatest(DELETE_REQUEST, apiDeleteRequestHandlerAsync);
}

export function* watcherAgentActiveDeactiveKey() {
  yield takeLatest(AGENT_UPDATE_kEY, apiAgentActiveDeactiveKeyHandlerAsync);
}

export function* watcherComparisonDetails() {
  yield takeLatest(GET_COMPARISON_DETAILS, apiGetComparisonRequestHandlerAsync);
}

export function* watcherSaveToRPS() {
  yield takeLatest(SAVE_TO_RPS_REQUEST, apiSaveToRPSHandlerAsync);
}

export function* watcherPublishToDTS() {
  yield takeLatest(PUBLISH_TO_DTS_REQUEST, apiPublishToDTSHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherAgentsRequests(),
    watcherDeleteRequests(),
    watcherAgentActiveDeactiveKey(),
    watcherSaveToRPS(),
    watcherComparisonDetails(),
    watcherPublishToDTS(),
  ]);
}