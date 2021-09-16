/**
* Test sagas
*/

import { ON_SUBMIT_REQUEST, ON_SUBMIT_REQUEST_SUCCESS, ON_SUBMIT_REQUEST_FAILURE, GET_PLANS_LIST, GET_PLANS_LIST_SUCCESS, GET_PLANS_LIST_FAILURE } from "../constants";
import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
	watcherGetRequests,
	watcherSubmitRequests,
	apiSubmitHandlerAsync,
	apiGetHandlerAsync
} from "../saga";

describe("addorEditLicence Plan Saga", () => {

	it("unit testing on rootSaga", () => {
		const generator = rootSaga();
		expect(generator.next().value).toEqual(all([
			watcherSubmitRequests(),
			watcherGetRequests()
		]));
	});

	it('should dispatch action "ON_SUBMIT_REQUEST"', () => {
		const generator = watcherSubmitRequests();
		expect(generator.next().value).toEqual(
			takeLatest(ON_SUBMIT_REQUEST, apiSubmitHandlerAsync)
		);
	});

	it('should dispatch action "GET_PLANS_LIST" ', () => {
		const generator = watcherGetRequests();
		expect(generator.next().value).toEqual(
			takeLatest(GET_PLANS_LIST, apiGetHandlerAsync)
		);
	});

	it('should dispatch action "ON_SUBMIT_REQUEST_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const action = {
			payload : "demo"
		}
		const generator = apiSubmitHandlerAsync(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: ON_SUBMIT_REQUEST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_PLANS_LIST_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const generator = apiGetHandlerAsync();
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_PLANS_LIST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "ON_SUBMIT_REQUEST_FAILURE" with result from fetch News API', () => {
		const action = {
			payload : "demo"
		}
		const error = "error";
		const gen = apiSubmitHandlerAsync(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, ON_SUBMIT_REQUEST_FAILURE)
		);
	});

	it('should dispatch action "GET_PLANS_LIST_FAILURE" with result from fetch News API', () => {
		const error = "error";
		const gen = apiGetHandlerAsync();
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_PLANS_LIST_FAILURE)
		);
	});
});
