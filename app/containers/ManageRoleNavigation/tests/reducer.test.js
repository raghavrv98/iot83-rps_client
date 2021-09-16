import { fromJS } from 'immutable';
import manageRoleNavigationReducer from '../reducer';
import {
  DEFAULT_ACTION, GET_MENUS_SUCCESS, GET_MENUS_FAILURE, 
  GET_ALL_MENUS_SUCCESS, GET_ALL_MENUS_FAILURE, 
  SAVE_MENUS_SUCCESS, SAVE_MENUS_FAILURE
} from '../constants'

describe('manageRoleNavigationReducer', () => {
  it('returns the initial state', () => {
    expect(manageRoleNavigationReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      manageRoleNavigationReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });

  it('should handle "GET_MENUS_SUCCESS" action', () => {
    let action = {
      type: GET_MENUS_SUCCESS,
      response: "Success",
    }
    expect(manageRoleNavigationReducer(fromJS({}),action).get("fetchMenus")).toEqual("Success")
  });

  it('should handle "GET_MENUS_FAILURE" action', () => {
    let action = {
      type: GET_MENUS_FAILURE,
      error: "Exception",
    }
    expect(manageRoleNavigationReducer(fromJS({}),action).get("fetchMenusError")).toEqual("Exception")
  })

  it('should handle "GET_ALL_MENUS_SUCCESS" action', () => {
    let action = {
      type: GET_ALL_MENUS_SUCCESS,
      response: "Success",
    }
    expect(manageRoleNavigationReducer(fromJS({}),action).get("fetchAllMenus")).toEqual("Success")
  });

  it('should handle "GET_ALL_MENUS_FAILURE" action', () => {
    let action = {
      type: GET_ALL_MENUS_FAILURE,
      error: "Exception",
    }
    expect(manageRoleNavigationReducer(fromJS({}),action).get("fetchAllMenusError")).toEqual("Exception")
  })

  it('should handle "SAVE_MENUS_SUCCESS" action', () => {
    let action = {
      type: SAVE_MENUS_SUCCESS,
      response: "Success",
    }
    expect(manageRoleNavigationReducer(fromJS({}),action).get("saveMenuSuccess")).toEqual("Success")
  });

  it('should handle "SAVE_MENUS_FAILURE" action', () => {
    let action = {
      type: SAVE_MENUS_FAILURE,
      error: "Exception",
    }
    expect(manageRoleNavigationReducer(fromJS({}),action).get("saveMenuError")).toEqual("Exception")
  })
});
