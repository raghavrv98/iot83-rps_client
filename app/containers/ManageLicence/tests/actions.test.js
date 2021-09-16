import { getPlans, submitLicensePlan, installLicenseKey } from '../actions';
import { GET_PLANS, GET_SUBMIT_REQUEST, LICENSE_KEY_DETAILS } from '../constants';

describe('ManageLicence actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_PLANS', () => {
      const expected = {
        type: GET_PLANS,
      };
      expect(getPlans()).toEqual(expected);
    });
  });

  describe('GET_SUBMIT_REQUEST', () => {
    it('has a type of GET_SUBMIT_REQUEST', () => {
      const expected = {
        type: GET_SUBMIT_REQUEST,
        payload: "demoPayload"
      };
      expect(submitLicensePlan("demoPayload")).toEqual(expected);
    });
  });

  describe('LICENSE_KEY_DETAILS', () => {
    it('has a type of LICENSE_KEY_DETAILS', () => {
      const expected = {
        type: LICENSE_KEY_DETAILS,
        licenseKey: "licenseKey"
      };
      expect(installLicenseKey("licenseKey")).toEqual(expected);
    });
  });

});
