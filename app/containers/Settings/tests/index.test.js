import React from 'react';
import { shallow, mount } from 'enzyme';
import history from "utils/history";
// import { enzymeFind } from 'styled-components/test-utils';
import {getSecretKeys, generateKeyhandler, secretActiveDeactiveHandler, getAccountDetails, deleteSecretKey} from '../actions';
import { Settings, mapDispatchToProps } from '../index';
import {GENERATE_KEY_REQUEST, SECRET_KEY_REQUEST, SECRET_STATUS_REQUEST, ACCOUNT_DETAILS_REQUEST, DELETE_SECRET_KEY} from '../constants';

describe('< Settings />', () => {
    // it('match snapshots', () => {
    //   const wrap = shallow(<Settings getSecretKeys={getSecretKeys} getAccountDetails={getAccountDetails} />)
    //   expect(wrap).toMatchSnapshot()
    // })

    // it('should test component when mount', () => {
    //   let _self = this;
    //   spyOn(Settings.prototype, 'componentWillMount').and.callThrough();
    //   const wrapper = shallow(<Settings  getSecretKeys={jest.fn()} getAccountDetails={jest.fn()}/>);
    //   expect(wrapper).toBeDefined();
    //   expect(Settings.prototype.componentWillMount).toHaveBeenCalledTimes(1);
    //   expect(wrapper.instance().props.getSecretKeys).toBeCalled();
    // })

    // it('should test component when recieve props', () => {
    //   spyOn(Settings.prototype, 'componentWillReceiveProps').and.callThrough();
    //   const wrapper = shallow(<Settings  getSecretKeys={jest.fn()} getAccountDetails={jest.fn()} generatedKey={undefined} generatedKeyError={undefined} secretKeys={undefined} secretKeysError={undefined} secretStatus={undefined} secretStatusError={undefined} accountDetail={undefined} accountDetailError={undefined} secretKeyDeleteSuccess={undefined} secretKeyDeleteFailure={undefined} />);
    //   expect(wrapper).toBeDefined();
    //   const mockGeneratedKey = {
    //     secretKey : "abc",
    //     id: "demo"
    //   }
    //   wrapper.setState({mockGeneratedKey, secretKeys: [{id: "abc"}]})
    //   wrapper.setProps({ generatedKey:{mockGeneratedKey}, generatedKeyError:" this is mock error", secretKeys:["sampleSecretKEy"], secretKeysError:"this is mock error", secretStatus:["abc"], secretStatusError: "this is mock error",accountDetail:["abc"],accountDetailError:"this is mock error",secretKeyDeleteSuccess:"abc", secretKeyDeleteFailure:"this is mock error"});
    //   expect(Settings.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
    // })
    // it('should test input of secret key status', () => {
    //   const wrapper = shallow(<Settings  getSecretKeys={jest.fn()} getAccountDetails={jest.fn()} />);
    //   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'secretKeyStatusHandler');
    //   expect(wrapper).toBeDefined();
    //   wrapper.setState({secretKeys: [{id: "abc"}], isAddKeyView: false, isFetching: false})
    //   let addOrEditForm = wrapper.find("input#abc");
    //   expect(addOrEditForm.length).toBe(1);
    //   wrapper.setProps({secretActiveDeactiveHandler: jest.fn()})
    //   addOrEditForm.simulate('change', { target: {id: "abc", value: "demo"}});
    //   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
    // })
    // it('should test button for update soft', () => {
    //   spyOn(Settings.prototype, 'loaderHandler').and.callThrough();
    //   const wrapper = shallow(<Settings  getSecretKeys={jest.fn()} getAccountDetails={jest.fn()}/>);
    //   expect(wrapper).toBeDefined();
    //   let addOrEditForm = wrapper.find("button#updateSoftButton");
    //   expect(addOrEditForm.length).toBe(1);
    //   addOrEditForm.simulate('click');
    //   expect(Settings.prototype.loaderHandler).toHaveBeenCalledTimes(1);
    //   expect(wrapper.instance().state.isLoaderVisible).toEqual(true);
    // })
    // test('Input should call modalClose on click event', () => {
    //   const wrapper = shallow(<Settings history={history}  getSecretKeys={jest.fn()} getAccountDetails={jest.fn()} />);
    //   wrapper.setState({modalForSuccess: true})
    //  wrapper.instance().modalCloseHandler();
    //  expect(wrapper.instance().state.isAddKeyView).toEqual(false);
    // }) 
    
    // test('Input should call modalClose on click event', () => {
    //   const wrapper = shallow(<Settings history={history}  getSecretKeys={jest.fn()} getAccountDetails={jest.fn()} />);
    //  wrapper.instance().modalCloseHandler();
    //  expect(wrapper.instance().state.isOpen).toEqual(false);
    // })
    
    // it("clicking submit button trigger onClick event", async () => {
    //   const wrapper = shallow(<Settings generateKeyhandler={generateKeyhandler}  getSecretKeys={getSecretKeys} getAccountDetails={getAccountDetails} />);
    //   wrapper.setProps({generatedKey: "", generatedKeyError: "", secretKeys: "", secretKeysError: "", secretStatus: "", secretStatusError: "", accountDetail: "", secretKeyDeleteSuccess: "", accountDetailError: ""})
    //   const onSubmitHandlerSpy = jest.spyOn(wrapper.instance(), 'generateKeyhandler');
    //   wrapper.setState({isFetching: false, isAddKeyView: true})
    //   let addOrEditForm = wrapper.find("form#keyGenForm");
    //   expect(addOrEditForm.length).toBe(1);
    //   addOrEditForm.simulate('submit', { preventDefault() { } });
    //   expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
    // });

    it('Function testing on mapDispatchToProps', () => {
      const dispatch = jest.fn();
      const payload = "demo";
      const id = "demo";
      const status = "demo";
      mapDispatchToProps(dispatch).generateKeyhandler(payload);
      expect(dispatch.mock.calls[0][0]).
      toEqual({ 
        type: GENERATE_KEY_REQUEST,
        payload: 'demo',
      })
      mapDispatchToProps(dispatch).getSecretKeys();
      expect(dispatch.mock.calls[1][0]).
      toEqual({
        type: SECRET_KEY_REQUEST
      })
      mapDispatchToProps(dispatch).secretActiveDeactiveHandler(id,status);
      expect(dispatch.mock.calls[2][0]).
      toEqual({
        type: SECRET_STATUS_REQUEST,
        id: "demo",
        status: "demo"
      })
      // mapDispatchToProps(dispatch).getAccountDetails(id,status);
      // expect(dispatch.mock.calls[3][0]).
      // toEqual({
      //   type: ACCOUNT_DETAILS_REQUEST,
      //   id: "demo"
      // })
      // mapDispatchToProps(dispatch).deleteSecretKey(id,status);
      // expect(dispatch.mock.calls[4][0]).
      // toEqual({
      //   type: DELETE_SECRET_KEY,
      //   id: "demo"
      // })
    });

});