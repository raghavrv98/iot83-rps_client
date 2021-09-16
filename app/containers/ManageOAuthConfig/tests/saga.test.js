/**
* Test sagas
*/

import {
	GET_AUTH_CONFIG_DETAILS,
	GET_AUTH_CONFIG_DETAILS_SUCCESS,
	GET_AUTH_CONFIG_DETAILS_FAILURE,
	SUBMIT_REQUEST,
	SUBMIT_REQUEST_SUCCESS,
	SUBMIT_REQUEST_FAILURE,
	DELETE_CONFIG,
	DELETE_CONFIG_SUCCESS,
	DELETE_CONFIG_FAILURE
} from '../constants';

import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
	apiGetAuthConfigDetailsHandlerAsync,
	apiSubmitRequestHandlerAsync,
	apiDeleteConfigHandlerAsync,
	watcherGetAuthConfigDetails,
	watcherSubmitRequest,
	watcherDeleteConfig,
} from "../saga";

describe("ManageOAuthConfig Plan Saga", () => {

	it("unit testing on rootSaga", () => {
		const generator = rootSaga();
		expect(generator.next().value).toEqual(all([
			watcherGetAuthConfigDetails(),
			watcherSubmitRequest(),
			watcherDeleteConfig(),
		]));
	});

	it('should dispatch action "GET_AUTH_CONFIG_DETAILS"', () => {
		const generator = watcherGetAuthConfigDetails();
		expect(generator.next().value).toEqual(
			takeLatest(GET_AUTH_CONFIG_DETAILS, apiGetAuthConfigDetailsHandlerAsync)
		);
	});

	it('should dispatch action "SUBMIT_REQUEST" ', () => {
		const generator = watcherSubmitRequest();
		expect(generator.next().value).toEqual(
			takeLatest(SUBMIT_REQUEST, apiSubmitRequestHandlerAsync)
		);
	});

	it('should dispatch action "DELETE_CONFIG" ', () => {
		const generator = watcherDeleteConfig();
		expect(generator.next().value).toEqual(
			takeLatest(DELETE_CONFIG, apiDeleteConfigHandlerAsync)
		);
	});

	it('should dispatch action "GET_AUTH_CONFIG_DETAILS_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const generator = apiGetAuthConfigDetailsHandlerAsync();
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_AUTH_CONFIG_DETAILS_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "SUBMIT_REQUEST_SUCCESS" with result from fetch News API', () => {
		
		const response = {
			data: {
				data: true
			}
		};

		const action = {
			payload: "demo"
		};

		const generator = apiSubmitRequestHandlerAsync(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: SUBMIT_REQUEST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "DELETE_CONFIG_SUCCESS" with result from fetch News API', () => {

		const action = {
			id: "demo"
		};

		const response = {
			data: {
				data: true
			}
		};

		const generator = apiDeleteConfigHandlerAsync(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: DELETE_CONFIG_SUCCESS, response: "demo" })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_AUTH_CONFIG_DETAILS_FAILURE" with result from fetch News API', () => {

		const error = "error";
		const gen = apiGetAuthConfigDetailsHandlerAsync();
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_AUTH_CONFIG_DETAILS_FAILURE)
		);
	});

	it('should dispatch action "SUBMIT_REQUEST_FAILURE" with result from fetch News API', () => {
		const error = "error";
		const action = {
			payload: "demo"
		};
		const gen = apiSubmitRequestHandlerAsync(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, SUBMIT_REQUEST_FAILURE)
		);
	});

	it('should dispatch action "DELETE_CONFIG_FAILURE" with result from fetch News API', () => {
		const error = "error";
		const action = {
			id: "demo"
		};
		const gen = apiDeleteConfigHandlerAsync(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, DELETE_CONFIG_FAILURE)
		);
	});
});
