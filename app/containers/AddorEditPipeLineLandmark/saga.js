import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  GET_LANDMARK_DETAILS,
  GET_LANDMARK_DETAILS_SUCCESS,
  GET_LANDMARK_DETAILS_FAILURE,
  CREATE_LANDMARK_DETAILS,
  CREATE_LANDMARK_DETAILS_SUCCESS,
  CREATE_LANDMARK_DETAILS_FAILURE,
  UPLOAD_LANDMARK_IMAGE,
  UPLOAD_LANDMARK_IMAGE_SUCCESS,
  UPLOAD_LANDMARK_IMAGE_FAILURE,
} from "./constants";
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* apiGetLandmarkDetails(action) {
  let url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines/${action.pipelineId}/landmarks/${action.id}`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_LANDMARK_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_LANDMARK_DETAILS_FAILURE);
  }
}

export function* apiCreateLandmarkDetails(action) {
  let url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines/${action.pipelineId}/landmarks`;
  try {
    if (action.id) 
    url = url + "/" + action.id;
    const response = yield call(
      action.id ? axios.put : axios.post,
      url,
      action.payload,
      getHeaders()
    );
    yield put({ type: CREATE_LANDMARK_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, CREATE_LANDMARK_DETAILS_FAILURE);
  }
}

export function* apiUploadLandmarkImage(action) {
  const url = window.API_URL + "api/v1/platform/static/landmarks?naming=random";
  let formdata = new FormData();
  formdata.append('file', action.image);
  try {
    const response = yield call(axios.post, url, formdata, getHeaders());
    yield put({ type: UPLOAD_LANDMARK_IMAGE_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, UPLOAD_LANDMARK_IMAGE_FAILURE);
  }
}


export function* watcherGetLandmarkDetails() {
  yield takeLatest(GET_LANDMARK_DETAILS, apiGetLandmarkDetails);
}

export function* watcherCreateLandmarkDetails() {
  yield takeLatest(CREATE_LANDMARK_DETAILS, apiCreateLandmarkDetails);
}

export function* watcherImageUpload() {
  yield takeLatest(UPLOAD_LANDMARK_IMAGE, apiUploadLandmarkImage);
}

export default function* addorEditPipeLineLandmarkSaga() {  
  yield all([watcherGetLandmarkDetails(),watcherCreateLandmarkDetails(), watcherImageUpload()]);
}