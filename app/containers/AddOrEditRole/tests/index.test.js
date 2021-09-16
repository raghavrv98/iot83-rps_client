import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import { onSubmitHandler, getRoleDetails, getPermissions, getEntitlements } from '../actions'
import { AddOrEditRole, mapDispatchToProps } from '../index';
import { ON_SUBMIT_REQUEST, GET_ROLE_DETAILS, GET_PERMISSIONS, GET_ENTITLEMENTS } from "../constants";

let mockParams = {
  params: {
    id: "demo"
  }
}
const submitSuccess = "this is submit success";
const submitError = "this is submit error";
const roleDetails = "this is group details success";
const roleDetailsError = "this is group details Error";
const getPermissionsFailure = "this is permissions Error";
const getEntitlementsFailure = "this is entitlements Error";

describe('<AddOrEditRole />', () => {

  it('Function testing on mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const payload = "demo"
    const mockParams = {
      params: {
        id: "demoId",
        payload: "demo"
      }
    }

    mapDispatchToProps(dispatch).onSubmitHandler(payload, mockParams.params.id);
    expect(dispatch.mock.calls[0][0]).
      toEqual({
        type: ON_SUBMIT_REQUEST,
        payload: 'demo',
        id: 'demoId'
      })

    mapDispatchToProps(dispatch).getRoleDetails(mockParams.params.id);
    expect(dispatch.mock.calls[1][0]).
      toEqual({
        type: GET_ROLE_DETAILS,
        id: "demoId"
      })

    mapDispatchToProps(dispatch).getPermissions();
    expect(dispatch.mock.calls[2][0]).
      toEqual({
        type: GET_PERMISSIONS
      })

    mapDispatchToProps(dispatch).getEntitlements();
    expect(dispatch.mock.calls[3][0]).
      toEqual({
        type: GET_ENTITLEMENTS
      })

  });

  // it("clicking back button trigger onClick event", async () => {
  //   let expectedCount = history.length + 1
  //   const getPermissions = jest.fn();
  //   const wrapper = shallow(<AddOrEditRole history={history} match={mockParams} onSubmitHandler={onSubmitHandler} getPermissions={getPermissions} />);
  //   let backbutton = wrapper.find("button.btn-transparent");
  //   expect(backbutton.length).toBe(1);
  //   backbutton.simulate('click');
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/manageRoles");
  // });

  // it("clicking submit button trigger onClick event", async () => {
  //   const getPermissions = jest.fn();
  //  // const onSubmitHandlerSpy = jest.spyOn(AddOrEditRole.prototype, "onSubmitHandler");
  //   const wrapper = shallow(<AddOrEditRole history={history} match={mockParams} onSubmitHandler={onSubmitHandler}  getPermissions={getPermissions}/>);
  //   const onSubmitHandlerSpy = jest.spyOn(wrapper.instance(), 'onSubmitHandler');
  //   wrapper.instance().forceUpdate(); 
  //   let addOrEditForm = wrapper.find("form.contentForm");
  //   addOrEditForm.simulate('submit', { preventDefault() { } });
  //   expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
  // });

  it("test component will recieve props", async () => {
    let expectedCount = history.length;
    spyOn(AddOrEditRole.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<AddOrEditRole history={history} match={mockParams} getPermissions={getPermissions} getEntitlements = {getEntitlements} getRoleDetails = {getRoleDetails} onSubmitHandler = {onSubmitHandler} submitSuccess="" submitError="" roleDetailsError="" getPermissionsFailure="" getEntitlementsFailure="" />);
    wrapper.setProps({ submitSuccess, submitError, roleDetailsError, getPermissionsFailure, getEntitlementsFailure });
    expect(history.length).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/");
    expect(AddOrEditRole.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  });


  it("test componentDidMount", async () => {
    const mockParams = {
      params: {
        id: "demoId"
      }
    }
    const getPermissions = jest.fn();
    spyOn(AddOrEditRole.prototype, 'componentDidMount').and.callThrough();
    const wrapper = shallow(<AddOrEditRole history={history} match={mockParams} getRoleDetails={getRoleDetails} getPermissions={getPermissions} onSubmitHandler = {onSubmitHandler} getEntitlements = {getEntitlements} />);
    expect(AddOrEditRole.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });

  // test('Input should call handleChange on name change event', () => {
  //   const getPermissions = jest.fn();
  //   const wrapper = shallow(<AddOrEditRole history={history} match={mockParams} getRoleDetails={getRoleDetails} getPermissions={getPermissions} />);
  //   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), "inputChangeHandler");
  //   wrapper.instance().forceUpdate(); 
  //   wrapper.find('[id="name"]').simulate('change',{
  //     target: {id: "name", value: "name"}
  //   });
  //   expect(wrapper.find('[id="name"]').props().value).toEqual("name");
  //   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  // })


  // it("test component will recieve props", async () => {
  //   const getPermissions = jest.fn();
  //   let expectedCount = history.length + 1;
  //   spyOn(
  //     AddOrEditRole.prototype,
  //     "componentWillReceiveProps"
  //   ).and.callThrough();
  //   const wrapper = shallow(
  //     <AddOrEditRole
  //     history={history} match={mockParams} getRoleDetails={getRoleDetails} getPermissions={getPermissions}
  //     submitSuccess="" submitError="" roleDetails="" roleDetailsError=""
  //     />
  //   );
  //   wrapper.setProps({ submitSuccess,submitError,roleDetails,roleDetailsError });
  //   expect( AddOrEditRole.prototype.componentWillReceiveProps ).toHaveBeenCalledTimes(1) });

  it('match snapshots', () => {
    const getPermissions = jest.fn();
    const wrap = shallow(<AddOrEditRole history={history} match={mockParams} onSubmitHandler={onSubmitHandler} getPermissions={getPermissions} />)
    expect(wrap).toMatchSnapshot()
  })
});
