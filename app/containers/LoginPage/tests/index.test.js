import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage, mapDispatchToProps } from '../index';
import { loginApiHandler, resetPasswordHandler, getAuthConfigDetails, getLoginToken } from '../actions';
import { LOGIN_API_REQUEST, RESET_PASSWORD_API_REQUEST, GET_AUTH_CONFIG_DETAILS, GET_LOGIN_TOKEN } from '../constants';


const dispatch = jest.fn();

describe('<LoginPage />', () => {

  // it('match snapshots', () => {
  //   const wrap = shallow(<LoginPage loginApiHandler={loginApiHandler} resetPasswordHandler={resetPasswordHandler} getAuthConfigDetails={getAuthConfigDetails} getLoginToken={getLoginToken} />)
  //   expect(wrap).toMatchSnapshot()
  // })

  // it('should test component when render', () => {
  //   spyOn(LoginPage.prototype, 'render').and.callThrough();
  //   const wrapper = shallow(<LoginPage loginApiHandler={loginApiHandler} resetPasswordHandler={resetPasswordHandler} getAuthConfigDetails={getAuthConfigDetails} getLoginToken={getLoginToken} />)
  //   expect(wrapper).toBeDefined();
  //   expect(LoginPage.prototype.render).toHaveBeenCalledTimes(1);
  // })

  // it("test componentWillMount", async () => {
  //   const match = {
  //     params: {
  //       id: "demoId"
  //     }
  //   };
  //   spyOn(LoginPage.prototype, "componentWillMount").and.callThrough();
  //   shallow(<LoginPage loginApiHandler={loginApiHandler} resetPasswordHandler={resetPasswordHandler} getAuthConfigDetails={getAuthConfigDetails} getLoginToken={getLoginToken} match={match} />);
  //   expect(LoginPage.prototype.componentWillMount).toHaveBeenCalledTimes(1);
  // });

  it("Function testing on mapDispatchToProps", () => {
    const payload = "demo";
    const tenant = "demo";
    const code = "demo";
    const state = "demo";

    mapDispatchToProps(dispatch).loginApiHandler(payload, tenant);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOGIN_API_REQUEST,
      payload: "demo",
      tenant: "demo"
    });

    mapDispatchToProps(dispatch).resetPasswordHandler(payload, tenant);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: RESET_PASSWORD_API_REQUEST,
      payload: "demo",
      tenant: "demo"
    });

    mapDispatchToProps(dispatch).getAuthConfigDetails();
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: GET_AUTH_CONFIG_DETAILS
    });

    mapDispatchToProps(dispatch).getLoginToken(code, state);
    expect(dispatch.mock.calls[3][0]).toEqual({
      type: GET_LOGIN_TOKEN,
      code: "demo",
      state: "demo"
    });

  });

  // it('should test component when recieve props', () => {
  //   spyOn(LoginPage.prototype, 'componentWillReceiveProps').and.callThrough();
  //   const wrapper = shallow(<LoginPage loginApiHandler={loginApiHandler} loginSuccess={undefined} loginError={undefined} resetPasswordSuccess={undefined} resetPasswordFailure={undefined} resetPasswordHandler={resetPasswordHandler} getAuthConfigDetails={getAuthConfigDetails} getLoginToken={getLoginToken} />);
  //   expect(wrapper).toBeDefined();
  //   wrapper.setState({ agentsList });
  //   wrapper.setProps({
  //     loginError: "No Error Found.",
  //     loginSuccess: "9bed0d5ca79011e9863a0242ac110016",
  //     resetPasswordSuccess: "demo",
  //     resetPasswordFailure: "demo",
  //   });
  //   expect(LoginPage.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  // })






});
