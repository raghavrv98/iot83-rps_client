import { fromJS } from "immutable";
import {
	licenseListSuccess,
	licenseListFailure,
	licenseDeleteSuccess,
	licenseDeleteFailure
} from "../selectors";

const mockState = fromJS({
	manageLicencePlan: {
		licenseListSuccess: "licenseListSuccess",
		licenseListFailure: "licenseListFailure",
		licenseDeleteSuccess: "licenseDeleteSuccess",
		licenseDeleteFailure: "licenseDeleteFailure"
	}
});

describe("selectManageLicencePlanDomain", () => {
	it("should return licenseListSuccess state", () => {
		const functioncalls = licenseListSuccess();
		expect(functioncalls(mockState)).toEqual("licenseListSuccess");
	});
	it("should return licenseListFailure state", () => {
		const functioncalls = licenseListFailure();
		expect(functioncalls(mockState)).toEqual("licenseListFailure");
	});
	it("should return licenseDeleteSuccess state", () => {
		const functioncalls = licenseDeleteSuccess();
		expect(functioncalls(mockState)).toEqual("licenseDeleteSuccess");
	});
	it("should return licenseDeleteFailure state", () => {
		const functioncalls = licenseDeleteFailure();
		expect(functioncalls(mockState)).toEqual("licenseDeleteFailure");
	});
});