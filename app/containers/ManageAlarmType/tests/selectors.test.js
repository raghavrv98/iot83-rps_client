import { fromJS } from 'immutable';
import {
    getAlarmsTypeSuccess, getAlarmsTypeFailure, 
    addAlarmsTypeSuccess, addAlarmsTypeFailure
} from '../selectors'

const mockedState = fromJS({
    manageAlarmType: {
    getAlarmsTypeSuccess: true,
    getAlarmsTypeFailure: false,
    addAlarmsTypeSuccess: true,
    addAlarmsTypeFailure: false,
    }
  })

describe('selectManageAlarmTypeDomain', () => {
    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    it('should return getAlarmsTypeSuccess state ', () => {
        const functioncalls = getAlarmsTypeSuccess();
        expect(functioncalls(mockedState)).toEqual(true);
    });
    
    it('should return getAlarmsTypeFailure state ', () => {
        const functioncalls = getAlarmsTypeFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return addAlarmsTypeSuccess state ', () => {
        const functioncalls = addAlarmsTypeSuccess();
        expect(functioncalls(mockedState)).toEqual(true);
    });
    
    it('should return addAlarmsTypeFailure state ', () => {
        const functioncalls = addAlarmsTypeFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });
});