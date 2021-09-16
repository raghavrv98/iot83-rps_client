import { fromJS } from 'immutable';
import { selectManageUsersDomain,getList,getListError, getDeleteSuccess, getDeleteFailure } from '../selectors';
const getListPageMockState = fromJS({
  manageUsers: {
    gotList: [{
      name:"demo"
    }],
    notGetList: "username or password is incorrect.",
    deleteSuccess: "User deleted successfully.",
    deleteFailure: "user id is not found in database."
  }
})
describe('selectManageUsersDomain', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      error: "this is error message",
    });
    expect(selectManageUsersDomain(mockedState)).toEqual(globalState);
  });
  it('should return getListSuccess state ', () => {
    const getListSuccessState = getList();
    const expectedResponseState = fromJS([{
      name:"demo"
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
    const expectedResponseState = "User deleted successfully."
    expect(getListSuccessState(getListPageMockState)).toEqual(expectedResponseState);
  });
  it('should return getDeleteFailure state ', () => {
    const getErrorState = getDeleteFailure();
    const expectedResponseState = "user id is not found in database."
    expect(getErrorState(getListPageMockState)).toEqual(expectedResponseState);
  });
  
});
