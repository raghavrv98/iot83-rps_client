import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { GET_MENU_REQUEST, GET_MENU_SUCCESS, GET_MENU_FAILURE, MENU_SAVE_HANDLER, MENU_SAVE_HANDLER_SUCCESS, MENU_SAVE_HANDLER_FAILURE } from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";

export function* apiNavHandlerAsync() {
  const url = window.API_URL + "api/v1/menu";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_MENU_SUCCESS, response: response.data.data });
  } catch (error) {
      yield errorHandler(error, GET_MENU_FAILURE);
  }
}

export function* apiMenuSaveHandler(action) {
  const url = window.API_URL + "api/v1/menu";  
  try {
    const response = yield call(axios.put, url, action.payload, getHeaders());
    yield put({ type: MENU_SAVE_HANDLER_SUCCESS, response: response.data.message });
  } catch (error) {
      yield errorHandler(error, MENU_SAVE_HANDLER_FAILURE);
  }
}

export function* watcherNavRequests() {
  yield takeLatest(GET_MENU_REQUEST, apiNavHandlerAsync);
}

export function* watcherMenuSaveHandler() {
  yield takeLatest(MENU_SAVE_HANDLER, apiMenuSaveHandler);
}

export default function* rootSaga() {
  yield all([
    watcherNavRequests(),
    watcherMenuSaveHandler()
  ]);
}