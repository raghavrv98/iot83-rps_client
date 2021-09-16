import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditTenant state domain
 */

const selectAddOrEditTenantDomain = state =>
  state.get("addOrEditTenant", initialState);


const getSubmitSuccess = () =>
createSelector(selectAddOrEditTenantDomain, substate => substate.get('submitSuccess'));

const getSubmitFailure = () =>
createSelector(selectAddOrEditTenantDomain, substate => substate.get('submitFailure'));

const getTenantByIdSuccess = () =>
createSelector(selectAddOrEditTenantDomain, substate => substate.get('tenantByIdSuccess'));

const getTenantByIdFailure = () =>
createSelector(selectAddOrEditTenantDomain, substate => substate.get('tenantByIdFailure'));

export { selectAddOrEditTenantDomain ,getSubmitSuccess,getSubmitFailure,getTenantByIdSuccess,getTenantByIdFailure};
