import { fromJS } from 'immutable';
import {
    pipelinesDetails, pipelinesDetailsError,
    saveConfirm, saveConfirmError,
    deleteDetails, deleteDetailsFailure
} from '../selectors';

let mockState = fromJS({
    pipeLineDetail: {
        pipelinesDetails: true,
        pipelinesDetailsFailure: false,
        saveConfirm: true,
        saveConfirmError: false,
        deleteDetails: true,
        deleteDetailsFailure: false,
    }
})

describe('selectPipeLineDetailDomain', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('should return pipelinesDetails state ', () => {
        const functioncalls = pipelinesDetails();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return pipelinesDetailsError state', () => {
        const functioncalls = pipelinesDetailsError();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return saveConfirm state ', () => {
        const functioncalls = saveConfirm();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return saveConfirmError state', () => {
        const functioncalls = saveConfirmError();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return deleteDetails state ', () => {
        const functioncalls = deleteDetails();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return deleteDetailsFailure state', () => {
        const functioncalls = deleteDetailsFailure();
        expect(functioncalls(mockState)).toEqual(false);
    });
});