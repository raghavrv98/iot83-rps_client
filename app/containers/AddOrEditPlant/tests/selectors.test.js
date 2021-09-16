import { fromJS } from 'immutable';
import {
    createPlantSuccess,
    createPlantFailure,
    getDetailsSuccess,
    getDetailsFailure,
    plantImageUplaod,
    plantImageUplaodFailure,
  } from "../selectors";
const mockState = fromJS({
    addOrEditPlant: {
        createPlantSuccess: "createPlantSuccess",
        createPlantFailure: "createPlantFailure",
        getDetailsSuccess: "getDetailsSuccess",
        getDetailsFailure: "getDetailsFailure",
        plantImageUplaod:"plantImageUplaod",
        plantImageUplaodFailure:"plantImageUplaodFailure"
    }
  });

describe('selectAddOrEditPlantDomain', () => {
it('Expect to have unit tests specified', () => {
expect(true).toEqual(true);
});
it("should return createPlantSuccess state", () => {
    const functioncalls = createPlantSuccess();
    expect(functioncalls(mockState)).toEqual("createPlantSuccess");
  });
  it("should return createPlantFailure state", () => {
    const functioncalls = createPlantFailure();
    expect(functioncalls(mockState)).toEqual("createPlantFailure");
  });
  it("should return getDetailsSuccess state", () => {
    const functioncalls = getDetailsSuccess();
    expect(functioncalls(mockState)).toEqual("getDetailsSuccess");
  });
  it("should return getDetailsFailure state", () => {
    const functioncalls = getDetailsFailure();
    expect(functioncalls(mockState)).toEqual("getDetailsFailure");
  });
  it("should return getDetailsFailure state", () => {
    const functioncalls = plantImageUplaod();
    expect(functioncalls(mockState)).toEqual("plantImageUplaod");
  });
  it("should return getDetailsFailure state", () => {
    const functioncalls = plantImageUplaodFailure();
    expect(functioncalls(mockState)).toEqual("plantImageUplaodFailure");
  });
});