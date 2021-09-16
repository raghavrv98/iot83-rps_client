import { fromJS } from "immutable";
import {
  selectAddOrEditAgentDomain,
  getAgentSuccess,
  getAgentFailure,
  getAgentDataSuccess,
  getAgentDataFailure
} from "../selectors";

const mockState = fromJS({
  addOrEditAgent: {
    createAgentSuccess: "createAgentSuccess",
    createAgentFailure: "createAgentFailure",
    agentDetailsSuccess: "agentDetailsSuccess",
    agentDetailsFailure: "agentDetailsFailure"
  }
});

describe("selectAddOrEditAgentDomain", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });
  it("should return getAgentSuccess state", () => {
    const functioncalls = getAgentSuccess();
    expect(functioncalls(mockState)).toEqual("createAgentSuccess");
  });
  it("should return getAgentFailure state", () => {
    const functioncalls = getAgentFailure();
    expect(functioncalls(mockState)).toEqual("createAgentFailure");
  });
  it("should return getAgentDataSuccess state", () => {
    const functioncalls = getAgentDataSuccess();
    expect(functioncalls(mockState)).toEqual("agentDetailsSuccess");
  });
  it("should return getAgentDataFailure state", () => {
    const functioncalls = getAgentDataFailure();
    expect(functioncalls(mockState)).toEqual("agentDetailsFailure");
  });
});
