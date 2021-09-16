import { call, put, takeLatest ,all} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_MEASUREMENT_LIST, MEASUREMENT_LIST_SUCCESS, MEASUREMENT_LIST_FAILURE, 
  PROCESS_MEASUREMENT, PROCESS_MEASUREMENT_SUCCESS, PROCESS_MEASUREMENT_FAILURE
} from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";

export function* apiGetMeasurementsAgentsHandlerAsync(action) {
  const url = window.API_URL + `faas/api/v1/agents/${action.id}/measurements?limit=${action.measurementCount}&offset=${action.offset}`
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: MEASUREMENT_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, MEASUREMENT_LIST_FAILURE);
  }
}

export function* apiMeasurementProcess(action) {
  const url = window.API_URL + 'api/v1/platform/triggers/MMTrigger';
  try {
    const payload = {
      measurementId: action.measureId,
      agentId: action.agentId,
    };
    const response = yield call(axios.post, url, payload, getHeaders());
    yield put({ type: PROCESS_MEASUREMENT_SUCCESS, response: "Measurement Mapping has been triggered"});
  } catch (error) {
    yield errorHandler(error, PROCESS_MEASUREMENT_FAILURE);
  }
}

export function* watcherGetMeasurementsRequests() {
  yield takeLatest(GET_MEASUREMENT_LIST, apiGetMeasurementsAgentsHandlerAsync);
}

export function* watcherMeasurementProcess() {
  yield takeLatest(PROCESS_MEASUREMENT, apiMeasurementProcess);
}

export default function* rootSaga() {
  yield all([
    watcherGetMeasurementsRequests(),
    watcherMeasurementProcess()
  ]);
}