// import { fromJS } from 'immutable';
// import { selectAddorEditPipeLineLandmarkDomain } from '../selectors';

describe('selectAddorEditPipeLineLandmarkDomain', () => {
	it('Expect to have unit tests specified', () => {
		expect(true).toEqual(true);
	});
});



import { fromJS } from "immutable";
import {
	selectAddorEditPipeLineLandmarkDomain,
	getLandmarkDetailsSuccess,
	getLandmarkDetailsFailure,
	createLandmarkDetailsSuccess,
	createLandmarkDetailsFailure,
	uploadLandmarkImageSuccess,
	uploadLandmarkImageFailure

} from "../selectors";

const mockState = fromJS({
	addorEditPipeLineLandmark: {
		getLandmarkDetailsSuccess: "getLandmarkDetailsSuccess",
		getLandmarkDetailsFailure: "getLandmarkDetailsFailure",
		createLandmarkDetailsSuccess: "createLandmarkDetailsSuccess",
		createLandmarkDetailsFailure: "createLandmarkDetailsFailure",
		uploadLandmarkImageSuccess: "uploadLandmarkImageSuccess",
		uploadLandmarkImageFailure: "uploadLandmarkImageFailure"
	}
});

describe("selectAddorEditPipeLineLandmarkDomain", () => {
	it("Expect to have unit tests specified", () => {
		expect(true).toEqual(true);
	});
	it("should return getLandmarkDetailsSuccess state", () => {
		const functioncalls = getLandmarkDetailsSuccess();
		expect(functioncalls(mockState)).toEqual("getLandmarkDetailsSuccess");
	});
	it("should return getLandmarkDetailsFailure state", () => {
		const functioncalls = getLandmarkDetailsFailure();
		expect(functioncalls(mockState)).toEqual("getLandmarkDetailsFailure");
	});
	it("should return createLandmarkDetailsSuccess state", () => {
		const functioncalls = createLandmarkDetailsSuccess();
		expect(functioncalls(mockState)).toEqual("createLandmarkDetailsSuccess");
	});
	it("should return createLandmarkDetailsFailure state", () => {
		const functioncalls = createLandmarkDetailsFailure();
		expect(functioncalls(mockState)).toEqual("createLandmarkDetailsFailure");
	});
	it("should return uploadLandmarkImageSuccess state", () => {
		const functioncalls = uploadLandmarkImageSuccess();
		expect(functioncalls(mockState)).toEqual("uploadLandmarkImageSuccess");
	});
	it("should return uploadLandmarkImageFailure state", () => {
		const functioncalls = uploadLandmarkImageFailure();
		expect(functioncalls(mockState)).toEqual("uploadLandmarkImageFailure");
	});
});
