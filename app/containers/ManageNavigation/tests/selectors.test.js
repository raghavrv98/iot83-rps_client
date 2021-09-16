import { fromJS } from 'immutable';
import { gotMenuSuccess, gotMenuError, menuSaveSuccess, menuSaveFailure } from '../selectors';

const mockState = fromJS({
    manageNavigation: {
        gotMenu: true ,
        notGotmenu: false,
        menuSaveSuccess: true, 
        menuSaveFailure: false
    }
})

describe('selectManageNavigationDomain', () => {

    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('should return gotMenuSuccess state ', () => {
        const functioncalls = gotMenuSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return gotMenuError state ', () => {
        const functioncalls = gotMenuError();
        expect(functioncalls(mockState)).toEqual(false);
    });

    it('should return menuSaveSuccess state ', () => {
        const functioncalls = menuSaveSuccess();
        expect(functioncalls(mockState)).toEqual(true);
    });

    it('should return menuSaveFailure state ', () => {
        const functioncalls = menuSaveFailure();
        expect(functioncalls(mockState)).toEqual(false);
    });

});