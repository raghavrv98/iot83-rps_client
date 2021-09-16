import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';

import SideNav from '../index';
const locationJson = {
  'dashboard' : "/",
  'iam' : "/manageUsers",
  'manageTenants' : "/manageTenants",
  'manageAgents' : "/manageAgents",
  'managePlant' : "/managePlant",
  'manageNavigation' : "/manageNavigation",
}
describe('<SideNav /> for verified user', () => {
  it('match snapshots', () => {
    const wrap = shallow(<SideNav tenant="guest" verified="true" location={{pathname: locationJson.manageNavigation}} />)
    expect(wrap).toMatchSnapshot()
  })

  it("test component will recieve props", async () => {
    spyOn(SideNav.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<SideNav history={history} verified="true" username="user" navItems={undefined}  />);
    wrapper.setProps({ navItems: [{navName: "sample", subMenus: []},
    {navName: "sample1", subMenus: [{url: ""}]}] });
    expect(SideNav.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  });

  // it("clicking logout trigger onClick event", async () => {
  //   const wrapper = shallow(<SideNav  tenant="guest" verified="true" history={history} />);
  //   let logout = wrapper.find("li.logout");
  //   expect(logout.length).toBe(1);
  //   logout.simulate('click')
  //   expect(history.location.pathname).toEqual("/");
  // });

  // test('calls walkingSkelton click', async () => {
  //   const wrapper = shallow(<SideNav tenant="guest" verified="true"  history={history} />)
  //   let walkingSkelton = wrapper.find("li#workingSkeletonDemo");
  //   expect(walkingSkelton.length).toBe(1);
  //   walkingSkelton.simulate('click')
  //   expect(history.location.pathname).toEqual("/managePasswordRequest");
  // });

  // test('calls Async Click function', async () => {
  //   const wrapper = shallow(<SideNav tenant="guest" verified="true" location={{pathname: locationJson.manageNavigation}}  history={history} />)
  //   wrapper.instance().clearLocalStorage();
  //   expect(history.location.pathname).toEqual("/login");
  // });

  // it("clicking change password trigger onClick event", async () => {
  //   const wrapper = shallow(<SideNav tenant="guest" verified="true" location={{pathname: locationJson.dashboard}} history={history} />);
  //   let changePassword = wrapper.find("li#changePassword");
  //   expect(changePassword.length).toBe(1);
  //   changePassword.simulate('click')
  //   expect(history.location.pathname).toEqual("/changePassword");
  // });

  // it("clicking settings trigger onClick event", async () => {
  //   const wrapper = shallow(<SideNav tenant="guest" verified="true" location={{pathname: locationJson.dashboard}} history={history} />);
  //   let changePassword = wrapper.find("li#settings");
  //   expect(changePassword.length).toBe(1);
  //   changePassword.simulate('click')
  //   expect(history.location.pathname).toEqual("/settings");
  // });
})

// describe('<SideNav /> for not verified user', () => {
//   it("check top nav", async () => {
//     const wrapper = shallow(<SideNav tenant="guest" verified="false" username="demo" />);
//     let topNavProfileDiv = wrapper.find("div.topNavProfile");
//     expect(topNavProfileDiv.exists()).toBeTruthy();
//     expect(topNavProfileDiv.children().length).toBe(1);
//   });
// })
// it("check top nav", async () => {
//   const wrapper = shallow(<SideNav tenant="guest" verified="false" />);
//   let topNavProfileDiv = wrapper.find("div.topNavProfile");
//   expect(topNavProfileDiv.exists()).toBeTruthy();
//   expect(topNavProfileDiv.children().length).toBe(1);
// });

