// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import { getHeaders, errorHandler } from "../../utils/commonUtils";
import {
  ON_SUBMIT_REQUEST,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  GET_PIPELINE_REQUEST,
  GET_PIPELINE_REQUEST_SUCCESS,
  GET_PIPELINE_REQUEST_FAILURE
} from "./constants";
// Individual exports for testing
export function* addOrEditPipeLineSaga(action) {
  let url = window.API_URL + "faas/api/v1/plants";
  url = url + "/" + action.id + "/pipelines";
  if (action.pipelineId) url = url + "/" + action.pipelineId;

  try {
    const response = yield call(
      action.pipelineId ? axios.put : axios.post,
      url,
      action.payload,
      getHeaders()
    );
    yield put({
      type: ON_SUBMIT_REQUEST_SUCCESS,
      response: response.data.message
    });
  } catch (error) {
    yield errorHandler(error, ON_SUBMIT_REQUEST_FAILURE);
  }
}

export function* apiGetPipelineDetailsHandlerAsync(action) {
  try {
    let url = window.API_URL + "faas/api/v1/plants";
    url = url + "/" + action.id + "/pipelines/" + action.pipelineId;
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_PIPELINE_REQUEST_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_PIPELINE_REQUEST_FAILURE);
  }
}
export function* watcherSubmitRequests() {
  yield takeLatest(ON_SUBMIT_REQUEST, addOrEditPipeLineSaga);
}
export function* watcherGetPipelineDetails() {
  yield takeLatest(GET_PIPELINE_REQUEST, apiGetPipelineDetailsHandlerAsync);
}
export default function* rootSaga() {
  yield all([watcherSubmitRequests(), watcherGetPipelineDetails()]);
}
