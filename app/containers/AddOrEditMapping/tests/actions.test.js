import { defaultAction,getPlantList,handelMapping,getmappingDetails,getAgentDetails } from '../actions';
import { DEFAULT_ACTION, GET_PLANTS,GET_EDIT_SAVE_MAP,GET_MAPPING_DATA,GET_AGENT_DETAILS } from "../constants";

describe('AddOrEditMapping actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });

    it('testing action dispatch getPlantList', () => {
      const expected = {
        type: GET_PLANTS,
      };
      expect(getPlantList()).toEqual(expected);
    });

    it('testing action dispatch handelMapping', () => {
      const expected = {
        type: GET_EDIT_SAVE_MAP,
        payload:"demo",
        expId:"demoId",
        mapId:"demoId",
      };
      expect(handelMapping("demo","demoId","demoId")).toEqual(expected);
    });

    it('testing action dispatch getmappingDetails', () => {
      const expected = {
        type: GET_MAPPING_DATA,
        agentId: "demoId",
        mapId: "demoId",
      };
      expect(getmappingDetails("demoId","demoId")).toEqual(expected);
    });

    it('testing action dispatch getAgentDetails', () => {
      const expected = {
        type: GET_AGENT_DETAILS,
        id:"demoId",
      };
      expect(getAgentDetails("demoId")).toEqual(expected);
    });

  });
});
