import { fromJS } from 'immutable';
import changePasswordReducer from '../reducer';
import { DEFAULT_ACTION, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST } from "../constants";

describe('changePasswordReducer', () => {
  it('returns the initial state', () => {
    expect(changePasswordReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns the initial state', () => {
    expect(changePasswordReducer(undefined, {type: DEFAULT_ACTION})).toEqual(fromJS({}));
  });

  it('should handle "CHANGE_PASSWORD_SUCCESS" action', () => {
    const action = {
      type: CHANGE_PASSWORD_SUCCESS, 
      response: "Success" ,
    }
    expect(changePasswordReducer(fromJS({}),action).get("changePasswordSuccess")).toEqual("Success")
  })

  it('should handle "CHANGE_PASSWORD_FAILURE" action', () => {
    const action = { 
      type: CHANGE_PASSWORD_FAILURE, 
      error: "Exception" 
    }
    expect(changePasswordReducer(fromJS({}),action).get("changePasswordFailure")).toEqual("Exception")
  })

  it('should handle "CHANGE_PASSWORD_REQUEST" action', () => {
    const action = { 
      type: CHANGE_PASSWORD_REQUEST, 
      response: "Success" 
    }
    expect(changePasswordReducer(fromJS({}),action).get("changePasswordFailure")).toEqual(undefined)
  })

});
