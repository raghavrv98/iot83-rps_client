// import { take, call, put, select } from 'redux-saga/effects';
import { getHeaders, errorHandler } from "../../utils/commonUtils";
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_MAPINGS, GET_MAPINGS_FAILURE, GET_MAPINGS_SUCCESS,
  GET_AGENT, GET_AGENT_SUCCESS, GET_AGENT_FAILURE,
  DELETE_MAPPING, DELETE_MAPPING_SUCCESS, DELETE_MAPPING_FAILURE,
  SAVE_MAPPINGS, SAVE_MAPPINGS_SUCCESS, SAVE_MAPPINGS_FAILURE,
  GET_PLANTLIST, GET_PLANTLIST_SUCCESS, GET_PLANTLIST_FAILURE,
  GET_PIPELINELIST, GET_PIPELINELIST_SUCCESS, GET_PIPELINELIST_FAILURE
} from './constants';

// Individual exports for testing


export function* apiGetMappingList(action) {
  const url = window.API_URL + `faas/api/v1/agents/${action.id}/mappings`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_MAPINGS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_MAPINGS_FAILURE);
  }
}

export function* apiGetAgent(action) {
  try {
    const url = window.API_URL + `faas/api/v1/agents/${action.id}`;
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_AGENT_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_AGENT_FAILURE);
  }
}

export function* apiDeleteMapping(action) {
  const url = window.API_URL + `faas/api/v1/agents/${action.id}/mappings/${action.mappingId}`;
  try {
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: DELETE_MAPPING_SUCCESS, response: action.id });
  } catch (error) {
    yield errorHandler(error, DELETE_MAPPING_FAILURE);
  }
}

export function* apiSaveMappings(action) {
  const url = window.API_URL + `faas/api/v1/agents/${action.id}/mappings`;
  try {
    const response = yield call(axios.put, url, action.payload, getHeaders());
    yield put({ type: SAVE_MAPPINGS_SUCCESS, response: action.id });
  } catch (error) {
    yield errorHandler(error, SAVE_MAPPINGS_FAILURE);
  }
}

export function* apiGetPlantList(action) {

  const url = window.API_URL + "faas/api/v1/plants";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PLANTLIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_PLANTLIST_FAILURE);
  }
}

export function* apiGetPipelineList(action) {

  const url = window.API_URL + "faas/api/v1/plants/all/pipelines";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PIPELINELIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_PIPELINELIST_FAILURE);
  }
}

export function* watcherAgentsRequests() {
  yield takeLatest(GET_MAPINGS, apiGetMappingList);
}

export function* watcherGetAgent() {
  yield takeLatest(GET_AGENT, apiGetAgent);
}

export function* watcherDeleteMapping() {
  yield takeLatest(DELETE_MAPPING, apiDeleteMapping);
}

export function* watcherSaveMappings() {
  yield takeLatest(SAVE_MAPPINGS, apiSaveMappings);
}

export function* watcherGetPlantList() {
  yield takeLatest(GET_PLANTLIST, apiGetPlantList);
}

export function* watcherGetPipelineList() {
  yield takeLatest(GET_PIPELINELIST, apiGetPipelineList);
}

export default function* rootSaga() {
  yield all([
    watcherAgentsRequests(),
    watcherGetAgent(),
    watcherDeleteMapping(),
    watcherSaveMappings(),
    watcherGetPlantList(),
    watcherGetPipelineList(),
  ]);
}