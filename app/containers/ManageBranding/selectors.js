import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageBranding state domain
 */

const selectManageBrandingDomain = state =>
  state.get("manageBranding", initialState);

const getUploadSuccess = () =>
  createSelector(selectManageBrandingDomain, substate => substate.get('uploadSuccess'));

const getUploadFailure = () =>
  createSelector(selectManageBrandingDomain, substate => substate.get('uploadFailure'));

  const uploadThemeSuccess = () =>
  createSelector(selectManageBrandingDomain, substate => substate.get('uploadThemeSuccess'));

const uploadThemeFailure = () =>
  createSelector(selectManageBrandingDomain, substate => substate.get('uploadThemeFailure'));

  export { getUploadSuccess, getUploadFailure, uploadThemeSuccess, uploadThemeFailure };
