import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import {onSubmitHandler} from '../actions'
import { AddOrEditTenant, mapDispatchToProps } from '../index';
import {SUBMIT_HANDLER,GET_TENANT_BY_ID} from '../constants';


  const submitSuccess =  "this is submit success";
  const submitFailure =  "this is submit error";

describe('<AddOrEditTenant />', () => {
  it('Function testing on mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const payload = "demo"
    const mockParams = {
      params: {
        id: "demoId"
      }
    }
    mapDispatchToProps(dispatch).onSubmitHandler(payload);
    expect(dispatch.mock.calls[0][0]).
    toEqual({ 
      type: SUBMIT_HANDLER,
      payload: 'demo'
    })
    mapDispatchToProps(dispatch).fetchTenantInfo(mockParams.params.id);
    expect(dispatch.mock.calls[1][0]).
    toEqual({
      type: GET_TENANT_BY_ID,
      id: "demoId"
    })
  });
  //   it("clicking back button trigger onClick event", async () => {
//     let expectedCount = history.length + 1
//     const wrapper = shallow(<AddOrEditTenant history={history} onSubmitHandler={onSubmitHandler}  />);
//     let backbutton = wrapper.find("button.btn-transparent");
//     expect(backbutton.length).toBe(1);
//     backbutton.simulate('click');
//     expect(history.length).toEqual(expectedCount);
//     expect(history.location.pathname).toEqual("/manageTenants");
//   });
//   it("clicking submit button trigger onClick event", async () => {
//     const onSubmitHandlerSpy = jest.spyOn(AddOrEditTenant.prototype, "onSubmitHandler");
//     const wrapper = shallow(<AddOrEditTenant history={history} onSubmitHandler={onSubmitHandler} />);
//     let addOrEditForm = wrapper.find("form.contentForm");
//     expect(addOrEditForm.length).toBe(1);
//     addOrEditForm.simulate('submit', { preventDefault() { } });
//     expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
//   });
//   it("test component will recieve props", async () => {
//     let expectedCount = history.length + 1
//     spyOn(AddOrEditTenant.prototype, 'componentWillReceiveProps').and.callThrough();
//     const wrapper = shallow(<AddOrEditTenant history={history} onSubmitHandler={onSubmitHandler} submitSuccess="" submitFailure="" />);
//     wrapper.setProps({ submitSuccess, submitFailure });
//     // expect(history.length).toEqual(expectedCount);
//     // expect(history.location.pathname).toEqual("/manageTenants");
//     expect(AddOrEditTenant.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
//   });

//   test('Input should call handleChange on name change event', () => {
//     const inputChangeHandlerSpy = jest.spyOn(AddOrEditTenant.prototype, "inputChangeHandler");
//     const wrapper = shallow(<AddOrEditTenant history={history} />);
//     wrapper.find('[id="companyName"]').simulate('change',{
//       target: {id: "companyName", value: "name"}
//     });
//     expect(wrapper.find('[id="companyName"]').props().value).toEqual("name");
//     expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
//   })

//   // test('Input should call handleChange on tenant name change event', () => {
//   //   const inputChangeHandlerSpy = jest.spyOn(AddOrEditTenant.prototype, "inputChangeHandler");
//   //   const wrapper = shallow(<AddOrEditTenant history={history} />);
//   //   wrapper.find('[id="tenantName"]').simulate('change',{
//   //     target: {id: "tenantName", value: "name"}
//   //   });
//   //   expect(wrapper.find('[id="tenantName"]').props().value).toEqual("name");
//   //   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(2);
//   // })

//   test('Input should call handleChange on mail change event', () => {
//     const inputChangeHandlerSpy = jest.spyOn(AddOrEditTenant.prototype, "inputChangeHandler");
//     const wrapper = shallow(<AddOrEditTenant history={history} />);
//     wrapper.find('[id="email"]').simulate('change',{
//       target: {id: "email", value: "abc@mail.com"}
//     });
//     expect(wrapper.find('[id="email"]').props().value).toEqual("abc@mail.com");
//     expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(3);
//   })

//   test('Input should call handleChange on mobile change event', () => {
//     const inputChangeHandlerSpy = jest.spyOn(AddOrEditTenant.prototype, "inputChangeHandler");
//     const wrapper = shallow(<AddOrEditTenant history={history} />);
//     wrapper.find('[id="mobile"]').simulate('change',{
//       target: {id: "mobile", value: "9876543210"}
//     });
//     expect(wrapper.find('[id="mobile"]').props().value).toEqual("9876543210");
//     expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(4);
//   })

//   test('Input should call handleChange on description change event', () => {
//     const inputChangeHandlerSpy = jest.spyOn(AddOrEditTenant.prototype, "inputChangeHandler");
//     const wrapper = shallow(<AddOrEditTenant history={history} />);
//     wrapper.find('[id="description"]').simulate('change',{
//       target: {id: "description", value: "demo description"}
//     });
//     expect(wrapper.find('[id="description"]').props().value).toEqual("demo description");
//     expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(5);
//   })

//   it('match snapshots', () => {
//     const wrap = shallow(<AddOrEditTenant history={history} onSubmitHandler={onSubmitHandler} />)
//     expect(wrap).toMatchSnapshot()
//   })
});
