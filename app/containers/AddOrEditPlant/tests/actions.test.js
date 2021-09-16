import {
  defaultAction,
  createPlantHandler,
  fetchPlantDetails,
  uploadPlantImage
} from "../actions";
import {
  DEFAULT_ACTION,
  CREATE_PLANT,
  GET_DETAILS,
  UPLOAD_PLANT_IMAGE
} from "../constants";

describe("AddOrEditPlant actions", () => {
  describe("Default Action", () => {
    it("has a type of DEFAULT_ACTION", () => {
      const expected = {
        type: DEFAULT_ACTION
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe("Create plant", () => {
    it("has a type of CREATE_PLANT", () => {
      const expected = {
        type: CREATE_PLANT,
        payload: "demo",
        id: "demoId"
      };
      expect(createPlantHandler("demo", "demoId")).toEqual(expected);
    });
  });
  describe("Get Plant List", () => {
    it("has a type of GET_DETAILS", () => {
      const expected = {
        type: GET_DETAILS,
        id: "demoId"
      };
      expect(fetchPlantDetails("demoId")).toEqual(expected);
    });
  });
  describe("Upload Image", () => {
    it("has a type of UPLOAD_PLANT_IMAGE", () => {
      const expected = {
        type: UPLOAD_PLANT_IMAGE,
        image: "demoId"
      };
      expect(uploadPlantImage("demoId")).toEqual(expected);
    });
  });
});
