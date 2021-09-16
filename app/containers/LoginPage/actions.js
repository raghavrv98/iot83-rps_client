/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, LOGIN_API_REQUEST, RESET_PASSWORD_API_REQUEST, GET_AUTH_CONFIG_DETAILS, GET_LOGIN_TOKEN } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function loginApiHandler(payload,tenant) {
  return {
    type: LOGIN_API_REQUEST,
    payload,
    tenant
  };
}

export function resetPasswordHandler(payload, tenant) {
  return {
    type: RESET_PASSWORD_API_REQUEST,
    payload,
    tenant
  };
}

export function getAuthConfigDetails() {
  return {
    type: GET_AUTH_CONFIG_DETAILS,
  };
}

export function getLoginToken(code, state) {
  return {
    type: GET_LOGIN_TOKEN,
    code, state
  };
}

