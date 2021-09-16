
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
	GET_REPORT_LIST, GET_REPORT_LIST_SUCCESS, GET_REPORT_LIST_FAILURE,
	GET_PLANT_LIST, GET_PLANT_LIST_SUCCESS, GET_PLANT_LIST_FAILURE,
	GET_PIPELINE_DETAILS, GET_PIPELINE_DETAILS_SUCCESS, GET_PIPELINE_DETAILS_FAILURE
} from './constants';
import { getHeaders, errorHandler } from "../../utils/commonUtils";


export function* apiReportListHandlerAsync(action) {
	try {
		let url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines/${action.pipelineId}/reports/list`;
		const response = yield call(axios.get, url, getHeaders());
		yield put({ type: GET_REPORT_LIST_SUCCESS, response: response.data.data });
	} catch (error) {
		yield errorHandler(error, GET_REPORT_LIST_FAILURE);
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

export function* apiGetPipelines(action) {
	try {
		let url = window.API_URL + `faas/api/v1/plants/${action.plantId}/pipelines`;
		const response = yield call(axios.get, url, getHeaders());
		yield put({ type: GET_PIPELINE_DETAILS_SUCCESS, response: response.data.data });
	} catch (error) {
		yield errorHandler(error, GET_PIPELINE_DETAILS_FAILURE);
	}
}



export function* watcherGetPlantList() {
	yield takeLatest(GET_PLANT_LIST, apiGetPlantList);
}

export function* watcherFetchPipeline() {
	yield takeLatest(GET_PIPELINE_DETAILS, apiGetPipelines);
}

export function* watcherReportListRequests() {
	yield takeLatest(GET_REPORT_LIST, apiReportListHandlerAsync);
}

export default function* rootSaga() {
	yield all([
		watcherReportListRequests(),
		watcherGetPlantList(),
		watcherFetchPipeline(),
	]);
}

