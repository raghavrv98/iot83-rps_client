import { fromJS } from 'immutable';
import manageNavigationReducer from '../reducer';
import { 
  DEFAULT_ACTION, GET_MENU_SUCCESS, GET_MENU_FAILURE, 
  MENU_SAVE_HANDLER_SUCCESS, MENU_SAVE_HANDLER_FAILURE 
} from "../constants";

describe('manageNavigationReducer', () => {
  it('returns the initial state', () => {
    expect(manageNavigationReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns the initial state', () => {
    expect(manageNavigationReducer(undefined, { type: DEFAULT_ACTION })).toEqual(fromJS({}));
  });

  it('should handle "GET_MENU_SUCCESS" action', () => {
    expect(manageNavigationReducer(undefined, { type: GET_MENU_SUCCESS, response: "Success" }).toJS()).
    toEqual({gotMenu: "Success"})
  })

  it('should handle "GET_MENU_FAILURE" action', () => {
    expect(manageNavigationReducer(undefined, { type: GET_MENU_FAILURE, error: "Exception" }).toJS()).
    toEqual({notGotmenu:"Exception"})
  })

  it('should handle "MENU_SAVE_HANDLER_SUCCESS" action', () => {
    expect(manageNavigationReducer(undefined, { type: MENU_SAVE_HANDLER_SUCCESS, response: "Success" }).toJS()).
    toEqual({menuSaveSuccess: "Success"})
  })

  it('should handle "MENU_SAVE_HANDLER_FAILURE" action', () => {
    expect(manageNavigationReducer(undefined, { type: MENU_SAVE_HANDLER_FAILURE, error: "Exception" }).toJS()).
    toEqual({menuSaveFailure:"Exception"})
  })
});
