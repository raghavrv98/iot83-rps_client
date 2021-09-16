// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeLatest, all} from "redux-saga/effects";
import axios from "axios";
import {ADD_ALARM_TYPE, 
        ADD_ALARM_TYPE_SUCCESS, 
        ADD_ALARM_TYPE_FAILURE, 
        GET_ALARM_TYPE, 
        GET_ALARM_TYPE_SUCCESS, 
        GET_ALARM_TYPE_FAILURE, 
        GET_ALARM_CATEGORY,
        GET_ALARM_CATEGORY_SUCCESS, 
        GET_ALARM_CATEGORY_FAILURE} from './constants'
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* manageAlarmTypeSaga(action) {
  const url = window.API_URL + `api/v1/platform/alarms/types`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_ALARM_TYPE_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_ALARM_TYPE_FAILURE);
  }
}
export function* manageAlarmCategorySaga(action) {
  const url = window.API_URL + `api/v1/platform/alarms/categories`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_ALARM_CATEGORY_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_ALARM_CATEGORY_FAILURE);
  }
}

export function* addAlarmType(action) {
  const url = window.API_URL + `api/v1/platform/alarms/types`;
  try {
    const response = yield call(axios.put, url, action.payload ,getHeaders());
    yield put({
      type: ADD_ALARM_TYPE_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, ADD_ALARM_TYPE_FAILURE);
  }
}
export function* watcherGetAlarmType() {
  yield takeLatest(GET_ALARM_TYPE, manageAlarmTypeSaga);
}
export function* watcherAddAlarmType() {
  yield takeLatest(ADD_ALARM_TYPE, addAlarmType);
}
export function* watcherGetAlarmCategory() {
  yield takeLatest(GET_ALARM_CATEGORY, manageAlarmCategorySaga);
}
export default function* rootSaga() {
  yield all([watcherGetAlarmType(), watcherGetAlarmCategory(), watcherAddAlarmType()]);
}