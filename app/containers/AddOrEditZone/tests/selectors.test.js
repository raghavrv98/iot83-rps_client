import { fromJS } from 'immutable';
import { getSubmitSuccess, getSubmitError, getDetailsSuccess, getDetailsError } from '../selectors';

const mockState = fromJS({
  addOrEditZone: {
    onSubmitSuccess: "onSubmitSuccess",
    onSubmitFailure: "onSubmitFailure",
    zoneDetailsSuccess: "zoneDetailsSuccess",
    zoneDetailsFailure: "zoneDetailsFailure"
  }
});
describe("selectAddOrEditZoneDomain", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("should return getSubmitSuccess state", () => {
    const functioncalls = getSubmitSuccess();
    expect(functioncalls(mockState)).toEqual("onSubmitSuccess");
  });
  it("should return getSubmitSuccess state", () => {
    const functioncalls = getSubmitError();
    expect(functioncalls(mockState)).toEqual("onSubmitFailure");
  });
  it("should return getSubmitSuccess state", () => {
    const functioncalls = getDetailsSuccess();
    expect(functioncalls(mockState)).toEqual("zoneDetailsSuccess");
  });
  it("should return getSubmitSuccess state", () => {
    const functioncalls = getDetailsError();
    expect(functioncalls(mockState)).toEqual("zoneDetailsFailure");
  });
});
