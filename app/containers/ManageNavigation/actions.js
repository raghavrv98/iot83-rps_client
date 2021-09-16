/*
 *
 * ManageNavigation actions
 *
 */

import { DEFAULT_ACTION, GET_MENU_REQUEST,MENU_SAVE_HANDLER } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getMenu() {
  return {
    type: GET_MENU_REQUEST
  };
}

export function navlistSaveHandler(payload) {
  return {
    type: MENU_SAVE_HANDLER,
    payload
  };
}
