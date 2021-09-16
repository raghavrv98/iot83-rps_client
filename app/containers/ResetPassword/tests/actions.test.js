import { defaultAction, resetPasswordHandler } from '../actions';
import { DEFAULT_ACTION, RESET_PASSWORD_REQUEST } from '../constants';

describe('ResetPassword actions', () => {
  it('has a type of DEFAULT_ACTION', () => {
    const expected = {
      type: DEFAULT_ACTION,
    };
    expect(defaultAction()).toEqual(expected);
  });
  it('has a type of RESET_PASSWORD_REQUEST', () => {
    const mockPayload = {}
    const expected = {
      type: RESET_PASSWORD_REQUEST,
      payload: mockPayload
    };
    expect(resetPasswordHandler(mockPayload)).toEqual(expected);
  });
});
