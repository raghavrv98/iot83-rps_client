import React from 'react';
import { shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';
import { onSubmitHandler, getZoneDetails, resetToInitailState } from '../actions';
import { mapDispatchToProps, AddOrEditZone } from '../index';
import { ON_SUBMIT_REQUEST, GET_ZONE_DETAILS, RESET_TO_INITIAL_STATE } from '../constants';
const match = {
	params: {
	  id: "demoId",
	  zoneId: "demo"
	}
  };

const list = {
	isLoading:true
}
describe('< AddOrEditZone />', () => {

	it('match snapshots', () => {
        const wrap = shallow(<AddOrEditZone match={match} onSubmitHandler={onSubmitHandler} resetToInitailState={resetToInitailState} getZoneDetails={getZoneDetails} />)
        expect(wrap).toMatchSnapshot()
    })

	it("test edit case", async () => {
		const resetToInitailState=jest.fn();
		spyOn(AddOrEditZone.prototype, "componentDidMount").and.callThrough();
		const getZoneDetails = jest.fn();
		const wrapper = shallow(<AddOrEditZone match={match} resetToInitailState={resetToInitailState} getZoneDetails={getZoneDetails}/>);
		wrapper.setState({list: list.isLoading})
		expect(AddOrEditZone.prototype.componentDidMount).toHaveBeenCalledTimes(1);
	});

	it('Function testing on mapDispatchToProps', () => {
		const dispatch = jest.fn();
		const payload = 'demo';
		const plantId = 'demo';
		const pipelineId = 'demo';
		const zoneId = 'demo';
		const isBulkUpload = 'demo';
		mapDispatchToProps(dispatch).onSubmitHandler(payload, plantId, pipelineId, zoneId, isBulkUpload);
		expect(dispatch.mock.calls[0][0]).toEqual({
			type: ON_SUBMIT_REQUEST,
			payload: 'demo',
			plantId: 'demo',
			pipelineId: 'demo',
			zoneId: 'demo',
			isBulkUpload: 'demo',
    });
    mapDispatchToProps(dispatch).getZoneDetails(plantId, pipelineId, zoneId);
		expect(dispatch.mock.calls[1][0]).toEqual({
			type: GET_ZONE_DETAILS,
			plantId: 'demo',
			pipelineId: 'demo',
			zoneId: 'demo',
    });
    mapDispatchToProps(dispatch).resetToInitailState();
		expect(dispatch.mock.calls[2][0]).toEqual({
			type: RESET_TO_INITIAL_STATE,
		});
	});
});
