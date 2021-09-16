import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageTenants state domain
 */

const selectManageTenantsDomain = state =>
  state.get("manageTenants", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageTenants
 */


const getTenantsList = () =>
  createSelector(selectManageTenantsDomain, substate => substate.get('tenantsList'));

const getTenantsListError = () =>
  createSelector(selectManageTenantsDomain, substate => substate.get('tenantsListError'));


const getDeleteSuccess = () =>
  createSelector(selectManageTenantsDomain, substate => substate.get('deleteSuccess'));

const getDeleteError = () =>
  createSelector(selectManageTenantsDomain, substate => substate.get('deleteFailure'));

export { selectManageTenantsDomain, getTenantsList, getTenantsListError,getDeleteSuccess,getDeleteError};
