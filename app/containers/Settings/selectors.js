import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the settings state domain
 */

const selectSettingsDomain = state => state.get("settings", initialState);

const getGeneratedKey = () =>
  createSelector(selectSettingsDomain, substate => substate.get('generatedKey'));

const getGeneratedKeyError = () =>
  createSelector(selectSettingsDomain, substate => substate.get('generateKeyError'));

const getSecretKeyList = () =>
  createSelector(selectSettingsDomain, substate => substate.get('secretKeys'));

const getSecretKeyError = () =>
  createSelector(selectSettingsDomain, substate => substate.get('secretKeysError'));

const getSecretStatusSuccess = () =>
  createSelector(selectSettingsDomain, substate => substate.get('secretStatusSuccess'));

const getSecretStatusError = () =>
  createSelector(selectSettingsDomain, substate => substate.get('secretStatusFailure'));

const getAccountDetailsSuccess = () =>
  createSelector(selectSettingsDomain, substate => substate.get('accountDetails'));

const getAccountDetailsError = () =>
  createSelector(selectSettingsDomain, substate => substate.get('accountDetailsError'));

const pipelineConfigSuccess = () =>
  createSelector(selectSettingsDomain, substate => substate.get('pipelineConfigSuccess'));

const pipelineConfigError = () =>
  createSelector(selectSettingsDomain, substate => substate.get('pipelineConfigError'));

const secretKeyDeleteSuccess = () =>
  createSelector(selectSettingsDomain, substate => substate.get('secretKeyDeleteSuccess'));

const secretKeyDeleteFailure = () =>
  createSelector(selectSettingsDomain, substate => substate.get('secretKeyDeleteFailure'));

const submitConfigSuccess = () =>
  createSelector(selectSettingsDomain, substate => substate.get('submitConfigSuccess'));

const submitConfigFailure = () =>
  createSelector(selectSettingsDomain, substate => substate.get('submitConfigFailure'));

const getLicenceSuccess = () => createSelector(selectSettingsDomain, substate => substate.get('licenceSuccess'));
const getLicenceFailure = () => createSelector(selectSettingsDomain, substate => substate.get('licenceFailure'));

const getTabsSuccess = () => createSelector(selectSettingsDomain, substate => substate.get('tabsSuccess'));
const getTabsFailure = () => createSelector(selectSettingsDomain, substate => substate.get('tabsFailure'));

const licenseKeySuccess = () => createSelector(selectSettingsDomain, substate => substate.get('licenseKeySuccess'));
const licenseKeyFailure = () => createSelector(selectSettingsDomain, substate => substate.get('licenseKeyFailure'));

export {
  getGeneratedKey, getGeneratedKeyError,
  getSecretKeyList, getSecretKeyError,
  getSecretStatusSuccess, getSecretStatusError,
  getAccountDetailsSuccess, getAccountDetailsError,
  secretKeyDeleteSuccess, secretKeyDeleteFailure,
  pipelineConfigSuccess, pipelineConfigError,
  submitConfigSuccess, submitConfigFailure,
  getLicenceSuccess, getLicenceFailure,
  getTabsSuccess, getTabsFailure,
  licenseKeySuccess, licenseKeyFailure
};
