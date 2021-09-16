import { fromJS } from "immutable";
import {
  GET_PLANTS_SUCCESS,
  GET_PLANTS_FAILURE,
  GET_EDIT_SAVE_MAP_FAILURE,
  GET_EDIT_SAVE_MAP_SUCCESS,
  GET_MAPPING_DATA_SUCCESS,
  GET_MAPPING_DATA_FAILURE,
  GET_AGENT_DETAILS_SUCCESS,
  GET_AGENT_DETAILS_FAILURE,
  GET_EDIT_SAVE_MAP
} from "../constants";

import addOrEditMappingReducer from "../reducer";

describe("addOrEditMappingReducer", () => {
  it("returns the initial state", () => {
    expect(addOrEditMappingReducer(undefined, {})).toEqual(fromJS({}));
  });

  it("returns the GET_PLANTS_SUCCESS", () => {
    expect(
      addOrEditMappingReducer(undefined, {
        type: GET_PLANTS_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        plantsListSuccess: "Request Completed Successfully"
      })
    );
  });
  it("returns the GET_PLANTS_FAILURE", () => {
    expect(
      addOrEditMappingReducer(undefined, {
        type: GET_PLANTS_FAILURE,
        error: "Failure"
      })
    ).toEqual(
      fromJS({
        plantsListFailure: "Failure"
      })
    );
  });

it("returns the GET_EDIT_SAVE_MAP_SUCCESS", () => {
  expect(
    addOrEditMappingReducer(undefined, {
      type: GET_EDIT_SAVE_MAP_SUCCESS,
      response: "Request Completed Successfully"
    })
  ).toEqual(
    fromJS({
      editSaveSuccess: "Request Completed Successfully"
    })
  );
});

it("returns the GET_EDIT_SAVE_MAP_FAILURE", () => {
  expect(
    addOrEditMappingReducer(undefined, {
      type: GET_EDIT_SAVE_MAP_FAILURE,
      error: "Failure"
    })
  ).toEqual(
    fromJS({
      editSaveFailure: "Failure"
    })
  );
});

it("returns the GET_MAPPING_DATA_SUCCESS", () => {
  expect(
    addOrEditMappingReducer(undefined, {
      type: GET_MAPPING_DATA_SUCCESS,
      response: "Request Completed Successfully"
    })
  ).toEqual(
    fromJS({
      fetchMappingDataSuccess: "Request Completed Successfully"
    })
  );
});

it("returns the GET_MAPPING_DATA_FAILURE", () => {
  expect(
    addOrEditMappingReducer(undefined, {
      type: GET_MAPPING_DATA_FAILURE,
      error: "Failure"
    })
  ).toEqual(
    fromJS({
      fetchMappingDataFailure: "Failure"
    })
  );
});

it("returns the GET_AGENT_DETAILS_SUCCESS", () => {
  expect(
    addOrEditMappingReducer(undefined, {
      type: GET_AGENT_DETAILS_SUCCESS,
      response: "Request Completed Successfully"
    })
  ).toEqual(
    fromJS({
      getAgentDetailsSuccess: "Request Completed Successfully"
    })
  );
});

it("returns the GET_MAPPING_DATA_FAILURE", () => {
  expect(
    addOrEditMappingReducer(undefined, {
      type: GET_AGENT_DETAILS_FAILURE,
      error: "Failure"
    })
  ).toEqual(
    fromJS({
      getAgentDetailsFailure: "Failure"
    })
  );
});

});
