import { fromJS } from "immutable";
import { getPasswordListSuccess, getPasswordListFailure } from "../selectors";

const mockState = fromJS({
  managePasswordRequest: {
    getPasswordListSuccess: "getPasswordListSuccess",
    getPasswordListFailure: "getPasswordListFailure"
  }
});
describe("selectManagePasswordRequestDomain", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });
  it("should return getPasswordListSuccess state", () => {
    const functioncalls = getPasswordListSuccess();
    expect(functioncalls(mockState)).toEqual("getPasswordListSuccess");
  });
  it("should return getPasswordListFailure state", () => {
    const functioncalls = getPasswordListFailure();
    expect(functioncalls(mockState)).toEqual("getPasswordListFailure");
  });
});
