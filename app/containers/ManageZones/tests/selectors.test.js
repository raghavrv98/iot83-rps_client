import { fromJS } from "immutable";
import {
  zonesList,
  zonesListFailure,
  getzonesDelete,
  getzoneDeleteFailure
} from "../selectors";

const mockState = fromJS({
  manageZones: {
    zonesList: "success",
    zonesListFailure: "Exception",
    zoneDelete: "success",
    zoneDeleteFailure: "Exception"
  }
});

describe("selectManageZonesDomain", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });

  it("should return zonesList state ", () => {
    const functioncalls = zonesList();
    expect(functioncalls(mockState)).toEqual("success");
  });
  it("should return zonesListFailure state ", () => {
    const functioncalls = zonesListFailure();
    expect(functioncalls(mockState)).toEqual("Exception");
  });
  it("should return getzonesDelete state ", () => {
    const functioncalls = getzonesDelete();
    expect(functioncalls(mockState)).toEqual("success");
  });
  it("should return getzoneDeleteFailure state ", () => {
    const functioncalls = getzoneDeleteFailure();
    expect(functioncalls(mockState)).toEqual("Exception");
  });
});
