/**
* Test sagas
*/

import {
	GET_LICENSE_LIST,
	GET_LICENSE_LIST_SUCCESS,
	GET_LICENSE_LIST_FAILURE,
	LICENSE_DELETE_REQUEST,
	LICENSE_DELETE_REQUEST_SUCCESS,
	LICENSE_DELETE_REQUEST_FAILURE
} from '../constants';
import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
    watcherLicenseRequests,
	watcherLicenseDeleteRequests,
	apiLicenseDeleteHandlerAsync,
	apiLicenseHandlerAsync
} from "../saga";

describe("Manage Licence Plan Saga", () => {

	it("unit testing on rootSaga", () => {
		const generator = rootSaga();
		expect(generator.next().value).toEqual(all([
			watcherLicenseRequests(),
			watcherLicenseDeleteRequests()
		]));
	});

	it('should dispatch action "GET_LICENSE_LIST"', () => {
		const generator = watcherLicenseRequests();
		expect(generator.next().value).toEqual(
			takeLatest(GET_LICENSE_LIST, apiLicenseHandlerAsync)
		);
	});

	it('should dispatch action "LICENSE_DELETE_REQUEST" ', () => {
		const generator = watcherLicenseDeleteRequests();
		expect(generator.next().value).toEqual(
			takeLatest(LICENSE_DELETE_REQUEST, apiLicenseDeleteHandlerAsync)
		);
	});

	it('should dispatch action "GET_LICENSE_LIST_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const generator = apiLicenseHandlerAsync();
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_LICENSE_LIST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "LICENSE_DELETE_REQUEST_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const action = {
			id : "demo"
		};

		const generator = apiLicenseDeleteHandlerAsync(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: LICENSE_DELETE_REQUEST_SUCCESS, response: "demo" })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_LICENSE_LIST_FAILURE" with result from fetch News API', () => {
		
		const error = "error";
		const gen = apiLicenseHandlerAsync();
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_LICENSE_LIST_FAILURE)
		);
	});

	it('should dispatch action "LICENSE_DELETE_REQUEST_FAILURE" with result from fetch News API', () => {
		const error = "error";
		const action = {
			id : "demo"
		};
		const gen = apiLicenseDeleteHandlerAsync(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, LICENSE_DELETE_REQUEST_FAILURE)
		);
	});
});
