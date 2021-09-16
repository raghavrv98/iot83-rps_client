/**
* Test sagas
*/

import {
	GET_REPORT_LIST, GET_REPORT_LIST_SUCCESS, GET_REPORT_LIST_FAILURE,
	GET_PLANT_LIST, GET_PLANT_LIST_SUCCESS, GET_PLANT_LIST_FAILURE,
	GET_PIPELINE_DETAILS, GET_PIPELINE_DETAILS_SUCCESS, GET_PIPELINE_DETAILS_FAILURE
} from '../constants';

import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
	watcherReportListRequests,
	watcherGetPlantList,
	watcherFetchPipeline,
	apiReportListHandlerAsync,
	apiGetPlantList,
	apiGetPipelines
} from "../saga";
import { response } from 'express';

describe("addorEditLicence Plan Saga", () => {

	it("unit testing on rootSaga", () => {
		const generator = rootSaga();
		expect(generator.next().value).toEqual(all([
			watcherReportListRequests(),
			watcherGetPlantList(),
			watcherFetchPipeline(),
		]));
	});

	it('should dispatch action "GET_REPORT_LIST"', () => {
		const generator = watcherReportListRequests();
		expect(generator.next().value).toEqual(
			takeLatest(GET_REPORT_LIST, apiReportListHandlerAsync)
		);
	});

	it('should dispatch action "GET_PLANT_LIST" ', () => {
		const generator = watcherGetPlantList();
		expect(generator.next().value).toEqual(
			takeLatest(GET_PLANT_LIST, apiGetPlantList)
		);
	});

	it('should dispatch action "GET_PIPELINE_DETAILS" ', () => {
		const generator = watcherFetchPipeline();
		expect(generator.next().value).toEqual(
			takeLatest(GET_PIPELINE_DETAILS, apiGetPipelines)
		);
	});

	it('should dispatch action "GET_REPORT_LIST_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const action = {
			plantId: "demo",
			pipelineId: "demo"
		}
		const generator = apiReportListHandlerAsync(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_REPORT_LIST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_PLANT_LIST_SUCCESS" with result from fetch News API', () => {

		const response = {
			data: {
				data: true
			}
		}
		const generator = apiGetPlantList();
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_PLANT_LIST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_PIPELINE_DETAILS_SUCCESS" with result from fetch News API', () => {

		const response = {
			data: {
				data: true
			}
		}

		const action = {
			plantId: "demo",
		}

		const generator = apiGetPipelines(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_PIPELINE_DETAILS_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_REPORT_LIST_FAILURE" with result from fetch News API', () => {

		const action = {
			plantId: "demo",
			pipelineId: "demo"
		}
		const error = "error";
		const gen = apiReportListHandlerAsync(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_REPORT_LIST_FAILURE)
		);
	});

	it('should dispatch action "GET_PLANT_LIST_FAILURE" with result from fetch News API', () => {

		const error = "error";
		const gen = apiGetPlantList();
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_PLANT_LIST_FAILURE)
		);
	});

	it('should dispatch action "GET_PIPELINE_DETAILS_FAILURE" with result from fetch News API', () => {

		const action = {
			plantId: "demo",
		}
		const error = "error";
		const gen = apiGetPipelines(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_PIPELINE_DETAILS_FAILURE)
		);
	});

});
