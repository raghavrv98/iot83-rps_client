import { fromJS } from 'immutable';
import { 
  getResetPasswordSuccess, getResetPasswordFailure,
  selectLoginPageDomain, 
  getLoginSuccess, getLoginError } from '../selectors';
const mockState = fromJS({
  loginPage: {
    login_success: true,
    login_failed_message: false,
    resetPasswordSuccess: true,
    resetPasswordFailure: false,
  }
})

describe('selectLoginPageDomain', () => {

  it('Expect to have unit tests specified', () => {
      expect(true).toEqual(true);
  });

  it('should return getResetPasswordSuccess state ', () => {
      const functioncalls = getResetPasswordSuccess();
      expect(functioncalls(mockState)).toEqual(true);
  });

  it('should return getResetPasswordFailure state ', () => {
      const functioncalls = getResetPasswordFailure();
      expect(functioncalls(mockState)).toEqual(false);
  });

  it('should return getLoginSuccess state ', () => {
      const functioncalls = getLoginSuccess();
      expect(functioncalls(mockState)).toEqual(true);
  });

  it('should return getLoginError state ', () => {
      const functioncalls = getLoginError();
      expect(functioncalls(mockState)).toEqual(false);
  });
  
});
