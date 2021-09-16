import { getHeaders, errorHandler} from "../../utils/commonUtils";
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { 
  GET_PLANTS,GET_PLANTS_FAILURE,GET_PLANTS_SUCCESS,
  GET_EDIT_SAVE_MAP,
  GET_EDIT_SAVE_MAP_SUCCESS,
  GET_EDIT_SAVE_MAP_FAILURE,
  GET_MAPPING_DATA,
  GET_MAPPING_DATA_SUCCESS,
  GET_MAPPING_DATA_FAILURE,
  GET_AGENT_DETAILS,
  GET_AGENT_DETAILS_SUCCESS,
  GET_AGENT_DETAILS_FAILURE
} from "./constants";

export function* apiGetPlants(action) {
  const url = window.API_URL +  `faas/api/v1/plants`;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({ type: GET_PLANTS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_PLANTS_FAILURE);
  }
}

export function* apiAddEditMapping(action) {
  let url = window.API_URL +  `faas/api/v1/agents/${action.expId}/mappings`;
  if(action.mapId){
    url = url + `/${action.mapId}`
  }
  try {
    const response = yield call( action.mapId ? axios.put : axios.post , url, action.payload , getHeaders());
    yield put({ type: GET_EDIT_SAVE_MAP_SUCCESS, response: response.data.message });
  } catch (error) {
    yield errorHandler(error, GET_EDIT_SAVE_MAP_FAILURE);
  }
}

export function* apiGetMappingData(action) {
  let url = window.API_URL +  `faas/api/v1/agents/${action.agentId}/mappings/${action.mapId}`;
  try {
    const response = yield call( axios.get , url, getHeaders());
    yield put({ type: GET_MAPPING_DATA_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_MAPPING_DATA_FAILURE);
  }
}

export function* apiGetAgentDetails(action) {
  let url = window.API_URL +  `faas/api/v1/agents/${action.id}`;
  try {
    const response = yield call( axios.get , url, getHeaders());
    yield put({ type: GET_AGENT_DETAILS_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, GET_AGENT_DETAILS_FAILURE);
  }
}

export function* watcherGetPlantLists() {
  yield takeLatest(GET_PLANTS, apiGetPlants);
}

export function* watcherAddEditMapping() {
  yield takeLatest(GET_EDIT_SAVE_MAP, apiAddEditMapping);
}

export function* watcherGetMappingData() {
  yield takeLatest(GET_MAPPING_DATA, apiGetMappingData);
}

export function* watcherGetAgentDetails() {
  yield takeLatest(GET_AGENT_DETAILS, apiGetAgentDetails);
}

export default function* rootSaga() {
  yield all([
    watcherGetPlantLists(),
    watcherAddEditMapping(),
    watcherGetMappingData(),
    watcherGetAgentDetails()
  ]);
}