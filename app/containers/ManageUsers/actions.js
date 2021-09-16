/*
 *
 * ManageUsers actions
 *
 */

import { DEFAULT_ACTION ,GET_LIST,DELETE_REQUEST} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getUserList(payload) {
  return {
    type: GET_LIST,
    payload
  };
}


export function deleteHandler(id) {
  return {
    type: DELETE_REQUEST,
    id
  }
}

