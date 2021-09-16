import { defaultAction,onSubmitHandler,getAllRole,getAllGroup,getUserDetails } from '../actions';
import { 
  DEFAULT_ACTION, 
  ON_SUBMIT_REQUEST, GET_USER_DETAILS, 
  GET_ALL_GROUPS, GET_ALL_ROLES 
} from '../constants';

describe('AddOrEditUser actions', () => {
  describe('Default Action', () => {
    
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });

    it('has a type of ON_SUBMIT_REQUEST', () => {
      const expected = {
        type: ON_SUBMIT_REQUEST,
        payload: "demo",
        id: "123qwe",
      };
      expect(onSubmitHandler("demo","123qwe")).toEqual(expected);
    });

    it('has a type of GET_USER_DETAILS', () => {
      const expected = {
        type: GET_USER_DETAILS,
        id: "123qwe"
      };
      expect(getUserDetails("123qwe")).toEqual(expected);
    });

    it('has a type of GET_ALL_ROLES', () => {
      const expected = {
        type: GET_ALL_ROLES,
      };
      expect(getAllRole()).toEqual(expected);
    });

    it('has a type of GET_ALL_ROLES', () => {
      const expected = {
        type: GET_ALL_GROUPS,
      };
      expect(getAllGroup()).toEqual(expected);
    });

  });
});
