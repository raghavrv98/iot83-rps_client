import { fromJS } from "immutable";
import addOrEditPipeLineReducer from "../reducer";
import {
  ON_SUBMIT_REQUEST,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  RESET_TO_INITIAL_STATE,
  GET_PIPELINE_REQUEST_SUCCESS,
  GET_PIPELINE_REQUEST_FAILURE
} from "../constants";

describe("addOrEditPipeLineReducer", () => {
  it("returns the initial state", () => {
    expect(addOrEditPipeLineReducer(undefined, {})).toEqual(fromJS({}));
  });

  it("returns the state undefined", () => {
    expect(
      addOrEditPipeLineReducer(undefined, {
        type: ON_SUBMIT_REQUEST,
        response: undefined
      })
    ).toEqual(
      fromJS({
        onSubmitFailure: undefined,
        onSubmitSuccess: undefined
      })
    );
  });

  it("returns the CREATE_AGENT_SUCCESS", () => {
    expect(
      addOrEditPipeLineReducer(undefined, {
        type: ON_SUBMIT_REQUEST_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        onSubmitSuccess: "Request Completed Successfully"
      })
    );
  });
  it("returns the CREATE_AGENT_FAILURE", () => {
    expect(
      addOrEditPipeLineReducer(undefined, {
        type: ON_SUBMIT_REQUEST_FAILURE,
        error: "Expection"
      })
    ).toEqual(
      fromJS({
        onSubmitFailure: "Expection"
      })
    );
  });
  it("returns the GET_AGENT_DETAILS_SUCCESS", () => {
    expect(
      addOrEditPipeLineReducer(undefined, {
        type: GET_PIPELINE_REQUEST_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        pipelineDetailsSuccess: "Request Completed Successfully"
      })
    );
  });
  it("returns the GET_AGENT_DETAILS_FAILURE", () => {
    expect(
      addOrEditPipeLineReducer(undefined, {
        type: GET_PIPELINE_REQUEST_FAILURE,
        error: "Expection"
      })
    ).toEqual(
      fromJS({
        pipelineDetailsFailure: "Expection"
      })
    );
  });
  it("returns the state undefined", () => {
    expect(
      addOrEditPipeLineReducer(undefined, {
        type: RESET_TO_INITIAL_STATE,
      })
    ).toEqual(
      fromJS({})
    );
  });
});
