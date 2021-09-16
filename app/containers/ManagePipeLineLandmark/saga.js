import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { GET_LANDMARK_LIST, 
         GET_LANDMARK_LIST_SUCCESS, 
         GET_LANDMARK_LIST_FAILURE,
         LANDMARK_DELETE_REQUEST,
         LANDMARK_DELETE_SUCCESS,
        LANDMARK_DELETE_FAILURE  } from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";

export function*  apiLandmarkHandlerAsync(action) {
  const url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines/${action.pipelineId}/landmarks`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_LANDMARK_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_LANDMARK_LIST_FAILURE);
  }
}

export function*  apiLandmarkDeleteHandlerAsync(action) {
  const url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines/${action.pipelineId}/landmarks/${action.id}`;
  try {
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: LANDMARK_DELETE_SUCCESS, response: action.id});
  } catch (error) {
    yield errorHandler(error, LANDMARK_DELETE_FAILURE);
  }
}

export function* watcherLandmarkRequests() {
  yield takeLatest(GET_LANDMARK_LIST, apiLandmarkHandlerAsync);
}

export function* watcherLandmarkDeleteRequest() {
  yield takeLatest(LANDMARK_DELETE_REQUEST, apiLandmarkDeleteHandlerAsync);
}

export default function* managePipeLineLandmarkSaga() {
  yield all([
    watcherLandmarkRequests(), watcherLandmarkDeleteRequest(),
  ]);
}
