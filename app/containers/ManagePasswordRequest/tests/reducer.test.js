import { fromJS } from 'immutable';
import { DEFAULT_ACTION, PASSWORDREQUESTLIST,PASSWORDREQUESTLIST_SUCCESS,PASSWORDREQUESTLIST_FAILURE } from '../constants';
import managePasswordRequestReducer from '../reducer';

describe('managePasswordRequestReducer', () => {
  it('returns the initial state', () => {
    expect(managePasswordRequestReducer(undefined, {})).toEqual(fromJS({}));
  });
  it('returns state for PASSWORDREQUESTLIST', () => {
    expect( managePasswordRequestReducer(undefined, { type: PASSWORDREQUESTLIST }).toJS(), ).toEqual({}) });
    it('returns state for PASSWORDREQUESTLIST_SUCCESS', () => {
      expect(
        managePasswordRequestReducer(undefined, {
          type: PASSWORDREQUESTLIST_SUCCESS,
          response: "Request Completed Successfully"
        }).toJS(),
      ).toEqual({
        getPasswordListSuccess:"Request Completed Successfully"
      })
    });
    it('returns state for PASSWORDREQUESTLIST_FAILURE', () => {
      expect(
        managePasswordRequestReducer(undefined, {
          type: PASSWORDREQUESTLIST_FAILURE,
          error: "Expection"
        }).toJS(),
      ).toEqual({
        getPasswordListFailure:"Expection"
      })
    });
});
