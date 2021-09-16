import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import {onSubmitHandler, getAllGroup, getAllRole, getUserDetails} from '../actions'
import { AddOrEditUser, mapDispatchToProps } from '../index';
import { ON_SUBMIT_REQUEST, GET_ALL_GROUPS, GET_ALL_ROLES, GET_USER_DETAILS } from "../constants";

let mockParams = {
  params: {
    id: ""
  }
}

const submitSuccess =  "this is submit success";
const submitError =  "this is submit error";
const userDetails =  {
  company: "pmmp ",
  compartments: ["sampleGroupId"],
  email: "",
  firstName: "",
  gender: "",
  lastName: "",
  mobilePhone: "",
  roles: ["sampleRoleId"],
  title: ""
}
const userDetailsError =  "this is user details error";
const roles =  [{id: "sampleRoleId", name: "sampleRoleName"}];
const rolesError =  "this is submit error";
const groups =  [{id: "sampleGroupId", name: "sampleGroupName"}];
const groupsError =  "this is submit error";

describe('<AddOrEditUser />', () => {

  // it("clicking back button trigger onClick event", async () => {
  //   let expectedCount = history.length + 1
  //   const wrapper = shallow(<AddOrEditUser history={history} onSubmitHandler={onSubmitHandler} match={mockParams} getGroups={getAllGroup} getRoles={getAllRole} />);
  //   let backbutton = wrapper.find("button.btn-transparent");
  //   expect(backbutton.length).toBe(1);
  //   backbutton.simulate('click');
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/manageUsers");
  // });

  // it("clicking submit button trigger onClick event", async () => {
  //   const onSubmitHandlerSpy = jest.spyOn(AddOrEditUser.prototype, "onSubmitHandler");
  //   const wrapper = shallow(<AddOrEditUser history={history} onSubmitHandler={onSubmitHandler} match={mockParams} getGroups={getAllGroup} getRoles={getAllRole} />);
  //   let loaderDiv = wrapper.find("div.pageLoaderBox");
  //   expect(loaderDiv.length).toBe(1);
  //   wrapper.setProps({ submitSuccess, submitError, userDetails, userDetailsError, roles, rolesError, groups, groupsError });
  //   let addOrEditForm = wrapper.find("form.contentForm");
  //   expect(addOrEditForm.length).toBe(1);
  //   addOrEditForm.simulate('submit', { preventDefault() { } });
  //   expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
  // });

  it("test component will recieve props", async () => {
    let expectedCount = history.length + 1
    spyOn(AddOrEditUser.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<AddOrEditUser history={history} match={mockParams} getGroups={getAllGroup} getRoles={getAllRole} onSubmitHandler={onSubmitHandler} submitSuccess="" submitError="" userDetails="" userDetailsError="" roles="" rolesError="" groups="" groupsError="" />);
    wrapper.setProps({ submitSuccess, submitError, userDetails, userDetailsError, roles, rolesError, groups, groupsError });
    // expect(history.length).toEqual(expectedCount);
    // expect(history.location.pathname).toEqual("/manageUsers");
    expect(AddOrEditUser.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  });

  it("test edit case", async () => {
    const mockParams = {
      params: {
        id: "demoId"
      }
    }
    spyOn(AddOrEditUser.prototype, 'componentDidMount').and.callThrough();
    const wrapper = shallow(<AddOrEditUser history={history} match={mockParams} getUserDetails={getUserDetails} getGroups={getAllGroup} getRoles={getAllRole} />);
    expect(AddOrEditUser.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });

  it('match snapshots', () => {
    const wrap = shallow(<AddOrEditUser history={history} onSubmitHandler={onSubmitHandler} match={mockParams} getGroups={getAllGroup} getRoles={getAllRole} />)
    expect(wrap).toMatchSnapshot()
  })

  // test('Input should call handleChange on name change event', () => {
  //   const wrapper = shallow(<AddOrEditUser history={history} match={mockParams} getUserDetails={getUserDetails} getGroups={getAllGroup} getRoles={getAllRole}  />);
  //   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'inputChangeHandler');
  //   wrapper.instance().forceUpdate();
  //   let loaderDiv = wrapper.find("div.pageLoaderBox");
  //   expect(loaderDiv.length).toBe(1);
  //   wrapper.setProps({ submitSuccess, submitError, userDetails, userDetailsError, roles, rolesError, groups, groupsError });
  //   wrapper.find('[id="firstName"]').simulate('change',{
  //     target: {id: "firstName", value: "name"}
  //   });
  //   expect(wrapper.state().payload.firstName).toBe('name');
  //   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  // })
  test('Input should call handleChange on role change event', () => {
    const wrapper = shallow(<AddOrEditUser history={history} match={mockParams} getUserDetails={getUserDetails} getGroups={getAllGroup} getRoles={getAllRole}  />);
    wrapper.setProps({roles, rolesError, groups, groupsError });
    const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'inputChangeHandler');
    wrapper.instance().forceUpdate();
    wrapper.find('[id="roles"]').simulate('change',{
      target: {id: "roles", value: "sampleRoleId"}
    });
    expect(wrapper.state().payload.roles).toEqual(["sampleRoleId"]);
    expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  })
  it('Function testing on mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const payload = "demo"
    const mockParams = {
      params: {
        id: "demoId"
      }
    }
    mapDispatchToProps(dispatch).onSubmitHandler(payload,mockParams.params.id);
    expect(dispatch.mock.calls[0][0]).
    toEqual({ 
      type: ON_SUBMIT_REQUEST,
      payload: 'demo',
      id: 'demoId' 
    })
    mapDispatchToProps(dispatch).getUserDetails(mockParams.params.id);
    expect(dispatch.mock.calls[1][0]).
    toEqual({
      type: GET_USER_DETAILS,
      id: "demoId"
    })
    mapDispatchToProps(dispatch).getGroups();
    expect(dispatch.mock.calls[2][0]).
    toEqual({
      type: GET_ALL_GROUPS
    })
    mapDispatchToProps(dispatch).getRoles();
    expect(dispatch.mock.calls[3][0]).
    toEqual({
      type: GET_ALL_ROLES
    })
  });
});
