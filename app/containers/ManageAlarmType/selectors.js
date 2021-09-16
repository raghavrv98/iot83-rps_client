import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageAlarmType state domain
 */

const selectManageAlarmTypeDomain = state =>
  state.get("manageAlarmType", initialState);
  
const getAlarmsTypeSuccess = () => createSelector(selectManageAlarmTypeDomain, substate => substate.get('getAlarmsTypeSuccess'));
const getAlarmsTypeFailure = () => createSelector(selectManageAlarmTypeDomain, substate => substate.get('getAlarmsTypeFailure'));
const addAlarmsTypeSuccess = () => createSelector(selectManageAlarmTypeDomain, substate => substate.get('addAlarmsTypeSuccess'));
const addAlarmsTypeFailure = () => createSelector(selectManageAlarmTypeDomain, substate => substate.get('addAlarmsTypeFailure'));
const getAlarmsCategorySuccess = () => createSelector(selectManageAlarmTypeDomain, substate => substate.get('getAlarmsCategorySuccess'));
const getAlarmsCategoryFailure = () => createSelector(selectManageAlarmTypeDomain, substate => substate.get('getAlarmsCategoryFailure'));


export { getAlarmsTypeSuccess, getAlarmsTypeFailure, addAlarmsTypeSuccess, addAlarmsTypeFailure, getAlarmsCategorySuccess, getAlarmsCategoryFailure};