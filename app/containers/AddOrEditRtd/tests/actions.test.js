import { onSubmitHandler, getZoneDetails } from '../actions';
import { ON_SUBMIT_REQUEST, GET_ZONE_DETAILS } from '../constants';

describe('AddOrEditRtd actions', () => {
  
  describe("create Landmark Handler", () => {
    it("has a type of ON_SUBMIT_REQUEST", () => {
      const expected = {
        type: ON_SUBMIT_REQUEST,
        payload: "demoPayload",
        plantId: "demoPlantId",
        pipelineId: "demoPipelineId",
        zoneId: "demoZoneId",
        isBulkUpload: "demoIsBulkUpload"
      };
      expect(onSubmitHandler("demoPayload", "demoPlantId", "demoPipelineId", "demoZoneId", "demoIsBulkUpload")).toEqual(expected);
    });
  });

  describe("create Landmark Handler", () => {
    it("has a type of GET_ZONE_DETAILS", () => {
      const expected = {
        type: GET_ZONE_DETAILS,
        plantId: "demoPlantId",
        pipelineId: "demoPipelineId",
        zoneId: "demoZoneId"
      };
      expect(getZoneDetails("demoPlantId", "demoPipelineId", "demoZoneId")).toEqual(expected);
    });
  });

});
