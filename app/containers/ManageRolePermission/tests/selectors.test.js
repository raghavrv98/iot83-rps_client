import { fromJS } from 'immutable';
import { 
    getEntitlementsSuccess,getEntitlementsFailure,
    getSubmitSuccess,getSubmitError,
    getRoleDetailsSuccess,getRoleDetailsError,
    getPermissionsDetails,getPermissionsFailure,
} from '../selectors';

const mockState = fromJS({
    ManageRolePermission:{
        onSubmitSuccess: true,
        onSubmitFailure: false,
        roleDetailsSuccess: true,
        roleDetailsFailure: false,
        getPermissionsDetails: true,
        getPermissionsFailure: false,
        getEntitlementsSuccess: true,
        getEntitlementsFailure: false,
    }
})

describe('ManageRolePermission', () => {

    it('should return getSubmitSuccess state ', () => {
        const functioncalls = getSubmitSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return onSubmitFailure state ', () => {
        const functioncalls = getSubmitError();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return getPermissionsDetails state ', () => {
        const functioncalls = getPermissionsDetails();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return getPermissionsFailure state ', () => {
        const functioncalls = getPermissionsFailure();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return getEntitlementsSuccess state ', () => {
        const functioncalls = getEntitlementsSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return getEntitlementsFailure state ', () => {
        const functioncalls = getEntitlementsFailure();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return roleDetailsSuccess state ', () => {
        const functioncalls = getRoleDetailsSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return roleDetailsFailure state ', () => {
        const functioncalls = getRoleDetailsError();
        expect(functioncalls(mockState)).toEqual(false);
    });
});