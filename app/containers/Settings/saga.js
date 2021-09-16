import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import {
  GENERATE_KEY_REQUEST, GENERATE_KEY_SUCCESS, GENERATE_KEY_FAILURE,
  SECRET_KEY_REQUEST, SECRET_KEY_SUCCESS, SECRET_KEY_FAILURE,
  SECRET_STATUS_REQUEST, SECRET_STATUS_SUCCESS, SECRET_STATUS_FAILURE,
  ACCOUNT_DETAILS_REQUEST, ACCOUNT_DETAILS_SUCCESS, ACCOUNT_DETAILS_FAILURE,
  DELETE_SECRET_KEY,DELETE_SECRET_KEY_FAILURE,DELETE_SECRET_KEY_SUCCESS,
  GET_PIPELINE_CONFIG_REQUEST, GET_PIPELINE_CONFIG_SUCCESS, GET_PIPELINE_CONFIG_FAILURE, 
  SUBMIT_CONFIG_DETAILS, SUBMIT_CONFIG_DETAILS_SUCCESS, SUBMIT_CONFIG_DETAILS_FAILURE,
  GET_LICENCE, GET_LICENCE_SUCCESS, GET_LICENCE_FAILURE,
  GET_SETTINGTABS, GET_SETTINGTABS_SUCCESS, GET_SETTINGTABS_FAILURE,
  LICENSE_KEY_DETAILS, LICENSE_KEY_DETAILS_SUCCESS, LICENSE_KEY_DETAILS_FAILURE
} from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";


export function* apiGenerateKeyHandlerAsync(action) {
  const url = window.API_URL + 'api/v1/secrets';
  try {
    const payload = action.payload;
    const response = yield call(axios.post, url, payload, getHeaders());
    yield put({ type: GENERATE_KEY_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GENERATE_KEY_FAILURE);
  }
}

export function* apiGetSecretKeyHandlerAsync(action) {
  const url = window.API_URL + 'api/v1/secrets';
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: SECRET_KEY_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, SECRET_KEY_FAILURE);
  }
}

export function* apiSecretKeyStatusChangeHandlerAsync(action) {
  try {
    const url = `${window.API_URL}api/v1/secrets/${action.id}?status=${action.status}`;
    const response = yield call(axios.patch, url, {}, getHeaders());
    yield put({ type: SECRET_STATUS_SUCCESS, response: {id: action.id, status: action.status} });
  } catch (error) {
    yield errorHandler(error, SECRET_STATUS_FAILURE);
  }
}

export function* apiAccountDetailsHandlerAsync(action) {
  const url = `${window.API_URL}api/v1/accounts/details`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: ACCOUNT_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, ACCOUNT_DETAILS_FAILURE);
  }
}

export function* apiPipelineConfigHandlerAsync(action) {
  try {
    const url = `${window.API_URL}faas/api/v1/configs?type=${action.configType}`;
    const response = yield call(axios.get, url, getHeaders());
    yield put({ 
      type: GET_PIPELINE_CONFIG_SUCCESS, 
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_PIPELINE_CONFIG_FAILURE);
  }
}

export function* apiDeleteSecretKeyHandler(action) {
  try {
    const url = `${window.API_URL}api/v1/secrets/${action.id}`
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: DELETE_SECRET_KEY_SUCCESS, response: action.id });
  } catch (error) {
    yield errorHandler(error, DELETE_SECRET_KEY_FAILURE);
  }
}

export function* apiSubmitConfigDetailsHandler(action) {
  try {
    const payload = action.payload
    const url = `${window.API_URL}faas/api/v1/configs`
    const response = yield call(axios.put, url, payload, getHeaders());
    yield put({ type: SUBMIT_CONFIG_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, SUBMIT_CONFIG_DETAILS_FAILURE);
  }
}

export function* apiLicenseDetailsDetailsHandler(action) {
  try {
    let payload = {licenseKey : action.licenseKey}
    const url = `${window.API_URL}api/v1/platform/license/install`
    const response = yield call(axios.post, url, payload, getHeaders());
    yield put({ type: LICENSE_KEY_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, LICENSE_KEY_DETAILS_FAILURE);
  }
}

export function* apiGetLicenceInfoHandler(action) {
  try {
    let url = window.API_URL + 'api/v1/platform/license';
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_LICENCE_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_LICENCE_FAILURE);
  }
}

export function* apiGetSettingTabsInfoHandler(action) {
  try {
    let url = window.API_URL + 'api/v1/settings/tabs';
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_SETTINGTABS_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_SETTINGTABS_FAILURE);
  }
}


export function* watcherGenerateKeyRequests() {
  yield takeLatest(GENERATE_KEY_REQUEST, apiGenerateKeyHandlerAsync);
}

export function* watcherGetSecretKeyRequests() {
  yield takeLatest(SECRET_KEY_REQUEST, apiGetSecretKeyHandlerAsync);
}

export function* watcherSecretKeyStatusChangeRequest() {
  yield takeLatest(SECRET_STATUS_REQUEST, apiSecretKeyStatusChangeHandlerAsync);
}

export function* watcherAccountDetailsRequest() {
  yield takeLatest(ACCOUNT_DETAILS_REQUEST, apiAccountDetailsHandlerAsync);
}

export function* watcherDeleteSecretKey() {
  yield takeLatest(DELETE_SECRET_KEY, apiDeleteSecretKeyHandler);
}

export function* watcherSubmitConfigDetails() {
  yield takeLatest(SUBMIT_CONFIG_DETAILS, apiSubmitConfigDetailsHandler);
}

export function* watcherSubmitLicenseKey() {
  yield takeLatest(LICENSE_KEY_DETAILS, apiLicenseDetailsDetailsHandler);
}

export function* watcherPipelineConfigRequest() {
  yield takeLatest(GET_PIPELINE_CONFIG_REQUEST, apiPipelineConfigHandlerAsync);
}

export function* watcherGetLicence() {
  yield takeLatest(GET_LICENCE, apiGetLicenceInfoHandler);
}

export function* watcherGetSettingTabsRequest() {
  yield takeLatest(GET_SETTINGTABS, apiGetSettingTabsInfoHandler);
}

export default function* rootSaga() {
  yield all([
    watcherGenerateKeyRequests(),
    watcherGetSecretKeyRequests(),
    watcherSecretKeyStatusChangeRequest(),
    watcherAccountDetailsRequest(),
    watcherPipelineConfigRequest(),
    watcherDeleteSecretKey(),
    watcherSubmitConfigDetails(),
    watcherGetLicence(),
    watcherGetSettingTabsRequest(),
    watcherSubmitLicenseKey()
  ]);
}