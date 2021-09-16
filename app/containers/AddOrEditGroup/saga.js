
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE, GET_GROUP_DETAILS, GET_GROUP_DETAILS_SUCCESS, GET_GROUP_DETAILS_FAILURE } from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";

export function* apiSubmitHandlerAsync(action) {
  let url = window.API_URL + 'api/v1/compartments';
  try {
    if(action.id)
    url = url + '/' +action.id
    const response = yield call(action.id? axios.put:axios.post, url, action.payload, getHeaders());
    yield put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, ON_SUBMIT_REQUEST_FAILURE);
  }
}

export function* apiGetGroupDetailsHandlerAsync(action) {
  try {
    let url = window.API_URL + 'api/v1/compartments/' + action.id;
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_GROUP_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_GROUP_DETAILS_FAILURE);
  }
}

export function* watcherSubmitRequests() {
  yield takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync);
}

export function* watcherGetGroupDetails() {
  yield takeLatest(GET_GROUP_DETAILS, apiGetGroupDetailsHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherSubmitRequests(),
    watcherGetGroupDetails()
  ]);
}