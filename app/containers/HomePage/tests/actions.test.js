import { defaultAction, getNav, getVersion } from '../actions';
import { DEFAULT_ACTION, GET_NAVIGATION, GET_VERSION } from '../constants';

describe('HomePage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Get Navigation', () => {
    it('has a type of GET_NAVIGATION', () => {
      const expected = {
        type: GET_NAVIGATION,
      };
      expect(getNav()).toEqual(expected);
    });
  });
  
  describe('Get Navigation', () => {
    it('has a type of GET_VERSION', () => {
      const expected = {
        type: GET_VERSION,
      };
      expect(getVersion()).toEqual(expected);
    });
  });
});
