import { getZoneList, zoneDeleteHandler } from '../actions';
import { GET_ZONE_LIST, ZONE_DELETE } from '../constants';

describe('ManageRtd actions', () => {
  describe('GET ZONE LIST', () => {
    it('has a type of GET_ZONE_LIST', () => {
      const expected = {
        type: GET_ZONE_LIST,
        plantId: "demoPlantId",
        pipelineId: "demoPipelineId",
        payload: "demoPayload"
      };
      expect(getZoneList("demoPlantId", "demoPipelineId", "demoPayload")).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of ZONE DELETE', () => {
      const expected = {
        type: ZONE_DELETE,
        plantId: "demoPlantId",
        pipelineId: "demoPipelineId",
        multiple: "demoMultiple",
        zoneId: "demoZoneId"
      };
      expect(zoneDeleteHandler("demoPlantId", "demoPipelineId", "demoMultiple", "demoZoneId")).toEqual(expected);
    });
  });

});
