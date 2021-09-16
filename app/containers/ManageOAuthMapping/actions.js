/*
 *
 * ManageOAuthMapping actions
 *
 */

import { GET_ROLES_LIST, GET_GROUPS_LIST, GET_MAPPING_LIST, SUBMIT_MAPPING_REQUEST } from "./constants";

export function getRolesList() {
  return {
    type: GET_ROLES_LIST,
  };
}


export function getGroupsList() {
  return {
    type: GET_GROUPS_LIST,
  };
}

export function getMappingList() {
  return {
    type: GET_MAPPING_LIST,
  };
}

export function mappingSubmitRequest(payload) {
  return {
    type: SUBMIT_MAPPING_REQUEST,
    payload
  };
}