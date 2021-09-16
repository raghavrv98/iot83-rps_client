import { getZoneList, zoneDeleteHandler } from "../actions";
import { GET_ZONE_LIST, ZONE_DELETE } from "../constants";

describe("ManageZones actions", () => {
  describe("getzone list", () => {
    it("has a type of GET_ZONE_LIST", () => {
      const expected = {
        type: GET_ZONE_LIST,
        plantId: "plantId",
        pipelineId: "pipelineId"
      };
      expect(getZoneList("plantId", "pipelineId")).toEqual(expected);
    });
  });

  describe("Delete zone", () => {
    it("has a type of ZONE_DELETE", () => {
      const expected = {
        type: ZONE_DELETE,
        plantId: "plantId",
        pipelineId: "pipelineId",
        multiple:"multiple",
        zoneId: "zoneId"
      };
      expect(zoneDeleteHandler("plantId", "pipelineId", "multiple", "zoneId")).toEqual(
        expected
      );
    });
  });
});
