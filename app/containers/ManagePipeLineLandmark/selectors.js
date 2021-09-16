import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the managePipeLineLandmark state domain
 */

const selectManagePipeLineLandmarkDomain = state =>
  state.get("managePipeLineLandmark", initialState);

  const getLandmarkSuccess = () =>
  createSelector(selectManagePipeLineLandmarkDomain, substate => substate.get('getLandmarkSuccess'));

const getLandmarkFailure = () =>
  createSelector(selectManagePipeLineLandmarkDomain, substate => substate.get('getLandmarkFailure'));

  const landmarkDeleteSuccess = () =>
  createSelector(selectManagePipeLineLandmarkDomain, substate => substate.get('landmarkDeleteSuccess'));

const landmarkDeleteFailure = () =>
  createSelector(selectManagePipeLineLandmarkDomain, substate => substate.get('landmarkDeleteFailure'));

  export { getLandmarkSuccess, getLandmarkFailure, landmarkDeleteSuccess, landmarkDeleteFailure};
