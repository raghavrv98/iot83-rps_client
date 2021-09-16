import manageGroupsReducer from '../reducer';
import { GOT_LIST, NOT_GOT_LIST, DEFAULT_ACTION, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE } from '../constants';

describe('manageGroupsReducer', () => {
  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      manageGroupsReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });
  it('returns initial state for no action', () => {
    expect(
      manageGroupsReducer(undefined, {}).toJS(),
    ).toEqual({});
  });
  it('returns state for GOT_LIST', () => {
    expect(
      manageGroupsReducer(undefined, {
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
  it('returns state for LOGIN_ API_FAILURE', () => {
    expect(
      manageGroupsReducer(undefined, {
        type: NOT_GOT_LIST,
        error: "username or password is incorrect."
      }).toJS(),
    ).toEqual({
      notGetList: "username or password is incorrect."
    })
  });
  it('returns state for DELETE_REQUEST_SUCCESS', () => {
    expect(
      manageGroupsReducer(undefined, {
        type: DELETE_REQUEST_SUCCESS,
        response: "Group deleted successfully."
      }).toJS(),
    ).toEqual({
      deleteSuccess: "Group deleted successfully."
    })
  });
  it('returns state for DELETE_REQUEST_FAILURE', () => {
    expect(
      manageGroupsReducer(undefined, {
        type: DELETE_REQUEST_FAILURE,
        error: "Group id is not found."
      }).toJS(),
    ).toEqual({
      deleteFailure: "Group id is not found."
    })
  });
});