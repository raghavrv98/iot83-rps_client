/*
 *
 * AddOrEditTenant actions
 *
 */

import { DEFAULT_ACTION ,SUBMIT_HANDLER,GET_TENANT_BY_ID} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function onSubmitHandler(payload) {
  return {
    type: SUBMIT_HANDLER,
    payload
  };
}

export function fetchTenantInfo(id) {
  return {
    type: GET_TENANT_BY_ID,
    id
  };
}
