import React from 'react';
import { mount, shallow } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import {resetPasswordHandler} from '../actions';
import { ResetPassword, mapDispatchToProps } from '../index';
import {RESET_PASSWORD_REQUEST} from '../constants';

describe('< ResetPassword />', () => {
    it('match snapshots', () => {
        const wrap = shallow(<ResetPassword />)
        expect(wrap).toMatchSnapshot()
      })
  
      it('should test component when mount', () => {
        spyOn(ResetPassword.prototype, 'render').and.callThrough();
        const wrapper = shallow(<ResetPassword />);
        expect(wrapper).toBeDefined();
        expect(ResetPassword.prototype.render).toHaveBeenCalledTimes(1);
      })
  
      it('should test component when recieve props', () => {
        spyOn(ResetPassword.prototype, 'componentWillReceiveProps').and.callThrough();
        const wrapper = shallow(<ResetPassword resetPasswordSuccess={undefined} resetPasswordFailure={undefined} />);
        expect(wrapper).toBeDefined();
        wrapper.setProps({ resetPasswordSuccess:"Reset password success message.", resetPasswordFailure:"this is mock error"});
        expect(ResetPassword.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
      })
      // it("clicking submit button trigger onClick event", async () => {
      //   const onSubmitHandlerSpy = jest.spyOn(ResetPassword.prototype, "resetFormHandler");
      //   const mockLocation = {
      //       search : "mockSearch"
      //   }
      //   const wrapper = (<ResetPassword resetPasswordHandler={resetPasswordHandler} location={mockLocation} />);
      //   let addOrEditForm = wrapper.find("form");
      //   expect(addOrEditForm.length).toBe(1);
      //   addOrEditForm.simulate('submit', { preventDefault() { } });
      //   expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
      // });
      it('Function testing on mapDispatchToProps', () => {
        const dispatch = jest.fn();
        const payload = "demo"
        mapDispatchToProps(dispatch).resetPasswordHandler(payload);
        expect(dispatch.mock.calls[0][0]).
        toEqual({ 
          type: RESET_PASSWORD_REQUEST,
          payload: 'demo',
        })
      });
});