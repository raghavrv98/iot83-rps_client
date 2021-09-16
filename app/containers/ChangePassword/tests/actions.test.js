import { defaultAction, changePasswordHandler } from '../actions';
import { DEFAULT_ACTION, CHANGE_PASSWORD_REQUEST } from '../constants';

describe('ChangePassword actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe('Change Password Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const payload = {
        action: "Change Password" 
      }
      const expected = {
        type: CHANGE_PASSWORD_REQUEST,
        payload,
      };
      expect(changePasswordHandler(payload)).toEqual(expected);
    });
  });
});
