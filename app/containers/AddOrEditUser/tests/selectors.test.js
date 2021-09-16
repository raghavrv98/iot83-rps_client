import { fromJS } from 'immutable';
import {
  getSubmitSuccess,getSubmitError,
  getUserDetailsSuccess,getUserDetailsError,getAllGroupSuccess,
  getAllGroupError,getAllRolesSccess,getAllRolesError
} from '../selectors'

const mockedState = fromJS({
  addOrEditUser: {
    onSubmitSuccess: true,
    onSubmitFailure: false,
    userDetailsSuccess: true,
    userDetailsFailure: false,
    getAllGroupSuccess: true,
    getAllGroupFailure: false,
    getAllRolesSuccess: true,
    getAllRolesFailure: false,
  }
})

describe('selectAddOrEditUserDomain', () => {

  it('should return getSubmitSuccess state ', () => {
    const functioncalls = getSubmitSuccess();
    expect(functioncalls(mockedState)).toEqual(true);
  });

  it('should return getSubmitError state ', () => {
    const functioncalls = getSubmitError();
    expect(functioncalls(mockedState)).toEqual(false);
  });

  it('should return getUserDetailsSuccess state ', () => {
    const functioncalls = getUserDetailsSuccess();
    expect(functioncalls(mockedState)).toEqual(true);
  });

  it('should return getUserDetailsError state ', () => {
    const functioncalls = getUserDetailsError();
    expect(functioncalls(mockedState)).toEqual(false);
  });

  it('should return getAllGroupSuccess state ', () => {
    const functioncalls = getAllGroupSuccess();
    expect(functioncalls(mockedState)).toEqual(true);
  });

  it('should return getAllGroupError state ', () => {
    const functioncalls = getAllGroupError();
    expect(functioncalls(mockedState)).toEqual(false);
  });

  it('should return getAllRolesSccess state ', () => {
    const functioncalls = getAllRolesSccess();
    expect(functioncalls(mockedState)).toEqual(true);
  });

  it('should return getAllRolesError state ', () => {
    const functioncalls = getAllRolesError();
    expect(functioncalls(mockedState)).toEqual(false);
  });

});
