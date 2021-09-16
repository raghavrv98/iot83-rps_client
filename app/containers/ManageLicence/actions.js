/*
 *
 * ManageLicence actions
 *
 */

import { GET_PLANS, GET_SUBMIT_REQUEST, LICENSE_KEY_DETAILS} from "./constants";

export function getPlans() {
  return {
    type: GET_PLANS
  };
}

export function submitLicensePlan(payload) {
  return {
    type: GET_SUBMIT_REQUEST,
    payload
  };
}

export function installLicenseKey(licenseKey) {
  return {
    type: LICENSE_KEY_DETAILS,
    licenseKey
  };
}