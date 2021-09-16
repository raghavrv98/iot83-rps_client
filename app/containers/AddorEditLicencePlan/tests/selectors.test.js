import { fromJS } from "immutable";
import {
	getSubmitSuccess,
	getSubmitError,
	getPlansSuccess,
	getPlansFailure
} from "../selectors";

const mockState = fromJS({
	addorEditLicencePlan: {
		onSubmitSuccess: "onSubmitSuccess",
		onSubmitFailure: "onSubmitFailure",
		getPlansSuccess: "getPlansSuccess",
		getPlansFailure: "getPlansFailure"
	}
});

describe("selectAddorEditLicencePlanDomain", () => {
	it("should return onSubmitSuccess state", () => {
		const functioncalls = getSubmitSuccess();
		expect(functioncalls(mockState)).toEqual("onSubmitSuccess");
	});
	it("should return onSubmitFailure state", () => {
		const functioncalls = getSubmitError();
		expect(functioncalls(mockState)).toEqual("onSubmitFailure");
	});
	it("should return getPlansSuccess state", () => {
		const functioncalls = getPlansSuccess();
		expect(functioncalls(mockState)).toEqual("getPlansSuccess");
	});
	it("should return getPlansFailure state", () => {
		const functioncalls = getPlansFailure();
		expect(functioncalls(mockState)).toEqual("getPlansFailure");
	});
});
