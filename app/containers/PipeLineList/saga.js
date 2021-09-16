// export default function* pipeLineListSaga() {
// }
import { call, put, takeLatest, all} from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_PIPELINE_LIST,
    GET_PIPELINE_LIST_FAILURE,
    GET_PIPELINE_LIST_SUCCESS,
    DELETE_PIPELINE,
    DELETE_PIPELINE_SUCCESS,
    DELETE_PIPELINE_FAILURE,
    GET_PLANT_LIST,
    GET_PLANT_LIST_SUCCESS,
    GET_PLANT_LIST_FAILURE,
    GET_ALARM_LIST,
    GET_ALARM_LIST_FAILURE,
    GET_ALARM_LIST_SUCCESS,
    GET_PIPELINE_SEGMENT_DATA, 
    GET_PIPELINE_SEGMENT_DATA_SUCCESS,
    GET_PIPELINE_SEGMENT_DATA_FAILURE
} from './constants'
import { getHeaders ,errorHandler} from '../../utils/commonUtils';

export function* apiGetPiplineList(action) {
    const url = window.API_URL + 'faas/api/v1/plants/' + action.id + '/pipelines?gauge=true';
    try {
        const response = yield call(axios.get, url, getHeaders());
        yield put({
          type: GET_PIPELINE_SEGMENT_DATA,
          pipelines: response.data.data.result
        });
        yield put({ type: GET_PIPELINE_LIST_SUCCESS, response: response.data.data });
    } catch (error) {
        yield errorHandler(error, GET_PIPELINE_LIST_FAILURE);
    }
}

export function* apiDeletePipeline(action) {
    const url = window.API_URL + 'faas/api/v1/plants/' + action.plantId + '/pipelines/' + action.pipeId;
    try {
        const response = yield call(axios.delete, url, getHeaders());
        yield put({ type: DELETE_PIPELINE_SUCCESS, response: action.pipeId 
        });
     } catch (error) {
        yield errorHandler(error, DELETE_PIPELINE_FAILURE);
    }
}

export function* apiGetPlantList(action) {
	try {
		let url = window.API_URL + 'faas/api/v1/plants';
		const response = yield call(axios.get, url, getHeaders());
		yield put({ type: GET_PLANT_LIST_SUCCESS, response: response.data.data });
	} catch (error) {
		yield errorHandler(error, GET_PLANT_LIST_FAILURE);
	}
}

export function* apiGetAlarmList(action) {
let url = window.API_URL + `api/v1/platform/plants/${action.plantId}/alarms/list`;
let payload = {
  limit : action.limit,
  offset : action.offset
}
try {
  const response = yield call(axios.post, url, payload, getHeaders());
  yield put({
    type: GET_ALARM_LIST_SUCCESS,
    response: response.data.data
  });
} catch (error) {
  yield errorHandler(error, GET_ALARM_LIST_FAILURE);
}
}

function * apiGetSegments(action) {
  let pipelines = JSON.parse(JSON.stringify(action.pipelines))
    for (let i = 0; i < pipelines.length; i++) {
        let url = window.API_URL + 'faas/api/v1/plants/' + pipelines[i].plantId + '/pipelines/' + pipelines[i]._id + '/segmentData';
        yield all([apiCallHandler(url, pipelines[i]._id)]);
    }
}

export function* apiCallHandler(url, pipelineId) {
    try {
      let response = yield call(axios.get, url, getHeaders());
      
      yield put({
        type: GET_PIPELINE_SEGMENT_DATA_SUCCESS,
        response: {pipelineId: pipelineId, data: response.data.data}
      });
    } catch (error) {
      yield errorHandler(error, GET_PIPELINE_SEGMENT_DATA_FAILURE);
    }
    }

export function* watcherGetPiplineList() {
    yield takeLatest(GET_PIPELINE_LIST, apiGetPiplineList);
}

export function* watcherDeletePipeLine() {
    yield takeLatest(DELETE_PIPELINE, apiDeletePipeline);
}

export function* watcherGetPlantList() {
	yield takeLatest(GET_PLANT_LIST, apiGetPlantList);
}

export function* watcherGetAlarmList() {
	yield takeLatest(GET_ALARM_LIST, apiGetAlarmList);
}

export function* watcherGetSegments() {
	yield takeLatest(GET_PIPELINE_SEGMENT_DATA, apiGetSegments);
}

export default function* rootSaga() {
    yield all([
        watcherGetPiplineList(),
        watcherGetAlarmList(),
        watcherDeletePipeLine(),
        watcherGetPlantList(),
        watcherGetSegments()
    ]);
}