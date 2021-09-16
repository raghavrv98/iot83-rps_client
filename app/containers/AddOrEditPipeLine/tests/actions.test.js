import {
  onSubmitHandler,
  getPipelineDetails,
} from "../actions";
import {
  ON_SUBMIT_REQUEST,
  GET_PIPELINE_REQUEST
} from "../constants";

describe("AddOrEditPipeLine actions", () => {
  
  describe("Create Pipeline", () => {
    it("has a type of ON_SUBMIT_REQUEST", () => {
      const expected = {
        type: ON_SUBMIT_REQUEST,
        payload: "demo",
        pipelineId: "demo",
        id: "id"
      };
      expect(onSubmitHandler("demo", "id", "demo")).toEqual(expected);
    });
  });

  describe("GET PIPELINE REQUEST", () => {
    it("has a type of GET_PIPELINE_REQUEST", () => {
      const expected = {
        type: GET_PIPELINE_REQUEST,
        pipelineId: "demo",
        id: "id"
      };
      expect(getPipelineDetails("id", "demo")).toEqual(expected);
    });
  });

});
