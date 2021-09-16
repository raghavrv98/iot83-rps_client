import { defaultAction, onSubmitHandler, fetchTenantInfo } from '../actions';
import { DEFAULT_ACTION, SUBMIT_HANDLER,GET_TENANT_BY_ID } from '../constants';

describe('AddOrEditTenant actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe("onSubmitHandler", () => {
    it('on submitHandler testing', () => {
      const payload = {
        "onSubmitHandler" : true,
      }
      const expected = {
        type: SUBMIT_HANDLER,
        payload
      };
      expect(onSubmitHandler(payload)).toEqual(expected);
    });

    it('on getTenantById testing', () => {
      const id = {
        "getTenantById" : true,
      }
      const expected = {
        type: GET_TENANT_BY_ID,
        id
      };
      expect(fetchTenantInfo(id)).toEqual(expected);
    });
  });
});
