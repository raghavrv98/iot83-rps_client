import { fromJS } from "immutable";

import {
  plantsSuccess,
  plantsFailure,
  editSaveSuccess,
  editSaveFailure,
  fetchMappingDataSuccess,
  fetchMappingDataFailure,
  getAgentDetailsSuccess,
  getAgentDetailsFailure
} from "../selectors";


const mockState = fromJS({
  addOrEditMapping: {
    plantsListSuccess: "plantsListSuccess",
    plantsListFailure: "plantsListFailure",
    editSaveSuccess: "editSaveSuccess",
    editSaveFailure: "editSaveFailure",
    fetchMappingDataSuccess: "fetchMappingDataSuccess",
    fetchMappingDataFailure: "fetchMappingDataFailure",
    getAgentDetailsSuccess: "getAgentDetailsSuccess",
    getAgentDetailsFailure: "getAgentDetailsFailure"
  }
});
describe("selectAddOrEditMappingDomain", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });
  it("should return plantsSuccess state", () => {
    const functioncalls = plantsSuccess();
    expect(functioncalls(mockState)).toEqual("plantsListSuccess");
  });
  it("should return plantsFailure state", () => {
    const functioncalls = plantsFailure();
    expect(functioncalls(mockState)).toEqual("plantsListFailure");
  });
  it("should return editSaveSuccess state", () => {
    const functioncalls = editSaveSuccess();
    expect(functioncalls(mockState)).toEqual("editSaveSuccess");
  });
  it("should return editSaveFailure state", () => {
    const functioncalls = editSaveFailure();
    expect(functioncalls(mockState)).toEqual("editSaveFailure");
  });
  it("should return fetchMappingDataSuccess state", () => {
    const functioncalls = fetchMappingDataSuccess();
    expect(functioncalls(mockState)).toEqual("fetchMappingDataSuccess");
  });
  it("should return fetchMappingDataFailure state", () => {
    const functioncalls = fetchMappingDataFailure();
    expect(functioncalls(mockState)).toEqual("fetchMappingDataFailure");
  });
  it("should return getAgentDetailsSuccess state", () => {
    const functioncalls = getAgentDetailsSuccess();
    expect(functioncalls(mockState)).toEqual("getAgentDetailsSuccess");
  });
  it("should return fetchMappingDataSuccess state", () => {
    const functioncalls = getAgentDetailsFailure();
    expect(functioncalls(mockState)).toEqual("getAgentDetailsFailure");
  });
});
