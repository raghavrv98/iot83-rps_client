import { fromJS } from 'immutable';
import { selectAddOrEditPipeLineDomain } from '../selectors';
import {
    getSubmitSuccess,
    getSubmitError,
    getpipelineDetailsSuccess,
    getpipelineDetailsFailure
  } from "../selectors";

  const mockState = fromJS({
    addOrEditPipeLine: {
        onSubmitSuccess: "onSubmitSuccess",
        onSubmitFailure: "onSubmitFailure",
        pipelineDetailsSuccess: "pipelineDetailsSuccess",
        pipelineDetailsFailure: "pipelineDetailsFailure"
    }
  });

describe('selectAddOrEditPipeLineDomain', () => {
it('Expect to have unit tests specified', () => {
expect(true).toEqual(true);
});
it("should return getSubmitSuccess state", () => {
    const functioncalls = getSubmitSuccess();
    expect(functioncalls(mockState)).toEqual("onSubmitSuccess");
  });
  it("should return getSubmitError state", () => {
    const functioncalls = getSubmitError();
    expect(functioncalls(mockState)).toEqual("onSubmitFailure");
  });
  it("should return getAgentDataSuccess state", () => {
    const functioncalls = getpipelineDetailsSuccess();
    expect(functioncalls(mockState)).toEqual("pipelineDetailsSuccess");
  });
  it("should return getAgentDataFailure state", () => {
    const functioncalls = getpipelineDetailsFailure();
    expect(functioncalls(mockState)).toEqual("pipelineDetailsFailure");
  });
});