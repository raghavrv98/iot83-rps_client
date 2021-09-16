import { fromJS } from 'immutable';
import { 
    getTenantsList, 
    getTenantsListError,
    getDeleteSuccess,
    getDeleteError 
} from '../selectors';

const mockState = fromJS({
    manageTenants: {
        tenantsList: true ,
        tenantsListError: false,
        deleteSuccess: true ,
        deleteFailure: false,
    }
})

describe('selectManageTenantsDomain', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('should return getTenantsList state ', () => {
        const functioncalls = getTenantsList();
        expect(functioncalls(mockState)).toBeTruthy();
    });

    it('should return getTenantsListError state ', () => {
        const functioncalls = getTenantsListError();
        expect(functioncalls(mockState)).toBeFalsy();
    });

    it('should return getDeleteSuccess state ', () => {
        const functioncalls = getDeleteSuccess();
        expect(functioncalls(mockState)).toBeTruthy();
    });

    it('should return getDeleteError state ', () => {
        const functioncalls = getDeleteError();
        expect(functioncalls(mockState)).toBeFalsy();
    });
});