import React, { Component } from 'react';
import { shallow } from 'enzyme';
import history from "utils/history";
import {
  managePlantList,
  getAlarmType,
  apiApplyFilters,
  alarmStatusChangeHandler,
  getAlarmDetails,
  getAlarmCategory,
  managePipelineList
} from "../actions";
import {
  GET_PLANTLIST,
  GET_PIPELINELIST,
  GET_ALARM_TYPE,
  GET_FILTERED_DATA,
  ALARM_STATUS_CHANGE,
  GET_ALARM_DETAILS,
  GET_ALARM_CATEGORY
} from "../constants";
import { ManageAlarmsAndAlerts, mapDispatchToProps } from "../index";

describe('< ManageAlarmsAndAlerts />', () => {

  it('Function testing on mapDispatchToProps', () => {

    const filters = "demo"
    const limit = "demo"
    const offset = "demo"
    const pipelineId = "demo"
    const payload = "demo"
    const seqId = "demo"
    const plantId = "demo"

    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).managePlantList();
    expect(dispatch.mock.calls[0][0]).
      toEqual({
        type: GET_PLANTLIST,
      })

    mapDispatchToProps(dispatch).getAlarmType();
    expect(dispatch.mock.calls[1][0]).
      toEqual({
        type: GET_ALARM_TYPE,
      })

    mapDispatchToProps(dispatch).apiApplyFilters(filters, plantId, pipelineId, limit, offset);
    expect(dispatch.mock.calls[2][0]).
      toEqual({
        type: GET_FILTERED_DATA,
        filters : "demo", 
        plantId : "demo", 
        pipelineId : "demo", 
        limit : "demo", 
        offset : "demo"
      })

    mapDispatchToProps(dispatch).alarmStatusChangeHandler((payload, seqId, plantId));
    expect(dispatch.mock.calls[3][0]).
      toEqual({
        type: ALARM_STATUS_CHANGE,
        payload: "demo",
        plantId: undefined,
        seqId: undefined
      })

    mapDispatchToProps(dispatch).getAlarmDetails(plantId, seqId);
    expect(dispatch.mock.calls[4][0]).
      toEqual({
        type: GET_ALARM_DETAILS,
        plantId: "demo",
        seqId: "demo"
      })

    mapDispatchToProps(dispatch).getAlarmCategory();
    expect(dispatch.mock.calls[5][0]).
      toEqual({
        type: GET_ALARM_CATEGORY,
      })

    mapDispatchToProps(dispatch).managePipelineList();
    expect(dispatch.mock.calls[6][0]).
      toEqual({
        type: GET_PIPELINELIST,
      })

  });


  it("test componentDidMount", async () => {
    const match = {
      params: {
        id: "demo",
        payload: "demo"
      }
    };
    spyOn(ManageAlarmsAndAlerts.prototype, "componentDidMount").and.callThrough();
    shallow(<ManageAlarmsAndAlerts
      match={match}
      managePlantList={managePlantList}
      apiApplyFilters={apiApplyFilters}
      alarmStatusChangeHandler={alarmStatusChangeHandler}
      getAlarmDetails={getAlarmDetails}
      getAlarmCategory={getAlarmCategory}
      managePipelineList={managePipelineList}
      getAlarmType={getAlarmType} />
    );
    expect(ManageAlarmsAndAlerts.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });
});