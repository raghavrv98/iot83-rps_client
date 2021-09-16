/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest, all } from "redux-saga/effects";
import {
  watcherGenerateKeyRequests,
  watcherGetSecretKeyRequests,
  watcherSecretKeyStatusChangeRequest,
  watcherAccountDetailsRequest,
  watcherPipelineConfigRequest,
  watcherDeleteSecretKey,
  watcherSubmitConfigDetails,
  watcherGetLicence,
  watcherGetSettingTabsRequest,
  watcherSubmitLicenseKey,
  apiGetSettingTabsInfoHandler,
  apiGetLicenceInfoHandler,
  apiPipelineConfigHandlerAsync,
  apiLicenseDetailsDetailsHandler,
  apiSubmitConfigDetailsHandler,
  apiDeleteSecretKeyHandler,
  apiAccountDetailsHandlerAsync,
  apiSecretKeyStatusChangeHandlerAsync,
  apiGetSecretKeyHandlerAsync,
  apiGenerateKeyHandlerAsync
} from "../saga";
import rootSaga from "../saga";
import {
  GENERATE_KEY_REQUEST, GENERATE_KEY_SUCCESS, GENERATE_KEY_FAILURE,
  SECRET_KEY_REQUEST, SECRET_KEY_SUCCESS, SECRET_KEY_FAILURE,
  SECRET_STATUS_REQUEST, SECRET_STATUS_SUCCESS, SECRET_STATUS_FAILURE,
  ACCOUNT_DETAILS_REQUEST, ACCOUNT_DETAILS_SUCCESS, ACCOUNT_DETAILS_FAILURE,
  DELETE_SECRET_KEY, DELETE_SECRET_KEY_FAILURE, DELETE_SECRET_KEY_SUCCESS,
  GET_PIPELINE_CONFIG_REQUEST, GET_PIPELINE_CONFIG_SUCCESS, GET_PIPELINE_CONFIG_FAILURE,
  SUBMIT_CONFIG_DETAILS, SUBMIT_CONFIG_DETAILS_SUCCESS, SUBMIT_CONFIG_DETAILS_FAILURE,
  GET_LICENCE, GET_LICENCE_SUCCESS, GET_LICENCE_FAILURE,
  GET_SETTINGTABS, GET_SETTINGTABS_SUCCESS, GET_SETTINGTABS_FAILURE,
  LICENSE_KEY_DETAILS, LICENSE_KEY_DETAILS_SUCCESS, LICENSE_KEY_DETAILS_FAILURE
} from "../constants";
import { errorHandler } from '../../../utils/commonUtils';

const error = "error";

describe("settingsSaga Saga", () => {

  // it("unit testing on rootSaga", () => {
  //   const generator = rootSaga();
  //   expect(generator.next().value).toEqual(all([
  //     watcherGenerateKeyRequests,
  //     watcherGetSecretKeyRequests,
  //     watcherSecretKeyStatusChangeRequest,
  //     watcherAccountDetailsRequest,
  //     watcherPipelineConfigRequest,
  //     watcherDeleteSecretKey,
  //     watcherSubmitConfigDetails,
  //     watcherGetLicence,
  //     watcherGetSettingTabsRequest,
  //     watcherSubmitLicenseKey,
  //   ]));
  // });

  it('should dispatch action "GENERATE_KEY_REQUEST" ', () => {
    const generator = watcherGenerateKeyRequests();
    expect(generator.next().value).toEqual(takeLatest(GENERATE_KEY_REQUEST, apiGenerateKeyHandlerAsync));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "SECRET_KEY_REQUEST" ', () => {
    const generator = watcherGetSecretKeyRequests();
    expect(generator.next().value).toEqual(takeLatest(SECRET_KEY_REQUEST, apiGetSecretKeyHandlerAsync));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "SECRET_STATUS_REQUEST" ', () => {
    const generator = watcherSecretKeyStatusChangeRequest();
    expect(generator.next().value).toEqual(takeLatest(SECRET_STATUS_REQUEST, apiSecretKeyStatusChangeHandlerAsync));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "ACCOUNT_DETAILS_REQUEST" ', () => {
    const generator = watcherAccountDetailsRequest();
    expect(generator.next().value).toEqual(takeLatest(ACCOUNT_DETAILS_REQUEST, apiAccountDetailsHandlerAsync));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "DELETE_SECRET_KEY" ', () => {
    const generator = watcherDeleteSecretKey();
    expect(generator.next().value).toEqual(takeLatest(DELETE_SECRET_KEY, apiDeleteSecretKeyHandler));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_PIPELINE_CONFIG_REQUEST" ', () => {
    const generator = watcherPipelineConfigRequest();
    expect(generator.next().value).toEqual(takeLatest(GET_PIPELINE_CONFIG_REQUEST, apiPipelineConfigHandlerAsync));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "SUBMIT_CONFIG_DETAILS" ', () => {
    const generator = watcherSubmitConfigDetails();
    expect(generator.next().value).toEqual(takeLatest(SUBMIT_CONFIG_DETAILS, apiSubmitConfigDetailsHandler));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_LICENCE" ', () => {
    const generator = watcherGetLicence();
    expect(generator.next().value).toEqual(takeLatest(GET_LICENCE, apiGetLicenceInfoHandler));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "GET_SETTINGTABS" ', () => {
    const generator = watcherGetSettingTabsRequest();
    expect(generator.next().value).toEqual(takeLatest(GET_SETTINGTABS, apiGetSettingTabsInfoHandler));
    expect(generator.next().done).toBeTruthy();
  })

  it('should dispatch action "LICENSE_KEY_DETAILS" ', () => {
    const generator = watcherSubmitLicenseKey();
    expect(generator.next().value).toEqual(takeLatest(LICENSE_KEY_DETAILS, apiLicenseDetailsDetailsHandler));
    expect(generator.next().done).toBeTruthy();
  })


  it('apiGetSecretKeyHandlerAsync unit test case for GENERATE_KEY_SUCCESS', () => {
    let mockAction = {
      payload: "demo",
    }
    let mockResponse = {
      data: {
        data: true,
      }
    }
    let generator = apiGenerateKeyHandlerAsync(mockAction);
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(put({ type: GENERATE_KEY_SUCCESS, response: true }));
    expect(generator.next().done).toBeTruthy();
  });

  it('apiGetSecretKeyHandlerAsync unit test case for SECRET_KEY_SUCCESS', () => {
    let mockResponse = {
      data: {
        data: true,
      }
    }
    let generator = apiGetSecretKeyHandlerAsync();
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(put({ type: SECRET_KEY_SUCCESS, response: true }));
    expect(generator.next().done).toBeTruthy();
  });

  it('apiSecretKeyStatusChangeHandlerAsync unit test case for SECRET_STATUS_SUCCESS', () => {
    let mockAction = {
      id: "demoId",
      status: "demo"
    }
    let generator = apiSecretKeyStatusChangeHandlerAsync(mockAction);
    generator.next();
    expect(generator.next(mockAction).value).toEqual(put({ type: SECRET_STATUS_SUCCESS, response: mockAction }));
    expect(generator.next().done).toBeTruthy();
  });

  it('apiAccountDetailsHandlerAsync unit test case for ACCOUNT_DETAILS_SUCCESS', () => {
    let mockAction = {
      id: "demoId",
    }
    let mockResponse = {
      data: {
        data: "success",
      }
    }
    let generator = apiAccountDetailsHandlerAsync(mockAction);
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(put({ type: ACCOUNT_DETAILS_SUCCESS, response: "success" }));
    expect(generator.next().done).toBeTruthy();
  });

  it('apiDeleteSecretKeyHandler unit test case for DELETE_SECRET_KEY_SUCCESS', () => {
    let mockAction = {
      id: "demoId",
    }
    let generator = apiDeleteSecretKeyHandler(mockAction);
    generator.next();
    expect(generator.next(mockAction).value).toEqual(put({ type: DELETE_SECRET_KEY_SUCCESS, response: "demoId" }));
    expect(generator.next().done).toBeTruthy();
  });


  // it('apiPipelineConfigHandlerAsync unit test case for GET_PIPELINE_CONFIG_SUCCESS', () => {
  //   let mockAction = {
  //     configType: "demo",
  //   }
  //   let generator = apiPipelineConfigHandlerAsync();
  //   generator.next();
  //   expect(generator.next(mockAction).value).toEqual(put({ type: GET_PIPELINE_CONFIG_SUCCESS, response: "demo" }));
  //   expect(generator.next().done).toBeTruthy();
  // });


  // it('apiSubmitConfigDetailsHandler unit test case for SUBMIT_CONFIG_DETAILS_SUCCESS', () => {
  //   let mockAction = {
  //     payload: "demo",
  //   }
  //   let generator = apiSubmitConfigDetailsHandler(mockAction);
  //   generator.next();
  //   expect(generator.next(mockAction).value).toEqual(put({ type: SUBMIT_CONFIG_DETAILS_SUCCESS, response: "demo" }));
  //   expect(generator.next().done).toBeTruthy();
  // });


  it('apiGetLicenceInfoHandler unit test case for GET_LICENCE_SUCCESS', () => {
    let mockResponse = {
      data: {
        data: true,
      }
    }
    let generator = apiGetLicenceInfoHandler();
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(put({ type: GET_LICENCE_SUCCESS, response: true }));
    expect(generator.next().done).toBeTruthy();
  });

  it('apiGetSettingTabsInfoHandler unit test case for GET_SETTINGTABS_SUCCESS', () => {
    let mockResponse = {
      data: {
        data: true,
      }
    }
    let generator = apiGetSettingTabsInfoHandler();
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(put({ type: GET_SETTINGTABS_SUCCESS, response: true }));
    expect(generator.next().done).toBeTruthy();
  });

  // it('apiLicenseDetailsDetailsHandler unit test case for LICENSE_KEY_DETAILS_SUCCESS', () => {
  //   let mockAction = {
  //     licenseKey: "demo",
  //   }
  //   let generator = apiLicenseDetailsDetailsHandler(mockAction);
  //   generator.next();
  //   expect(generator.next(mockAction).value).toEqual(put({ type: LICENSE_KEY_DETAILS_SUCCESS, response: "demo" }));
  //   expect(generator.next().done).toBeTruthy();
  // });

  it('apiGenerateKeyHandlerAsync unit test case for GENERATE_KEY_FAILURE', () => {
    let mockAction = {
      payload: "demo",
    }
    let generator = apiGenerateKeyHandlerAsync(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, GENERATE_KEY_FAILURE));
  });

  it('apiGetSecretKeyHandlerAsync unit test case for SECRET_KEY_FAILURE', () => {
    let generator = apiGetSecretKeyHandlerAsync();
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, SECRET_KEY_FAILURE));
  });


  it('apiSecretKeyStatusChangeHandlerAsync unit test case for SECRET_STATUS_FAILURE', () => {
    let mockAction = {
      id: "demoId",
      status: "demo"
    }
    let generator = apiSecretKeyStatusChangeHandlerAsync(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, SECRET_STATUS_FAILURE));
  });

  it('apiAccountDetailsHandlerAsync unit test case for ACCOUNT_DETAILS_FAILURE', () => {
    let mockAction = {
      id: "demoId",
    }
    let generator = apiAccountDetailsHandlerAsync(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, ACCOUNT_DETAILS_FAILURE));
  });

  it('apiDeleteSecretKeyHandler unit test case for DELETE_SECRET_KEY_FAILURE', () => {
    let mockAction = {
      id: "demoId",
    }
    let generator = apiDeleteSecretKeyHandler(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, DELETE_SECRET_KEY_FAILURE));
  });

  it('apiPipelineConfigHandlerAsync unit test case for GET_PIPELINE_CONFIG_FAILURE', () => {
    let mockAction = {
      configType: "demo",
    }
    let generator = apiPipelineConfigHandlerAsync(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, GET_PIPELINE_CONFIG_FAILURE));
  });

  it('apiSubmitConfigDetailsHandler unit test case for SUBMIT_CONFIG_DETAILS_FAILURE', () => {
    let mockAction = {
      payload: "demo",
    }
    let generator = apiSubmitConfigDetailsHandler(mockAction);
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, SUBMIT_CONFIG_DETAILS_FAILURE));
  });

  // it('apiLicenseDetailsDetailsHandler unit test case for GET_LICENCE_FAILURE', () => {
  //   let generator = apiLicenseDetailsDetailsHandler();
  //   generator.next();
  //   expect(generator.throw(error).value).toEqual(errorHandler(error, GET_LICENCE_FAILURE));
  // });

  it('apiGetSettingTabsInfoHandler unit test case for GET_SETTINGTABS_FAILURE', () => {
    let generator = apiGetSettingTabsInfoHandler();
    generator.next();
    expect(generator.throw(error).value).toEqual(errorHandler(error, GET_SETTINGTABS_FAILURE));
  });

  // it('apiGetLicenceInfoHandler unit test case for LICENSE_KEY_DETAILS_FAILURE', () => {
  //   let mockAction = {
  //     licenseKey: "demo",
  //   }
  //   let generator = apiGetLicenceInfoHandler(mockAction);
  //   generator.next();
  //   expect(generator.throw(error).value).toEqual(errorHandler(error, LICENSE_KEY_DETAILS_FAILURE));
  // });

});
