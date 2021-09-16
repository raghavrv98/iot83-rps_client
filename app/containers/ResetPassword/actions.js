/*
 *
 * ResetPassword actions
 *
 */

import { DEFAULT_ACTION, RESET_PASSWORD_REQUEST } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function resetPasswordHandler(payload) {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload
  };
}
