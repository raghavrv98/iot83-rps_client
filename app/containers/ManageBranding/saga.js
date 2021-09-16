// import { take, call, put, select } from 'redux-saga/effects';

import { UPLOAD_LOGO_REQUEST,
         UPLOAD_LOGO_SUCCESS, 
         UPLOAD_LOGO_FAILURE, 
         UPLOAD_THEME_REQUEST, 
         UPLOAD_THEME_SUCCESS, 
         UPLOAD_THEME_FAILURE } from "./constants";
import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import { getHeaders, errorHandler} from "../../utils/commonUtils";
// Individual exports for testing
export function* manageBrandingSaga(action) {
    try {
      const url = window.API_URL + action.url;
      let formdata = new FormData()
      formdata.append('file', action.filePayload)
      const response = yield call(axios.post, url, formdata, getHeaders());
      yield put({ type: UPLOAD_LOGO_SUCCESS, response: response.data.message });
    } catch (error) {
      yield errorHandler(error, UPLOAD_LOGO_FAILURE);
    }
  }

  export function* manageThemeSaga(action) {
    try {
      let url,formdata,response;
      if(action.themeId === "saveTheme")
     {
      url = window.API_URL + "api/v1/platform/static/css?naming=original"
      formdata = new FormData()
      formdata.append('file', action.themePayload)
    }
      else{
        formdata={}
        url = window.API_URL + "api/v1/platform/static/reset/content" ;
      }
      response = yield call(axios.post, url, formdata, getHeaders());
      yield put({ type: UPLOAD_THEME_SUCCESS, response: response.data.message });
    } catch (error) {
      yield errorHandler(error, UPLOAD_THEME_FAILURE);
    }
  }

export function* watcherUsersRequests() {
  yield takeLatest(UPLOAD_LOGO_REQUEST, manageBrandingSaga);
}

export function* watcherThemeRequests() {
  yield takeLatest(UPLOAD_THEME_REQUEST, manageThemeSaga);
}

export default function* rootSaga() {
  yield all([
    watcherUsersRequests(),watcherThemeRequests()
  ]);
}