import { defaultAction,fetchMappingsList,getAgentDetails,deleteConfirm, saveMapping } from '../actions';

import { DEFAULT_ACTION, GET_MAPINGS, GET_AGENT,DELETE_MAPPING, SAVE_MAPPINGS } from '../constants';

describe('MappingList actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
    it('testing action dispatch fetchMappingsList', () => {
      const expected = {
        type: GET_MAPINGS,
        id: "demoId"
      };
      expect(fetchMappingsList("demoId")).toEqual(expected);
    });
    it('testing action dispatch getAgentDetails', () => {
      const expected = {
        type: GET_AGENT,
        id: "demoId"
      };
      expect(getAgentDetails("demoId")).toEqual(expected);
    });
    it('testing action dispatch deleteConfirm', () => {
      const expected = {
        type: DELETE_MAPPING,
        id: "demoId",
        mappingId: "demoId",
      };
      expect(deleteConfirm(expected.id,expected.mappingId)).toEqual(expected);
    });
    it('testing action dispatch deleteConfirm', () => {
      const expected = {
        type: SAVE_MAPPINGS,
        payload: "demo",
        id: "demoId",
      };
      expect(saveMapping(expected.payload,expected.id)).toEqual(expected);
    });
  });
});
