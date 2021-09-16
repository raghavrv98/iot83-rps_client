import { defaultAction, passwordRequestList } from '../actions';
import { DEFAULT_ACTION, PASSWORDREQUESTLIST } from '../constants';

describe('ManagePasswordRequest actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe('passwordRequestList Action', () => {
    it('has a type of PASSWORDREQUESTLIST', () => {
      const expected = {
        type:PASSWORDREQUESTLIST,
        payload:"demo",
        id:"demo"
      };
      expect(passwordRequestList("demo","demo")).toEqual(expected);
    });
  });
});
