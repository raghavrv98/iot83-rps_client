import {  CREATE_AGENT_REQUEST, GET_AGENT_DETAILS} from "../constants";
import { createAgent, getAgentDetails } from "../actions";

describe("AddOrEditAgent actions", () => {
  
  describe("Create Agent", () => {
    it("has a type of CREATE_AGENT_REQUEST", () => {
      const expected = {
        type: CREATE_AGENT_REQUEST,
        payload:"demo"
      };
      expect(createAgent("demo")).toEqual(expected);
    });
  });

  describe("Get Agent List", () => {
    it("has a type of GET_AGENT_DETAILS", () => {
      const expected = {
        type: GET_AGENT_DETAILS,
        id:"demoId"
      };
      expect(getAgentDetails("demoId")).toEqual(expected);
    });
  });

});
