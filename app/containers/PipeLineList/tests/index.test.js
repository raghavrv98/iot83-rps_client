import React, { Component } from "react";
import { mount, shallow } from "enzyme";
import history from "utils/history";
import { getPipelineList, pipelineDeleteHandler, managePlantList, manageGetAlarmList } from "../actions";
import { GET_PIPELINE_LIST, DELETE_PIPELINE, GET_PLANT_LIST, GET_ALARM_LIST } from "../constants";
import { PipeLineList, mapDispatchToProps } from "../index";
import { result } from "lodash";

const pipelineList = {
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

const pipelineListFailure = "fail";
const pipeLineDelete = "delete";
const pipelineDeletedSuccess = "success";
const pipeLineDeleteFailure = "fail";
const plantList = {
  result: [{
    _id: "892d2858168d11ea8a030242ac120014",
    alarmCount: 0,
    createdAt: 1575460773585,
    name: "Unamboach_Plant",
    ownerEmail: "donnadrobinson@spy.com",
    ownerName: "Donna Robinson",
    ownerPhone: "+917775757579",
    pipelineCount: 0,
    plantImage: null,
    updatedAt: 1575461564520
  }],
  count: 1
}
const plantListFailure = "fail";
const getAlarmList = [];
const getAlarmListFailure = "fail"
describe("< PipeLineList />", () => {

  it('match snapshots', () => {
    const wrap = shallow(<PipeLineList match={match} pipelineDeleteHandler={pipelineDeleteHandler} getPipelineList={getPipelineList} managePlantList={managePlantList} manageGetAlarmList={manageGetAlarmList} />)
    expect(wrap).toMatchSnapshot()
  })

  const match = {
    params: {
      id: ""
    }
  };

  it('should test component when render', () => {
    spyOn(PipeLineList.prototype, 'render').and.callThrough();
    const wrapper = shallow(<PipeLineList getPipelineList={getPipelineList} pipelineDeleteHandler={pipelineDeleteHandler} list={PipeLineList} match={match} managePlantList={managePlantList} manageGetAlarmList={manageGetAlarmList} />);
    expect(wrapper).toBeDefined();
    expect(PipeLineList.prototype.render).toHaveBeenCalledTimes(1);
  })

  it("clicking back button trigger onClick event", async () => {
    const match = {
      params: {
        id: "demoId"
      }
    };
    let expectedCount = history.length + 1;
    const wrapper = shallow(
      <PipeLineList
        history={history}
        match={match}
        getPipelineList={getPipelineList}
        managePlantList={managePlantList}
        pipelineDeleteHandler={pipelineDeleteHandler}
        manageGetAlarmList={manageGetAlarmList}
      />
    );
    let backbutton = wrapper.find("button.btn-transparent").first();
    expect(backbutton.length).toBe(1);
    backbutton.simulate("click");
    expect(history.length + 1).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/");
  });

  // it("clicking detail button trigger onClick event", async () => {
  //   const match = {
  //     params: {
  //       id: "demoId"
  //     },
  //   };
  //   const fetchpipeLineList=[{
  //         _id: "8fdc4e0aac6811e994a00242ac110019"
  //     }]
  //   let expectedCount = history.length + 1;
  //   const wrapper = shallow(
  //     <PipeLineList
  //       history={history}
  //       match={match}
  //       pipelineList={fetchpipeLineList}
  //       getPipelineList={getPipelineList} 
  //     />
  //   );
  //   wrapper.setProps({ pipelineList: pipelineList});
  //   let viewDetails = wrapper.find("button.text-orange");
  //   viewDetails.simulate("click");
  //   expect(viewDetails.length).toBe(1);
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/pipeLineDetail/demoId/"+pipelineList[0]._id);
  // });
  // it("clicking show pipeline trigger onClick event", async () => {
  //     const match = {
  //         params: {
  //           id: "demoId"
  //         }
  //       };
  //     let expectedCount = history.length + 1
  //     const wrapper = shallow(
  //       <PipeLineList
  //         history={history}
  //         match={match}
  //         pipelineList=""
  //         getPipelineList={getPipelineList}
  //       />
  //     );
  //     wrapper.setProps({ pipelineList: pipelineList});
  //     let viewDetails = wrapper.find("button.text-success");
  //     expect(viewDetails.length).toBe(1);
  //     viewDetails.simulate('click');
  //     expect(history.length).toEqual(expectedCount);
  //     expect(history.location.pathname).toEqual("/pipeLineView/demoId/"+pipelineList[0]._id);
  // });
  // it("clicking edit pipeline trigger onClick event", async () => {

  //   let expectedCount = history.length + 1;
  //   const fetchpipeLineList=[{
  //     _id: "8fdc4e0aac6811e994a00242ac110019"
  //   }]

  //   const wrapper = shallow(
  //     <PipeLineList
  //       history={history}
  //       match={match}
  //       pipelineList= {fetchpipeLineList}
  //       getPipelineList={getPipelineList}
  //     />
  //   );
  //   wrapper.setProps({ pipelineList: pipelineList});
  //   let createButton = wrapper.find("button.text-primary").first();
  //   createButton.simulate("click");
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/addOrEditPipeLine/demoId/"+pipelineList[0]._id);
  // });

  //   it("clicking delete pipeline trigger onClick event", async () => {
  //     const match = {
  //       params: {
  //         id: "demoId"
  //       }
  //     };
  //     let expectedCount = history.length + 1;
  //     const wrapper = shallow(
  //       <PipeLineList
  //         history={history}
  //         match={match}
  //         pipelineList=""
  //         getPipelineList={getPipelineList}
  //       />
  //     );
  //     wrapper.setProps({ pipelineList: pipelineList});
  //     let viewDetails = wrapper.find("button.btn-danger");
  //     viewDetails.simulate("click");
  //     expect(viewDetails.length).toBe(1);
  //     expect(history.length).toEqual(expectedCount);
  //     expect(history.location.pathname).toEqual("/pipelineDeleteHandler/demoId/");
  //   });

  it("test componentWillMount", async () => {
    const match = {
      params: {
        id: "demoId"
      }
    };
    const getPipelineList = jest.fn();
    spyOn(PipeLineList.prototype, "componentWillMount").and.callThrough();
    shallow(
      <PipeLineList
        history={history}
        match={match}
        getPipelineList={getPipelineList}
        managePlantList={managePlantList}
      />
    );
    expect(PipeLineList.prototype.componentWillMount).toHaveBeenCalledTimes(1);
  });

  it("test component will recieve props", async () => {
    const getPipelineList = jest.fn();
    spyOn(
      PipeLineList.prototype,
      "componentWillReceiveProps"
    ).and.callThrough();
    const wrapper = shallow(
      <PipeLineList
        history={history}
        match={match}
        getPipelineList={getPipelineList}
        managePlantList={managePlantList}
        manageGetAlarmList={manageGetAlarmList}
        pipelineDeleteHandler={pipelineDeleteHandler}
        pipelineList=""
        pipelineListFailure=""
        pipeLineDelete=""
        pipelineDeletedSuccess=""
        pipeLineDeleteFailure=""
        plantList=""
        plantListFailure=""
        getAlarmList=""
        getAlarmListFailure=""

      />
    );
    wrapper.setProps({
      pipelineList,
      pipelineListFailure,
      pipeLineDelete,
      pipelineDeletedSuccess,
      pipeLineDeleteFailure,
      plantList,
      plantListFailure,
      getAlarmList,
      getAlarmListFailure
    });
    expect(
      PipeLineList.prototype.componentWillReceiveProps
    ).toHaveBeenCalledTimes(1);
  });

  it("Function testing on mapDispatchToProps", () => {
    const payload = "demo";
    const mockParams = {
      params: {
        plantId: "plantId",
        pipeId: "pipelineId",
        limit: "demo",
        offset: "demo"
      }
    };
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getPipelineList(mockParams.params.plantId);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: GET_PIPELINE_LIST,
      id: "plantId"
    });

    mapDispatchToProps(dispatch).pipelineDeleteHandler(mockParams.params.plantId, mockParams.params.pipeId);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: DELETE_PIPELINE,
      plantId: "plantId",
      pipeId: "pipelineId"
    });

    mapDispatchToProps(dispatch).managePlantList();
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: GET_PLANT_LIST,
    });

    mapDispatchToProps(dispatch).manageGetAlarmList(mockParams.params.plantId, mockParams.params.limit, mockParams.params.offset);
    expect(dispatch.mock.calls[3][0]).toEqual({
      type: GET_ALARM_LIST,
      plantId: "plantId",
      limit: "demo",
      offset: "demo"
    });

  });
});
