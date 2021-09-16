import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the managePlant state domain
 */

const selectManagePlantDomain = state => state.get("managePlant", initialState);

const getPlantListSuccess = () => createSelector(selectManagePlantDomain, substate => substate.get('getPlantListSuccess'));
const getPlantListFailure = () => createSelector(selectManagePlantDomain, substate => substate.get('getPlantListFailure'));

const deletePlantSuccess = () => createSelector(selectManagePlantDomain, substate => substate.get('deletePlantSuccess'));
const deletePlantFailure = () => createSelector(selectManagePlantDomain, substate => substate.get('deletePlantFailure'));

export { getPlantListSuccess, getPlantListFailure,deletePlantSuccess,deletePlantFailure };
