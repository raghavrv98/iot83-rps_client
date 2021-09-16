/*
 *
 * AddorEditLicencePlan actions
 *
 */

import { DEFAULT_ACTION, ON_SUBMIT_REQUEST, GET_PLANS_LIST } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function onSubmitHandler(payload) {
  return {
    type: ON_SUBMIT_REQUEST,
    payload
  };
}

export function getPlansList(){
  return{
    type: GET_PLANS_LIST
  }
}