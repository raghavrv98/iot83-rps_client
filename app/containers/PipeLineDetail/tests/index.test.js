import React from 'react';
import { shallow, mount } from 'enzyme';
import { PipeLineDetail, mapDispatchToProps } from '../index';
import { getPipelineDetails, savePipelineDetails, deleteFileHandler, getPipelineBasicDetails } from '../actions';
import { GET_PIPELINES, SAVE_DETAILS, DELETE_DETAILS, FETCH_DETAILS } from "../constants";
import history from 'utils/history';
import { pipelinesDetails } from '../selectors';

describe('< PipeLineDetail />', () => {

    const match = {
        params: {
            plantId: "demo",
            pipelineId: "demo",
            fileDetails: "demo",
            id: "demo"
        }
    }
    
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it("test componentWillMount", async () => {
        const match = {
            params: {
                plantId: "demo",
                pipelineId: "demo",
                fileDetails: "demo",
            }
        }
        const getPipelineDetails = jest.fn();
        spyOn(PipeLineDetail.prototype, "componentWillMount").and.callThrough();
        shallow(
            <PipeLineDetail
                match={match}
                getPipelineDetails={getPipelineDetails}
            />
        );
        expect(PipeLineDetail.prototype.componentWillMount).toHaveBeenCalledTimes(1);
        expect(getPipelineDetails).toHaveBeenCalledTimes(1);
    });

    it("clicking add button trigger onClick event", async () => {
        let expectedCount = history.length + 1
        const wrapper = shallow(<PipeLineDetail getPipelineDetails={getPipelineDetails} history={history} match={match} />);
        let addButton = wrapper.find("button.btn.btn-transparent");
        expect(addButton.length).toBe(1);
        addButton.simulate('click');
        expect(history.length + 1).toEqual(expectedCount);
        expect(history.location.pathname).toEqual("/");
    });

    it("Function testing on mapDispatchToProps", () => {
        const mockParams = {
          params: {
            id: "demo"
          }
        };
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPipelineDetails(match.params.plantId,match.params.pipelineId);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: GET_PIPELINES,
          plantId: "demo",
          pipelineId: "demo"
        });
        mapDispatchToProps(dispatch).savePipelineDetails(
          match.params.fileDetails
        );
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: SAVE_DETAILS,
          fileDetails: "demo"
        });
        mapDispatchToProps(dispatch).deleteFileHandler(
            match.params.plantId,match.params.pipelineId
        );
        expect(dispatch.mock.calls[2][0]).toEqual({
            type: DELETE_DETAILS,
            plantId: "demo",
            pipelineId: "demo"
        });
    });
});