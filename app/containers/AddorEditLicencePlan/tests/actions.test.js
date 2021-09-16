import { defaultAction, onSubmitHandler, getPlansList } from "../actions";
import {DEFAULT_ACTION, ON_SUBMIT_REQUEST, GET_PLANS_LIST } from "../constants";

describe("AddOrEditLicence actions", () => {

  describe("Create Pipeline", () => {
    it("has a type of ON_SUBMIT_REQUEST", () => {
      const expected = {
        type: ON_SUBMIT_REQUEST,
        payload: "demo"
      };
      expect(onSubmitHandler("demo")).toEqual(expected);
    });
  });

  describe("GET PLANS REQUEST", () => {
    it("has a type of GET_PLANS_LIST", () => {
      const expected = {
        type: GET_PLANS_LIST,
      };
      expect(getPlansList()).toEqual(expected);
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
