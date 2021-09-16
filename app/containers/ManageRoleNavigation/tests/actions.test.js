import { defaultAction, getMenus, getAllMenus, saveMenu } from '../actions';
import { DEFAULT_ACTION, GET_MENUS, GET_ALL_MENUS, SAVE_MENUS } from '../constants';

describe('ManageRoleNavigation actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Get Menus', () => {
    it('has a type of GET_MENUS', () => {
      const expected = {
        type: GET_MENUS,
        id: 1
      };
      expect(getMenus(1)).toEqual(expected);
    });
  });

  describe('Get All Menus', () => {
    it('has a type of GET_ALL_MENUS', () => {
      const expected = {
        type: GET_ALL_MENUS,
      };
      expect(getAllMenus()).toEqual(expected);
    });
  });

  describe('Save Menus', () => {
    it('has a type of SAVE_MENUS', () => {
      const expected = {
        type: SAVE_MENUS,
        payload: "demo",
        id: 1
      };
      expect(saveMenu("demo",1)).toEqual(expected);
    });
  });
});
