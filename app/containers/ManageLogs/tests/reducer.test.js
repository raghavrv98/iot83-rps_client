import { fromJS } from 'immutable';
import manageLogsReducer from '../reducer';

describe('manageLogsReducer', () => {
  it('returns the initial state', () => {
    expect(manageLogsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
