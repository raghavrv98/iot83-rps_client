import { defaultAction, getGroupList, deleteHandler } from '../actions';
import { DEFAULT_ACTION, GET_LIST, DELETE_REQUEST } from '../constants';

describe('ManageGroups actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe('Get List Action', () => {
    it('Has a type of GET_LIST', () => {
      const expected = {
        type: GET_LIST
      };
      expect(getGroupList()).toEqual(expected);
    });
  });
  describe('Delete Group Action', () => {
    it('Has a type of DELETE_REQUEST', () => {
      const expected = {
        type: DELETE_REQUEST,
        id: "sampleId"
      };
      expect(deleteHandler("sampleId")).toEqual(expected);
    });
  });
});
