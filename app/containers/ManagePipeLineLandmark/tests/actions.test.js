import { getLandmarkList, deleteHandler } from '../actions';
import { GET_LANDMARK_LIST, LANDMARK_DELETE_REQUEST } from "../constants";

describe('ManageOAuthMapping actions', () => {

  describe('GET_LANDMARK_LIST', () => {
    it('has a type of GET_LANDMARK_LIST', () => {
      const expected = {
        type: GET_LANDMARK_LIST,
        plantId: "demo",
        pipelineId: "demo"
      };
      expect(getLandmarkList("demo", "demo")).toEqual(expected);
    });
  });

  describe('LANDMARK_DELETE_REQUEST', () => {
    it('has a type of LANDMARK_DELETE_REQUEST', () => {
      const expected = {
        type: LANDMARK_DELETE_REQUEST,
        plantId: "demo",
        pipelineId: "demo",
        id: "demo"
      };
      expect(deleteHandler("demo", "demo", "demo")).toEqual(expected);
    });
  });

});
