import { defaultAction, getTenants, deleteHandler } from '../actions';
import { DEFAULT_ACTION, GET_TENANTS, DELETE_TENANT } from '../constants';

describe('ManageTenants actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Get Tenants Action', () => {
    it('has a type of GET_TENANTS', () => {
      const expected = {
        type: GET_TENANTS,
      };
      expect(getTenants()).toEqual(expected);
    });
  });

  describe('Delete Tenants Action', () => {
    it('has a type of DELETE_TENANT', () => {
      const id = "1214r21134"
      const expected = {
        type:DELETE_TENANT,
        id
      };
      expect(deleteHandler(id)).toEqual(expected);
    });
  });
});
