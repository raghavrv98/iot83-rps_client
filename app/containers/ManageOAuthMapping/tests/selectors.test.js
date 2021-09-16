import { fromJS } from "immutable";
import {
	getRolesListSuccess,
	getRolesListFailure,
	getGroupsListSuccess,
	getGroupsListFailure,
	getMappingListSuccess,
	getMappingListFailure,
	submitMappingRequestSuccess,
	submitMappingRequestFailure
} from "../selectors";

const mockState = fromJS({
	manageOAuthMapping: {
		getRolesListSuccess: "getRolesListSuccess",
		getRolesListFailure: "getRolesListFailure",
		getGroupsListSuccess: "getGroupsListSuccess",
		getGroupsListFailure: "getGroupsListFailure",
		getMappingListSuccess: "getMappingListSuccess",
		getMappingListFailure: "getMappingListFailure",
		submitMappingRequestSuccess: "submitMappingRequestSuccess",
		submitMappingRequestFailure: "submitMappingRequestFailure"
	}
});

describe("selectManageOAuthMappingDomain", () => {

	it("should return getRolesListSuccess state", () => {
		const functioncalls = getRolesListSuccess();
		expect(functioncalls(mockState)).toEqual("getRolesListSuccess");
	});
	it("should return getRolesListFailure state", () => {
		const functioncalls = getRolesListFailure();
		expect(functioncalls(mockState)).toEqual("getRolesListFailure");
	});
	it("should return getGroupsListSuccess state", () => {
		const functioncalls = getGroupsListSuccess();
		expect(functioncalls(mockState)).toEqual("getGroupsListSuccess");
	});
	it("should return getGroupsListFailure state", () => {
		const functioncalls = getGroupsListFailure();
		expect(functioncalls(mockState)).toEqual("getGroupsListFailure");
	});
	it("should return getMappingListSuccess state", () => {
		const functioncalls = getMappingListSuccess();
		expect(functioncalls(mockState)).toEqual("getMappingListSuccess");
	});
	it("should return getMappingListFailure state", () => {
		const functioncalls = getMappingListFailure();
		expect(functioncalls(mockState)).toEqual("getMappingListFailure");
	});
	it("should return submitMappingRequestSuccess state", () => {
		const functioncalls = submitMappingRequestSuccess();
		expect(functioncalls(mockState)).toEqual("submitMappingRequestSuccess");
	});
	it("should return submitMappingRequestFailure state", () => {
		const functioncalls = submitMappingRequestFailure();
		expect(functioncalls(mockState)).toEqual("submitMappingRequestFailure");
	});
});