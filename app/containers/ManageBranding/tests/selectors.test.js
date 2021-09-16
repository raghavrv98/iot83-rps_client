import { fromJS } from 'immutable';
import { getUploadSuccess, getUploadFailure } from '../selectors';

let mockState = fromJS({
    manageBranding : {
        uploadSuccess: true,
        uploadFailure: false,
    }
})

describe('selectManageBrandingDomain', () => {
    it('Expect to have unit tests specified', () => {
        let functions = getUploadSuccess();
        expect(functions(mockState)).toBeTruthy();
    });

    it('Expect to have unit tests specified', () => {
        let functions = getUploadFailure();
        expect(functions(mockState)).toBeFalsy();
    });
});