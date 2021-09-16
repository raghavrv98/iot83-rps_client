import { call, put, takeLatest, all} from "redux-saga/effects";
import axios from "axios";
import {
  GET_ZONE_LIST,
  GET_ZONE_LIST_SUCCESS,
  GET_ZONE_LIST_FAILURE,
  ZONE_DELETE,
  ZONE_DELETE_SUCCESS,
  ZONE_DELETE_FAILURE
} from "./constants";
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* getmanageZonesSaga(action) {
  const url = window.API_URL + "faas/api/v1/plants/" + action.plantId + "/pipelines/" + action.pipelineId + "/ehtZones";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_ZONE_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_ZONE_LIST_FAILURE);
  }
}

export function* apiDeleteZone(action) {
  let url = window.API_URL + "faas/api/v1/plants/" + action.plantId + "/pipelines/" + action.pipelineId + '/ehtZones';
  
  if(!action.multiple){
   url = url +'/'+ action.zoneId
  }

  try {
    let response = yield call(axios.delete, url, getHeaders());
    response = action.multiple ? "multiple" : action.zoneId
    yield put({ type: ZONE_DELETE_SUCCESS, response });
  } catch (error) {
    yield errorHandler(error, ZONE_DELETE_FAILURE);
  }
}

export function* watcherGetmanageZonesSaga() {
  yield takeLatest(GET_ZONE_LIST, getmanageZonesSaga);
}
export function* watcherapiDeleteZone() {
  yield takeLatest(ZONE_DELETE, apiDeleteZone);
}

export default function* rootSaga() {
  yield all([watcherGetmanageZonesSaga(), watcherapiDeleteZone()]);
}
