import { defaultAction, uploadLogo } from '../actions';
import { DEFAULT_ACTION, UPLOAD_LOGO_REQUEST } from '../constants';

describe('ManageBranding actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('Default Action', () => {
    it('has a type of UPLOAD LOGO REQUEST', () => {
      const expected = {
        type: UPLOAD_LOGO_REQUEST,
        filePayload: "demo"
      };
      expect(uploadLogo("demo")).toEqual(expected);
    });
  });
});
