/*
 *
 * ManageOAuthConfig actions
 *
 */

import { GET_AUTH_CONFIG_DETAILS, SUBMIT_REQUEST, DELETE_CONFIG } from "./constants";

export function getAuthConfigDetails() {
  return {
    type: GET_AUTH_CONFIG_DETAILS,
  };
}

export function onSubmitHandler(payload) {
  return {
    type: SUBMIT_REQUEST,
    payload
  };
}

export function deleteConfig(id) {
  return {
    type: DELETE_CONFIG,
    id
  };
}
