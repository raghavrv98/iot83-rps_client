import { fromJS } from 'immutable';
import { navSuccess,selectHomePageDomain, navFailure, versionSuccess, versionFailure } from '../selectors';
const mockedState = fromJS({
    homePage: {
        navSuccess: "this is mock navResponse",
        navFailure: "this is mock navError",
        versionSuccess: "this is mock versionResponse",
        versionFailure: "this is mock versionError"
    }
  })

describe('selectHomePageDomain', () => {

    it('should select the global state', () => {
        const globalState = fromJS({});
        const mockedState = fromJS({
          error: "this is error message",
        });
        expect(selectHomePageDomain(mockedState)).toEqual(globalState);
    });

    it('should return navSuccess state ', () => {
        const navSuccessState = navSuccess();
        expect(navSuccessState(mockedState)).toEqual("this is mock navResponse");
    });

    it('should return navFailure state ', () => {
        const navFailureState = navFailure();
        expect(navFailureState(mockedState)).toEqual("this is mock navError");
    });

    it('should return versionSuccess state ', () => {
        const versionSuccessState = versionSuccess();
        expect(versionSuccessState(mockedState)).toEqual("this is mock versionResponse");
    });

    it('should return versionFailure state ', () => {
        const versionFailureState = versionFailure();
        expect(versionFailureState(mockedState)).toEqual("this is mock versionError");
    });
});