
import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { GET_LIST, GOT_LIST, NOT_GOT_LIST, DELETE_REQUEST, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE } from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";


export function* apiRolesHandlerAsync(action) {
  const url = window.API_URL + 'api/v1/roles';
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GOT_LIST, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, NOT_GOT_LIST);
  }
}

export function* apiDeleteRequestHandlerAsync(action) {
  const url = window.API_URL + 'api/v1/roles/' + action.id;
  try {
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: DELETE_REQUEST_SUCCESS, response: action.id });
  } catch (error) {
    yield errorHandler(error, DELETE_REQUEST_FAILURE);
  }
}

export function* watcherRoleRequests() {
  yield takeLatest(GET_LIST, apiRolesHandlerAsync);
}

export function* watcherDeleteRequests() {
  yield takeLatest(DELETE_REQUEST, apiDeleteRequestHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherRoleRequests(),
    watcherDeleteRequests()
  ]);
}

