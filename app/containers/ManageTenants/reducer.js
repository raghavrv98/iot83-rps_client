/*
 *
 * ManageTenants reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION, DELETE_TENANT, GET_TENANTS_SUCCESS, GET_TENANTS_FAILURE, DELETE_TENANT_FAILURE, DELETE_TENANT_SUCCESS } from "./constants";

export const initialState = fromJS({});

function manageTenantsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_TENANTS_SUCCESS:
      return state.set('tenantsList', action.response);
    case GET_TENANTS_FAILURE:
      return state.set('tenantsListError', action.error);
    case DELETE_TENANT_SUCCESS:
      return state.set('deleteSuccess', action.response);
    case DELETE_TENANT_FAILURE:
      return state.set('deleteFailure', action.error);
    default:
      return initialState;
  }
}

export default manageTenantsReducer;
