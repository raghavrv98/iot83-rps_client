import { fromJS } from "immutable";
import addOrEditZoneReducer from "../reducer";
import {
  ON_SUBMIT_REQUEST,
  ON_SUBMIT_REQUEST_SUCCESS,
  ON_SUBMIT_REQUEST_FAILURE,
  RESET_TO_INITIAL_STATE,
  GET_ZONE_DETAILS_SUCCESS,
  GET_ZONE_DETAILS_FAILURE
} from "../constants";

describe("addOrEditZoneReducer", () => {
  it("returns the initial state", () => {
    expect(addOrEditZoneReducer(undefined, {})).toEqual(fromJS({}));
  });

  it("return the ON_SUBMIT_REQUEST", () => {
    expect(
      addOrEditZoneReducer(undefined, {
        type: ON_SUBMIT_REQUEST,
        error: undefined
      })
    ).toEqual(fromJS({
      onSubmitFailure: undefined
    }));
  });

  it("returns the ON_SUBMIT_REQUEST_SUCCESS", () => {
    expect(
      addOrEditZoneReducer(undefined, {
        type: ON_SUBMIT_REQUEST_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        onSubmitSuccess: "Request Completed Successfully"
      })
    );
  });

  it("return the ON_SUBMIT_REQUEST_FAILURE", () => {
    expect(
      addOrEditZoneReducer(undefined, {
        type: ON_SUBMIT_REQUEST_FAILURE,
        error: "Expection"
      })
    ).toEqual(fromJS({
      onSubmitFailure: "Expection"
    }));
  });

  it("returns the GET_ZONE_DETAILS_SUCCESS", () => {
    expect(
      addOrEditZoneReducer(undefined, {
        type: GET_ZONE_DETAILS_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        zoneDetailsSuccess: "Request Completed Successfully"
      })
    );
  });

  it("return the GET_ZONE_DETAILS_FAILURE", () => {
    expect(
      addOrEditZoneReducer(undefined, {
        type: GET_ZONE_DETAILS_FAILURE,
        error: "Expection"
      })
    ).toEqual(fromJS({
      zoneDetailsFailure: "Expection"
    }));
  });

  it("return the GET_ZONE_DETAILS_FAILURE", () => {
    expect(
      addOrEditZoneReducer(undefined, {
        type: RESET_TO_INITIAL_STATE,
      })
    ).toEqual(fromJS({}));
  });

});
