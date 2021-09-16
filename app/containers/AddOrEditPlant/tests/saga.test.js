/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { errorHandler } from "../../../utils/commonUtils";
import rootSaga, {
  watcherCreatePlant,
  watcherGetDetails,
  watcherImageUpload,
  apiCreatePlant,
  apiGetPlantDetails,
  apiUploadPlantImage
} from "../saga";
import { put, takeLatest, all } from "redux-saga/effects";
import {
  CREATE_PLANT_SUCCESS,
  CREATE_PLANT,
  CREATE_PLANT_FAILURE,
  GET_DETAILS,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_FAILURE,
  UPLOAD_PLANT_IMAGE,
  UPLOAD_PLANT_IMAGE_SUCCESS,
  UPLOAD_PLANT_IMAGE_FAILURE
} from "../constants";

describe("addOrEditPipelineSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  describe("addOrEditpipeline Saga", () => {
    it("unit testing on rootSaga", () => {
      const generator = rootSaga();
      expect(generator.next().value).toEqual(all([
        watcherCreatePlant(),
        watcherGetDetails(),
        watcherImageUpload()
      ]));
    });
  });
  it('should dispatch action "CREATE_PLANT"', () => {
    const generator = watcherCreatePlant();
    expect(generator.next().value).toEqual(
      takeLatest(CREATE_PLANT, apiCreatePlant)
    );
  });

  it('should dispatch action "GET_DETAILS" ', () => {
    const generator = watcherGetDetails();
    expect(generator.next().value).toEqual(
      takeLatest(GET_DETAILS, apiGetPlantDetails)
    );
  });

  it('should dispatch action "UPLOAD_PLANT_IMAGE" ', () => {
    const generator = watcherImageUpload();
    expect(generator.next().value).toEqual(
      takeLatest(UPLOAD_PLANT_IMAGE, apiUploadPlantImage)
    );
  });

  it('should dispatch action "CREATE_PLANT_SUCCESS" with result from fetch News API', () => {
    const action = {
        id: "asdf3213"
      }
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiCreatePlant(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: CREATE_PLANT_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "CREATE_PLANT_SUCCESS" with result from fetch News API', () => {
    const action = {
      }
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiCreatePlant(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: CREATE_PLANT_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "GET_DETAILS_SUCCESS" with result from fetch News API', () => {
    const action = {
        id: "asdf3213"
      }
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiGetPlantDetails(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: GET_DETAILS_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "UPLOAD_PLANT_IMAGE_SUCCESS" with result from fetch News API', () => {
    const action = {
        id: "asdf3213"
      }
    const response = {
      data: {
        data: true
      }
    };
    const generator = apiUploadPlantImage(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put({ type: UPLOAD_PLANT_IMAGE_SUCCESS, response: true })
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch action "CREATE_PLANT_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      id: "demoId"
    };
    const error = "error";
    const gen = apiCreatePlant(mockAction);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, CREATE_PLANT_FAILURE)
    );
  });
  it('should dispatch action "CREATE_PLANT_FAILURE" with result from fetch News API', () => {
    const mockAction = {
      id: "demoId"
    };
    const error = "error";
    const gen = apiGetPlantDetails(mockAction);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, GET_DETAILS_FAILURE)
    );
  });
  it('should dispatch action "UPLOAD_PLANT_IMAGE_FAILURE" with result from fetch News API', () => {
    const action = {
      image: "demoId"
    };
    const error = "error";
    const gen = apiUploadPlantImage(action);
    gen.next();
    expect(gen.throw(error).value).toEqual(
      errorHandler(error, UPLOAD_PLANT_IMAGE_FAILURE)
    );
  });
});
