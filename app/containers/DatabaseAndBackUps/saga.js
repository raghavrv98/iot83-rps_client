import { call, put, takeLatest, all} from "redux-saga/effects";
import axios from "axios";
import { getHeaders, errorHandler } from "../../utils/commonUtils";
import { GET_DATABASE_LIST_SUCCESS,
         GET_DATABASE_LIST_FAILURE,
         GET_DATABASE_LIST,
         CREATE_BACKUP_LIST_FAILURE,
         CREATE_BACKUP_LIST_SUCCESS,
         CREATE_BACKUP_LIST,
         GET_TENANT_LIST_SUCCESS,
         GET_TENANT_LIST_FAILURE,
         GET_TENANT_LIST,
         GET_ACTIVITY_STATUS,
         GET_ACTIVITY_STATUS_SUCCESS,
         GET_ACTIVITY_STATUS_FAILURE,
         } from "./constants";

export function* apiGetDatabaseListHandler(action) {
  try {
     let url = window.API_URL + "api/v1/platform/schedule";
    const response = yield call(axios.get, url, getHeaders());
    yield put({type: GET_DATABASE_LIST_SUCCESS,response: response.data.data});
    }catch (error) {
    yield errorHandler(error, GET_DATABASE_LIST_FAILURE);
  }
}

export function* apiGetTenantListHandler(action) {
  try {
    let url = window.API_URL + "api/v1/platform/tenant";
    const response = yield call(axios.get, url, getHeaders());
    yield put({type: GET_TENANT_LIST_SUCCESS,response: response.data.data});
    }catch (error) {
    yield errorHandler(error, GET_TENANT_LIST_FAILURE);
  }
}


export function* apiCreateBackupPayloadHandler(action) {
  try {
    let url = window.API_URL + "api/v1/platform/schedule";
    const response = yield call(axios.post, url,action.backupPayload, getHeaders());
    yield put({type: CREATE_BACKUP_LIST_SUCCESS,response: response.data});
    }catch (error) {
    yield errorHandler(error, CREATE_BACKUP_LIST_FAILURE);
  }
}

export function* apiGetActivityStatusHandler(action) {
  try {
     let url = window.API_URL + "api/v1/platform/schedule/"+action.id;
    const response = yield call(axios.get, url, getHeaders());    
    yield put({type: GET_ACTIVITY_STATUS_SUCCESS,response: response.data.data});
    }catch (error) {
    yield errorHandler(error, GET_ACTIVITY_STATUS_FAILURE);
  }
}


export function* watcherGetDatabaseList() {
  yield takeLatest(GET_DATABASE_LIST, apiGetDatabaseListHandler);
}

export function* watcherCreateBackupPayload() {
  yield takeLatest(CREATE_BACKUP_LIST, apiCreateBackupPayloadHandler);
}

export function* watcherGetTenantList() {
  yield takeLatest(GET_TENANT_LIST, apiGetTenantListHandler);
}

export function* watcherGetActivityStatus() {
  yield takeLatest(GET_ACTIVITY_STATUS, apiGetActivityStatusHandler);
}

export default function* rootSaga() {
  yield all([watcherGetDatabaseList(),watcherCreateBackupPayload(),watcherGetTenantList(),watcherGetActivityStatus()]);
}
