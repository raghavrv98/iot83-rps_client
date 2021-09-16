import { defaultAction, loginApiHandler, resetPasswordHandler } from '../actions';
import { DEFAULT_ACTION, LOGIN_API_REQUEST, RESET_PASSWORD_API_REQUEST } from '../constants';

describe('LoginPage actions', () => {
  describe('Default Action', () => {
    it('Has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe('Login Api Action', () => {
    it('Has a type of LOGIN_API_REQUEST', () => {
      const expected = {
        type: LOGIN_API_REQUEST,
        payload: { username: "admin@nvent.com", password: "Hello@123" }
      };
      expect(loginApiHandler({username: "admin@nvent.com", password: "Hello@123"})).toEqual(expected);
    });
  });
  describe("resetPasswordHandler", () => {
    it('on resetPasswordHandler testing', () => {
      const expected = {
        type: RESET_PASSWORD_API_REQUEST,
        payload: "demo",
        tenant: "demo",
      };
      expect(resetPasswordHandler("demo","demo")).toEqual(expected);
    });
  });
});
