import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  GET_PLANTLIST,
  GET_PLANTLIST_SUCCESS,
  GET_PLANTLIST_FAILURE,
  GET_PIPELINELIST,
  GET_PIPELINELIST_SUCCESS,
  GET_PIPELINELIST_FAILURE,
  GET_ALARM_TYPE,
  GET_ALARM_TYPE_SUCCESS,
  GET_ALARM_TYPE_FAILURE,
  GET_FILTERED_DATA,
  GET_FILTERED_DATA_SUCCESS,
  GET_FILTERED_DATA_FAILURE,
  ALARM_STATUS_CHANGE,
  ALARM_STATUS_CHANGE_SUCCESS,
  ALARM_STATUS_CHANGE_FAILURE,
  GET_ALARM_DETAILS,
  GET_ALARM_DETAILS_SUCCESS,
  GET_ALARM_DETAILS_FAILURE,
  GET_ALARM_CATEGORY,
  GET_ALARM_CATEGORY_SUCCESS,
  GET_ALARM_CATEGORY_FAILURE
} from "./constants";
import { getHeaders, errorHandler } from "../../utils/commonUtils";

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

export function* getAlarmType(action) {
  const url = window.API_URL + `api/v1/platform/alarms/types`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_ALARM_TYPE_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_ALARM_TYPE_FAILURE);
  }
}

export function* getAlarmCategory(action) {
  const url = window.API_URL + `api/v1/platform/alarms/categories`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_ALARM_CATEGORY_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_ALARM_CATEGORY_FAILURE);
  }
}

export function* getFilterData(action) {
  let url = window.API_URL + `api/v1/platform/plants/${action.plantId}/alarms/list`;
  let payload = {
    category: action.filters.category,
    order: action.filters.order,
    sortBy: action.filters.sortBy,
    status: action.filters.status,
    type: action.filters.type,
    limit: action.limit,
    offset: action.offset,
    pipelineId: action.pipelineId
  }
  try {
    const response = yield call(axios.post, url, payload, getHeaders());

    yield put({
      type: GET_FILTERED_DATA_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_FILTERED_DATA_FAILURE);
  }
}

export function* apiAlarmStatusChangeHandler(action) {
  const url = window.API_URL + `api/v1/platform/plants/${action.plantId}/alarms/${action.seqId}`;
  try {
    const response = yield call(axios.put, url, action.payload, getHeaders())
    yield put({ type: ALARM_STATUS_CHANGE_SUCCESS, response: action.seqId });
  } catch (error) {
    yield errorHandler(error, ALARM_STATUS_CHANGE_FAILURE);
  }
}

export function* apiAlarmDetails(action) {
  const url = window.API_URL + `api/v1/platform/plants/${action.plantId}/alarms/${action.seqId}`;
  try {
    const response = yield call(axios.get, url, getHeaders())
    yield put({ type: GET_ALARM_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_ALARM_DETAILS_FAILURE);
  }
}

export function* watcherGetPlantList() {
  yield takeLatest(GET_PLANTLIST, apiGetPlantList);
}
export function* watcherGetPipelineList() {
  yield takeLatest(GET_PIPELINELIST, apiGetPipelineList);
}
export function* watcherGetAlarmType() {
  yield takeLatest(GET_ALARM_TYPE, getAlarmType);
}
export function* watcherGetAlarmCategory() {
  yield takeLatest(GET_ALARM_CATEGORY, getAlarmCategory);
}
export function* watcherFilterType() {
  yield takeLatest(GET_FILTERED_DATA, getFilterData);
}
export function* watcherAlarmStatusChange() {
  yield takeLatest(ALARM_STATUS_CHANGE, apiAlarmStatusChangeHandler);
}
export function* watcherGetAlarmDetails() {
  yield takeLatest(GET_ALARM_DETAILS, apiAlarmDetails);
}
export default function* rootSaga() {
  yield all([
    watcherGetPlantList(),
    watcherGetPipelineList(),
    watcherGetAlarmType(),
    watcherGetAlarmCategory(),
    watcherFilterType(),
    watcherAlarmStatusChange(),
    watcherGetAlarmDetails()
  ]);
}
