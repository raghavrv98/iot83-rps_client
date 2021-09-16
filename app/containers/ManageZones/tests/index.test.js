import React, { Component } from 'react';
import { shallow, mount} from 'enzyme';
import history from "utils/history";
import { getZoneList, zoneDeleteHandler } from "../actions";
import { GET_ZONE_LIST, ZONE_DELETE } from "../constants";
import { ManageZones, mapDispatchToProps } from "../index";
const zoneList = {result:[
    {
      _id: "9bed0d5ca79011e9863a0242ac110016",
      plantId: "9bed0d5ca79011e9863a0242ac110016",
      result: "demo",
      pipelineName: "demo",
      plantName: "demo",
      CircuitId: {},
      DesignPF: {},
      DesignVolts: {},
      EndChain: {},
      FeedChain: {},
      MaintainAmps: {},
      MaintainTemp: {},
      PanelId: {},
      StartupAmps: {},
      StartupTemp: {}
    }
  ]};

describe('manageAgentsSaga Saga', () => {

    const match = {
        params: {
            plantId: "demo",
            pipelineId: "demo"
        }
    };

    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('match snapshots', () => {
        const wrap = shallow(<ManageZones match={match} getZoneList={getZoneList} history={history}/>)
        expect(wrap).toMatchSnapshot()
    })

    it("test componentWillMount", async () => {
        const fetchZonesList = jest.fn();
        spyOn(ManageZones.prototype, "componentWillMount").and.callThrough();
        shallow(
            <ManageZones
                history={history}
                match={match}
                getZoneList={getZoneList}
            />
        );
        expect(ManageZones.prototype.componentWillMount).toHaveBeenCalledTimes(1);
        expect(fetchZonesList).toHaveBeenCalledTimes(0);
    });

    it('should test component when render', () => {
        spyOn(ManageZones.prototype, 'render').and.callThrough();
        const wrapper = shallow(<ManageZones getZoneList={getZoneList} zonesList={undefined} zonesListFailure={undefined} getzonesDelete={undefined} getzoneDeleteFailure={undefined} match={match} />);
        expect(wrapper).toBeDefined();
        expect(ManageZones.prototype.render).toHaveBeenCalledTimes(1);
    })

    it('should test component when recieve props', () => {
        spyOn(ManageZones.prototype, 'componentWillReceiveProps').and.callThrough();
        const wrapper = shallow(<ManageZones getZoneList={getZoneList} match={match} zonesList={undefined} zonesListFailure={undefined} getzonesDelete={undefined} getzoneDeleteFailure={undefined} />);
        expect(wrapper).toBeDefined();
        wrapper.setState({ fetchZonesList:zoneList.result, pipelineName: zoneList.result[0].pipelineName, plantName: zoneList.result[0].plantName });
        wrapper.setProps({ zonesList: zoneList, zonesListFailure: "No Error Found.", getzonesDelete: "9bed0d5ca79011e9863a0242ac110016", getzoneDeleteFailure: "No Error Found in delete." });
        expect(ManageZones.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
    })

    it("clicking add button trigger onClick event", async () => {
        let expectedCount = history.length + 1
        const wrapper = shallow(<ManageZones getZoneList={getZoneList} history={history} match={match} />)
        wrapper.setState({ fetchZonesList:zoneList.result})
        let addButton = wrapper.find("button.btn.btn-create");
        expect(addButton.length).toBe(1);
        addButton.simulate('click');
        expect(history.length).toEqual(expectedCount);
        expect(history.location.pathname).toEqual("/addOrEditZone/"+ match.params.plantId + "/" + match.params.pipelineId);
    });

    it("clicking back button trigger onClick event", async () => {
      let expectedCount = history.length + 1;
      const wrapper = shallow(<ManageZones getZoneList={getZoneList} history={history} match={match} />);
      let backButton = wrapper.find("span.cursor-pointer");
      expect(backButton.length).toBe(1);
      backButton.simulate('click');
      expect(history.length).toEqual(expectedCount);
      expect(history.location.pathname).toEqual("/pipeLineList/"+ match.params.plantId);
    });

    it("Function testing on mapDispatchToProps", () => {
        const mockParams = {
          params: {
            plantId: "plantId",
            pipelineId: "pipelineId",
            zoneId: "zoneId",
            multiple: "multiple"
          }
        };
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getZoneList(
          mockParams.params.plantId,mockParams.params.pipelineId
        );
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: GET_ZONE_LIST,
          plantId: "plantId",
          pipelineId: "pipelineId"
        });
        mapDispatchToProps(dispatch).zoneDeleteHandler(
            mockParams.params.plantId,mockParams.params.pipelineId,mockParams.params.multiple,mockParams.params.zoneId
        );
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ZONE_DELETE,
          plantId: "plantId",
          pipelineId: "pipelineId",
          zoneId: "zoneId",
          multiple: "multiple"
        });
    });
});