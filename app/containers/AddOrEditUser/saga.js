import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  ON_SUBMIT_REQUEST,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  GET_USER_DETAILS,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  GET_ALL_GROUPS,
  GET_ALL_GROUPS_FAILURE,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_ROLES,
  GET_ALL_ROLES_FAILURE,
  GET_ALL_ROLES_SUCCESS
} from "./constants";
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* apiSubmitHandlerAsync(action) {
  let url = window.API_URL + "api/v1/users";
  try {
    if (action.id) url = url + "/" + action.id;
    const response = yield call(
      action.id ? axios.put : axios.post,
      url,
      action.payload,
      getHeaders()
    );
    yield put({
      type: ON_SUBMIT_REQUEST_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, ON_SUBMIT_REQUEST_FAILURE);
  }
}

export function* apiGetUserDetailsHandlerAsync(action) {
  try {
    const url = window.API_URL + "api/v1/users/" + action.id;
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_USER_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_USER_DETAILS_FAILURE);
  }
}

export function* apiGetAllRolesHandlerAsync(action) {
  const url = window.API_URL + "api/v1/roles";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_ALL_ROLES_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_ALL_ROLES_FAILURE);
  }
}

export function* apiGetAllGroupsHandlerAsync(action) {
  const url = window.API_URL + "api/v1/compartments";
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_ALL_GROUPS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_ALL_GROUPS_FAILURE);
  }
}

export function* watcherSubmitRequests() {
  yield takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync);
}

export function* watcherGetUserDetails() {
  yield takeLatest(GET_USER_DETAILS, apiGetUserDetailsHandlerAsync);
}

export function* watcherGetAllRoles() {
  yield takeLatest(GET_ALL_ROLES, apiGetAllRolesHandlerAsync);
}

export function* watcherGetAllGroups() {
  yield takeLatest(GET_ALL_GROUPS, apiGetAllGroupsHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherSubmitRequests(),
    watcherGetUserDetails(),
    watcherGetAllRoles(),
    watcherGetAllGroups()
  ]);
}
