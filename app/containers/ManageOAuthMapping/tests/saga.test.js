/**
* Test sagas
*/

import {
	GET_ROLES_LIST,
	GET_ROLES_LIST_SUCCESS,
	GET_ROLES_LIST_FAILURE,
	GET_GROUPS_LIST,
	GET_GROUPS_LIST_SUCCESS,
	GET_GROUPS_LIST_FAILURE,
	GET_MAPPING_LIST,
	GET_MAPPING_LIST_SUCCESS,
	GET_MAPPING_LIST_FAILURE,
	SUBMIT_MAPPING_REQUEST,
	SUBMIT_MAPPING_REQUEST_SUCCESS,
	SUBMIT_MAPPING_REQUEST_FAILURE
} from '../constants';

import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
	watcherGetRolesList,
	watcherGetGroupsList,
	watcherGetMappingList,
	watcherSubmitMappingRequest,
	apiSubmitMappingRequestHandlerAsync,
	apiGetMappingListHandlerAsync,
	apiGetGroupsListHandlerAsync,
	apiGetRolesListHandlerAsync

} from "../saga";

describe("ManageOAuthMapping Plan Saga", () => {

	it("unit testing on rootSaga", () => {
		const generator = rootSaga();
		expect(generator.next().value).toEqual(all([
			watcherGetRolesList(),
			watcherGetGroupsList(),
			watcherGetMappingList(),
			watcherSubmitMappingRequest(),
		]));
	});

	it('should dispatch action "GET_ROLES_LIST"', () => {
		const generator = watcherGetRolesList();
		expect(generator.next().value).toEqual(
			takeLatest(GET_ROLES_LIST, apiGetRolesListHandlerAsync)
		);
	});

	it('should dispatch action "GET_GROUPS_LIST" ', () => {
		const generator = watcherGetGroupsList();
		expect(generator.next().value).toEqual(
			takeLatest(GET_GROUPS_LIST, apiGetGroupsListHandlerAsync)
		);
	});

	it('should dispatch action "GET_MAPPING_LIST" ', () => {
		const generator = watcherGetMappingList();
		expect(generator.next().value).toEqual(
			takeLatest(GET_MAPPING_LIST, apiGetMappingListHandlerAsync)
		);
	});

	it('should dispatch action "SUBMIT_MAPPING_REQUEST" ', () => {
		const generator = watcherSubmitMappingRequest();
		expect(generator.next().value).toEqual(
			takeLatest(SUBMIT_MAPPING_REQUEST, apiSubmitMappingRequestHandlerAsync)
		);
	});

	it('should dispatch action "GET_ROLES_LIST_SUCCESS" with result from fetch News API', () => {
		const response = {
			data: {
				data: true
			}
		};

		const generator = apiGetRolesListHandlerAsync();
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_ROLES_LIST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_GROUPS_LIST_SUCCESS" with result from fetch News API', () => {

		const response = {
			data: {
				data: true
			}
		};

		const generator = apiGetGroupsListHandlerAsync();
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_GROUPS_LIST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_MAPPING_LIST_SUCCESS" with result from fetch News API', () => {

		const response = {
			data: {
				data: true
			}
		};

		const generator = apiGetMappingListHandlerAsync();
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: GET_MAPPING_LIST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "SUBMIT_MAPPING_REQUEST_SUCCESS" with result from fetch News API', () => {

		const action = {
			payload: "demo"
		};

		const response = {
			data: {
				data: true
			}
		};

		const generator = apiSubmitMappingRequestHandlerAsync(action);
		generator.next();
		expect(generator.next(response).value).toEqual(
			put({ type: SUBMIT_MAPPING_REQUEST_SUCCESS, response: true })
		);
		expect(generator.next().done).toBeTruthy();
	});

	it('should dispatch action "GET_ROLES_LIST_FAILURE" with result from fetch News API', () => {

		const error = "error";
		const gen = apiGetRolesListHandlerAsync();
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_ROLES_LIST_FAILURE)
		);
	});

	it('should dispatch action "GET_GROUPS_LIST_FAILURE" with result from fetch News API', () => {
		const error = "error";
		const gen = apiGetGroupsListHandlerAsync();
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_GROUPS_LIST_FAILURE)
		);
	});

	it('should dispatch action "GET_MAPPING_LIST_FAILURE" with result from fetch News API', () => {
		const error = "error";
		const gen = apiGetMappingListHandlerAsync();
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, GET_MAPPING_LIST_FAILURE)
		);
	});

	it('should dispatch action "SUBMIT_MAPPING_REQUEST_FAILURE" with result from fetch News API', () => {
		const error = "error";
		const action = {
			payload: "demo"
		};
		const gen = apiSubmitMappingRequestHandlerAsync(action);
		gen.next();
		expect(gen.throw(error).value).toEqual(
			errorHandler(error, SUBMIT_MAPPING_REQUEST_FAILURE)
		);
	});
});
