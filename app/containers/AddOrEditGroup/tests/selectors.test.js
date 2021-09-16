import { fromJS } from 'immutable';
import {getSubmitSuccess, getSubmitError, getGroupDetailsSuccess, getGroupDetailsError} from '../selectors'

const mockState = fromJS({
  addOrEditGroup: {
    onSubmitSuccess: true ,
    onSubmitFailure: false,
    groupDetailsSuccess: true,
    groupDetailsFailure: false,
    }
})

describe('selectAddOrEditGroupDomain', () => {

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });

  it('should return getSubmitSuccess state ', () => {
      const functioncalls = getSubmitSuccess();
      expect(functioncalls(mockState)).toEqual(true);
  });

  it('should return getSubmitError state ', () => {
      const functioncalls = getSubmitError();
      expect(functioncalls(mockState)).toEqual(false);
  });

  it('should return getGroupDetailsSuccess state ', () => {
      const functioncalls = getGroupDetailsSuccess();
      expect(functioncalls(mockState)).toEqual(true);
  });

  it('should return getGroupDetailsError state ', () => {
      const functioncalls = getGroupDetailsError();
      expect(functioncalls(mockState)).toEqual(false);
  });

});
