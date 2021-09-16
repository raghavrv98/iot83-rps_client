import { fromJS } from "immutable";
import {
	getPlansList,
	getPlansListError,
	submitRequestSuccess,
	submitRequestFailure,
	licenseKeySuccess,
	licenseKeyFailure
} from "../selectors";

const mockState = fromJS({
	manageLicence: {
		plansList: "plansList",
		plansListError: "plansListError",
		submitRequestSuccess: "submitRequestSuccess",
		submitRequestFailure: "submitRequestFailure",
		licenseKeySuccess: "licenseKeySuccess",
		licenseKeyFailure: "licenseKeyFailure"
	}
});

describe("selectManageLicenceDomain", () => {
	it("should return getPlansList state", () => {
		const functioncalls = getPlansList();
		console.log('functioncalls(mockState): ', functioncalls(mockState));
		expect(functioncalls(mockState)).toEqual("plansList");
	});
	it("should return getPlansListError state", () => {
		const functioncalls = getPlansListError();
		expect(functioncalls(mockState)).toEqual("plansListError");
	});
	it("should return submitRequestSuccess state", () => {
		const functioncalls = submitRequestSuccess();
		expect(functioncalls(mockState)).toEqual("submitRequestSuccess");
	});
	it("should return submitRequestFailure state", () => {
		const functioncalls = submitRequestFailure();
		expect(functioncalls(mockState)).toEqual("submitRequestFailure");
	});
	it("should return licenseKeySuccess state", () => {
		const functioncalls = licenseKeySuccess();
		expect(functioncalls(mockState)).toEqual("licenseKeySuccess");
	});
	it("should return licenseKeyFailure state", () => {
		const functioncalls = licenseKeyFailure();
		expect(functioncalls(mockState)).toEqual("licenseKeyFailure");
	});
});
