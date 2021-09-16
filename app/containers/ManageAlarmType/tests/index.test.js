import React, { Component } from 'react';
import { shallow } from 'enzyme';
import history from "utils/history";
import { getAlarmType, getAlarmCategory } from "../actions";
import { GET_ALARM_TYPE, ADD_ALARM_TYPE, GET_ALARM_CATEGORY } from "../constants";
import { ManageAlarmType, mapDispatchToProps } from "../index";
const alarmList = [
  {
    _id: "9bed0d5ca79011e9863a0242ac110016",
    createdAt: 1563257514466,
    name: "edfedeefdf",
    other: "fvcerdfedfv",
    overallGeometry: "dfe3dfedc",
    plantId: "f29b79c09f0911e986810242ac110011",
    processFluid: "efe3dcfed",
    updatedAt: 1563257547048
  }
];

describe('< ManageAlarmType />', () => {

  it('should test component when render', () => {
    spyOn(ManageAlarmType.prototype, 'render').and.callThrough();
    const wrapper = shallow(<ManageAlarmType getAlarmType={getAlarmType} getAlarmCategory={getAlarmCategory} list={alarmList} />);
    expect(wrapper).toBeDefined();
    expect(ManageAlarmType.prototype.render).toHaveBeenCalledTimes(1);
  })

  it('should test component when recieve props', () => {
    spyOn(ManageAlarmType.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<ManageAlarmType
      getAlarmType={getAlarmType}
      getAlarmCategory={getAlarmCategory}
      list={undefined}
      listError={undefined}
      deleteSuccess={undefined}
      deleteFailure={undefined}
      getAlarmsCategorySuccess={undefined}
      getAlarmsCategoryFailure={undefined}
    />);
    expect(wrapper).toBeDefined();
    wrapper.setState({ alarmList });
    wrapper.setProps({
      list: alarmList,
      listError: "No Error Found.",
      deleteSuccess: "bb157d6738bb4886b77fd25635301010",
      deleteFailure: "No Error Found in delete.",
      getAlarmsCategorySuccess: [],
      getAlarmsCategoryFailure: "No Error Found in alarm category."
    });
    expect(ManageAlarmType.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  })

  it('match snapshots', () => {
    const wrap = shallow(<ManageAlarmType getAlarmType={getAlarmType} getAlarmCategory={getAlarmCategory} />)
    expect(wrap).toMatchSnapshot()
  })

  it("Function testing on mapDispatchToProps", () => {
    const mockParams = {
      params: {
        payload: "demo",
      }
    };
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getAlarmType();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: GET_ALARM_TYPE
    });

    mapDispatchToProps(dispatch).addAlarmType(mockParams.params.payload);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: ADD_ALARM_TYPE,
      payload: "demo"
    });

    mapDispatchToProps(dispatch).getAlarmCategory();
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: GET_ALARM_CATEGORY
    });

  });

  it("test componentWillMount", async () => {
    const match = {
      params: {
        types: "demo"
      }
    };
    const fetchAlarmList = jest.fn();
    spyOn(ManageAlarmType.prototype, "componentWillMount").and.callThrough();
    shallow(
      <ManageAlarmType
        match={match}
        getAlarmType={getAlarmType}
        getAlarmCategory={getAlarmCategory}
      />
    );
    expect(ManageAlarmType.prototype.componentWillMount).toHaveBeenCalledTimes(1);
    expect(fetchAlarmList).toHaveBeenCalledTimes(0);
  });
});