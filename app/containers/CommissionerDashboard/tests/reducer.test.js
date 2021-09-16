import { fromJS } from 'immutable';
import commissionerDashboardReducer from '../reducer';
import {
  DEFAULT_ACTION,
  GET_SEGMENT_DATA_SUCCESS,
  GET_SEGMENT_DATA_FAILURE,
  GET_CHART_REQUEST_SUCCESS,
  GET_CHART_REQUEST_FAILURE,
  GET_PLANT_LIST_SUCCESS,
  GET_PLANT_LIST_FAILURE,
  GET_PIPELINE_DETAILS_SUCCESS,
  GET_PIPELINE_DETAILS_FAILURE,
  GET_ATTRIBUTES_SUCCESS,
  GET_ATTRIBUTES_FAILURE
} from '../constants';

describe('commissionerDashboardReducer', () => {
  it('returns the initial state', () => {
    expect(commissionerDashboardReducer(undefined, {})).toEqual(fromJS({}));
  });


  it('should handle "GET_SEGMENT_DATA_SUCCESS" action', () => {
    let action = {
      type: GET_SEGMENT_DATA_SUCCESS,
      response: "Success",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("segmentDataSuccess")).toEqual("Success")
  });

  it('should handle "GET_SEGMENT_DATA_FAILURE" action', () => {
    let action = {
      type: GET_SEGMENT_DATA_FAILURE,
      error: "Exception",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("segmentDataError")).toEqual("Exception")
  })

  it('should handle "GET_PLANT_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_PLANT_LIST_SUCCESS,
      response: "Success",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("plantList")).toEqual("Success")
  });

  it('should handle "GET_PLANT_LIST_FAILURE" action', () => {
    let action = {
      type: GET_PLANT_LIST_FAILURE,
      error: "Exception",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("plantListFailure")).toEqual("Exception")
  })

  it('should handle "GET_PIPELINE_DETAILS_SUCCESS" action', () => {
    let action = {
      type: GET_PIPELINE_DETAILS_SUCCESS,
      response: "Success",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("pipelineList")).toEqual("Success")
  });

  it('should handle "GET_PIPELINE_DETAILS_FAILURE" action', () => {
    let action = {
      type: GET_PIPELINE_DETAILS_FAILURE,
      error: "Exception",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("pipelineListFailure")).toEqual("Exception")
  })

  it('should handle "GET_CHART_REQUEST_SUCCESS" action', () => {
    let action = {
      type: GET_CHART_REQUEST_SUCCESS,
      response: "Success",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("chartDetailsSuccess")).toEqual("Success")
  });

  it('should handle "GET_CHART_REQUEST_FAILURE" action', () => {
    let action = {
      type: GET_CHART_REQUEST_FAILURE,
      error: "Exception",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("chartDetailsFailure")).toEqual("Exception")
  })

  it('should handle "GET_ATTRIBUTES_SUCCESS" action', () => {
    let action = {
      type: GET_ATTRIBUTES_SUCCESS,
      response: "Success",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("attributesList")).toEqual("Success")
  });

  it('should handle "GET_ATTRIBUTES_FAILURE" action', () => {
    let action = {
      type: GET_ATTRIBUTES_FAILURE,
      error: "Exception",
    }
    expect(commissionerDashboardReducer(fromJS({}), action).get("attributesListFailure")).toEqual("Exception")
  })
});



