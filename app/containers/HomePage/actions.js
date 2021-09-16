/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, GET_NAVIGATION, GET_VERSION } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getNav() {
  return {
    type: GET_NAVIGATION,
  };
}

export function getVersion() {
  return {
    type: GET_VERSION,
  };
}