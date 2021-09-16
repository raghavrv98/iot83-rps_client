import { defaultAction,getMenu, navlistSaveHandler } from '../actions';
import { DEFAULT_ACTION, GET_MENU_REQUEST, MENU_SAVE_HANDLER } from '../constants';

describe('ManageNavigation actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Get Menu Action', () => {
    it('has a type of GET_MENU_REQUEST', () => {
      const expected = {
        type: GET_MENU_REQUEST,
      };
      expect(getMenu()).toEqual(expected);
    });
  });

  describe('Get Menu Request', () => {
    it('has a type of MENU_SAVE_HANDLER', () => {
      const expected = {
        type: MENU_SAVE_HANDLER,
        payload: "demo"
      };
      expect(navlistSaveHandler("demo")).toEqual(expected);
    });
  });
});
