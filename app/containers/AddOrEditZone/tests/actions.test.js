import {
  onSubmitHandler,
  getZoneDetails,
  resetToInitailState
} from "../actions";
import {
  ON_SUBMIT_REQUEST,
  RESET_TO_INITIAL_STATE,
  GET_ZONE_DETAILS
} from "../constants";

describe("AddOrEditZone actions", () => {
  describe("SUBMIT REQUEST", () => {
    it("has a type of ON_SUBMIT_REQUEST", () => {
    const expected = {
      type: ON_SUBMIT_REQUEST,
      payload: "demo",
      plantId: "demo",
      pipelineId: "demo",
      zoneId: "demo"
    };
    expect(onSubmitHandler("demo", "demo", "demo", "demo")).toEqual(expected);
  });
  
});


  describe("Get Agent List", () => {
    it("has a type of GET_ZONE_DETAILS", () => {
      const expected = {
        type: GET_ZONE_DETAILS,
        plantId: "demo",
        pipelineId: "demo",
        zoneId: "demo"
      };
      expect(getZoneDetails("demo","demo","demo",)).toEqual(expected);
    });
  });
  describe("RESET TO INITIAL STATE", () => {
    it("has a type of RESET_TO_INITIAL_STATE", () => {
      const expected = {
        type: RESET_TO_INITIAL_STATE,
      };
      expect(resetToInitailState()).toEqual(expected);
    });
  });
});
