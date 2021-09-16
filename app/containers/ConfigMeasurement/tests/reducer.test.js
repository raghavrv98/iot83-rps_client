import { fromJS } from 'immutable';
import configMeasurementReducer, {i} from '../reducer';
import {  
    MEASUREMENT_LIST_SUCCESS, 
    MEASUREMENT_LIST_FAILURE, 
    PROCESS_MEASUREMENT_SUCCESS, 
    PROCESS_MEASUREMENT_FAILURE
} from '../constants';
let CopyI= i
describe('configMeasurementReducer', () => {
  it('returns the initial state', () => {
    expect(configMeasurementReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "MEASUREMENT_LIST_SUCCESS" action', () => {
    let action = {
      type: MEASUREMENT_LIST_SUCCESS, 
      response: "Success",
    }
    expect(configMeasurementReducer(fromJS({}),action).get("measurementsList")).toEqual("Success")
  })

  it('should handle "MEASUREMENT_LIST_FAILURE" action', () => {
    let action = { 
      type: MEASUREMENT_LIST_FAILURE, 
      error: "Exception" 
    }
    expect(configMeasurementReducer(fromJS({}),action).get("measurementsListError")).toEqual("Exception")
  })

  it('should handle "PROCESS_MEASUREMENT_SUCCESS" action', () => {
    let action = {
      type: PROCESS_MEASUREMENT_SUCCESS,
      response: "Success",
    }
    expect(configMeasurementReducer(fromJS({}),action).get("processMeasurement")).toEqual("Success")
  });

  it('should handle "PROCESS_MEASUREMENT_FAILURE" action', () => {
    let action = {
      type: PROCESS_MEASUREMENT_FAILURE,
      error: "Exception",
    }
    expect(configMeasurementReducer(fromJS({}),action).get("processMeasurementFailure")).toEqual("Exception")
  })
});
