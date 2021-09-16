/*
 *
 * ManageRolePermission actions
 *
 */
import { DEFAULT_ACTION ,ON_SUBMIT_REQUEST,GET_ROLE_DETAILS, GET_PERMISSIONS,GET_ENTITLEMENTS} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function onSubmitHandler(payload,id) {
  return {
    type: ON_SUBMIT_REQUEST,
    payload,
    id
  };
}

export function getRoleDetails(id) {
  return {
    type: GET_ROLE_DETAILS,
    id
  };
}

export function getPermissions() {
  return {
    type: GET_PERMISSIONS,
  };
}

export function getEntitlements() {
  return {
    type: GET_ENTITLEMENTS,
  };
}