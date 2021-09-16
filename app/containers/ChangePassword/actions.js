/*
 *
 * ChangePassword actions
 *
 */

import { DEFAULT_ACTION, CHANGE_PASSWORD_REQUEST } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function changePasswordHandler(payload) {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    payload
  };
}
