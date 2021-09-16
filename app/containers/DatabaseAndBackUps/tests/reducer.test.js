import { fromJS } from 'immutable';
import databaseAndBackUpsReducer from '../reducer';
import { DEFAULT_ACTION,
  GET_DATABASE_LIST_SUCCESS,
  GET_DATABASE_LIST_FAILURE,
  CREATE_BACKUP_LIST_SUCCESS,
  CREATE_BACKUP_LIST_FAILURE,
  GET_TENANT_LIST_SUCCESS,
  GET_TENANT_LIST_FAILURE,
  GET_ACTIVITY_STATUS_SUCCESS,
  GET_ACTIVITY_STATUS_FAILURE,
} from '../constants'

export const initialState = fromJS({});

describe('databaseAndBackUpsReducer', () => {
  it('returns the initial state', () => {
    expect(databaseAndBackUpsReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns initial state for DEFAULT_ACTION', () => {
    expect(
      databaseAndBackUpsReducer(undefined, {
        type: DEFAULT_ACTION,
      }).toJS(),
    ).toEqual({});
  });

  it('should handle "GET_DATABASE_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_DATABASE_LIST_SUCCESS,
      response: "Success",
    }
    expect(databaseAndBackUpsReducer(fromJS({}),action).get("getDatabase")).toEqual("Success")
  });

  it('should handle "GET_DATABASE_LIST_FAILURE" action', () => {
    let action = {
      type: GET_DATABASE_LIST_FAILURE,
      error: "Exception",
    }
    expect(databaseAndBackUpsReducer(fromJS({}),action).get("getDatabaseFailure")).toEqual("Exception")
  })

  it('should handle "CREATE_BACKUP_LIST_SUCCESS" action', () => {
    let action = {
      type: CREATE_BACKUP_LIST_SUCCESS,
      response: "Success",
    }
    expect(databaseAndBackUpsReducer(fromJS({}),action).get("createBackupDataSucess")).toEqual("Success")
  })

  it('should handle "CREATE_BACKUP_LIST_FAILURE" action', () => {
    let action = {
      type: CREATE_BACKUP_LIST_FAILURE,
      error: "Exception",
    }
    expect(databaseAndBackUpsReducer(fromJS({}),action).get("createBackupDataFailure")).toEqual("Exception")
  })

  it('should handle "GET_TENANT_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_TENANT_LIST_SUCCESS,
      response: "Success",
    }
    expect(databaseAndBackUpsReducer(fromJS({}),action).get("getTenant")).toEqual("Success")
  })

  it('should handle "GET_TENANT_LIST_FAILURE" action', () => {
    let action = {
      type: GET_TENANT_LIST_FAILURE,
      error: "Exception",
    }
    expect(databaseAndBackUpsReducer(fromJS({}),action).get("getTenantFailure")).toEqual("Exception")
  })

  it('should handle "GET_ACTIVITY_STATUS_SUCCESS" action', () => {
    let action = {
      type: GET_ACTIVITY_STATUS_SUCCESS,
      response: "Success",
    }
    expect(databaseAndBackUpsReducer(fromJS({}),action).get("getActivityStatus")).toEqual("Success")
  })

  it('should handle "GET_ACTIVITY_STATUS_FAILURE" action', () => {
    let action = {
      type: GET_ACTIVITY_STATUS_FAILURE,
      error: "Exception",
    }
    expect(databaseAndBackUpsReducer(fromJS({}),action).get("getActivityStatusFailure")).toEqual("Exception")
  })
});
