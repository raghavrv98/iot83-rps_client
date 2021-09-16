import { getAuthConfigDetails, onSubmitHandler, deleteConfig } from '../actions';
import { GET_AUTH_CONFIG_DETAILS, SUBMIT_REQUEST, DELETE_CONFIG } from '../constants';

describe('ManageOAuthConfig actions', () => {
  
  describe('Default Action', () => {
    it('has a type of GET_AUTH_CONFIG_DETAILS', () => {
      const expected = {
        type: GET_AUTH_CONFIG_DETAILS,
      };
      expect(getAuthConfigDetails()).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of SUBMIT_REQUEST', () => {
      const expected = {
        type: SUBMIT_REQUEST,
        payload : "demoPayload"
      };
      expect(onSubmitHandler("demoPayload")).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of DELETE_CONFIG', () => {
      const expected = {
        type: DELETE_CONFIG,
        id: "demoId"
      };
      expect(deleteConfig("demoId")).toEqual(expected);
    });
  });

});
