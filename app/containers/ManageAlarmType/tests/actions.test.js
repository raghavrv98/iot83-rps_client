import { getAlarmType, addAlarmType, getAlarmCategory } from '../actions';
import { ADD_ALARM_TYPE, GET_ALARM_TYPE, GET_ALARM_CATEGORY } from '../constants';

describe('ManageAlarmType actions', () => {
  describe('GET_ALARM_TYPE', () => {
    it('has a type of GET_ALARM_TYPE', () => {
      const expected = {
        type: GET_ALARM_TYPE,
      };
      expect(getAlarmType()).toEqual(expected);
    });
  });

  describe('ADD_ALARM_TYPE', () => {
    it('has a type of ADD_ALARM_TYPE', () => {
      const expected = {
        type: ADD_ALARM_TYPE,
        payload: "demoPayload"
      };
      expect(addAlarmType("demoPayload")).toEqual(expected);
    });
  });

  describe('GET_ALARM_CATEGORY', () => {
    it('has a type of GET_ALARM_CATEGORY', () => {
      const expected = {
        type: GET_ALARM_CATEGORY
      };
      expect(getAlarmCategory()).toEqual(expected);
    });
  });

});
