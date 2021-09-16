import { defaultAction, getSecretKeys, generateKeyhandler,secretActiveDeactiveHandler,getAccountDetails,deleteSecretKey } from '../actions';
import { DEFAULT_ACTION, GENERATE_KEY_REQUEST, SECRET_KEY_REQUEST, SECRET_STATUS_REQUEST, ACCOUNT_DETAILS_REQUEST,DELETE_SECRET_KEY } from "../constants";

describe('Settings actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Generate Key handler Action', () => {
    it('has a type of GENERATE_KEY_REQUEST', () => {
      const payload = {
        defaultAction : "generateKeyhandler",
      }
      const expected = {
        type: GENERATE_KEY_REQUEST,
        payload
      };
      expect(generateKeyhandler(payload)).toEqual(expected);
    });
  });

  describe('getSecretKeys Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: SECRET_KEY_REQUEST,
      };
      expect(getSecretKeys()).toEqual(expected);
    });
  });

  describe('secretActiveDeactiveHandler Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: SECRET_STATUS_REQUEST, 
        id:"demo", status:"demo"
      };
      expect(secretActiveDeactiveHandler("demo","demo")).toEqual(expected);
    });
  });

  describe('getAccountDetails Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: ACCOUNT_DETAILS_REQUEST
      };
      expect(getAccountDetails()).toEqual(expected);
    });
  });

  describe('Get Secret Keys Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DELETE_SECRET_KEY, 
        id:"demo"
      };
      expect(deleteSecretKey("demo")).toEqual(expected);
    });
  });
});
