
import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { 
  LOGIN_API_REQUEST, 
  LOGIN_API_SUCCESS, 
  LOGIN_API_FAILURE,
  RESET_PASSWORD_API_REQUEST, 
  RESET_PASSWORD_API_SUCCESS, 
  RESET_PASSWORD_API_FAILURE,
  GET_AUTH_CONFIG_DETAILS, 
  GET_AUTH_CONFIG_DETAILS_SUCCESS, 
  GET_AUTH_CONFIG_DETAILS_FAILURE,
  GET_LOGIN_TOKEN
 } from './constants';
 import { errorHandler} from "../../utils/commonUtils";
 
export function* apiLoginHandlerAsync(action) {
  const url = window.API_URL + 'api/v1/login';
  try {
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-TENANT-ID': action.tenant
    }
    const response = yield call(axios.post, url, action.payload, { headers });
    localStorage.tenant = action.tenant
    yield put({ type: LOGIN_API_SUCCESS, response: response.data.data });
  } catch (error) {
    if (error.response) {
      yield put({ type: LOGIN_API_FAILURE, error: error.response.data.message });
    } else {
      yield put({ type: LOGIN_API_FAILURE, error: error.message ? error.message : error });
    }
  }
}

export function* apiResetPasswordHandlerAsync(action) {
  const url = window.API_URL + 'api/public/users/resetPassword';
  try {
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-TENANT-ID': action.tenant
    }
    const response = yield call(axios.post, url, action.payload, { headers });
    localStorage.tenant = action.tenant
    yield put({ type: RESET_PASSWORD_API_SUCCESS, response: response.data.data });
  } catch (error) {
    if (error.response) {
      yield put({ type: RESET_PASSWORD_API_FAILURE, error: error.response.data.message });
    } else {
      yield put({ type: RESET_PASSWORD_API_FAILURE, error: error.message ? error.message : error });
    }
  }
}

export function* apiGetAuthConfigDetailsHandlerAsync(action) {
  try {
    const headers = {
      "isSecure" : true,
      "apiKey" : 'cG1tcC1hdXRoby1zZWNyZXRrZXk'
    }
    let url = window.API_URL + 'api/public/oauth2/config';
    const response = yield call(axios.get, url, {headers});
    yield put({ type: GET_AUTH_CONFIG_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_AUTH_CONFIG_DETAILS_FAILURE);
  }
}

export function* apiGetLoginTokenHandlerAsync(action) {
  try {
    const headers = {
      "isSecure" : true,
      "apiKey" : 'cG1tcC1hdXRoby1zZWNyZXRrZXk'
    }
    let url = window.API_URL + 'api/public/oauth2/token?code='+action.code+'&state='+action.state;
    const response = yield call(axios.get, url, {headers});
    localStorage.tenant = response.data.data.tenant;
    yield put({ type: LOGIN_API_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_AUTH_CONFIG_DETAILS_FAILURE);
  }
}


export function* watcherLoginRequests() {
  yield takeLatest(LOGIN_API_REQUEST, apiLoginHandlerAsync);
}

export function* watcherResetPasswordRequests() {
  yield takeLatest(RESET_PASSWORD_API_REQUEST, apiResetPasswordHandlerAsync);
}

export function* watcherGetAuthConfigDetails() {
  yield takeLatest(GET_AUTH_CONFIG_DETAILS, apiGetAuthConfigDetailsHandlerAsync);
}

export function* watcherGetLoginToken() {
  yield takeLatest(GET_LOGIN_TOKEN, apiGetLoginTokenHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherLoginRequests(),
    watcherResetPasswordRequests(),
    watcherGetAuthConfigDetails(),
    watcherGetLoginToken()
  ]);
}
