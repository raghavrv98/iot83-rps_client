
import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCCESS, RESET_PASSWORD_FAILURE } from './constants';
import { errorHandler} from "../../utils/commonUtils";

export function* apiResetPasswordHandlerAsync(action) {
  const url = window.API_URL + 'api/public/users/credentials/reset';
  try {
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = yield call(axios.post, url, action.payload, {headers});
    yield put({ type: RESET_PASSWORD_SUCCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, RESET_PASSWORD_FAILURE);
  }
}

export function* watcherResetPasswordRequests() {
  yield takeLatest(RESET_PASSWORD_REQUEST, apiResetPasswordHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherResetPasswordRequests()
  ]);
}

