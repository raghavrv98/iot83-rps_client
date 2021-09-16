import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import {
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE
} from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";

export function* apiChangePasswordHandlerAsync(action) {
  try {
    const url = window.API_URL + 'api/v1/users/changePassword';
    const response = yield call(axios.post, url, action.payload, getHeaders());
    yield put({ type: CHANGE_PASSWORD_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, CHANGE_PASSWORD_FAILURE);
  }
}

export function* watcherChangePasswordRequests() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, apiChangePasswordHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherChangePasswordRequests()
  ]);
}