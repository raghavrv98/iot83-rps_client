import { fromJS } from 'immutable';
import addorEditPipeLineLandmarkReducer from '../reducer';

describe('addorEditPipeLineLandmarkReducer', () => {
  it('returns the initial state', () => {
    expect(addorEditPipeLineLandmarkReducer(undefined, {})).toEqual(fromJS({}));
  });
});
