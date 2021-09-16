import React from 'react';

import { shallow, mount } from 'enzyme';
// import Amchart4Chart from '../index';


describe('< Amchart4Chart />', () => {
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });
    // it("test render case", async () => {
        
    //     let sampleData = {
    //         container: "sample",
    //         sampleKey: "sampleData"
    //     }
    //     spyOn(Amchart4Chart.prototype, 'componentDidMount').and.callThrough();
    //     let g = document.createElement('div');
    //     g.setAttribute("id", "sample");
    //     const Wrapper = shallow(<Amchart4Chart data = {sampleData} id="sample"/>);
    //     expect(Wrapper).toBeDefined();
    //     expect(Amchart4Chart.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    // });
    // it("test componentDidUpdate case", async () => {
    //     let sampleData = {
    //         sampleKey: "sampleData",
    //         container: "sample"
    //     }
    //     let updatedData = {
    //         sampleKey: "updatedData",
    //         container: "update"
    //     }
    //     spyOn(Amchart4Chart.prototype, 'render').and.callThrough();
    //     const Wrapper = shallow(<Amchart4Chart data= {sampleData} id="sample"/>);
    //     Wrapper.setProps({ data: updatedData, id: "update"});
    //     expect(Amchart4Chart.prototype.componentDidUpdate).toHaveBeenCalledTimes(1);
    // });
});