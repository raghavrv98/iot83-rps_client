import { fromJS } from 'immutable';
import { 
    getPlantListSuccess, getPlantListFailure, 
    getAlarmsTypeSuccess, getAlarmsTypeFailure, 
    getFilterDataSuccess, getFilterDataFailure,
    getAlarmStatusSuccess,getAlarmStatusFailure,
} from '../selectors';

const mockedState = fromJS({
    manageAlarmsAndAlerts: {
        getPlantListSuccess: true,
        getPlantListFailure: false,
        getAlarmsTypeSuccess: true,
        getAlarmsTypeFailure: false,
        getFilterDataSuccess: true,
        getFilterDataFailure: false,
        getAlarmStatusSuccess: true,
        getAlarmStatusFailure: false,
    }
  })

describe('selectManageAlarmsAndAlertsDomain', () => {

    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    it('should return getPlantListSuccess state ', () => {
        const functioncalls = getPlantListSuccess();
        expect(functioncalls(mockedState)).toEqual(true);
    });

    it('should return getPlantListFailure state ', () => {
        const functioncalls = getPlantListFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return getAlarmsTypeSuccess state ', () => {
        const functioncalls = getAlarmsTypeSuccess();
        expect(functioncalls(mockedState)).toEqual(true);
    });

    it('should return getAlarmsTypeFailure state ', () => {
        const functioncalls = getAlarmsTypeFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return getFilterDataSuccess state ', () => {
        const functioncalls = getFilterDataSuccess();
        expect(functioncalls(mockedState)).toEqual(true);
    });

    it('should return getFilterDataFailure state ', () => {
        const functioncalls = getFilterDataFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return getAlarmStatusSuccess state ', () => {
        const functioncalls = getAlarmStatusSuccess();
        expect(functioncalls(mockedState)).toEqual(true);
    });

    it('should return getAlarmStatusFailure state ', () => {
        const functioncalls = getAlarmStatusFailure();
        expect(functioncalls(mockedState)).toEqual(false);
    });
});