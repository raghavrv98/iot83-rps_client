import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageLogs state domain
 */

const selectManageLogsDomain = state => state.get("manageLogs", initialState);
const makeSelectManageLogs = () => createSelector(selectManageLogsDomain, substate => substate.toJS());

const getLogsListSuccess = () => createSelector(selectManageLogsDomain, substate => substate.get('getLogsListSuccess'));
const getLogsListFailure = () => createSelector(selectManageLogsDomain, substate => substate.get('getLogsListFailure'));

const generateLogsSuccess = () => createSelector(selectManageLogsDomain, substate => substate.get('generateLogsSuccess'));
const generateLogsFailure = () => createSelector(selectManageLogsDomain, substate => substate.get('generateLogsFailure'));

export { makeSelectManageLogs, getLogsListSuccess, getLogsListFailure, generateLogsSuccess, generateLogsFailure };
