import React, { Component } from 'react';
import { shallow } from 'enzyme';
import history from "utils/history";
import {
  fetchAgentsList,
  deleteHandler,
  activeDeactiveAgentKey,
  saveToRPS,
  getComparisonDetails,
  publishToDTS
} from "../actions";
import {
  DEFAULT_ACTION,
  GET_AGENTS,
  DELETE_REQUEST,
  AGENT_UPDATE_kEY,
  GET_COMPARISON_DETAILS,
  SAVE_TO_RPS_REQUEST,
  PUBLISH_TO_DTS_REQUEST
} from "../constants";
import { ManageAgents, mapDispatchToProps } from "../index";

const agentsList = [
  {
    _id: "9bed0d5ca79011e9863a0242ac110016",
    createdAt: 1563257514466,
    name: "edfedeefdf",
    other: "fvcerdfedfv",
    overallGeometry: "dfe3dfedc",
    plantId: "f29b79c09f0911e986810242ac110011",
    processFluid: "efe3dcfed",
    updatedAt: 1563257547048,
    result: []
  }
];

describe('< ManageAgents />', () => {

  it('match snapshots', () => {
    const wrap = shallow(<ManageAgents deleteHandler={deleteHandler} activeDeactiveAgentKey={activeDeactiveAgentKey} saveToRPS={saveToRPS} getComparisonDetails={getComparisonDetails} publishToDTS={publishToDTS} fetchAgentsList={fetchAgentsList} />)
    expect(wrap).toMatchSnapshot()
  })

  it('should test component when render', () => {
    spyOn(ManageAgents.prototype, 'render').and.callThrough();
    const wrapper = shallow(<ManageAgents deleteHandler={deleteHandler} activeDeactiveAgentKey={activeDeactiveAgentKey} saveToRPS={saveToRPS} getComparisonDetails={getComparisonDetails} publishToDTS={publishToDTS} fetchAgentsList={fetchAgentsList} list={agentsList} />)
    expect(wrapper).toBeDefined();
    expect(ManageAgents.prototype.render).toHaveBeenCalledTimes(1);
  })

  it("test componentWillMount", async () => {
    const match = {
      params: {
        id: "demoId"
      }
    };
    const fetchAgentsList = jest.fn();
    spyOn(ManageAgents.prototype, "componentWillMount").and.callThrough();
    shallow(<ManageAgents
      deleteHandler={deleteHandler}
      activeDeactiveAgentKey={activeDeactiveAgentKey}
      saveToRPS={saveToRPS}
      getComparisonDetails={getComparisonDetails}
      publishToDTS={publishToDTS}
      fetchAgentsList={fetchAgentsList}
      match={match} />);
    expect(ManageAgents.prototype.componentWillMount).toHaveBeenCalledTimes(1);
    expect(fetchAgentsList).toHaveBeenCalledTimes(1);
  });

  it('should test component when recieve props', () => {
    spyOn(ManageAgents.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<ManageAgents
      deleteHandler={deleteHandler}
      activeDeactiveAgentKey={activeDeactiveAgentKey}
      saveToRPS={saveToRPS}
      getComparisonDetails={getComparisonDetails}
      publishToDTS={publishToDTS}
      fetchAgentsList={fetchAgentsList}
      list={undefined}
      agentsList={undefined}
      agentsListError={undefined}
      deleteSuccess={undefined}
      deleteFailure={undefined}
    />);
    expect(wrapper).toBeDefined();
    wrapper.setState({ agentsList });
    wrapper.setProps({
      list: agentsList,
      listError: "No Error Found.",
      deleteSuccess: "9bed0d5ca79011e9863a0242ac110016",
      deleteFailure: "No Error Found in delete.",
      agentsList: { result: [] },
      agentsListError: "No Error Found.",
    });
    expect(ManageAgents.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  })

  // it("clicking add button trigger onClick event", async () => {
  //   let expectedCount = history.length + 2;
  //   const wrapper = shallow(<ManageAgents fetchAgentsList={fetchAgentsList} history={history} />);
  //   let addButton = wrapper.find("button.btn.btn-create");
  //   expect(addButton.length).toBe(1);
  //   addButton.simulate('click');
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/addOrEditAgent");
  // });

  // it("clicking edit button trigger onClick event", async () => {
  //   const match = {
  //     params: {
  //         id: "demoId"
  //     }
  //   }
  //   let expectedCount = history.length + 2;
  //   const wrapper = shallow(<ManageAgents fetchAgentsList={fetchAgentsList} history={history} />);
  //   let addButton = wrapper.find("button.btn-transparent.text-primary");
  //   expect(addButton.length).toBe(1);
  //   addButton.simulate('click');
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/addOrEditAgent/" + match.params.id);
  // });

  it("Function testing on mapDispatchToProps", () => {
    const mockParams = {
      params: {
        id: "demo",
        status: "demo",
        payload: "demo"
      },
    };
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).fetchAgentsList();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: GET_AGENTS,
    });

    mapDispatchToProps(dispatch).deleteHandler(mockParams.params.id);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: DELETE_REQUEST,
      id: "demo"
    });

    mapDispatchToProps(dispatch).activeDeactiveAgentKey(mockParams.params.id, mockParams.params.status);
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: AGENT_UPDATE_kEY,
      id: "demo",
      status: "demo"
    });

    mapDispatchToProps(dispatch).saveToRPS(mockParams.params.id, mockParams.params.payload);
    expect(dispatch.mock.calls[3][0]).toEqual({
      type: SAVE_TO_RPS_REQUEST,
      id: "demo",
      payload: "demo"
    });

    mapDispatchToProps(dispatch).publishToDTS(mockParams.params.id, mockParams.params.payload);
    expect(dispatch.mock.calls[4][0]).toEqual({
      type: PUBLISH_TO_DTS_REQUEST,
      id: "demo",
      payload: "demo"
    });


    mapDispatchToProps(dispatch).getComparisonDetails(mockParams.params.id);
    expect(dispatch.mock.calls[5][0]).toEqual({
      type: GET_COMPARISON_DETAILS,
      id: "demo"
    });

  });
});