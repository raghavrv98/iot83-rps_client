import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageRtd state domain
 */

const selectManageRtdDomain = state => state.get("manageRtd", initialState);

const zonesList = () =>
  createSelector(selectManageRtdDomain, substate =>
    substate.get("zonesList")
  );
const zonesListFailure = () =>
  createSelector(selectManageRtdDomain, substate =>
    substate.get("zonesListFailure")
  );
const getzonesDelete = () =>
  createSelector(selectManageRtdDomain, substate =>
    substate.get("zoneDelete")
  );
const getzoneDeleteFailure = () =>
  createSelector(selectManageRtdDomain, substate =>
    substate.get("zoneDeleteFailure")
  );

export { zonesList, zonesListFailure, getzonesDelete, getzoneDeleteFailure };
