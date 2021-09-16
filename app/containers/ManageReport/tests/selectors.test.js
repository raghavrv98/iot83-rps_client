import { fromJS } from "immutable";
import {
	getReportListSuccess,
	getReportListFailure,
	plantList,
	plantListFailure,
	pipelineList,
	pipelineListFailure
} from "../selectors";

const mockState = fromJS({
	manageReport: {
		getReportListSuccess: "getReportListSuccess",
		getReportListFailure: "getReportListFailure",
		plantList: "plantList",
		plantListFailure: "plantListFailure",
		pipelineList: "pipelineList",
		pipelineListFailure: "pipelineListFailure"
	}
});

describe("selectManageReportDomain", () => {
	it("should return getReportListSuccess state", () => {
		const functioncalls = getReportListSuccess();
		expect(functioncalls(mockState)).toEqual("getReportListSuccess");
	});
	it("should return getReportListFailure state", () => {
		const functioncalls = getReportListFailure();
		expect(functioncalls(mockState)).toEqual("getReportListFailure");
	});
	it("should return plantList state", () => {
		const functioncalls = plantList();
		expect(functioncalls(mockState)).toEqual("plantList");
	});
	it("should return plantListFailure state", () => {
		const functioncalls = plantListFailure();
		expect(functioncalls(mockState)).toEqual("plantListFailure");
	});
	it("should return pipelineList state", () => {
		const functioncalls = pipelineList();
		expect(functioncalls(mockState)).toEqual("pipelineList");
	});
	it("should return pipelineListFailure state", () => {
		const functioncalls = pipelineListFailure();
		expect(functioncalls(mockState)).toEqual("pipelineListFailure");
	});
});