import React from "react";
import { shallow } from "enzyme";
import history from "utils/history";
import { createAgent, getAgentDetails } from "../actions";
import { AddOrEditAgent, mapDispatchToProps } from "../index";
import { CREATE_AGENT_REQUEST, GET_AGENT_DETAILS } from "../constants";
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
// import { fireEvent } from "@testing-library/react";

const match = {
  params: {
    id: ""
  }
};

const agentDataSuccess = {
  rps:{
    name: "",
    deviceId: "",
    type: "DCSAgent",
    agentKey: "",
    active: false,
  }
};


const agentDataFailure = "this is submit error";
const agentSuccess = "this is group details success";
const agentFailure = "this is group details Error";

describe("<AddOrEditAgent />", () => {

  it('match snapshots', () => {
    const wrap = shallow(<AddOrEditAgent match={match} createAgent={createAgent} getAgentDetails={getAgentDetails} />)
    expect(wrap).toMatchSnapshot()
  })
  
  it("clicking back button trigger onClick event", async () => {
    let expectedCount = history.length + 1;
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} createAgent={createAgent} />);
    let backbutton = wrapper.find("span.cursor-pointer");
    expect(backbutton.length).toBe(1);
    backbutton.simulate("click");
    expect(history.length).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/manageAgents");
  });


  it("clicking submit button trigger on having payload onClick event", async () => {
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} createAgent={createAgent} />);
    const onSubmitHandlerSpy = jest.spyOn(wrapper.instance(), "onSubmitHandler");
    wrapper.setState({ payload: {agentKey: "sample"}});
    wrapper.update();
    wrapper.instance().forceUpdate();
    let addOrEditForm = wrapper.find("form.contentForm");
    expect(addOrEditForm.length).toBe(1);
    addOrEditForm.simulate('submit', { preventDefault() { } });
    expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it("clicking submit button trigger onClick event", async () => {
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} createAgent={createAgent} />);
    const onSubmitHandlerSpy = jest.spyOn(wrapper.instance(), "onSubmitHandler");
    wrapper.update();
    wrapper.instance().forceUpdate();
    let addOrEditForm = wrapper.find("form.contentForm");
    expect(addOrEditForm.length).toBe(1);
    addOrEditForm.simulate('submit', { preventDefault() { } });
    expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it("test component will recieve props", async () => {
    spyOn(AddOrEditAgent.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} createAgent={createAgent} agentDataSuccess="" agentDataFailure="" agentSuccess="" agentFailure="" />);
    wrapper.setProps({ agentDataSuccess, agentDataFailure, agentSuccess, agentFailure });
    expect(AddOrEditAgent.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  });


  it('should test component when recieve props', () => {
    spyOn(AddOrEditAgent.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<AddOrEditAgent
      history={history}
      match={match}
      createAgent={createAgent}
      agentDataSuccess=""
      agentDataFailure=""
      agentSuccess=""
      agentFailure=""
    />);
    expect(wrapper).toBeDefined();
    wrapper.setState({ createAgent });
    wrapper.setProps({
      createAgent: { createAgent },
      agentDataSuccess:"",
      agentDataFailure:"",
      agentSuccess:"",
      agentFailure:""
    });
    expect(AddOrEditAgent.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  })



  it("test component will recieve props in edit case", async () => {
    const match = {
      params: {
        id: "demoId"
      }
    };
    spyOn(AddOrEditAgent.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} getAgentDetails={getAgentDetails} createAgent={createAgent} agentDataSuccess="" agentDataFailure="" agentSuccess="" agentFailure="" />);
    wrapper.setProps({ agentDataSuccess, agentDataFailure, agentSuccess, agentFailure });
    expect(AddOrEditAgent.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  });

  it("test edit case", async () => {
    const match = {
      params: {
        id: "demoId"
      }
    };
    const getAgentDetails = jest.fn();
    spyOn(AddOrEditAgent.prototype, 'componentDidMount').and.callThrough();  
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} getAgentDetails={getAgentDetails} />);
    expect(AddOrEditAgent.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    expect(getAgentDetails).toHaveBeenCalledTimes(1);
  });

  test('Input should call handleChange on name change event', () => {
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} getAgentDetails={getAgentDetails} />);
    const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), "inputChangeHandler");
    wrapper.update();
    wrapper.instance().forceUpdate();
    wrapper.find('[id="name"]').simulate('change',{
      target: {id: "name", value: "name"}
    });
    expect(wrapper.find('[id="name"]').props().value).toEqual("name");
    expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  })

  test('Input should call handleChange on type APSensingDTSPoller change event', () => {
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} getAgentDetails={getAgentDetails} />);
    const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), "inputChangeHandler");
    wrapper.update();
    wrapper.instance().forceUpdate();
    wrapper.find('[id="type"]').simulate('change',{
      target: {id: "type", value: "APSensingDTSPoller"}
    });
    expect(wrapper.find('[id="type"]').props().value).toEqual("APSensingDTSPoller");
    expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  })

  test('Input should call handleChange on type DCSAgent change event', () => {
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} getAgentDetails={getAgentDetails} />);
    const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), "inputChangeHandler");
    wrapper.update();
    wrapper.instance().forceUpdate();
    wrapper.find('[id="type"]').simulate('change',{
      target: {id: "type", value: "DCSAgent"}
    });
    expect(wrapper.find('[id="type"]').props().value).toEqual("DCSAgent");
    expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  })

  test('Input should call modalClose on click event', () => {
    let expectedCount = history.length + 1;
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} />);
    wrapper.setState({ modalFor: "submitSuccess" })
    wrapper.instance().modalCloseHandler();
    expect(history.length + 1).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/manageAgents");
  })

  test('Input should call modalClose on click event', () => {
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} />);
    wrapper.instance().modalCloseHandler();
    expect(wrapper.instance().state.isOpen).toEqual(false);
  })

  test('test inputChangeHandler select change ', () => {
    const wrapper = shallow(<AddOrEditAgent history={history} match={match} />);
    const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'inputChangeHandler');
    wrapper.setState({payload: {APSensingDTSPoller: {channel:[{}]}, type: "APSensingDTSPoller"}})
    let startPositionInput = wrapper.find('select#type').simulate('change',{
      target: {id: "activeChannels", value: "1"}
    }, 0);
    expect(startPositionInput.length).toBe(1);
  }) 

  // test('test nameChangeHandler input change ', () => {
  //   const wrapper = shallow(<AddOrEditAgent history={history} match={match} />);
  //   wrapper.setState({ payload: { APSensingDTSPoller: { channel: [{}] }, type: "APSensingDTSPoller" } })
  //   let startPositionInput = wrapper.find('input#ipAddress').simulate('change', {
  //     target: { id: "ipAddress", value: "1" }
  //   }, 0);
  //   expect(startPositionInput.length).toBe(1);
  // }) 

  it('Function testing on mapDispatchToProps', () => {
    const payload = "demo"
    const mockParams = {
      params: {
        id: "demoId"
      }
    }
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).createAgent(payload);
    expect(dispatch.mock.calls[0][0]).
      toEqual({
        type: CREATE_AGENT_REQUEST,
        payload: "demo"
      })
    mapDispatchToProps(dispatch).getAgentDetails(mockParams.params.id);
    expect(dispatch.mock.calls[1][0]).
      toEqual({
        type: GET_AGENT_DETAILS,
        id: "demoId"
      })
  });

  it('should render the page message', () => {
    const match = {
      params: {
        id: "demoId"
      }
    };
    const getAgentDetails = jest.fn();
    const renderedComponent = shallow(<AddOrEditAgent match={match} getAgentDetails={getAgentDetails} />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.headingEdit} children={(message => message)} />),
    ).toEqual(true);
  });
});

function createDtWithFiles(files = []) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        kind: 'file',
        size: file.size,
        type: file.type,
        getAsFile: () => file
      })),
      types: ['Files']
    }
  }
}

function createFile(name, size, type) {
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    }
  })
  return file
}