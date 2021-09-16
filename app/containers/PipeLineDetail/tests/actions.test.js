import { DEFAULT_ACTION, GET_PIPELINES,SAVE_DETAILS,DELETE_DETAILS } from '../constants';
import {
  defaultAction,getPipelineDetails,
  savePipelineDetails,deleteFileHandler
} from '../actions';

describe('PipeLineDetail actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });

    it('has a type of GET_PIPELINES', () => {
      const expected = {
        type: GET_PIPELINES,
        plantId: "demoPlant",
        pipelineId: "demoPipeline"
      };
      expect(getPipelineDetails("demoPlant","demoPipeline")).toEqual(expected);
    });

    it('has a type of SAVE_DETAILS', () => {
      const expected = {
        type: SAVE_DETAILS,
        fileDetails : "demoDetails",
        modifyPipeline : "demoModify",
      };
      expect(savePipelineDetails("demoDetails","demoModify")).toEqual(expected);
    });

    it('has a type of DELETE_DETAILS', () => {
      const expected = {
        type: DELETE_DETAILS,
        plantId : "demoPlant" ,
        pipelineId : "demoPipeline"
      };
      expect(deleteFileHandler("demoPlant","demoPipeline")).toEqual(expected);
    });
  });
});
