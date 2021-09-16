import { fromJS } from 'immutable';
import manageUsersReducer from '../reducer';
import { GOT_LIST, NOT_GOT_LIST, DEFAULT_ACTION, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE, DELETE_REQUEST } from '../constants';

describe('manageUsersReducer', () => {
  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      manageUsersReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });
  
  it('returns initial state for no action', () => {
    expect(
      manageUsersReducer(undefined, {}).toJS(),
    ).toEqual({});
  });
  it('returns state for GOT_LIST', () => {
    expect(
      manageUsersReducer(undefined, {
        type: GOT_LIST,
        response: {
          accessToken: "asdfghjklcvbnm",
          verified: true
        }
      }).toJS(),
    ).toEqual({
      gotList: {
        accessToken: "asdfghjklcvbnm",
        verified: true
      }
    })
  });
  it('returns state for NOT_GOT_LIST', () => {
    expect(
      manageUsersReducer(undefined, {
        type: NOT_GOT_LIST,
        error: "username or password is incorrect."
      }).toJS(),
    ).toEqual({
      notGetList: "username or password is incorrect."
    })
  });
  it('returns state for DELETE_REQUEST', () => {
    expect(
      manageUsersReducer(undefined, {
        type: DELETE_REQUEST,
        id: "sampleUser"
      }).toJS(),
    ).toEqual({
      deleteFailure: undefined
    })
  });
  it('returns state for DELETE_REQUEST_SUCCESS', () => {
    expect(
      manageUsersReducer(undefined, {
        type: DELETE_REQUEST_SUCCESS,
        response: "User deleted successfully."
      }).toJS(),
    ).toEqual({
      deleteSuccess: "User deleted successfully."
    })
  });
  it('returns state for DELETE_REQUEST_FAILURE', () => {
    expect(
      manageUsersReducer(undefined, {
        type: DELETE_REQUEST_FAILURE,
        error: "User id not found in database."
      }).toJS(),
    ).toEqual({
      deleteFailure: "User id not found in database."
    })
  });
});