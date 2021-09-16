/*
 *
 * DatabaseAndBackUps actions
 *
 */

import { DEFAULT_ACTION,
         GET_DATABASE_LIST,
         CREATE_BACKUP_LIST,
         GET_TENANT_LIST,
         GET_ACTIVITY_STATUS} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getDataBaseList() {
  return {
    type: GET_DATABASE_LIST
  };
}

export function createBackupPayload(backupPayload) {
  return {
    type: CREATE_BACKUP_LIST,
    backupPayload
  };
}

export function getTenantList() {
  return {
    type: GET_TENANT_LIST,
  };
}

export function getActivityStatus(id) {
  return {
    type: GET_ACTIVITY_STATUS ,
    id
  };
}


