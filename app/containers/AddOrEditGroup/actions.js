/*
 *
 * AddOrEditGroup actions
 *
 */

import { ON_SUBMIT_REQUEST,GET_GROUP_DETAILS } from "./constants";

export function onSubmitHandler(payload,id) {
  return {
    type: ON_SUBMIT_REQUEST,
    payload,
    id
  };
}

export function getGroupDetails(id) {
  return {
    type: GET_GROUP_DETAILS,
    id
  };
}
