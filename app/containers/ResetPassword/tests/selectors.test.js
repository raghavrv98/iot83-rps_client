import { fromJS } from 'immutable';
import { selectResetPasswordDomain, getResetPasswordSuccess, getResetPasswordFailure } from '../selectors';

const getListPageMockState = fromJS({
    resetPassword: {
      resetPasswordSuccess: "Group Deleted successfully.",
      resetPasswordFailure: "Group id is not found."
    }
  })
  describe('selectResetPasswordDomain', () => {
    it('should select the global state', () => {
      const globalState = fromJS({});
      const mockedState = fromJS({
        error: "this is error message",
      });
      expect(selectResetPasswordDomain(mockedState)).toEqual(globalState);
    });
    it('should return getResetPasswordSuccess state ', () => {
      const getResetPasswordSuccessState = getResetPasswordSuccess();
      const expectedResponseState = "Group Deleted successfully.";
      expect(getResetPasswordSuccessState(getListPageMockState)).toEqual(expectedResponseState);
    });
    it('should return getResetPasswordFailure state ', () => {
      const getResetPasswordFailureState = getResetPasswordFailure();
      const expectedResponseState = "Group id is not found.";
      expect(getResetPasswordFailureState(getListPageMockState)).toEqual(expectedResponseState);
    });
});