import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the databaseAndBackUps state domain
 */

const selectDatabaseAndBackUpsDomain = state =>
  state.get("databaseAndBackUps", initialState);

export const getDatabase = () =>
createSelector(selectDatabaseAndBackUpsDomain, substate => substate.get('getDatabase'));

export const getDatabaseFailure = () =>
createSelector(selectDatabaseAndBackUpsDomain, substate => substate.get('getDatabaseFailure'));

export const getTenant = () =>
createSelector(selectDatabaseAndBackUpsDomain, substate => substate.get('getTenant'));

export const getTenantFailure = () =>
createSelector(selectDatabaseAndBackUpsDomain, substate => substate.get('getTenantFailure'));

export const activityStatus = () =>
createSelector(selectDatabaseAndBackUpsDomain, substate => substate.get('getActivityStatus'));

export const activityStatusFailure = () =>
createSelector(selectDatabaseAndBackUpsDomain, substate => substate.get('getActivityStatusFailure'));

export const createBackupListSucess = () =>
createSelector(selectDatabaseAndBackUpsDomain, substate => substate.get('createBackupDataSucess'));

export const createBackupListFailure = () =>
createSelector(selectDatabaseAndBackUpsDomain, substate => substate.get('createBackupDataFailure'));
