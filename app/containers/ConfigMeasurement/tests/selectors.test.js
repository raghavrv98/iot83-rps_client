import { fromJS } from 'immutable';
import { 
    getMeasurementsList, 
    getMeasurementsListError,
    processMeasurementSuccess,
    processMeasurementFailure
} from '../selectors';

const mockState = fromJS({
    configMeasurement: {
        measurementsList: true ,
        measurementsListError: false,
        addMeasurementSuccess: true,
        addMeasurementFailure: false,
        processMeasurement: true,
        processMeasurementFailure: false
    }
})

describe('selectConfigMeasurementDomain', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('should return getMeasurementsList state ', () => {
        const functioncalls = getMeasurementsList();
        expect(functioncalls(mockState)).toBeTruthy();
    });

    it('should return getMeasurementsListError state ', () => {
        const functioncalls = getMeasurementsListError();
        expect(functioncalls(mockState)).toBeFalsy();
    });

    it('should return processMeasurementSuccess state ', () => {
        const functioncalls = processMeasurementSuccess();
        expect(functioncalls(mockState)).toBeTruthy();
    });

    it('should return processMeasurementFailure state ', () => {
        const functioncalls = processMeasurementFailure();
        expect(functioncalls(mockState)).toBeFalsy();
    });
});