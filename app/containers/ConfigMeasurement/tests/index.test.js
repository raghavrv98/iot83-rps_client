import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';
import history from 'utils/history';
import { getMeasurements, processMeasurement } from '../actions';
import { GET_MEASUREMENT_LIST, PROCESS_MEASUREMENT } from "../constants";
import { ConfigMeasurement, mapDispatchToProps } from '../index';

const measurementList = [
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

const match = {
  params: {
    id: "demoId"
  }
};

describe('< ConfigMeasurement />', () => {

  // it('match snapshots', () => {
  //   const wrap = shallow(<ConfigMeasurement getMeasurements={getMeasurements} processMeasurement={processMeasurement} />)
  //   expect(wrap).toMatchSnapshot()
  // })

  // it('should test component when render', () => {
  //   spyOn(ConfigMeasurement.prototype, 'render').and.callThrough();
  //   const wrapper = shallow(<ConfigMeasurement getMeasurements={getMeasurements} processMeasurement={processMeasurement} list={measurementList} />)
  //   expect(wrapper).toBeDefined();
  //   expect(ConfigMeasurement.prototype.render).toHaveBeenCalledTimes(1);
  // })

  it("test componentWillMount", async () => {
    const match = {
      params: {
        id: "demoId"
      }
    };

    spyOn(ConfigMeasurement.prototype, "componentWillMount").and.callThrough();
    shallow(<ConfigMeasurement getMeasurements={getMeasurements} processMeasurement={processMeasurement} match={match} />)
    expect(ConfigMeasurement.prototype.componentWillMount).toHaveBeenCalledTimes(1);
  });

  // it('should test component when recieve props', () => {
  //   spyOn(ConfigMeasurement.prototype, 'componentWillReceiveProps').and.callThrough();
  //   const wrapper = shallow(<ConfigMeasurement
  //     getMeasurements={getMeasurements}
  //     processMeasurement={processMeasurement}
  //     measurementList={undefined}
  //     measurementListError={undefined}
  //     deleteSuccess={undefined}
  //     deleteFailure={undefined}
  //   />)

  //   expect(wrapper).toBeDefined();
  //   wrapper.setState({ measurementList });
  //   wrapper.setProps({
  //     list: measurementList,
  //     listError: "No Error Found.",
  //     deleteSuccess: "9bed0d5ca79011e9863a0242ac110016",
  //     deleteFailure: "No Error Found in delete.",
  //     measurementList: { result: [] },
  //     measurementListError: "No Error Found.",
  //   });
  //   expect(ConfigMeasurement.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  // })

  
  it('Function testing on mapDispatchToProps', () => {
    let id = "demo", measurementCount = "demo", offset = "demo", measureId = "demo", agentId = "demo";
    const dispatch = jest.fn();
    
    mapDispatchToProps(dispatch).getMeasurements(id, measurementCount, offset);
    expect(dispatch.mock.calls[0][0]).
      toEqual({
        type: GET_MEASUREMENT_LIST,
        measurementCount: "demo",
        id: "demo",
        offset : "demo"
      })

    mapDispatchToProps(dispatch).processMeasurement(measureId, agentId);
    expect(dispatch.mock.calls[1][0]).
      toEqual({
        type: PROCESS_MEASUREMENT,
        measureId: "demo",
        agentId: "demo"
      })

  });

});