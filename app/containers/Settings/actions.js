/*
 *
 * Settings actions
 *
 */

import { DEFAULT_ACTION, 
         GENERATE_KEY_REQUEST, 
         SECRET_KEY_REQUEST, 
         SECRET_STATUS_REQUEST, 
         ACCOUNT_DETAILS_REQUEST,
         DELETE_SECRET_KEY,
         GET_PIPELINE_CONFIG_REQUEST,
         SUBMIT_CONFIG_DETAILS,
         GET_LICENCE,
         GET_SETTINGTABS,
         LICENSE_KEY_DETAILS
        } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function generateKeyhandler(payload) {
  return {
    type: GENERATE_KEY_REQUEST,
    payload
  };
}

export function getSecretKeys() {
  return {
    type: SECRET_KEY_REQUEST
  };
}

export function secretActiveDeactiveHandler(id, status) {
  return {
    type: SECRET_STATUS_REQUEST, 
    id, status
  };
}

export function getAccountDetails() {
  return {
    type: ACCOUNT_DETAILS_REQUEST, 
  };
}

export function getPipelineConfig(type) {
  return {
    type: GET_PIPELINE_CONFIG_REQUEST,
    configType: type
  };
}

export function deleteSecretKey(id) {
  return {
    type: DELETE_SECRET_KEY, 
    id
  };
}

export function onSubmitConfigHandler(payload) {
  return {
    type: SUBMIT_CONFIG_DETAILS, 
    payload
  };
}

export function getLicenceInfo() {
  return {
    type: GET_LICENCE,
  };
}

export function getSettingTab() {
  return {
    type: GET_SETTINGTABS,
  };
}

export function installLicenseKey(licenseKey) {
  return {
    type: LICENSE_KEY_DETAILS, 
    licenseKey
  };
}