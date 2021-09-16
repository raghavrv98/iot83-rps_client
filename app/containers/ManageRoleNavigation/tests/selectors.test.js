import { fromJS } from 'immutable';
import { 
    fetchMenus,fetchMenusError,
    fetchAllMenus,fetchAllMenusError,
    saveMenuSuccess,saveMenuError 
} from '../selectors';

describe('selectManageRoleNavigationDomain', () => {

    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    const mockedState = fromJS({
        manageRoleNavigation: {
            fetchMenus: true,
            fetchMenusError: false,
            fetchAllMenus: true,
            fetchAllMenusError: false,
            saveMenuSuccess: true,
            saveMenuError: false
        }
    })

    it('should return fetchMenus state ', () => {
        const functioncalls = fetchMenus();
        expect(functioncalls(mockedState)).toEqual(true);
    });
    
    it('should return fetchMenusError state ', () => {
        const functioncalls = fetchMenusError();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return fetchAllMenus state ', () => {
        const functioncalls = fetchAllMenus();
        expect(functioncalls(mockedState)).toEqual(true);
    });
    
    it('should return fetchAllMenusError state ', () => {
        const functioncalls = fetchAllMenusError();
        expect(functioncalls(mockedState)).toEqual(false);
    });

    it('should return saveMenuSuccess state ', () => {
        const functioncalls = saveMenuSuccess();
        expect(functioncalls(mockedState)).toEqual(true);
    });
    
    it('should return saveMenuError state ', () => {
        const functioncalls = saveMenuError();
        expect(functioncalls(mockedState)).toEqual(false);
    });

});