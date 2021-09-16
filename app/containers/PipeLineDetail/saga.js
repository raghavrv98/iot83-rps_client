import { GET_PIPELINES, GET_PIPELINES_SUCCESS, GET_PIPELINES_FAILURE, SAVE_DETAILS, SAVE_DETAILS_SUCCESS, SAVE_DETAILS_FAILURE, DELETE_DETAILS, DELETE_DETAILS_SUCCESS, DELETE_DETAILS_FAILURE } from "./constants";
import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { getHeaders, errorHandler} from "../../utils/commonUtils";


export function* apiGetPipelinesDetails(action) {
  try {
    const url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines/${action.pipelineId}/paginated/details`;
    const response = yield call(axios.post, url, action.payload ,getHeaders());
    yield put({ type: GET_PIPELINES_SUCCESS, response: response.data.data});
  } catch (error) {
    yield errorHandler(error, GET_PIPELINES_FAILURE);
  }
}

export function* apiSaveDetails(action) {
  const url = window.API_URL + `faas/api/v1/plants/${action.fileDetails.plantId}/pipelines/${action.fileDetails.pipelineId}/details`;
  let formdata = new FormData()
  formdata.append('file', action.fileDetails.data)
  try {
    const response = yield call(axios.post, url, formdata, getHeaders());
    yield put({ type: SAVE_DETAILS_SUCCESS, response: response.data.message });
  } catch (error) {
    yield errorHandler(error, SAVE_DETAILS_FAILURE);
  }
}

export function* apiDeleteDetails(action) {
  const url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines/${action.pipelineId}/details`;
  try {
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: DELETE_DETAILS_SUCCESS, response: action.pipelineId });
  } catch (error) {
    yield errorHandler(error, DELETE_DETAILS_FAILURE);
  }
}

export function* watcherGetPipelines() {
  yield takeLatest(GET_PIPELINES, apiGetPipelinesDetails);
}

export function* watcherSaveDetails() {
  yield takeLatest(SAVE_DETAILS, apiSaveDetails);
}

export function* watcherDeleteHandler() {
  yield takeLatest(DELETE_DETAILS, apiDeleteDetails);
}

export default function* rootSaga() {
  yield all([
    watcherGetPipelines(),
    watcherSaveDetails(),
    watcherDeleteHandler()
  ]);
}
