import { fromJS } from 'immutable';
import { selectManageGroupsDomain, getList, getListError, getDeleteSuccess, getDeleteFailure } from '../selectors';
const getListPageMockState = fromJS({
  manageGroups: {
    gotList: [{
      name: "demo"
    }],
    notGetList: "username or password is incorrect.",
    deleteSuccess: "Group Deleted successfully.",
    deleteFailure: "Group id is not found."
  }
})
describe('selectManageGroupsDomain', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      error: "this is error message",
    });
    expect(selectManageGroupsDomain(mockedState)).toEqual(globalState);
  });
  it('should return getListSuccess state ', () => {
    const getListSuccessState = getList();
    const expectedResponseState = fromJS([{
      name: "demo"
    }])
    expect(getListSuccessState(getListPageMockState)).toEqual(expectedResponseState);
  });
  it('should return getListError state ', () => {
    const getErrorState = getListError();
    const expectedResponseState = "username or password is incorrect."
    expect(getErrorState(getListPageMockState)).toEqual(expectedResponseState);
  });
  it('should return getDeleteSuccess state ', () => {
    const getListSuccessState = getDeleteSuccess();
    const expectedResponseState = "Group Deleted successfully."
    expect(getListSuccessState(getListPageMockState)).toEqual(expectedResponseState);
  });
  it('should return getDeleteFailure state ', () => {
    const getErrorState = getDeleteFailure();
    const expectedResponseState = "Group id is not found."
    expect(getErrorState(getListPageMockState)).toEqual(expectedResponseState);
  });
});

