import {
  GET_PLANTLIST,
  GET_PLANTLIST_SUCCESS,
  GET_PLANTLIST_FAILURE,
  DELETE_PLANT,
  DELETE_PLANT_SUCCESS,
  DELETE_PLANT_FAILURE
} from '../constants';
import rootSaga,{
  watcherGetPlantList,
  watcherDeletePlant,
  apiGetPlantList,
  apiDeletePlant,
} from '../saga';
import { put, takeLatest, all } from "redux-saga/effects";
import { errorHandler } from '../../../utils/commonUtils';

const mockResponse = {
  data: {
    data: true,
  }
}

const mockAction = {
  id: "demoId",
}

const error = "error";


describe('managePlantSaga Saga', () => {
  it('Expect to have unit tests specified', () => {
    expect(rootSaga().next().value).toEqual(all([
      watcherGetPlantList(), watcherDeletePlant()
    ]));
  });

  it('Expect to have unit tests specified for watcherGetPlantList', () => {
    let generator = watcherGetPlantList(); 
    expect(generator.next().value).toEqual(takeLatest(GET_PLANTLIST, apiGetPlantList));
  });

  it('Expect to have unit tests specified for watcherDeletePlant', () => {
    let generator = watcherDeletePlant(); 
    expect(generator.next().value).toEqual(takeLatest(DELETE_PLANT, apiDeletePlant));
  });

  it('should dispatch action "GET_PLANTLIST_SUCCESS" with result from fetch News API', () => {
    const generator = apiGetPlantList();
    generator.next()
    expect(generator.next(mockResponse).value).toEqual(
      put({ type: GET_PLANTLIST_SUCCESS, response: true })
    )
  })

  it('should dispatch action "GET_PLANTLIST_FAILURE" with result from fetch News API', () => {
    const generator = apiGetPlantList();
    generator.next()
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, GET_PLANTLIST_FAILURE)
    )
  })

  it('should dispatch action "DELETE_PLANT_SUCCESS" with result from fetch News API', () => {
    const generator = apiDeletePlant(mockAction);
    generator.next()
    expect(generator.next(mockResponse).value).toEqual(
      put({ type: DELETE_PLANT_SUCCESS, response: "demoId" })
    )
  })

  it('should dispatch action "DELETE_PLANT_FAILURE" with result from fetch News API', () => {
    const generator = apiDeletePlant(mockAction);
    generator.next()
    expect(generator.throw(error).value).toEqual(
      errorHandler(error, DELETE_PLANT_FAILURE)
    )
  })
});