import React from "react";
import { shallow } from "enzyme";
import history from "utils/history";
import { AddOrEditMapping, mapDispatchToProps } from "../index";
import { GET_PLANTS, GET_EDIT_SAVE_MAP, GET_MAPPING_DATA, GET_AGENT_DETAILS } from "../constants";
import { getPlantList, handelMapping, getmappingDetails, getAgentDetails } from "../actions";

const match = {
  params: {
    id: "demo",
    expId: "demo",
    mapId: "demo",
    agentId: "demo",
    payload: "demo"
  }
};

const plantsListSuccess = {
  result: [{ _id: "abc", name: "demo" }],
  payload: {
    bindings: [{
      dataType: "demo",
      data: "demo"
    }]
  }
};

const getAgentDetailsSuccess = {
  rps: {
    name: "demo",
    type: "demo",
    deviceId: "demo"
  }
}

const editSaveSuccess = "this is editSaveSuccess"
const fetchMappingDataSuccess = "this is fetchMappingDataSuccess"
const plantsListFailure = "this is plantsListFailure"
const editSaveFailure = "this is editSaveFailure"
const fetchMappingDataFailure = "this is fetchMappingDataFailure"
const getAgentDetailsFailure = "this is getAgentDetailsFailure"

describe('< AddOrEditMapping />', () => {

  // it('match snapshots', () => {
  //   const wrap = shallow(<AddOrEditMapping match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} handelMapping={handelMapping} getmappingDetails={getmappingDetails} />)
  //   expect(wrap).toMatchSnapshot()
  // })

  it("clicking back button trigger onClick event", async () => {
    let expectedCount = history.length + 1;
    const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
    let backbutton = wrapper.find("span.cursor-pointer");
    expect(backbutton.length).toBe(1);
    backbutton.simulate("click");
    expect(history.length).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/mappingList/demo");
  });

  // it("clicking submit button trigger on having payload onClick event", async () => {
  //   const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
  //   const onSubmitHandlerSpy = jest.spyOn(wrapper.instance(), "editandSaveHandler");
  //   wrapper.update();
  //   wrapper.instance().forceUpdate();
  //   let addOrEditForm = wrapper.find("form.contentForm");
  //   expect(addOrEditForm.length).toBe(1);
  //   addOrEditForm.simulate('submit', { preventDefault() { } });
  //   expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
  // });

  // it("clicking submit button trigger onClick event", async () => {
  //   const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
  //   const onSubmitHandlerSpy = jest.spyOn(wrapper.instance(), "editandSaveHandler");
  //   wrapper.update();
  //   wrapper.instance().forceUpdate();
  //   let addOrEditForm = wrapper.find("form.contentForm");
  //   expect(addOrEditForm.length).toBe(1);
  //   addOrEditForm.simulate('submit', { preventDefault() { } });
  //   expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
  // });

  // it("test component will recieve props", async () => {
  //   spyOn(AddOrEditMapping.prototype, 'componentWillReceiveProps').and.callThrough();
  //   const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} editSaveSuccess="" fetchMappingDataSuccess="" getAgentDetailsSuccess="" plantsListFailure="" editSaveFailure="" fetchMappingDataFailure="" getAgentDetailsFailure="" />);
  //   wrapper.setProps({ plantsListSuccess, editSaveSuccess, fetchMappingDataSuccess, getAgentDetailsSuccess, plantsListFailure, editSaveFailure, fetchMappingDataFailure, getAgentDetailsFailure });
  //   expect(AddOrEditMapping.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  // });

  it('should test component when recieve props', () => {
    spyOn(AddOrEditMapping.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<AddOrEditMapping
      history={history}
      match={match}
      getPlantList={getPlantList}
      getAgentDetails={getAgentDetails}
      getmappingDetails={getmappingDetails}
      plantsListSuccess=""
      editSaveSuccess=""
      fetchMappingDataSuccess=""
      getAgentDetailsSuccess=""
      plantsListFailure=""
      editSaveFailure=""
      fetchMappingDataFailure=""
      getAgentDetailsFailure=""
    />);
    expect(wrapper).toBeDefined();
    wrapper.setState({ getPlantList });
    wrapper.setProps({
      getPlantList: { getPlantList },
      plantsListSuccess: "",
      editSaveSuccess: "",
      fetchMappingDataSuccess: "",
      getAgentDetailsSuccess: "",
      plantsListFailure: "",
      editSaveFailure: "",
      fetchMappingDataFailure: "",
      getAgentDetailsFailure: "",
    });
    expect(AddOrEditMapping.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  })


  // it("test component will recieve props in edit case", async () => {
  //   spyOn(AddOrEditMapping.prototype, 'componentWillReceiveProps').and.callThrough();
  //   const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} editSaveSuccess="" fetchMappingDataSuccess="" getAgentDetailsSuccess="" plantsListFailure="" editSaveFailure="" fetchMappingDataFailure="" getAgentDetailsFailure="" />);
  //   wrapper.setProps({ plantsListSuccess, editSaveSuccess, fetchMappingDataSuccess, getAgentDetailsSuccess, plantsListFailure, editSaveFailure, fetchMappingDataFailure, getAgentDetailsFailure });
  //   expect(AddOrEditMapping.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  // });

  it("test edit case", async () => {
    const getPlantList = jest.fn();
    spyOn(AddOrEditMapping.prototype, 'componentWillMount').and.callThrough();
    const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
    expect(AddOrEditMapping.prototype.componentWillMount).toHaveBeenCalledTimes(1);
    expect(getPlantList).toHaveBeenCalledTimes(1);
  });


  // test('Input should call handleChange on name change event', () => {
  //   const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
  //   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), "nameChangeHandler");
  //   wrapper.update();
  //   wrapper.instance().forceUpdate();
  //   wrapper.find('[id="agentId"]').simulate('change', {
  //     target: { id: "agentId", value: "agentId" }
  //   });
  //   expect(wrapper.find('[id="agentId"]').props().value).toEqual("agentId");
  //   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  // })

  // test('Input should call handleChange on name change event', () => {
  //   const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
  //   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), "nameChangeHandler");
  //   wrapper.update();
  //   wrapper.instance().forceUpdate();
  //   wrapper.find('[id="actionName"]').simulate('change', {
  //     target: { id: "actionName", value: "actionName" }
  //   });
  //   expect(wrapper.find('[id="actionName"]').props().value).toEqual("actionName");
  //   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  // })

  // test('Input should call handleChange on name change event', () => {
  //   const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
  //   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), "nameChangeHandler");
  //   wrapper.update();
  //   wrapper.instance().forceUpdate();
  //   wrapper.find('[id="plantId"]').simulate('change', {
  //     target: { id: "plantId", value: "plantId" }
  //   });
  //   expect(wrapper.find('[id="plantId"]').props().value).toEqual("plantId");
  //   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  // })

  test('Input should call modalClose on click event', () => {
    let expectedCount = history.length + 1;
    const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
    wrapper.setState({ modalFor: "submitSuccess" })
    wrapper.instance().modalCloseHandler();
    expect(history.length + 1).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/mappingList/demo");
  })

  test('Input should call modalClose on click event', () => {
    const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} />);
    wrapper.instance().modalCloseHandler();
    expect(wrapper.instance().state.isOpen).toEqual(false);
  })

  it("test handleReadCsv function", async () => {
    const wrapper = shallow(<AddOrEditMapping history={history} match={match} getPlantList={getPlantList}
      getAgentDetails={getAgentDetails} handelMapping={handelMapping} getmappingDetails={getmappingDetails} />);
    wrapper.setState({ payload: { bindings: [{ data: {} }] }, preservePayload: { bindings: [] }, isFetching: false })
    wrapper.instance().handleReadCSV({ data: "sample" }, `fileName`, 0);
    expect(JSON.stringify(wrapper.instance().state.payload.bindings[0].data)).toEqual(JSON.stringify("sample"));
    expect(wrapper.instance().state.payload.bindings[0].fileName).toEqual(`fileName`);
  });

  it("test componentWillMount", async () => {
    const mockParams = {
      params: {
        agentId: "demo",
        mapId: "demo"
      }
    }
    spyOn(AddOrEditMapping.prototype, 'componentWillMount').and.callThrough();
    const wrapper = shallow(<AddOrEditMapping history={history} match={mockParams} getPlantList={getPlantList} getAgentDetails={getAgentDetails} getmappingDetails={getmappingDetails} handelMapping={handelMapping} />);
    expect(AddOrEditMapping.prototype.componentWillMount).toHaveBeenCalledTimes(1);
  });

  it('Function testing on mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getPlantList();
    expect(dispatch.mock.calls[0][0]).
      toEqual({
        type: GET_PLANTS
      })
    mapDispatchToProps(dispatch).handelMapping(match.params.payload, match.params.expId, match.params.mapId);
    expect(dispatch.mock.calls[1][0]).
      toEqual({
        type: GET_EDIT_SAVE_MAP,
        payload: "demo",
        expId: "demo",
        mapId: "demo"
      })
    mapDispatchToProps(dispatch).getmappingDetails(match.params.agentId, match.params.mapId);
    expect(dispatch.mock.calls[2][0]).
      toEqual({
        type: GET_MAPPING_DATA,
        agentId: "demo",
        mapId: "demo"
      })
    mapDispatchToProps(dispatch).getAgentDetails(match.params.id);
    expect(dispatch.mock.calls[3][0]).
      toEqual({
        type: GET_AGENT_DETAILS,
        id: "demo"
      })
  });
});