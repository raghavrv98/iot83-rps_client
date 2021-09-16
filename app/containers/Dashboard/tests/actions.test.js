import { defaultAction,getPipeLineSummary,managePlantList, fetchPipelinesDetails, getSegmentData, getAlarmChart, getAttributes } from '../actions';
import { DEFAULT_ACTION, 
        GET_CHART_DATA, 
        GET_TIME_FREEZE_DATA, 
        GET_SEGMENT_DATA, 
        GET_PLANT_LIST,
        GET_PIPELINE_DETAILS,
        GET_ATTRIBUTES
} from '../constants';

describe('Dashboard actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe('GET_TIME_FREEZE_DATA', () => {
    it('has a type of GET_TIME_FREEZE_DATA', () => {
      const expected = {
        type: GET_TIME_FREEZE_DATA,
        pipelineId: "pipelineId",
        plantId: "plantId"
      };
      expect(getPipeLineSummary("pipelineId","plantId")).toEqual(expected);
    });
  });

  describe('GET_PLANT_LIST', () => {
    it('has a type of GET_PLANT_LIST', () => {
      const expected = {
        type: GET_PLANT_LIST,
      };
      expect(managePlantList()).toEqual(expected);
    });
  });

  describe('GET_PIPELINE_DETAILS', () => {
    it('has a type of GET_PIPELINE_DETAILS', () => {
      const expected = {
        type: GET_PIPELINE_DETAILS,
        plantId: "demo"
      };
      expect(fetchPipelinesDetails("demo")).toEqual(expected);
    });
  });
  
  describe('GET_SEGMENT_DATA', () => {
    it('has a type of GET_SEGMENT_DATA', () => {
      const expected = {
        type: GET_SEGMENT_DATA,
        pipelineId: "demoPipelineId", 
        plantId: "demoPlantId", 
        segment: ["d","t"],
        attribute: "demoAttribute",
        timestamp: "demoTimestamp"
      };
      expect(getSegmentData("demoPipelineId","demoPlantId","demoSegment","demoAttribute","demoTimestamp")).toEqual(expected);
    });
  });

  describe('GET_CHART_DATA', () => {
    it('has a type of GET_CHART_DATA', () => {
      const expected = {
        type: GET_CHART_DATA,
        pipelineId: "demo", 
        plantId: "demo", 
        distance: "demo"
      };
      expect(getAlarmChart("demo","demo","demo")).toEqual(expected);
    });
  });

  describe('GET_ATTRIBUTES', () => {
    it('has a type of GET_ATTRIBUTES', () => {
      const expected = {
        type: GET_ATTRIBUTES
      };
      expect(getAttributes()).toEqual(expected);
    });
  });
});



