import { fromJS } from 'immutable';
import manageRtdReducer from '../reducer';

describe('manageRtdReducer', () => {
  it('returns the initial state', () => {
    expect(manageRtdReducer(undefined, {})).toEqual(fromJS({}));
  });
});
