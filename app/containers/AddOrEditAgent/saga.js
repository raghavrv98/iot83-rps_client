import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE_AGENT_REQUEST,
  CREATE_AGENT_SUCCESS,
  CREATE_AGENT_FAILURE,
  GET_AGENT_DETAILS,
  GET_AGENT_DETAILS_SUCCESS,
  GET_AGENT_DETAILS_FAILURE
} from "./constants";
import { getHeaders, errorHandler } from "../../utils/commonUtils";

export function* apiSubmitHandlerAsync(action) {
let url = window.API_URL + "faas/api/v1/agents";
 let payload = action.payload;
 if (payload.type == "APSensingDTSPoller"){
   delete payload.modbusFileName;
   delete payload.modbusMap;
   delete payload.modbusPort;
  }
 if (action.payload.agentId) {
   url = url + "/" + action.payload.agentId;
  }
  try {
    let header = getHeaders();
    const response = yield call(
      action.payload.agentId ? axios.put : axios.post,
      url,
      payload,
      header,
    );
    yield put({ type: CREATE_AGENT_SUCCESS, response: response.data.data });
  } catch (error) {
    yield errorHandler(error, CREATE_AGENT_FAILURE);
  }
}

export function* apiGetAgentInfo(action) {
  let url = window.API_URL + "faas/api/v1/agents/" + action.id;
  try {
    const response = yield call(axios.get, url, getHeaders());
    yield put({
      type: GET_AGENT_DETAILS_SUCCESS,
      response: response.data.data
    });
  } catch (error) {
    yield errorHandler(error, GET_AGENT_DETAILS_FAILURE);
  }
}
export function* watcherSubmitRequests() {
  yield takeLatest(CREATE_AGENT_REQUEST, apiSubmitHandlerAsync);
}
export function* watcherGetAgentInfo() {
  yield takeLatest(GET_AGENT_DETAILS, apiGetAgentInfo);
}
export default function* rootSaga() {
  yield all([watcherSubmitRequests(), watcherGetAgentInfo()])
}
