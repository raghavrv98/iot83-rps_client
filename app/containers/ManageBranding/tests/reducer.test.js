import { fromJS } from 'immutable';
import manageBrandingReducer from '../reducer';
import {
  DEFAULT_ACTION, UPLOAD_LOGO_REQUEST, UPLOAD_LOGO_SUCCESS, UPLOAD_LOGO_FAILURE
} from '../constants'

describe('manageBrandingReducer', () => {
  it('returns the initial state', () => {
    expect(manageBrandingReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      manageBrandingReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });

  it('should handle "UPLOAD_LOGO_REQUEST" action', () => {
    let action = {
      type: UPLOAD_LOGO_REQUEST,
      error: undefined,
    }
    expect(manageBrandingReducer(fromJS({}),action).get("uploadSuccess")).toEqual(undefined)
  });

  it('should handle "UPLOAD_LOGO_SUCCESS" action', () => {
    let action = {
      type: UPLOAD_LOGO_SUCCESS,
      response: "Success",
    }
    expect(manageBrandingReducer(fromJS({}),action).get("uploadSuccess")).toEqual("Success")
  });

  it('should handle "UPLOAD_LOGO_FAILURE" action', () => {
    let action = {
      type: UPLOAD_LOGO_FAILURE,
      error: "Exception",
    }
    expect(manageBrandingReducer(fromJS({}),action).get("uploadFailure")).toEqual("Exception")
  })
});
