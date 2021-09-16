/*
 *
 * ManageLicencePlan actions
 *
 */

import { DEFAULT_ACTION, GET_LICENSE_LIST, LICENSE_DELETE_REQUEST } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getLicenseList() {
  return {
    type: GET_LICENSE_LIST
  };
}

export function licenseDeleteHandler(id) {
  return {
    type: LICENSE_DELETE_REQUEST,
    id
  };
}