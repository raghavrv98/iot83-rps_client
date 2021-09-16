import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE_PLANT_SUCCESS,
  CREATE_PLANT,
  CREATE_PLANT_FAILURE,
  GET_DETAILS,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_FAILURE,
  UPLOAD_PLANT_IMAGE,
  UPLOAD_PLANT_IMAGE_SUCCESS,
  UPLOAD_PLANT_IMAGE_FAILURE
} from "./constants";
import { getHeaders, errorHandler } from "../../utils/commonUtils";
export function* apiCreatePlant(action) {
  let url = window.API_URL + "faas/api/v1/plants";
  try {
    if (action.id) url = url + "/" + action.id;
    const response = yield call(
      action.id ? axios.put : axios.post,
      url,
      action.payload,
      getHeaders()
    );
    yield put({ type: CREATE_PLANT_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, CREATE_PLANT_FAILURE);
  }
}

export function* apiGetPlantDetails(action) {
  let url = window.API_URL + "faas/api/v1/plants/" + action.id;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_DETAILS_FAILURE);
  }
}

export function* apiUploadPlantImage(action) {
  const url = window.API_URL + "api/v1/platform/static/plants?naming=random";
  let formdata = new FormData();
  formdata.append('file', action.image);
  try {
    const response = yield call(axios.post, url, formdata, getHeaders());
    yield put({ type: UPLOAD_PLANT_IMAGE_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, UPLOAD_PLANT_IMAGE_FAILURE);
  }
}

export function* watcherCreatePlant() {
  yield takeLatest(CREATE_PLANT, apiCreatePlant);
}

export function* watcherGetDetails() {
  yield takeLatest(GET_DETAILS, apiGetPlantDetails);
}

export function* watcherImageUpload() {
  yield takeLatest(UPLOAD_PLANT_IMAGE, apiUploadPlantImage);
}

export default function* rootSaga() {
  yield all([watcherCreatePlant(), watcherGetDetails(), watcherImageUpload()]);
}
