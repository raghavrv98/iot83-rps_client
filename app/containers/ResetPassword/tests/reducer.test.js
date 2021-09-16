import { fromJS } from 'immutable';
import resetPasswordReducer from '../reducer';
import { DEFAULT_ACTION, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCCESS, RESET_PASSWORD_FAILURE } from "../constants";

describe('resetPasswordReducer', () => {
  it('returns the initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(fromJS({}));
  });
  
  it('should handle "DEFAULT_ACTION" action', () => {
    expect(resetPasswordReducer(undefined, { type: DEFAULT_ACTION })).toEqual(fromJS({}));
  });

  it('should handle "RESET_PASSWORD_REQUEST" action', () => {
    expect(resetPasswordReducer(undefined, { type: RESET_PASSWORD_REQUEST })).toEqual(fromJS({}));
  });

  it('should handle "RESET_PASSWORD_SUCCCESS" action', () => {
    expect(resetPasswordReducer(undefined, { type: RESET_PASSWORD_SUCCCESS, response: "this is sample response." }).toJS()).toEqual({
      resetPasswordSuccess: "this is sample response."
    });
  });

  it('should handle "RESET_PASSWORD_FAILURE" action', () => {
    expect(resetPasswordReducer(undefined, { type: RESET_PASSWORD_FAILURE, error: "this is sample error." }).toJS()).toEqual({
      resetPasswordFailure: "this is sample error."
    });
  });
});
