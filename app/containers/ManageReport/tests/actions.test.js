import { getReportList, managePlantList, fetchPipelinesDetails } from '../actions';
import { GET_REPORT_LIST, GET_PLANT_LIST, GET_PIPELINE_DETAILS } from '../constants';

describe('ManageReport actions', () => {
  
  describe('Default Action', () => {
    it('has a type of GET_REPORT_LIST', () => {
      const expected = {
        type: GET_REPORT_LIST,
        plantId: "demoPlantId",
        pipelineId : "demoPipelineId"
      };
      expect(getReportList("demoPlantId", "demoPipelineId")).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of GET_PLANT_LIST', () => {
      const expected = {
        type: GET_PLANT_LIST,
      };
      expect(managePlantList()).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of GET_PIPELINE_DETAILS', () => {
      const expected = {
        type: GET_PIPELINE_DETAILS,
        plantId : "demoPlantId"
      };
      expect(fetchPipelinesDetails("demoPlantId")).toEqual(expected);
    });
  });

});
