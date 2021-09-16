
import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { GET_LICENSE_LIST, 
         GET_LICENSE_LIST_SUCCESS, 
         GET_LICENSE_LIST_FAILURE, 
         LICENSE_DELETE_REQUEST, 
         LICENSE_DELETE_REQUEST_SUCCESS,
         LICENSE_DELETE_REQUEST_FAILURE } from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";


export function* apiLicenseHandlerAsync(action) {
  const url = window.API_URL + 'api/v1/platform/license';
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_LICENSE_LIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_LICENSE_LIST_FAILURE);
  }
}

export function* apiLicenseDeleteHandlerAsync(action) {
  const url = window.API_URL + 'faas/api/v1/license/' + action.id;
  try {
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: LICENSE_DELETE_REQUEST_SUCCESS, response: action.id });
  } catch (error) {
    yield errorHandler(error, LICENSE_DELETE_REQUEST_FAILURE);
  }
}

export function* watcherLicenseRequests() {
  yield takeLatest(GET_LICENSE_LIST, apiLicenseHandlerAsync);
}

export function* watcherLicenseDeleteRequests() {
  yield takeLatest(LICENSE_DELETE_REQUEST, apiLicenseDeleteHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherLicenseRequests(),
    watcherLicenseDeleteRequests()
  ]);
}

