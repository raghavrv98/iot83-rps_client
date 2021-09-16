import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addOrEditPlant state domain
 */

const selectAddOrEditPlantDomain = state =>
  state.get("addOrEditPlant", initialState);

const createPlantSuccess = () => createSelector(selectAddOrEditPlantDomain, substate => substate.get('createPlantSuccess'));
const createPlantFailure = () => createSelector(selectAddOrEditPlantDomain, substate => substate.get('createPlantFailure'));

const getDetailsSuccess = () => createSelector(selectAddOrEditPlantDomain, substate => substate.get('getDetailsSuccess'));
const getDetailsFailure = () => createSelector(selectAddOrEditPlantDomain, substate => substate.get('getDetailsFailure'));

const plantImageUplaod = () => createSelector(selectAddOrEditPlantDomain, substate => substate.get('plantImageUplaod'));
const plantImageUplaodFailure = () => createSelector(selectAddOrEditPlantDomain, substate => substate.get('plantImageUplaodFailure'));

export { 
  createPlantSuccess,createPlantFailure,
  getDetailsSuccess,getDetailsFailure,
  plantImageUplaodFailure,plantImageUplaod
};
