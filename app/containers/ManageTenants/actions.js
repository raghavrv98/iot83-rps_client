/*
 *
 * ManageTenants actions
 *
 */

import { DEFAULT_ACTION,GET_TENANTS,DELETE_TENANT } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getTenants(){
  return{
    type:GET_TENANTS
  }
}

export function deleteHandler(id){
  return {
    type:DELETE_TENANT,
    id
  }
}