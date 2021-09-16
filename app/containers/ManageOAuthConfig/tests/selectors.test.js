import { fromJS } from "immutable";
import {
	authConfigDetailsSuccess,
	authConfigDetailsFailure,
	submitRequestSuccess,
	submitRequestFailure,
	deleteConfigSuccess,
	deleteConfigFailure
} from "../selectors";

const mockState = fromJS({
	manageOAuthConfig: {
		authConfigDetailsSuccess: "authConfigDetailsSuccess",
		authConfigDetailsFailure: "authConfigDetailsFailure",
		submitRequestSuccess: "submitRequestSuccess",
		submitRequestFailure: "submitRequestFailure",
		deleteConfigSuccess: "deleteConfigSuccess",
		deleteConfigFailure: "deleteConfigFailure"
	}
});

describe("selectManageOAuthConfigDomain", () => {

	it("should return authConfigDetailsSuccess state", () => {
		const functioncalls = authConfigDetailsSuccess();
		expect(functioncalls(mockState)).toEqual("authConfigDetailsSuccess");
	});
	it("should return authConfigDetailsFailure state", () => {
		const functioncalls = authConfigDetailsFailure();
		expect(functioncalls(mockState)).toEqual("authConfigDetailsFailure");
	});
	it("should return submitRequestSuccess state", () => {
		const functioncalls = submitRequestSuccess();
		expect(functioncalls(mockState)).toEqual("submitRequestSuccess");
	});
	it("should return submitRequestFailure state", () => {
		const functioncalls = submitRequestFailure();
		expect(functioncalls(mockState)).toEqual("submitRequestFailure");
	});
	it("should return deleteConfigSuccess state", () => {
		const functioncalls = deleteConfigSuccess();
		expect(functioncalls(mockState)).toEqual("deleteConfigSuccess");
	});
	it("should return deleteConfigFailure state", () => {
		const functioncalls = deleteConfigFailure();
		expect(functioncalls(mockState)).toEqual("deleteConfigFailure");
	});
});