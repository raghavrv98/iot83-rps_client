import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import { onSubmitHandler } from '../actions';
import { AddOrEditGroup, mapDispatchToProps } from '../index';
import { ON_SUBMIT_REQUEST, GET_GROUP_DETAILS } from '../constants';

const match = {
  params: {
    id: ""
  }
}

const submitSuccess = "this is submit success";
const submitError = "this is submit error";
const groupDetails = "this is group details success";
const groupDetailsError = "this is group details Error";

const simulateChangeInput = (wrapper, inputSelector, newValue, id) => {
  let input = wrapper.find(inputSelector)
  input.simulate('change', {
    target: { id, value: newValue },
  })
  return wrapper.find(inputSelector)
}

describe('<AddOrEditGroup />', () => {

  it('match snapshots', () => {
    const wrapper = shallow(<AddOrEditGroup match={match} />)
    expect(wrapper).toMatchSnapshot()
  })


  it("clicking back button", () => {
    let expectedCount = history.length + 1
    const wrapper = shallow(<AddOrEditGroup history={history} match={match} />);
    let backbutton = wrapper.find("span.cursor-pointer");
    expect(backbutton.length).toBe(1);
    backbutton.simulate('click');
    expect(history.length).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/manageGroups");
  });

  it('input change handling', () => {
    const wrapper = shallow(<AddOrEditGroup match={match} />);
    const nameInput = simulateChangeInput(wrapper, '[id="name"]', 'demoName', "name")
    const descriptionInput = simulateChangeInput(wrapper, '[id="description"]', 'demoDescription', 'description')
    expect(nameInput.props().value).toEqual('demoName')
    expect(descriptionInput.props().value).toEqual('demoDescription')
  })

  it('clicking submit button', () => {
    const wrapper = shallow(<AddOrEditGroup match={match} onSubmitHandler={onSubmitHandler} />);
    const onSubmitHandlerSpy = jest.spyOn(wrapper.instance(), "onSubmitHandler");
    wrapper.update();
    wrapper.instance().forceUpdate();
    let addOrEditForm = wrapper.find('form.contentForm')
    addOrEditForm.simulate('submit', { preventDefault: () => { } })
    expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
  })

  it('Input should call modalClose on click event', () => {
    let expectedCount = history.length + 1;
    const wrapper = shallow(<AddOrEditGroup history={history} match={match} />);
    wrapper.setState({ modalSuccess: "submitSuccess" })
    wrapper.instance().modalCloseHandler();
    expect(history.length + 1).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/manageGroups");
  })

  it("test componentDidMount", () => {
    spyOn(AddOrEditGroup.prototype, 'componentDidMount').and.callThrough();
    const wrapper = shallow(<AddOrEditGroup match={match} />);
    expect(AddOrEditGroup.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });

  it('unit testing on mapDispatchToProps', () => {
    const payload = "demo"
    const mockParams = {
      params: {
        id: "demoId"
      }
    }
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onSubmitHandler(payload, mockParams.params.id);
    expect(dispatch.mock.calls[0][0]).
      toEqual({
        type: ON_SUBMIT_REQUEST,
        payload: "demo",
        id: "demoId"
      })

    mapDispatchToProps(dispatch).getGroupDetails(mockParams.params.id);
    expect(dispatch.mock.calls[1][0]).
      toEqual({
        type: GET_GROUP_DETAILS,
        id: "demoId"
      })

  });

  it("test component will recieve props", () => {
    spyOn(AddOrEditGroup.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<AddOrEditGroup history={history} match={match} submitSuccess="" submitError="" groupDetails="" groupDetailsError="" />);
    wrapper.setProps({ submitSuccess, submitError, groupDetails, groupDetailsError });
    expect(AddOrEditGroup.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  });

});
