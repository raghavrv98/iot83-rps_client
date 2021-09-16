import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the manageZones state domain
 */

const selectManageZonesDomain = state => state.get("manageZones", initialState);

const zonesList = () =>
  createSelector(selectManageZonesDomain, substate =>
    substate.get("zonesList")
  );
const zonesListFailure = () =>
  createSelector(selectManageZonesDomain, substate =>
    substate.get("zonesListFailure")
  );
const getzonesDelete = () =>
  createSelector(selectManageZonesDomain, substate =>
    substate.get("zoneDelete")
  );
const getzoneDeleteFailure = () =>
  createSelector(selectManageZonesDomain, substate =>
    substate.get("zoneDeleteFailure")
  );
export { zonesList, zonesListFailure, getzonesDelete, getzoneDeleteFailure };
