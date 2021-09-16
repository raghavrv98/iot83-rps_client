import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the configMeasurement state domain
 */

const selectConfigMeasurementDomain = state =>
  state.get("configMeasurement", initialState)

const getMeasurementsList = () =>
  createSelector(selectConfigMeasurementDomain, substate => substate.get('measurementsList'));

const getMeasurementsListError = () =>
  createSelector(selectConfigMeasurementDomain, substate => substate.get('measurementsListError'));

const processMeasurementSuccess = () =>
  createSelector(selectConfigMeasurementDomain, substate => substate.get('processMeasurement'));

const processMeasurementFailure = () =>
  createSelector(selectConfigMeasurementDomain, substate => substate.get('processMeasurementFailure'));

export { 
  getMeasurementsList, getMeasurementsListError,
  processMeasurementSuccess, processMeasurementFailure,
};
