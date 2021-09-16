import { getRolesList, getGroupsList, getMappingList, mappingSubmitRequest } from '../actions';
import { GET_ROLES_LIST, GET_GROUPS_LIST, GET_MAPPING_LIST, SUBMIT_MAPPING_REQUEST } from '../constants';

describe('ManageOAuthMapping actions', () => {

  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_ROLES_LIST,
      };
      expect(getRolesList()).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_GROUPS_LIST,
      };
      expect(getGroupsList()).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_MAPPING_LIST,
      };
      expect(getMappingList()).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: SUBMIT_MAPPING_REQUEST,
        payload : "demoPayload"
      };
      expect(mappingSubmitRequest("demoPayload")).toEqual(expected);
    });
  });

});
