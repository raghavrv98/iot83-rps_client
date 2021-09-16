/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, all } from "redux-saga/effects";
import { errorHandler} from "../../../utils/commonUtils";
import rootSaga, {
  watcherGetPlantLists,
  watcherAddEditMapping,
  watcherGetMappingData,
  watcherGetAgentDetails,
  apiGetPlants,
  apiAddEditMapping,
  apiGetMappingData,
  apiGetAgentDetails
} from "../saga";

import {
  GET_PLANTS,
  GET_PLANTS_FAILURE,
  GET_PLANTS_SUCCESS,
  GET_EDIT_SAVE_MAP,
  GET_EDIT_SAVE_MAP_SUCCESS,
  GET_EDIT_SAVE_MAP_FAILURE,
  GET_MAPPING_DATA,
  GET_MAPPING_DATA_SUCCESS,
  GET_MAPPING_DATA_FAILURE,
  GET_AGENT_DETAILS,
  GET_AGENT_DETAILS_SUCCESS,
  GET_AGENT_DETAILS_FAILURE
} from "../constants";

describe("addOrEditMappingSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });
  it("unit testing on rootSaga", () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherGetPlantLists(),
      watcherAddEditMapping(),
      watcherGetMappingData(),
      watcherGetAgentDetails()
    ]));
  });

  it('should dispatch action "GET_PIPELINES" ', () => {
    const generator = watcherGetPlantLists();
    expect(generator.next().value).toEqual(
      takeLatest(GET_PLANTS, apiGetPlants)
    );
  });
  it('should dispatch action "GET_EDIT_SAVE_MAP" ', () => {
    const generator = watcherAddEditMapping();
    expect(generator.next().value).toEqual(
      takeLatest(GET_EDIT_SAVE_MAP, apiAddEditMapping)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_MAPPING_DATA" ', () => {
    const action ={
      agentId:"demo",
      mapId:"demo"
    }
    const generator = watcherGetMappingData(action);
    expect(generator.next().value).toEqual(
      takeLatest(GET_MAPPING_DATA, apiGetMappingData)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_AGENT_DETAILS" ', () => {
    const action = {
      id:"id"
    }
    const generator = watcherGetAgentDetails(action);
    expect(generator.next().value).toEqual(
      takeLatest(GET_AGENT_DETAILS, apiGetAgentDetails)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_AGENT_DETAILS_SUCCESS" with result from fetch News API', () => {
    const action = {
      id:'id'
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiGetMappingData(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_MAPPING_DATA_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "GET_AGENT_DETAILS_SUCCESS" with result from fetch News API', () => {
    const action = {
      id:'id'
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiGetAgentDetails(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_AGENT_DETAILS_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "GET_PIPELINES_SUCCESS" with result from fetch News API', () => {
    const action = {
      id:'id'
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiAddEditMapping(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_EDIT_SAVE_MAP_SUCCESS, response: undefined })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "GET_PIPELINES_SUCCESS" with result from fetch News API', () => {
    const action = {
      mapId:'id'
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiAddEditMapping(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_EDIT_SAVE_MAP_SUCCESS, response: undefined })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "GET_PLANTS_SUCCESS" with result from fetch News API', () => {
    const action = {
      id:'id'
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiGetPlants(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_PLANTS_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });


  it('catch apiGetPlants errorHandler', () => {
    const error = "error";
    const action = {
        id: "demo"
    }
    const gen = apiGetPlants(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(errorHandler(error,GET_PLANTS_FAILURE))
  });
  it('catch apiAddEditMapping errorHandler', () => {
    const error = "error";
    const action = {
        id: "demo"
    }
    const gen = apiAddEditMapping(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(errorHandler(error,GET_EDIT_SAVE_MAP_FAILURE))
  });
  it('catch apiGetMappingData errorHandler', () => {
    const error = "error";
    const action = {
        id: "demo"
    }
    const gen = apiGetMappingData(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(errorHandler(error,GET_MAPPING_DATA_FAILURE))
  });
  it('catch apiGetAgentDetails errorHandler', () => {
    const error = "error";
    const action = {
        id: "demo"
    }
    const gen = apiGetAgentDetails(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(errorHandler(error,GET_AGENT_DETAILS_FAILURE))
  });
});
