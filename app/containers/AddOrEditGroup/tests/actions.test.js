import { defaultAction, onSubmitHandler,getGroupDetails } from '../actions';
import { DEFAULT_ACTION,ON_SUBMIT_REQUEST,GET_GROUP_DETAILS } from '../constants';

describe('AddOrEditGroup actions', () => {
    
    it('has a type of ON_SUBMIT_REQUEST', () => {
      const expected = {
        type: ON_SUBMIT_REQUEST,
        payload: 'demo',
        id: '123qwe'
      };
      expect(onSubmitHandler("demo","123qwe")).toEqual(expected);
    });

    it('has a type of GET_GROUP_DETAILS', () => {
      const expected = {
        type: GET_GROUP_DETAILS,
        id: '123qwe'
      };
      expect(getGroupDetails("123qwe")).toEqual(expected);
    });
  });