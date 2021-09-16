import React from 'react';
import { shallow } from 'enzyme';
import { MappingList, mapDispatchToProps, mapStateToProps } from '../index';
import { fetchMappingsList, getAgentDetails, deleteConfirm, saveMapping, managePlantList, managePipelineList } from '../actions';
import { GET_MAPINGS, GET_AGENT, DELETE_MAPPING, SAVE_MAPPINGS, GET_PIPELINELIST, GET_PLANTLIST } from "../constants";
import history from 'utils/history';
const match = {
  params: {
    id: "demo",
    mappingId: "demo",
    payload: "demo"
  }
}

describe('< MappingList />', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });

  // it('match snapshots', () => {
  //     const wrap = shallow(<MappingList fetchMappingsList={fetchMappingsList} 
  //         getAgentDetails={getAgentDetails} />)
  //     expect(wrap).toMatchSnapshot()
  // })

  it("test componentWillMount", async () => {
    const match = {
      params: {
        id: "demoId"
      }
    };
    const fetchMappingsList = jest.fn();
    const getAgentDetails = jest.fn();
    const managePlantList = jest.fn();
    const managePipelineList = jest.fn();
    spyOn(MappingList.prototype, "componentWillMount").and.callThrough();
    shallow(
      <MappingList
        history={history}
        match={match}
        fetchMappingsList={fetchMappingsList}
        getAgentDetails={getAgentDetails}
        managePlantList={managePlantList}
        managePipelineList={managePipelineList}

      />
    );
    expect(MappingList.prototype.componentWillMount).toHaveBeenCalledTimes(1);
    expect(fetchMappingsList).toHaveBeenCalledTimes(1);
    expect(getAgentDetails).toHaveBeenCalledTimes(1);
    expect(managePlantList).toHaveBeenCalledTimes(1);
    expect(managePipelineList).toHaveBeenCalledTimes(1);
  });

  it('Function testing on mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchMappingsList(match.params.id);
    expect(dispatch.mock.calls[0][0]).
      toEqual({
        type: GET_MAPINGS,
        id: "demo"
      })
    mapDispatchToProps(dispatch).getAgentDetails(match.params.id);
    expect(dispatch.mock.calls[1][0]).
      toEqual({
        type: GET_AGENT,
        id: "demo",
      })
    mapDispatchToProps(dispatch).deleteConfirm(match.params.id, match.params.mappingId);
    expect(dispatch.mock.calls[2][0]).
      toEqual({
        type: DELETE_MAPPING,
        id: "demo",
        mappingId: "demo"
      })
    mapDispatchToProps(dispatch).saveMapping(match.params.payload, match.params.id);
    expect(dispatch.mock.calls[3][0]).
      toEqual({
        type: SAVE_MAPPINGS,
        payload: "demo",
        id: "demo"
      })
    mapDispatchToProps(dispatch).managePipelineList();
    expect(dispatch.mock.calls[4][0]).
      toEqual({
        type: GET_PIPELINELIST
      })
    mapDispatchToProps(dispatch).managePlantList();
    expect(dispatch.mock.calls[5][0]).
      toEqual({
        type: GET_PLANTLIST
      })
  });
});