import manageRolesReducer from '../reducer';
import { GOT_LIST, NOT_GOT_LIST, DEFAULT_ACTION, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE } from '../constants';

describe('manageRolesReducer', () => {
  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      manageRolesReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });
  it('returns initial state for no action', () => {
    expect(
      manageRolesReducer(undefined, {}).toJS(),
    ).toEqual({});
  });
  it('returns state for GOT_LIST', () => {
    expect(
      manageRolesReducer(undefined, {
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
      manageRolesReducer(undefined, {
        type: NOT_GOT_LIST,
        error: "username or password is incorrect."
      }).toJS(),
    ).toEqual({
      notGetList: "username or password is incorrect."
    })
  });
  it('returns state for DELETE_REQUEST_SUCCESS', () => {
    expect(
      manageRolesReducer(undefined, {
        type: DELETE_REQUEST_SUCCESS,
        response: "Role deleted successfully."
      }).toJS(),
    ).toEqual({
      deleteSuccess: "Role deleted successfully."
    })
  });
  it('returns state for DELETE_REQUEST_FAILURE', () => {
    expect(
      manageRolesReducer(undefined, {
        type: DELETE_REQUEST_FAILURE,
        error: "Role id is not found."
      }).toJS(),
    ).toEqual({
      deleteFailure: "Role id is not found."
    })
  });
});