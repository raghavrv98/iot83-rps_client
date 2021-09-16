import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { getHeaders, errorHandler} from "../../utils/commonUtils";
import { 
          GET_NAVIGATION,
          GET_NAVIGATION_SUCCESS, 
          GET_NAVIGATION_FAILURE, 
          GET_VERSION, 
          GET_VERSION_FAILURE, 
          GET_VERSION_SUCCESS
      } from './constants';

export function* apiNavHandler(action) {
  try {
    let url = window.API_URL + 'api/v1/nav';
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_NAVIGATION_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_NAVIGATION_FAILURE);
  }
}

export function* apiVersionHandler(action) {
  try {
    let url = window.API_URL + 'api/public/version';
    let headers = {
      "Content-Type": "application/json",
      "X-TENANT-ID": localStorage.tenant
    }
    const response = yield call(axios.get, url, headers);
    yield put({
      type: GET_VERSION_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_VERSION_FAILURE);
  }
}

export function* watcherGetNav() {
  yield takeLatest(GET_NAVIGATION, apiNavHandler);
}

export function* watcherGetVersion() {
  yield takeLatest(GET_VERSION, apiVersionHandler);
}

export default function* rootSaga() {
  yield all([
    watcherGetNav(),watcherGetVersion()
  ]);
}