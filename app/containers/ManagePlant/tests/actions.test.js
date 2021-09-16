import { defaultAction,managePlantList,deleteHandler } from '../actions';
import { DEFAULT_ACTION,GET_PLANTLIST,DELETE_PLANT } from '../constants';

describe('ManagePlant actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });

    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_PLANTLIST
      };
      expect(managePlantList()).toEqual(expected);
    });

    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DELETE_PLANT,
        id : "demoId"
      };
      expect(deleteHandler("demoId")).toEqual(expected);
    });

  });
});
