import { fromJS } from 'immutable';
import settingsReducer from '../reducer';
import { 
  DEFAULT_ACTION, 
  GENERATE_KEY_SUCCESS, GENERATE_KEY_FAILURE, 
  SECRET_KEY_SUCCESS, SECRET_KEY_FAILURE, 
  SECRET_STATUS_SUCCESS, SECRET_STATUS_FAILURE,
  ACCOUNT_DETAILS_SUCCESS, ACCOUNT_DETAILS_FAILURE,
  DELETE_SECRET_KEY_SUCCESS, DELETE_SECRET_KEY_FAILURE
} from "../constants";

describe('settingsReducer', () => {

  it('returns the initial state', () => {
    expect(settingsReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "DEFAULT_ACTION" action', () => {
    expect(settingsReducer(undefined, { type: DEFAULT_ACTION })).toEqual(fromJS({}));
  });

  it('should handle "GENERATE_KEY_SUCCESS" action', () => {
    expect(settingsReducer(undefined, { type: GENERATE_KEY_SUCCESS, response: "Success" }).toJS()).
    toEqual({generatedKey:"Success"})
  })

  it('should handle "GENERATE_KEY_FAILURE" action', () => {
    expect(settingsReducer(undefined, { type: GENERATE_KEY_FAILURE, error: "Exception" }).toJS()).
    toEqual({generateKeyError:"Exception"})
  })

  it('should handle "SECRET_KEY_SUCCESS" action', () => {
    expect(settingsReducer(undefined, { type: SECRET_KEY_SUCCESS, response: "Success" }).toJS()).
    toEqual({secretKeys:"Success"})
  })

  it('should handle "SECRET_KEY_FAILURE" action', () => {
    expect(settingsReducer(undefined, { type: SECRET_KEY_FAILURE, error: "Exception" }).toJS()).
    toEqual({secretKeysError:"Exception"})
  })

  it('should handle "SECRET_STATUS_SUCCESS" action', () => {
    expect(settingsReducer(undefined, { type: SECRET_STATUS_SUCCESS, response: "Success" }).toJS()).
    toEqual({secretStatusSuccess:"Success"})
  })

  it('should handle "SECRET_STATUS_FAILURE" action', () => {
    expect(settingsReducer(undefined, { type: SECRET_STATUS_FAILURE, error: "Exception" }).toJS()).
    toEqual({secretStatusFailure:"Exception"})
  })

  it('should handle "ACCOUNT_DETAILS_SUCCESS" action', () => {
    expect(settingsReducer(undefined, { type: ACCOUNT_DETAILS_SUCCESS, response: "Success" }).toJS()).
    toEqual({accountDetails:"Success"})
  })

  it('should handle "ACCOUNT_DETAILS_FAILURE" action', () => {
    expect(settingsReducer(undefined, { type: ACCOUNT_DETAILS_FAILURE, error: "Exception" }).toJS()).
    toEqual({accountDetailsError:"Exception"})
  })

  it('should handle "DELETE_SECRET_KEY_SUCCESS" action', () => {
    expect(settingsReducer(undefined, { type: DELETE_SECRET_KEY_SUCCESS, response: "Success" }).toJS()).
    toEqual({secretKeyDeleteSuccess:"Success"})
  })

  it('should handle "DELETE_SECRET_KEY_FAILURE" action', () => {
    expect(settingsReducer(undefined, { type: DELETE_SECRET_KEY_FAILURE, error: "Exception" }).toJS()).
    toEqual({secretKeyDeleteFailure:"Exception"})
  })

});
