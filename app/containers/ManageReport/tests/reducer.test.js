import { fromJS } from 'immutable';
import manageReportReducer from '../reducer';
import {
  GET_REPORT_LIST_FAILURE, GET_REPORT_LIST_SUCCESS,
  GET_PLANT_LIST_SUCCESS, GET_PLANT_LIST_FAILURE,
  GET_PIPELINE_DETAILS_SUCCESS, GET_PIPELINE_DETAILS_FAILURE
} from "../constants";

describe('manageReportReducer', () => {

  it('should handle "GET_REPORT_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_REPORT_LIST_SUCCESS,
      response: "Success",
    }
    expect(manageReportReducer(fromJS({}), action).get("getReportListSuccess")).toEqual("Success")
  })

  it('should handle "GET_REPORT_LIST_FAILURE" action', () => {
    let action = {
      type: GET_REPORT_LIST_FAILURE,
      error: "Exception",
    }
    expect(manageReportReducer(fromJS({}), action).get("getReportListFailure")).toEqual("Exception")
  });


  it('should handle "GET_PLANT_LIST_SUCCESS" action', () => {
    let action = {
      type: GET_PLANT_LIST_SUCCESS,
      response: "Success",
    }
    expect(manageReportReducer(fromJS({}), action).get("plantList")).toEqual("Success")
  });

  it('should handle "GET_PLANT_LIST_FAILURE" action', () => {
    let action = {
      type: GET_PLANT_LIST_FAILURE,
      error: "Exception",
    }
    expect(manageReportReducer(fromJS({}), action).get("plantListFailure")).toEqual("Exception")
  })

  it('should handle "GET_PIPELINE_DETAILS_SUCCESS" action', () => {
    let action = {
      type: GET_PIPELINE_DETAILS_SUCCESS,
      response: "Success",
    }
    expect(manageReportReducer(fromJS({}), action).get("pipelineList")).toEqual("Success")
  });

  it('should handle "GET_PIPELINE_DETAILS_FAILURE" action', () => {
    let action = {
      type: GET_PIPELINE_DETAILS_FAILURE,
      error: "Exception",
    }
    expect(manageReportReducer(fromJS({}), action).get("pipelineListFailure")).toEqual("Exception")
  })

})
