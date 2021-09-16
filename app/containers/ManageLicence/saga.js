import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { GET_PLANS, GET_PLANS_SUCCESS, GET_PLANS_FAILURE,
GET_SUBMIT_REQUEST,GET_SUBMIT_REQUEST_SUCCESS,GET_SUBMIT_REQUEST_FAILURE,
LICENSE_KEY_DETAILS, LICENSE_KEY_DETAILS_SUCCESS, LICENSE_KEY_DETAILS_FAILURE } from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";

export function* apiGetPlansRequestHandler() {
  const url = window.API_URL + "api/v1/platform/license/plan";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PLANS_SUCCESS, response: response.data.data });
  } catch (error) {
      yield errorHandler(error, GET_PLANS_FAILURE);
  }
}

export function* apiGetSubmitRequestHandler(action) {
  const url = window.API_URL + "api/v1/platform/license/plan";
  try {
    const response = yield call(axios.put, url, action.payload, getHeaders());
    yield put({ type: GET_SUBMIT_REQUEST_SUCCESS, response: response.data.data });
  } catch (error) {
      yield errorHandler(error, GET_SUBMIT_REQUEST_FAILURE);
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

export function* watcherGetPlans() {
  yield takeLatest(GET_PLANS, apiGetPlansRequestHandler);
}

export function* watcherSubmitRequest() {
  yield takeLatest(GET_SUBMIT_REQUEST, apiGetSubmitRequestHandler);
}

export function* watcherSubmitLicenseKey() {
  yield takeLatest(LICENSE_KEY_DETAILS, apiLicenseDetailsDetailsHandler);
}

export default function* rootSaga() {
  yield all([
    watcherGetPlans(),
    watcherSubmitRequest(),
    watcherSubmitLicenseKey()
  ]);
}
