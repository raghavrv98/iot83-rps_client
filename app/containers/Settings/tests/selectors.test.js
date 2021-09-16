import { fromJS } from 'immutable';
import { 
    getGeneratedKey, getGeneratedKeyError, 
    getSecretKeyList, getSecretKeyError, 
    getSecretStatusSuccess, getSecretStatusError, 
    getAccountDetailsSuccess, getAccountDetailsError,
    secretKeyDeleteSuccess, secretKeyDeleteFailure, 
} from '../selectors';

const mockState = fromJS({
    settings : {
        generatedKey: true,
        generateKeyError: false,
        secretKeys: true,
        secretKeysError: false,
        secretStatusSuccess: true,
        secretStatusFailure: false,
        accountDetails: true,
        accountDetailsError: false,
        secretKeyDeleteSuccess: true,
        secretKeyDeleteFailure: false,
    }
})

describe('selectSettingsDomain', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('should return getGeneratedKey state ', () => {
        const functioncalls = getGeneratedKey();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return getGeneratedKeyError state ', () => {
        const functioncalls = getGeneratedKeyError();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return getSecretKeyList state ', () => {
        const functioncalls = getSecretKeyList();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return getSecretKeyError state ', () => {
        const functioncalls = getSecretKeyError();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return getSecretStatusSuccess state ', () => {
        const functioncalls = getSecretStatusSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return getSecretStatusError state ', () => {
        const functioncalls = getSecretStatusError();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return getAccountDetailsSuccess state ', () => {
        const functioncalls = getAccountDetailsSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return getAccountDetailsError state ', () => {
        const functioncalls = getAccountDetailsError();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return secretKeyDeleteSuccess state ', () => {
        const functioncalls = secretKeyDeleteSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return secretKeyDeleteFailure state ', () => {
        const functioncalls = secretKeyDeleteFailure();
        expect(functioncalls(mockState)).toEqual(false);
    });
});