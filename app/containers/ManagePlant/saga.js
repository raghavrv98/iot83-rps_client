import { call, put, takeLatest, all} from "redux-saga/effects";
import axios from "axios";
import {
  GET_PLANTLIST,
  GET_PLANTLIST_SUCCESS,
  GET_PLANTLIST_FAILURE,
  DELETE_PLANT,
  DELETE_PLANT_SUCCESS,
  DELETE_PLANT_FAILURE
} from "./constants";
import { getHeaders, errorHandler} from "../../utils/commonUtils";

export function* apiGetPlantList(action) {
  const url = window.API_URL + "faas/api/v1/plants";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PLANTLIST_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_PLANTLIST_FAILURE);
  }
}

export function* apiDeletePlant(action) {
  const url = window.API_URL + "faas/api/v1/plants/" + action.id;
  try {
    const response = yield call(axios.delete, url, getHeaders());
    yield put({ type: DELETE_PLANT_SUCCESS, response: action.id });
  } catch (error) {
      yield errorHandler(error, DELETE_PLANT_FAILURE);
  }
}
export function* watcherGetPlantList() {
  yield takeLatest(GET_PLANTLIST, apiGetPlantList);
}

export function* watcherDeletePlant() {
  yield takeLatest(DELETE_PLANT, apiDeletePlant);
}

export default function* rootSaga() {
  yield all([watcherGetPlantList(), watcherDeletePlant()]);
}
