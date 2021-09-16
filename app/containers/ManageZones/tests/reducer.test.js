import { fromJS } from "immutable";
import manageZonesReducer from "../reducer";
import {
  GET_ZONE_LIST_SUCCESS,
  GET_ZONE_LIST_FAILURE,
  ZONE_DELETE_SUCCESS,
  ZONE_DELETE_FAILURE
} from "../constants";

describe("manageZonesReducer", () => {
  it("returns the initial state", () => {
    expect(manageZonesReducer(undefined, {})).toEqual(fromJS({}));
  });
  // zonesList,  zonesListFailure, zoneDelete, zoneDeleteFailure
  it("returns the CREATE_AGENT_SUCCESS", () => {
    expect(
      manageZonesReducer(undefined, {
        type: GET_ZONE_LIST_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        zonesList: "Request Completed Successfully"
      })
    );
  });
  it("returns the CREATE_AGENT_FAILURE", () => {
    expect(
      manageZonesReducer(undefined, {
        type: GET_ZONE_LIST_FAILURE,
        error: "Expection"
      })
    ).toEqual(
      fromJS({
        zonesListFailure: "Expection"
      })
    );
  });
  it("returns the ZONE_DELETE_SUCCESS", () => {
    expect(
      manageZonesReducer(undefined, {
        type: ZONE_DELETE_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        zoneDelete: "Request Completed Successfully"
      })
    );
  });
  it("returns the CREATE_AGENT_FAILURE", () => {
    expect(
      manageZonesReducer(undefined, {
        type: ZONE_DELETE_FAILURE,
        error: "Expection"
      })
    ).toEqual(
      fromJS({
        zoneDeleteFailure: "Expection"
      })
    );
  });
});
