import { call, put, takeLatest ,all} from "redux-saga/effects";
import axios from "axios";
import { getHeaders, errorHandler } from "../../utils/commonUtils";

import {
  ON_SUBMIT_REQUEST,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  GET_ZONE_DETAILS,
  GET_ZONE_DETAILS_SUCCESS,
  GET_ZONE_DETAILS_FAILURE
} from "./constants";

export function* addOrEditZoneSaga(action) {
  let url = window.API_URL + "faas/api/v1/plants/" + action.plantId + "/pipelines/" + action.pipelineId + "/sensors";
  if(action.isBulkUpload)
    url = window.API_URL + "faas/api/v1/plants/" + action.plantId + "/pipelines/" + action.pipelineId + "/bulk/sensors"
  if (action.zoneId) 
    url = url + "/" + action.zoneId;
  try {
    const response = yield call(action.zoneId ? axios.put : axios.post,  url, action.payload, getHeaders());
    yield put({
      type: ON_SUBMIT_REQUEST_SUCCESS,
      response: response.data.message
    });
  } catch (error) {
    yield errorHandler(error, ON_SUBMIT_REQUEST_FAILURE);
  }
}

export function* apiGetZoneDetailsHandlerAsync(action) {
  try {
    let url = window.API_URL + "faas/api/v1/plants" + "/" + action.plantId + "/pipelines/" + action.pipelineId + "/sensors/"+ action.zoneId;
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_ZONE_DETAILS_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_ZONE_DETAILS_FAILURE);
  }
}

export function* watcherAddOrEditZoneSaga() {
  yield takeLatest(ON_SUBMIT_REQUEST, addOrEditZoneSaga);
}
export function* watcherGetDetailsZoneSaga() {
  yield takeLatest(GET_ZONE_DETAILS, apiGetZoneDetailsHandlerAsync);
}
export default function* rootSaga() {
  yield all([watcherAddOrEditZoneSaga(), watcherGetDetailsZoneSaga()]);
}



