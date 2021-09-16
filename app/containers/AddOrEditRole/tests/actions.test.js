import { defaultAction,onSubmitHandler, getRoleDetails, getPermissions,getEntitlements } from '../actions';
import { DEFAULT_ACTION ,ON_SUBMIT_REQUEST,GET_ROLE_DETAILS, GET_PERMISSIONS,GET_ENTITLEMENTS} from "../constants";

describe('AddOrEditRole actions', () => {

    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION
      };
      expect(defaultAction()).toEqual(expected);
    });

    it("has a type of ON_SUBMIT_REQUEST", () => {
      expect(onSubmitHandler("demo","123qwe")).
      toEqual({
        type: ON_SUBMIT_REQUEST,
        payload: "demo",
        id: "123qwe",
      })
    });

    it("has a type of ON_SUBMIT_REQUEST", () => {
      expect(getRoleDetails("123qwe")).
      toEqual({
        type: GET_ROLE_DETAILS,
        id: "123qwe",
      })
    });

    it("has a type of GET_PERMISSIONS", () => {
      expect(getPermissions()).
      toEqual({
        type: GET_PERMISSIONS,
      })
    });

    it("has a type of GET_ENTITLEMENTS", () => {
      expect(getEntitlements()).
      toEqual({
        type: GET_ENTITLEMENTS,
      })
    });
});
