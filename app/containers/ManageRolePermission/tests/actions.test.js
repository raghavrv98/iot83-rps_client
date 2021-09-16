import { defaultAction,onSubmitHandler,getEntitlements,getRoleDetails,getPermissions } from '../actions';
import { DEFAULT_ACTION,GET_ROLE_DETAILS,GET_ENTITLEMENTS,ON_SUBMIT_REQUEST,GET_PERMISSIONS } from '../constants';

describe('ManageRolePermission actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });

    it('has a type of GET_ROLE_DETAILS', () => {
      const expected = {
        type: GET_ROLE_DETAILS,
        id: "demoId",
      };
      expect(getRoleDetails("demoId")).toEqual(expected);
    });

    it('has a type of GET_ENTITLEMENTS', () => {
      const expected = {
        type: GET_ENTITLEMENTS
      };
      expect(getEntitlements()).toEqual(expected);
    });

    it('has a type of ON_SUBMIT_REQUEST', () => {
      const expected = {
        type: ON_SUBMIT_REQUEST,
        payload : "demo",
        id : "demoId",
      };
      expect(onSubmitHandler("demo","demoId")).toEqual(expected);
    });

    it('has a type of GET_PERMISSIONS', () => {
      const expected = {
        type: GET_PERMISSIONS,
      };
      expect(getPermissions()).toEqual(expected);
    });
  });
});
