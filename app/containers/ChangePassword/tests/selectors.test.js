import { fromJS } from 'immutable';
import { getChangePasswordSuccess, getChangePasswordFailure  } from '../selectors';

const mockState = fromJS({
    changePassword: {
        changePasswordSuccess: true ,
        changePasswordFailure: false,
    }
})

describe('selectChangePasswordDomain', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('should return changePasswordSuccess state ', () => {
        const functioncalls = getChangePasswordSuccess();
        expect(functioncalls(mockState)).toBeTruthy();
    });

    it('should return changePasswordFailure state ', () => {
        const functioncalls = getChangePasswordFailure();
        expect(functioncalls(mockState)).toBeFalsy();
    });
});