// import { fromJS } from 'immutable';
import { 
    selectAddOrEditTenantDomain ,
    getSubmitSuccess,
    getSubmitFailure,
    getTenantByIdSuccess,
    getTenantByIdFailure 
} from '../selectors';
import { fromJS } from 'immutable';

const mockState = fromJS({
    addOrEditTenant: {
        submitSuccess: true ,
        submitFailure: false,
        tenantByIdSuccess: true,
        tenantByIdFailure: false,
    }
})

describe('selectAddOrEditTenantDomain', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('should return getSubmitSuccess state ', () => {
        const functioncalls = getSubmitSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return getSubmitFailure state ', () => {
        const functioncalls = getSubmitFailure();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return getTenantByIdSuccess state ', () => {
        const functioncalls = getTenantByIdSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return getTenantByIdFailure state ', () => {
        const functioncalls = getTenantByIdFailure();
        expect(functioncalls(mockState)).toEqual(false);
    });
});