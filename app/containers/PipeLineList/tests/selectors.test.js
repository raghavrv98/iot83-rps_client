import { fromJS } from "immutable";
import {
  pipelineList,
  pipelineListFailure,
  getpipeLineDelete,
  getpipeLineDeleteFailure,
  getAlarmList,
  getAlarmListFailure,
  plantList,
  plantListFailure
} from "../selectors";

const mockState = fromJS({
  pipeLineList: {
    pipelineList: "success",
    pipelineListFailure: "Exception",
    pipeLineDelete: "deleted successfully.",
    pipeLineDeleteFailure: "Exception",
    plantList: "success",
    plantListFailure: "Exception",
    getAlarmList: "success",
    getAlarmListFailure: "Exception"
  }
});

  it("should return plantList state ", () => {
    const functioncalls = plantList();
    expect(functioncalls(mockState)).toEqual("success");
  });

  it("should return plantListFailure state ", () => {
    const functioncalls = plantListFailure();
    expect(functioncalls(mockState)).toEqual("Exception");
  });

  it("should return getAlarmList state ", () => {
    const functioncalls = getAlarmList();
    expect(functioncalls(mockState)).toEqual("success");
  });

  it("should return getAlarmListFailure state ", () => {
    const functioncalls = getAlarmListFailure();
    expect(functioncalls(mockState)).toEqual("Exception");
  });
  
  it("should return pipelineList state ", () => {
    const functioncalls = pipelineList();
    expect(functioncalls(mockState)).toEqual("success");
  });

  it("should return pipelineListFailure state ", () => {
    const functioncalls = pipelineListFailure();
    expect(functioncalls(mockState)).toEqual("Exception");
  });

  it("should return pipeLineDelete state ", () => {
    const functioncalls = getpipeLineDelete();
    expect(functioncalls(mockState)).toEqual("deleted successfully.");
  });

  it("should return pipeLineDeleteFailure state ", () => {
    const functioncalls = getpipeLineDeleteFailure();
    expect(functioncalls(mockState)).toEqual("Exception");
  });

