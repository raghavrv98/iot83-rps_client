import { GET_MENUS, GET_MENUS_SUCCESS, GET_MENUS_FAILURE, GET_ALL_MENUS, GET_ALL_MENUS_SUCCESS, GET_ALL_MENUS_FAILURE, SAVE_MENUS, SAVE_MENUS_SUCCESS, SAVE_MENUS_FAILURE } from './constants';
import { call, put, takeLatest, all} from "redux-saga/effects";
import { getHeaders, errorHandler} from "../../utils/commonUtils";
import axios from "axios";

export function* apiGetMenus(action) {
  const url = window.API_URL + `api/v1/menu/mapping?id=${action.id}`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_MENUS_SUCCESS, response: response.data.data });
  } catch (error) {
      yield errorHandler(error, GET_MENUS_FAILURE);
  }
}

export function* apiAllGetMenus() {
  const url = window.API_URL + "api/v1/menu";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_ALL_MENUS_SUCCESS, response: response.data.data });
  } catch (error) {
      yield errorHandler(error, GET_ALL_MENUS_FAILURE);
  }
}

export function* apiSaveMenus(action) {
  let payload = {
    roleId: action.id,
    menuId: action.payload
  }
  const url = window.API_URL + `api/v1/menu/mapping`;
  try {
    const response = yield call(axios.put, url, payload, getHeaders());
    yield put({ type: SAVE_MENUS_SUCCESS, response: response.data.message });
  } catch (error) {
      yield errorHandler(error, SAVE_MENUS_FAILURE);
  }
}

export function* watcherGetMenus() {
  yield takeLatest(GET_MENUS, apiGetMenus);
}

export function* watcherGetAllMenus() {
  yield takeLatest(GET_ALL_MENUS, apiAllGetMenus);
}

export function* watcherSaveMenus() {
  yield takeLatest(SAVE_MENUS, apiSaveMenus);
}

export default function* rootSaga() {
  yield all([watcherGetMenus(),watcherGetAllMenus(),watcherSaveMenus()]);
}
