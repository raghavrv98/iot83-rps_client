import { fetchLandmarkDetails, createLandmarkHandler, uploadLandmarkImage } from '../actions';
import { GET_LANDMARK_DETAILS, CREATE_LANDMARK_DETAILS, UPLOAD_LANDMARK_IMAGE } from '../constants';

describe('AddorEditPipeLineLandmark actions', () => {

  describe("Get Landmark Details", () => {
    it("has a type of GET_LANDMARK_DETAILS", () => {
      const expected = {
        type: GET_LANDMARK_DETAILS,
        plantId : "demoPlantId",
        pipelineId : "demoPipelineId",
        id:"demoId",
      };
      expect(fetchLandmarkDetails("demoPlantId", "demoPipelineId","demoId")).toEqual(expected);
    });
  });

  describe("create Landmark Handler", () => {
    it("has a type of CREATE_LANDMARK_DETAILS", () => {
      const expected = {
        type: CREATE_LANDMARK_DETAILS,
        payload: "demoPayload",
        plantId: "demoPlantId",
        pipelineId: "demoPipelineId",
        id: "demoId"
      };
      expect(createLandmarkHandler("demoPayload", "demoPlantId", "demoPipelineId", "demoId")).toEqual(expected);
    });
  });

  describe("upload Landmark Image", () => {
    it("has a type of UPLOAD_LANDMARK_IMAGE", () => {
      const expected = {
        type: UPLOAD_LANDMARK_IMAGE,
        image:"demoImage"
      };
      expect(uploadLandmarkImage("demoImage")).toEqual(expected);
    });
  });
  
});