import { fromJS } from "immutable";
import addOrEditAgentReducer from "../reducer";

import {
  CREATE_AGENT_REQUEST,
  CREATE_AGENT_SUCCESS,
  CREATE_AGENT_FAILURE,
  GET_AGENT_DETAILS_SUCCESS,
  GET_AGENT_DETAILS_FAILURE
} from "../constants";

describe("addOrEditAgentReducer", () => {
  it("returns the initial state", () => {
    expect(addOrEditAgentReducer(undefined, {})).toEqual(fromJS({}));
  });
  it("returns the CREATE_AGENT_SUCCESS", () => {
    expect(addOrEditAgentReducer(undefined, {
      type: CREATE_AGENT_SUCCESS,
      response: "Request Completed Successfully"
    })).toEqual(fromJS({
      createAgentSuccess:"Request Completed Successfully"
    }));
  });
  it("returns the CREATE_AGENT_FAILURE", () => {
    expect(addOrEditAgentReducer(undefined, {
      type: CREATE_AGENT_FAILURE,
      error: "Expection"
    })).toEqual(fromJS({
      createAgentFailure: "Expection"
    }));
  });
  it("returns the GET_AGENT_DETAILS_SUCCESS", () => {
    expect(addOrEditAgentReducer(undefined, {
      type: GET_AGENT_DETAILS_SUCCESS,
      response: "Request Completed Successfully"
    })).toEqual(fromJS({
      agentDetailsSuccess: "Request Completed Successfully"
    }));
  });
  it("returns the GET_AGENT_DETAILS_FAILURE", () => {
    expect(addOrEditAgentReducer(undefined, {
      type: GET_AGENT_DETAILS_FAILURE,
      error: "Expection"
    })).toEqual(fromJS({
      agentDetailsFailure: "Expection"
    }));
  });
  it("returns the CREATE_AGENT_SUCCESS", () => {
    expect(addOrEditAgentReducer(undefined, {
      type: CREATE_AGENT_REQUEST,
    })).toEqual(fromJS({
      createAgentFailure:undefined
    }));
  });
});
