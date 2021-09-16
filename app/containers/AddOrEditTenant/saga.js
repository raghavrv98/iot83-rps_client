
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { SUBMIT_HANDLER, SUBMIT_HANDLER_SUCCESS, SUBMIT_HANDLER_FAILURE,GET_TENANT_BY_ID,GET_TENANT_BY_ID_FAILURE,GET_TENANT_BY_ID_SUCCESS } from './constants';
import { getHeaders, errorHandler} from "../../utils/commonUtils";


export function* apiSubmitHandlerAsync(action) {
  let url = window.API_URL + 'api/v1/accounts';
  if(action.payload.id)
    url= url+"/"+action.payload.id;
  try {
    const response = yield call(action.payload.id ? axios.put : axios.post, url,action.payload, getHeaders());
    yield put({ type: SUBMIT_HANDLER_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, SUBMIT_HANDLER_FAILURE);
  }
}

export function* apiTenantByIsHandlerAsync(action) {
  try {
    const url = window.API_URL + 'api/v1/accounts/' + action.id;
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_TENANT_BY_ID_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_TENANT_BY_ID_FAILURE);
  }
}

export function* watcherSubmitRequests() {
  yield takeLatest(SUBMIT_HANDLER, apiSubmitHandlerAsync);
}

export function* watcherGetTenantById() {
  yield takeLatest(GET_TENANT_BY_ID, apiTenantByIsHandlerAsync);
}

export default function* rootSaga() {
  yield all([
    watcherSubmitRequests(),
    watcherGetTenantById()
  ]);
}

