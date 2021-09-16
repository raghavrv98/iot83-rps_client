import { fromJS } from 'immutable';
import addOrEditRtdReducer from '../reducer';

describe('addOrEditRtdReducer', () => {
  it('returns the initial state', () => {
    expect(addOrEditRtdReducer(undefined, {})).toEqual(fromJS({}));
  });
});
