import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the addorEditPipeLineLandmark state domain
 */

const selectAddorEditPipeLineLandmarkDomain = state =>
  state.get("addorEditPipeLineLandmark", initialState);

const getLandmarkDetailsSuccess = () => createSelector(selectAddorEditPipeLineLandmarkDomain, substate => substate.get('getLandmarkDetailsSuccess'));
const getLandmarkDetailsFailure = () => createSelector(selectAddorEditPipeLineLandmarkDomain, substate => substate.get('getLandmarkDetailsFailure'));

const createLandmarkDetailsSuccess = () => createSelector(selectAddorEditPipeLineLandmarkDomain, substate => substate.get('createLandmarkDetailsSuccess'));
const createLandmarkDetailsFailure = () => createSelector(selectAddorEditPipeLineLandmarkDomain, substate => substate.get('createLandmarkDetailsFailure'));

const uploadLandmarkImageSuccess = () => createSelector(selectAddorEditPipeLineLandmarkDomain, substate => substate.get('uploadLandmarkImageSuccess'));
const uploadLandmarkImageFailure = () => createSelector(selectAddorEditPipeLineLandmarkDomain, substate => substate.get('uploadLandmarkImageFailure'));

export {
  selectAddorEditPipeLineLandmarkDomain,
  getLandmarkDetailsSuccess,
  getLandmarkDetailsFailure,
  createLandmarkDetailsSuccess,
  createLandmarkDetailsFailure,
  uploadLandmarkImageSuccess,
  uploadLandmarkImageFailure
};
