import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageAlarmsAndAlerts state domain
 */

const selectManageAlarmsAndAlertsDomain = state =>
  state.get("manageAlarmsAndAlerts", initialState);

const getPlantListSuccess = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getPlantListSuccess'));
const getPlantListFailure = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getPlantListFailure'));

const getPipelineListSuccess = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getPipelineListSuccess'));
const getPipelineListFailure = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getPipelineListFailure'));

const getAlarmsTypeSuccess = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getAlarmsTypeSuccess'));
const getAlarmsTypeFailure = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getAlarmsTypeFailure'));

const getAlarmsCategorySuccess = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getAlarmsCategorySuccess'));
const getAlarmsCategoryFailure = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getAlarmsCategoryFailure'));

const getFilterDataSuccess = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getFilterDataSuccess'));
const getFilterDataFailure = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getFilterDataFailure'));

const getAlarmStatusSuccess = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getAlarmStatusSuccess'));
const getAlarmStatusFailure = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('getAlarmStatusFailure'));

const alarmDetailSuccess = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('alarmDetailSuccess'));
const agentDetailFailure = () => createSelector(selectManageAlarmsAndAlertsDomain, substate => substate.get('agentDetailFailure'));

export {
  getPlantListSuccess, getPlantListFailure, 
  getPipelineListSuccess, getPipelineListFailure,
  getAlarmsTypeSuccess, getAlarmsTypeFailure, 
  getFilterDataSuccess, getFilterDataFailure,
  getAlarmStatusSuccess,getAlarmStatusFailure,
  alarmDetailSuccess, agentDetailFailure, 
  getAlarmsCategorySuccess, getAlarmsCategoryFailure
};
