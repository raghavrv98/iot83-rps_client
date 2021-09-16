import { fromJS } from 'immutable';
import { mappingListSuccess,mapingListFailure,
  agentDetailsSuccess,agentDetailsFailure,
  deleteMappingSuccess,deleteMappingFailure,
  saveMappingFailure,saveMappingSuccess } from '../selectors';

const mockState = fromJS({
    mappingList: {
        mapingListSuccess: true ,
        mapingListFailure: false,
        agentDetailsSuccess: true ,
        agentDetailsFailure: false,
        deleteMappingSuccess: true ,
        deleteMappingFailure: false,
        saveMappingSuccess: true,
        saveMappingFailure: false,
    }
})

describe('selectMappingListDomain', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });
    it('should return mappingListSuccess state ', () => {
        const functioncalls = mappingListSuccess();
        expect(functioncalls(mockState)).toBeTruthy();
    });
    it('should return mapingListFailure state ', () => {
        const functioncalls = mapingListFailure();
        expect(functioncalls(mockState)).toBeFalsy();
    });
    it('should return agentDetailsSuccess state ', () => {
        const functioncalls = agentDetailsSuccess();
        expect(functioncalls(mockState)).toBeTruthy();
    });
    it('should return agentDetailsFailure state ', () => {
        const functioncalls = agentDetailsFailure();
        expect(functioncalls(mockState)).toBeFalsy();
    });
    it('should return deleteMappingSuccess state ', () => {
        const functioncalls = deleteMappingSuccess();
        expect(functioncalls(mockState)).toBeTruthy();
    });
    it('should return deleteMappingFailure state ', () => {
        const functioncalls = deleteMappingFailure();
        expect(functioncalls(mockState)).toBeFalsy();
    });
    it('should return saveMappingSuccess state ', () => {
        const functioncalls = saveMappingSuccess();
        expect(functioncalls(mockState)).toBeTruthy();
    });
    it('should return saveMappingFailure state ', () => {
        const functioncalls = saveMappingFailure();
        expect(functioncalls(mockState)).toBeFalsy();
    });
});