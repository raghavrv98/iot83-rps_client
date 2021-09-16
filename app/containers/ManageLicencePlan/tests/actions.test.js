import { defaultAction, getLicenseList, licenseDeleteHandler } from "../actions";
import {DEFAULT_ACTION, GET_LICENSE_LIST, LICENSE_DELETE_REQUEST } from "../constants";

describe("Manage Licence Plan actions", () => {

  describe("Create Pipeline", () => {
    it("has a type of GET_LICENSE_LIST", () => {
      const expected = {
        type: GET_LICENSE_LIST,
      };
      expect(getLicenseList("demo")).toEqual(expected);
    });
  });

  describe("LICENSE_DELETE_REQUEST", () => {
    it("has a type of LICENSE_DELETE_REQUEST", () => {
      const expected = {
        type: LICENSE_DELETE_REQUEST,
      };
      expect(licenseDeleteHandler()).toEqual(expected);
    });
  });

  describe("GET DEFAULT ACTION", () => {
    it("has a type of DEFAULT_ACTION", () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

});
