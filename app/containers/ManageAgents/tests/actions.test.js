import { defaultAction, fetchAgentsList, deleteHandler } from '../actions';
import { DEFAULT_ACTION, GET_AGENTS, DELETE_REQUEST } from '../constants';

describe('ManageAgents actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Fetch Agents List Action', () => {
    it('has a type of GET_AGENTS', () => {
      const expected = {
        type: GET_AGENTS,
      };
      expect(fetchAgentsList()).toEqual(expected);
    });
  });

  describe('Fetch Agents List Action', () => {
    it('has a type of DELETE_REQUEST', () => {
      const expected = {
        type: DELETE_REQUEST,
        id: 1
      };
      expect(deleteHandler(1)).toEqual(expected);
    });
  });
});
