/**
* Test sagas
*/

import {
	GET_LANDMARK_LIST,
	GET_LANDMARK_LIST_SUCCESS,
	GET_LANDMARK_LIST_FAILURE,
	LANDMARK_DELETE_REQUEST,
	LANDMARK_DELETE_SUCCESS,
	LANDMARK_DELETE_FAILURE
} from '../constants';
import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
	watcherLandmarkRequests,
	watcherLandmarkDeleteRequest,
	apiLandmarkHandlerAsync,
	apiLandmarkDeleteHandlerAsync
} from "../saga";
import { response } from 'express';

describe("addorEditLicence Plan Saga", () => {

	it("unit testing on rootSaga", () => {
		const generator = rootSaga();
		expect(generator.next().value).toEqual(all([
			watcherLandmarkRequests(),
			watcherLandmarkDeleteRequest(),
		]));
	});

	it('should dispatch action "GET_LANDMARK_LIST"', () => {
		const generator = watcherLandmarkRequests();
		expect(generator.next().value).toEqual(
			takeLatest(GET_LANDMARK_LIST, apiLandmarkHandlerAsync)
		);
	});

	it('should dispatch action "LANDMARK_DELETE_REQUEST" ', () => {
		const generator = watcherLandmarkDeleteRequest();
		expect(generator.next().value).toEqual(
			takeLatest(LANDMARK_DELETE_REQUEST, apiLandmarkDeleteHandlerAsync)
		);
	});

	it('should dispatch action "GET_LANDMARK_LIST_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const action = {
			plantId: "demo",
			pipelineId: "demo"
		}
		const generator = apiLandmarkHandlerAsync(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_LANDMARK_LIST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "LANDMARK_DELETE_SUCCESS" with result from fetch News API', () => {

		const response = {
			id: "demo"
		}

		const action = {
			plantId: "demo",
			pipelineId: "demo",
			id: "demo"
		}

		const generator = apiLandmarkDeleteHandlerAsync(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: LANDMARK_DELETE_SUCCESS, response: "demo" })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_LANDMARK_LIST_FAILURE" with result from fetch News API', () => {

		const action = {
			plantId: "demo",
			pipelineId: "demo"
		}
		const error = "error";
		const gen = apiLandmarkHandlerAsync(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_LANDMARK_LIST_FAILURE)
		);
	});

	it('should dispatch action "LANDMARK_DELETE_FAILURE" with result from fetch News API', () => {

		const action = {
			plantId: "demo",
			pipelineId: "demo",
			id: "demo"
		}
		const error = "error";
		const gen = apiLandmarkDeleteHandlerAsync(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, LANDMARK_DELETE_FAILURE)
		);
	});
});
