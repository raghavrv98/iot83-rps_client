import { defaultAction, getMeasurements, processMeasurement } from '../actions';
import { DEFAULT_ACTION, GET_MEASUREMENT_LIST, ADD_MEASUREMENT_REQUEST, PROCESS_MEASUREMENT } from '../constants';

describe('ConfigMeasurement actions', () => {
  
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Get Measurements Action', () => {
    it('has a type of GET_MEASUREMENT_LIST', () => {
      const id = "32435432s124321"
      const expected = {
        type: GET_MEASUREMENT_LIST,
        id
      };
      expect(getMeasurements(id)).toEqual(expected);
    });
  })

  describe('Process Measurement Action', () => {
    it('has a type of PROCESS_MEASUREMENT', () => {
      const measureId = 1;
      const agentId = 1;
      const expected = {
        type: PROCESS_MEASUREMENT,
        measureId,
        agentId
      };
      expect(processMeasurement(measureId,agentId)).toEqual(expected);
    });
  });
});
