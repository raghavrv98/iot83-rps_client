/**
 * Test sagas
 */

import { data } from "jquery";
import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from '../../../utils/commonUtils';
import {
  GET_MAPINGS, GET_MAPINGS_FAILURE, GET_MAPINGS_SUCCESS,
  SAVE_MAPPINGS, SAVE_MAPPINGS_SUCCESS, SAVE_MAPPINGS_FAILURE,
  GET_AGENT, GET_AGENT_SUCCESS, GET_AGENT_FAILURE,
  DELETE_MAPPING, DELETE_MAPPING_SUCCESS, DELETE_MAPPING_FAILURE,
  GET_PLANTLIST, GET_PLANTLIST_SUCCESS, GET_PLANTLIST_FAILURE,
  GET_PIPELINELIST, GET_PIPELINELIST_SUCCESS, GET_PIPELINELIST_FAILURE
} from "../constants";
import rootSaga, {
  apiGetMappingList,
  apiGetAgent,
  apiDeleteMapping,
  apiSaveMappings,
  apiGetPipelineList,
  apiGetPlantList
} from "../saga";
import {
  watcherAgentsRequests,
  watcherGetAgent,
  watcherDeleteMapping,
  watcherSaveMappings,
  watcherGetPlantList,
  watcherGetPipelineList,

} from "../saga";

const error = "error";

describe("mappingListSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("unit testing on rootSaga", () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherAgentsRequests(),
      watcherGetAgent(),
      watcherDeleteMapping(),
      watcherSaveMappings(),
      watcherGetPlantList(),
      watcherGetPipelineList(),
    ]));
  });

  it('should dispatch action "GET_MAPINGS" ', () => {
    const generator = watcherAgentsRequests();
    expect(generator.next().value).toEqual(
      takeLatest(GET_MAPINGS, apiGetMappingList)
    );
  });

  it('should dispatch action "GET_AGENT" ', () => {
    const generator = watcherGetAgent();
    expect(generator.next().value).toEqual(takeLatest(GET_AGENT, apiGetAgent));
  });

  it('should dispatch action "DELETE_MAPPING" ', () => {
    const generator = watcherDeleteMapping();
    expect(generator.next().value).toEqual(
      takeLatest(DELETE_MAPPING, apiDeleteMapping)
    );
  });

  it('should dispatch action "SAVE_MAPPING" ', () => {
    const generator = watcherSaveMappings();
    expect(generator.next().value).toEqual(
      takeLatest(SAVE_MAPPINGS, apiSaveMappings)
    );
  });

  it('should dispatch action "GET_PLANTLIST" ', () => {
    const generator = watcherGetPlantList();
    expect(generator.next().value).toEqual(
      takeLatest(GET_PLANTLIST, apiGetPlantList)
    );
  });

  it('should dispatch action "GET_PIPELINELIST" ', () => {
    const generator = watcherGetPipelineList();
    expect(generator.next().value).toEqual(
      takeLatest(GET_PIPELINELIST, apiGetPipelineList)
    );
  });

  it('should dispatch action "SAVE_MAPPINGS_SUCCESS" with result from fetch News API', () => {
    const mockAction = {
      payload: "demo",
      id: "demoId"
    };
    const generator = apiSaveMappings(mockAction);
    generator.next();
    expect(generator.next().value).toEqual(
      put({ type: SAVE_MAPPINGS_SUCCESS, response: "demoId" })
    );
  });

  it('should dispatch action "SAVE_MAPPINGS_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      payload: "demo",
      id: "demoId"
    };
    const generator = apiSaveMappings(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, SAVE_MAPPINGS_FAILURE)
    );
  });


  it('should dispatch action "GET_PLANTLIST" with result from fetch News API', () => {
    const response = {
      data: {
        data: true
      }
    };

    const generator = apiGetPlantList();
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_PLANTLIST_SUCCESS, response: response.data.data })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_PLANTLIST_FAILURE" with result from fetch News API', () => {
    
    const generator = apiGetPlantList();
    generator.next();
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, GET_PLANTLIST_FAILURE)
    );
  });

  it('should dispatch action "GET_PIPELINELIST" with result from fetch News API', () => {
    const response = {
      data: {
        data: true
      }
    };

    const generator = apiGetPipelineList();
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_PIPELINELIST_SUCCESS, response: response.data.data })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_PIPELINELIST_FAILURE" with result from fetch News API', () => {
    
    const generator = apiGetPipelineList();
    generator.next();
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, GET_PIPELINELIST_FAILURE)
    );
  });



  it('should dispatch action "DELETE_MAPPING" with result from fetch News API', () => {
    const response = {
      data: {
        data: true
      }
    };
    const action = {
      id: "demoId",
      mapId: "demoId"
    };
    const generator = apiDeleteMapping(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: DELETE_MAPPING_SUCCESS, response: "demoId" })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "DELETE_MAPPING_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      id: "demoId",
      mapId: "demoId"
    };
    const generator = apiDeleteMapping(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, DELETE_MAPPING_FAILURE)
    );
  });


  it('should dispatch action "GET_AGENT" with result from fetch News API', () => {
    const response = {
      data: {
        data: true
      }
    };
    const action = {
      id: "demoId"
    };
    const generator = apiGetAgent(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_AGENT_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_AGENT_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      id: "demoId"
    };
    const generator = apiGetAgent(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, GET_AGENT_FAILURE)
    );
  });

  it('should dispatch action "GET_MAPINGS" with result from fetch News API', () => {
    const response = {
      data: {
        data: true
      }
    };
    const action = {
      id: "demoId"
    };
    const generator = apiGetMappingList(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_MAPINGS_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_MAPINGS_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      id: "demoId"
    };
    const generator = apiGetMappingList(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, GET_MAPINGS_FAILURE)
    );
  });
});
