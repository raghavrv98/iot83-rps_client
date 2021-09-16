import { call, put, takeLatest, all} from "redux-saga/effects";
import axios from "axios";
import { getHeaders, errorHandler } from "../../utils/commonUtils";
import {PASSWORDREQUESTLIST,PASSWORDREQUESTLIST_SUCCESS,PASSWORDREQUESTLIST_FAILURE} from "./constants";

export function* managePasswordRequestSaga(action) {
  let url = window.API_URL + "api/v1/passwords/approve",response;
  let payload = action.payload
  if(action.id){
    url = `${url}/${action.id}`
  }
  try {
        if(action.payload.userId){
          response = yield call(axios.patch,url,payload,getHeaders());          
        }
        else{
          response = yield call(axios.get,url,getHeaders());
        }
        yield put({
          type: PASSWORDREQUESTLIST_SUCCESS,
          response: action.payload.userId ? response.data.message : response.data
        });
      } catch (error) {
        yield errorHandler(error, PASSWORDREQUESTLIST_FAILURE);
      }
}

export function* watcherGetPasswordListRequest() {
  yield takeLatest(PASSWORDREQUESTLIST, managePasswordRequestSaga);
}
export default function* rootSaga() {
  yield all([watcherGetPasswordListRequest()]);
}