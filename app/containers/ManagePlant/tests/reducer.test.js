import { fromJS } from 'immutable';
import managePlantReducer from '../reducer';
import {  
  DEFAULT_ACTION,GET_PLANTLIST_FAILURE,
  GET_PLANTLIST_SUCCESS,DELETE_PLANT_SUCCESS, DELETE_PLANT_FAILURE  
} from "../constants";

describe('managePlantReducer', () => {
  it('returns the initial state', () => {
    expect(managePlantReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns the initial state', () => {
    expect(managePlantReducer(undefined, { type: DEFAULT_ACTION })).toEqual(fromJS({}));
  });

  it('returns the initial state for GET_PLANTLIST_SUCCESS', () => {
    let mockData = {
      type: GET_PLANTLIST_SUCCESS, 
      response: "Success",
    }
    expect(managePlantReducer(undefined, mockData)).toEqual(fromJS({getPlantListSuccess: "Success"}));
  });

  it('returns the initial state for GET_PLANTLIST_FAILURE', () => {
    let mockData = {
      type: GET_PLANTLIST_FAILURE, 
      error: "Exception",
    }
    expect(managePlantReducer(undefined, mockData)).toEqual(fromJS({getPlantListFailure: "Exception"}));
  });

  it('returns the initial state for DELETE_PLANT_SUCCESS', () => {
    let mockData = {
      type: DELETE_PLANT_SUCCESS, 
      response: "Success",
    }
    expect(managePlantReducer(undefined, mockData)).toEqual(fromJS({deletePlantSuccess: "Success"}));
  });

  it('returns the initial state for DELETE_PLANT_FAILURE', () => {
    let mockData = {
      type: DELETE_PLANT_FAILURE, 
      error: "Exception",
    }
    expect(managePlantReducer(undefined, mockData)).toEqual(fromJS({deletePlantFailure: "Exception"}));
  });

});
