import { 
  defaultAction, managePlantList, getAlarmType, 
  apiApplyFilters, alarmStatusChangeHandler, getAlarmDetails 
} from '../actions';
import { 
  DEFAULT_ACTION, GET_PLANTLIST, GET_ALARM_TYPE, 
  GET_FILTERED_DATA, ALARM_STATUS_CHANGE, GET_ALARM_DETAILS 
} from '../constants';

describe('ManageAlarmsAndAlerts actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });

    it('has a type of GET_PLANTLIST', () => {
      const expected = {
        type: GET_PLANTLIST,
      };
      expect(managePlantList()).toEqual(expected);
    });

    it('has a type of GET_PLANTLIST', () => {
      const expected = {
        type: GET_ALARM_TYPE,
      };
      expect(getAlarmType()).toEqual(expected);
    });

    it('has a type of GET_FILTERED_DATA', () => {
      const expected = {
        type: GET_FILTERED_DATA,
        filters: "demo",
        plantId: "demo"
      };
      expect(apiApplyFilters("demo","demo")).toEqual(expected);
    });

    it('has a type of ALARM_STATUS_CHANGE', () => {
      const expected = {
        type: ALARM_STATUS_CHANGE,
        payload: "demo",
        seqId: "demo",
        plantId: "demo"
      };
      expect(alarmStatusChangeHandler("demo","demo","demo")).toEqual(expected);
    });

    it('has a type of GET_ALARM_DETAILS', () => {
      const expected = {
        type: GET_ALARM_DETAILS,
        plantId: "demo",
        seqId: "demo"
      };
      expect(getAlarmDetails("demo","demo")).toEqual(expected);
    });
  });
});
