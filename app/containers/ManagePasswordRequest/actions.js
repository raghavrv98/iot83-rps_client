/*
 *
 * ManagePasswordRequest actions
 *
 */

import { DEFAULT_ACTION, PASSWORDREQUESTLIST } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function passwordRequestList(id,payload){
  return {
    type:PASSWORDREQUESTLIST,
    payload,id
  }
}
