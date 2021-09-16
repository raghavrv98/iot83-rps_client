/*
 *
 * AddOrEditTenant reducer
 *
 */

import { fromJS } from "immutable";
import { DEFAULT_ACTION,SUBMIT_HANDLER, SUBMIT_HANDLER_SUCCESS, SUBMIT_HANDLER_FAILURE ,GET_TENANT_BY_ID_SUCCESS,GET_TENANT_BY_ID_FAILURE} from "./constants";

export const initialState = fromJS({});

function addOrEditTenantReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUBMIT_HANDLER:
      return state.set('submitFailure', undefined);
    case SUBMIT_HANDLER_SUCCESS:
      return state.set('submitSuccess', action.response);
    case SUBMIT_HANDLER_FAILURE:
      return state.set('submitFailure', action.error);
    case GET_TENANT_BY_ID_SUCCESS:
      return state.set('tenantByIdSuccess', action.response);
    case GET_TENANT_BY_ID_FAILURE:
      return state.set('tenantByIdFailure', action.error);
    default:
      return state;
  }
}

export default addOrEditTenantReducer;
