import { fromJS } from "immutable";
import {
	getLandmarkSuccess,
	getLandmarkFailure,
	landmarkDeleteSuccess,
	landmarkDeleteFailure
} from "../selectors";

const mockState = fromJS({
	managePipeLineLandmark: {
		getLandmarkSuccess: "getLandmarkSuccess",
		getLandmarkFailure: "getLandmarkFailure",
		landmarkDeleteSuccess: "landmarkDeleteSuccess",
		landmarkDeleteFailure: "landmarkDeleteFailure"
	}
});

describe("selectManagePipeLineLandmarkDomain", () => {
	it("should return getLandmarkSuccess state", () => {
		const functioncalls = getLandmarkSuccess();
		expect(functioncalls(mockState)).toEqual("getLandmarkSuccess");
	});
	it("should return getLandmarkFailure state", () => {
		const functioncalls = getLandmarkFailure();
		expect(functioncalls(mockState)).toEqual("getLandmarkFailure");
	});
	it("should return landmarkDeleteSuccess state", () => {
		const functioncalls = landmarkDeleteSuccess();
		expect(functioncalls(mockState)).toEqual("landmarkDeleteSuccess");
	});
	it("should return landmarkDeleteFailure state", () => {
		const functioncalls = landmarkDeleteFailure();
		expect(functioncalls(mockState)).toEqual("landmarkDeleteFailure");
	});
});