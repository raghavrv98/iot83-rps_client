import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_SEGMENT_DATA,
  GET_SEGMENT_DATA_SUCCESS,
  GET_SEGMENT_DATA_FAILURE,
  GET_CHART_DATA,
  GET_CHART_REQUEST_SUCCESS,
  GET_CHART_REQUEST_FAILURE,
  GET_PLANT_LIST,
  GET_PLANT_LIST_SUCCESS,
  GET_PLANT_LIST_FAILURE,
  GET_PIPELINE_DETAILS,
  GET_PIPELINE_DETAILS_SUCCESS,
  GET_PIPELINE_DETAILS_FAILURE,
  GET_ATTRIBUTES,
  GET_ATTRIBUTES_SUCCESS,
  GET_ATTRIBUTES_FAILURE
} from './constants';
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* apiGetSegmentDataHandlerAsync(action) {
  try {
    const url = window.API_URL + 'faas/api/v1/plants/' + action.plantId + '/pipelines/' + action.pipelineId + '/analystDashboard';
    const response = yield call(axios.post, url, action.sendingObject, getHeaders());
    yield put({ type: GET_SEGMENT_DATA_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_SEGMENT_DATA_FAILURE);
  }
}

export function* apiGetChartDetailsHandlerAsync(action) {
  try {
    let url = window.API_URL + "faas/api/v1/plants" + "/" + action.plantId + "/pipelines/" + action.pipelineId + "/distances/" + action.distance + "/history";
    const response = yield call(axios.post, url, action.selectedAttribute, getHeaders());
    yield put({
      type: GET_CHART_REQUEST_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_CHART_REQUEST_FAILURE);
  }
}

export function* apiGetPlantList(action) {
  try {
    let url = window.API_URL + "faas/api/v1/plants";
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PLANT_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_PLANT_LIST_FAILURE);
  }
}

export function* apiGetPipelines(action) {
  try {
    let url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines?gauge=true`;
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PIPELINE_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_PIPELINE_DETAILS_FAILURE);
  }
}

export function* apiGetAttributes(action) {
  try {
    let url = window.API_URL + `faas/api/v1/plants/${action.plant}/pipelines/${action.pipeline}/attributes`;
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_ATTRIBUTES_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_ATTRIBUTES_FAILURE);
  }
}

export function* watcherGetSegmentData() {
  yield takeLatest(GET_SEGMENT_DATA, apiGetSegmentDataHandlerAsync);
}

export function* watcherGetChartDetails() {
  yield takeLatest(GET_CHART_DATA, apiGetChartDetailsHandlerAsync);
}

export function* watcherGetPlantList() {
  yield takeLatest(GET_PLANT_LIST, apiGetPlantList);
}

export function* watcherFetchPipeline() {
  yield takeLatest(GET_PIPELINE_DETAILS, apiGetPipelines);
}

export function* watcherGetAttributes() {
  yield takeLatest(GET_ATTRIBUTES, apiGetAttributes);
}

export default function* rootSaga() {
  yield all([
    watcherGetSegmentData(),
    watcherGetChartDetails(),
    watcherGetPlantList(),
    watcherFetchPipeline(),
    watcherGetAttributes()
  ]);
}
