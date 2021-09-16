/**
 * Test sagas
 */
import {
  CREATE_AGENT_REQUEST,
  CREATE_AGENT_SUCCESS,
  CREATE_AGENT_FAILURE,
  GET_AGENT_DETAILS,
  GET_AGENT_DETAILS_SUCCESS,
  GET_AGENT_DETAILS_FAILURE,
} from "../constants";
import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
  watcherSubmitRequests,
  watcherGetAgentInfo,
  apiSubmitHandlerAsync,
  apiGetAgentInfo
} from "../saga";

describe("addOrEditAgentSaga Saga", () => {

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });

  it("unit testing on rootSaga", () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([
      watcherSubmitRequests(),
      watcherGetAgentInfo()
    ]));
  });

  it('should dispatch action "CREATE_AGENT_REQUEST"', () => {
    const generator = watcherSubmitRequests();
    expect(generator.next().value).toEqual(
      takeLatest(CREATE_AGENT_REQUEST, apiSubmitHandlerAsync)
    );
  });

  it('should dispatch action "GET_AGENT_DETAILS" ', () => {
    const generator = watcherGetAgentInfo();
    expect(generator.next().value).toEqual(
      takeLatest(GET_AGENT_DETAILS, apiGetAgentInfo)
    );
  });
  
  it('should dispatch action "CREATE_AGENT_REQUEST" with result from fetch News API', () => {
    const action = {
      payload: {
        agentId: "asdf3213"
      }
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiSubmitHandlerAsync(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: CREATE_AGENT_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "CREATE_AGENT_REQUEST" with result from fetch News API', () => {
    const action = {
      id:1
    };
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiGetAgentInfo(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_AGENT_DETAILS_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "GET_AGENT_DETAILS_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      id: "demoId"
    };
    const error = "error";
    const gen = apiGetAgentInfo(mockAction);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, GET_AGENT_DETAILS_FAILURE)
    );
  });

  it('should dispatch action "CREATE_AGENT_FAILURE" with result from fetch News API', () => {
    const action = {
      payload: {
        agentId:1,
        agentKey:"abc"
      }
    }
    const error = "error";
    const gen = apiSubmitHandlerAsync(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, CREATE_AGENT_FAILURE)
    );
  });

  it('should dispatch action "CREATE_AGENT_SUCCESS" with result from fetch News API', () => {
    const action = {
      payload: {
        agentKey:"abc"
      }
    }
    const response = {
      data: {
        data: true
      }
    };
    const error = "error";
    const generator = apiSubmitHandlerAsync(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: CREATE_AGENT_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

});
