import { fromJS } from 'immutable';
import helpPageReducer from '../reducer';

describe('helpPageReducer', () => {
  it('returns the initial state', () => {
    expect(helpPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
