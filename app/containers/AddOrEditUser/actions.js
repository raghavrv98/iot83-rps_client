/*
 *
 * AddOrEditUser actions
 *
 */

import { DEFAULT_ACTION, ON_SUBMIT_REQUEST, GET_USER_DETAILS, GET_ALL_GROUPS, GET_ALL_ROLES } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function onSubmitHandler(payload, id) {
  return {
    type: ON_SUBMIT_REQUEST,
    payload,
    id
  };
}

export function getUserDetails(id) {
  
  return {
    type: GET_USER_DETAILS,
    id
  };
}

export function getAllRole() {
  return {
    type: GET_ALL_ROLES
  }
}

export function getAllGroup() {
  return {
    type: GET_ALL_GROUPS
  }
}