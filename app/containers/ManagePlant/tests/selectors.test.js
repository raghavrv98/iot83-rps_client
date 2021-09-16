import { fromJS } from 'immutable';
import { getPlantListSuccess, getPlantListFailure,deletePlantSuccess,deletePlantFailure } from '../selectors';

const mockState = fromJS({
    managePlant:{
        getPlantListSuccess: true,
        getPlantListFailure: false,
        deletePlantSuccess: true,
        deletePlantFailure: false,
    }
})

describe('selectManagePlantDomain', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('Expect to have unit tests for getPlantListSuccess', () => {
        let generator = getPlantListSuccess();
        expect(generator(mockState)).toBeTruthy();
    });

    it('Expect to have unit tests for getPlantListFailure', () => {
        let generator = getPlantListFailure();
        expect(generator(mockState)).toBeFalsy();
    });

    it('Expect to have unit tests for deletePlantSuccess', () => {
        let generator = deletePlantSuccess();
        expect(generator(mockState)).toBeTruthy();
    });

    it('Expect to have unit tests for deletePlantFailure', () => {
        let generator = deletePlantFailure();
        expect(generator(mockState)).toBeFalsy();
    });
});