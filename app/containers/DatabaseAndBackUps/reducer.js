/*
 *
 * DatabaseAndBackUps reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION,
         GET_DATABASE_LIST_SUCCESS,
         GET_DATABASE_LIST_FAILURE,
         CREATE_BACKUP_LIST_SUCCESS,
         CREATE_BACKUP_LIST_FAILURE,
         GET_TENANT_LIST_SUCCESS,
         GET_TENANT_LIST_FAILURE,
         GET_ACTIVITY_STATUS_SUCCESS,
         GET_ACTIVITY_STATUS_FAILURE,
         } from "./constants";

export const initialState = fromJS({});

function databaseAndBackUpsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATABASE_LIST_SUCCESS:
      return state.set("getDatabase", action.response);
    case GET_DATABASE_LIST_FAILURE:
    return state.set("getDatabaseFailure", action.error);
    case GET_TENANT_LIST_SUCCESS:
      return state.set("getTenant", action.response);
    case GET_TENANT_LIST_FAILURE:
    return state.set("getTenantFailure", action.error);
    case GET_ACTIVITY_STATUS_SUCCESS:
      return state.set("getActivityStatus", action.response);
    case GET_ACTIVITY_STATUS_FAILURE:
    return state.set("getActivityStatusFailure", action.error);
      case CREATE_BACKUP_LIST_SUCCESS:
        return state.set("createBackupDataSucess", action.response);
      case CREATE_BACKUP_LIST_FAILURE:
        return state.set("createBackupDataFailure", action.error);     
      default:
      return initialState;
  }
}

export default databaseAndBackUpsReducer;