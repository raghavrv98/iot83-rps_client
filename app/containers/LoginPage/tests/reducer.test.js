import { fromJS } from 'immutable';
import loginPageReducer from '../reducer';
import { 
  DEFAULT_ACTION, LOGIN_API_FAILURE, LOGIN_API_SUCCESS,
  RESET_PASSWORD_API_SUCCESS, RESET_PASSWORD_API_FAILURE 
} from '../constants';

describe('loginPageReducer', () => {
  it('returns the initial state', () => {
    expect(loginPageReducer(undefined, {})).toEqual(fromJS({}));
  });
  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      loginPageReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });
  it('returns state for LOGIN_API_SUCCESS', () => {
    expect(loginPageReducer(undefined, { type: LOGIN_API_SUCCESS, response: "Success" }).toJS()).
      toEqual({
        'login_success': "Success",
      })
  });
  it('returns state for LOGIN_API_FAILURE', () => {
    expect(loginPageReducer(undefined, { type: LOGIN_API_FAILURE, error: "Exception" }).toJS()).
      toEqual({
        "login_failed_message": "Exception"
      })
  });
  it('returns state for RESET_PASSWORD_API_SUCCESS', () => {
    expect(loginPageReducer(undefined, { type: RESET_PASSWORD_API_SUCCESS, response: "Success" }).toJS()).
      toEqual({
        'resetPasswordSuccess': "Success",
      })
  });
  it('returns state for RESET_PASSWORD_API_FAILURE', () => {
    expect(loginPageReducer(undefined, { type: RESET_PASSWORD_API_FAILURE, error: "Exception" }).toJS()).
      toEqual({
        "resetPasswordFailure": "Exception"
      })
  });
});


