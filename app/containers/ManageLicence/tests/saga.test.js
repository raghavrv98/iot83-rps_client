/**
* Test sagas
*/

import { GET_PLANS, GET_PLANS_SUCCESS, GET_PLANS_FAILURE,
	GET_SUBMIT_REQUEST,GET_SUBMIT_REQUEST_SUCCESS,GET_SUBMIT_REQUEST_FAILURE,
	LICENSE_KEY_DETAILS, LICENSE_KEY_DETAILS_SUCCESS, LICENSE_KEY_DETAILS_FAILURE } from '../constants';
import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
	apiGetPlansRequestHandler,
	apiGetSubmitRequestHandler,
	apiLicenseDetailsDetailsHandler,
	watcherGetPlans,
	watcherSubmitRequest,
	watcherSubmitLicenseKey
} from "../saga";

describe("manage License Plan Saga", () => {

	it("unit testing on rootSaga", () => {
		const generator = rootSaga();
		expect(generator.next().value).toEqual(all([
			watcherGetPlans(),
			watcherSubmitRequest(),
			watcherSubmitLicenseKey()
		]));
	});

	it('should dispatch action "GET_PLANS"', () => {
		const generator = watcherGetPlans();
		expect(generator.next().value).toEqual(
			takeLatest(GET_PLANS, apiGetPlansRequestHandler)
		);
	});

	it('should dispatch action "GET_SUBMIT_REQUEST" ', () => {
		const generator = watcherSubmitRequest();
		expect(generator.next().value).toEqual(
			takeLatest(GET_SUBMIT_REQUEST, apiGetSubmitRequestHandler)
		);
	});

	it('should dispatch action "LICENSE_KEY_DETAILS" ', () => {
		const generator = watcherSubmitLicenseKey();
		expect(generator.next().value).toEqual(
			takeLatest(LICENSE_KEY_DETAILS, apiLicenseDetailsDetailsHandler)
		);
	});

	it('should dispatch action "GET_PLANS_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const generator = apiGetPlansRequestHandler();
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_PLANS_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_PLANS_FAILURE" with result from fetch News API', () => {
		const error = "error";
		const gen = apiGetPlansRequestHandler();
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_PLANS_FAILURE)
		);
	});

	it('should dispatch action "GET_SUBMIT_REQUEST_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const action = {
			payload : "demo"
		}
		const generator = apiGetSubmitRequestHandler(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_SUBMIT_REQUEST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_SUBMIT_REQUEST_FAILURE" with result from fetch News API', () => {
		const action = {
			payload : "demo"
		}

		const error = "error";
		const gen = apiGetSubmitRequestHandler(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_SUBMIT_REQUEST_FAILURE)
		);
	});

	it('should dispatch action "LICENSE_KEY_DETAILS_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const action = {
			payload : "demo"
		}
		const generator = apiLicenseDetailsDetailsHandler(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: LICENSE_KEY_DETAILS_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "LICENSE_KEY_DETAILS_FAILURE" with result from fetch News API', () => {
		const action = {
			payload : "demo"
		}

		const error = "error";
		const gen = apiLicenseDetailsDetailsHandler(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, LICENSE_KEY_DETAILS_FAILURE)
		);
	});

});
