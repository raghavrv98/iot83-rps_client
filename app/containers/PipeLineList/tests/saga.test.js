/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
import { all, put, takeLatest } from "redux-saga/effects";
import {
  GET_PIPELINE_LIST,
  GET_PIPELINE_LIST_FAILURE,
  GET_PIPELINE_LIST_SUCCESS,
  DELETE_PIPELINE,
  DELETE_PIPELINE_SUCCESS,
  DELETE_PIPELINE_FAILURE,
  GET_PLANT_LIST,
  GET_PLANT_LIST_SUCCESS,
  GET_PLANT_LIST_FAILURE,
  GET_ALARM_LIST,
  GET_ALARM_LIST_FAILURE,
  GET_ALARM_LIST_SUCCESS,
  GET_PIPELINE_SEGMENT_DATA, 
  GET_PIPELINE_SEGMENT_DATA_SUCCESS,
  GET_PIPELINE_SEGMENT_DATA_FAILURE
} from "../constants";
import rootSaga, {
  watcherGetPiplineList,
  watcherGetAlarmList,
  watcherDeletePipeLine,
  watcherGetPlantList,
  watcherGetSegments,
  apiGetPiplineList,
  apiDeletePipeline,
  apiGetAlarmList,
  apiGetPlantList,
  apiGetSegments
} from "../saga";
import { errorHandler } from '../../../utils/commonUtils'

describe("pipeLineListSaga Saga", () => {

  // it("unit testing on rootSaga", () => {
  //   const generator = rootSaga();
  //   expect(generator.next().value).toEqual(all([
  //     watcherGetPiplineList,
  //     watcherGetAlarmList,
  //     watcherDeletePipeLine,
  //     watcherGetPlantList,
  //     watcherGetSegments,
  //   ]));
  // });

  it('should dispatch action "GET_PIPELINE_LIST"', () => {
    const generator = watcherGetPiplineList();
    expect(generator.next().value).toEqual(
      takeLatest(GET_PIPELINE_LIST, apiGetPiplineList)
    );
  });

  it('should dispatch action "GET_ALARM_LIST"', () => {
    const generator = watcherGetAlarmList();
    expect(generator.next().value).toEqual(
      takeLatest(GET_ALARM_LIST, apiGetAlarmList)
    );
  });

  it('should dispatch action "GET_PLANT_LIST"', () => {
    const generator = watcherGetPlantList();
    expect(generator.next().value).toEqual(
      takeLatest(GET_PLANT_LIST, apiGetPlantList)
    );
  });

  it('should dispatch action "DELETE_PIPELINE" ', () => {
    const generator = watcherDeletePipeLine();
    expect(generator.next().value).toEqual(
      takeLatest(DELETE_PIPELINE, apiDeletePipeline)
    );
  });

  // it('should dispatch action "GET_PIPELINE_SEGMENT_DATA" ', () => {
  //   const generator = watcherGetSegments();
  //   expect(generator.next().value).toEqual(
  //     takeLatest(GET_PIPELINE_SEGMENT_DATA, apiGetSegments)
  //   );
  // });

  // it('should dispatch action "GET_PIPELINE_LIST_SUCCESS" with result from fetch pipeline API', () => {
  //   const response = {
  //     data: {
  //       data: true
  //     }
  //   };
  //   const action = {
  //     id: "demoId"
  //   };
  //   const generator = apiGetPiplineList(action);
  //   generator.next();
  //   expect(generator.next(response).value).toEqual(
  //     put({ type: GET_PIPELINE_LIST_SUCCESS, response: true })
  //   );
  //   expect(generator.next().done).toBeTruthy();
  // });

  it('should dispatch action "GET_ALARM_LIST_SUCCESS" with result from fetch pipeline API', () => {
    const response = {
      data: {
        data: true
      }
    };
    
    const action = {
      plantId: "demoId",
      max: 10,
      offset: 0
    };
    const generator = apiGetAlarmList(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_ALARM_LIST_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_PLANT_LIST_SUCCESS" with result from fetch pipeline API', () => {
    const response = {
      data: {
        data: true
      }
    };
    const action = {
      id: "demoId"
    };
    const generator = apiGetPlantList(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_PLANT_LIST_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "DELETE_PIPELINE_SUCCESS" with result from fetch News API', () => {
    const response = {
      data: {
        data: true
      }
    };
    const action = {
      plantId: "demoId",
      pipeId: "demoId"
    };
    const generator = apiDeletePipeline(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: DELETE_PIPELINE_SUCCESS, response: "demoId" })
    );
    expect(generator.next().done).toBeTruthy();
  });

  // it('should dispatch action "GET_PIPELINE_SEGMENT_DATA_SUCCESS" with result from fetch News API', () => {
  //   const response = {
  //     data: {
  //       data: true
  //     }
  //   };
  //   const action = {
  //     pipelines : "demo"
  //   };
  //   const generator = apiGetSegments(action);
  //   generator.next();
  //   expect(generator.next(response).value).toEqual(
  //     put({ type: GET_PIPELINE_SEGMENT_DATA_SUCCESS, response: true })
  //   );
  //   expect(generator.next().done).toBeTruthy();
  // });

  it('apiDeletePipeline unit test case for DELETE_PIPELINE_FAILURE', () => {
    const action = {
      plantId: "demoId",
      pipeId: "demoId"
    }; 
    const error = "error"
    let generator = apiDeletePipeline(action);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, DELETE_PIPELINE_FAILURE));
});

it('apiGetPiplineList unit test case for GET_PIPELINE_LIST_FAILURE', () => {
  const action = {
      id: "demoId"
  }
  const error = "error"
  let generator = apiGetPiplineList(action);
  generator.next();
  expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PIPELINE_LIST_FAILURE));
});

it('apiDeletePipeline unit test case for GET_PLANT_LIST_FAILURE', () => {
  const action = {}; 
  const error = "error"
  let generator = apiGetPlantList(action);
  generator.next();
  expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PLANT_LIST_FAILURE));
});

it('apiGetPiplineList unit test case for GET_ALARM_LIST_FAILURE', () => {
  const action = {
    plantId: "demoId",
    max: 10,
    offset: 0
  };
  const error = "error"
  let generator = apiGetAlarmList(action);
  generator.next();
  expect(generator.throw(error).value).toEqual(errorHandler(error, GET_ALARM_LIST_FAILURE));
});

// it('apiGetPiplineList unit test case for GET_PIPELINE_SEGMENT_DATA_FAILURE', () => {
//   const action = {
//     pipelines : "demo"
//   };
//   const error = "error"
//   let generator = apiGetSegments(action);
//   generator.next();
//   expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PIPELINE_SEGMENT_DATA_FAILURE));
// });
 
});