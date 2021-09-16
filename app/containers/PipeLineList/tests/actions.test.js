
import {GET_PIPELINE_LIST,DELETE_PIPELINE, GET_ALARM_LIST, GET_PLANT_LIST } from "../constants";
import { getPipelineList,  pipelineDeleteHandler, managePlantList, manageGetAlarmList} from "../actions";

describe("PipeLineList actions", () => {


  describe("Get Pipeline List", () => {
    it("has a type of GET_PIPELINE_LIST", () => {
      const expected = {
        type: GET_PIPELINE_LIST,
        id: "plantId"
      };
      expect(getPipelineList("plantId")).toEqual(expected);
    });
  });

  describe("Delete Pipeline", () => {
    it("has a type of DELETE_PIPELINE", () => {
      const expected = {
        type: DELETE_PIPELINE,
        plantId:"plantId",
        pipeId:"pipelineId"
      };
      expect(pipelineDeleteHandler("plantId","pipelineId")).toEqual(expected);
    });
  });
  describe("Get Alarm List", () => {
    it("has a type of GET_ALARM_LIST", () => {
      const expected = {
        type: GET_ALARM_LIST,
        plantId: "plantId", 
        limit: 10,
        offset: 0,
      };
      expect(manageGetAlarmList("plantId",10, 0)).toEqual(expected);
    });
  });

  describe("get Plant List", () => {
    it("has a type of GET_PLANT_LIST", () => {
      const expected = {
        type: GET_PLANT_LIST
      };
      expect(managePlantList()).toEqual(expected);
    });
  });

});
