/*
 *
 * ManagePlant actions
 *
 */

import { DEFAULT_ACTION,GET_PLANTLIST, DELETE_PLANT } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function managePlantList() {
  return {
    type: GET_PLANTLIST
  };
}

export function deleteHandler(id) {
  return {
    type: DELETE_PLANT,
    id
  };
}