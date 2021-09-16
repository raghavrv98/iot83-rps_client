import React from 'react';
import { shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';
// import { changeLocale } from '../actions';
import { LocaleToggle, mapDispatchToProps } from '../index';

describe('< LocaleToggle />', () => {
    it("Expect to have unit tests specified", () => {
      expect(true).toEqual(true);
    });
    // it('should test render', () => {
    //     spyOn(LocaleToggle.prototype, 'render').and.callThrough();
    //     const wrapper = shallow(<LocaleToggle match={match}/>);
    //     expect(wrapper).toBeDefined();
    //     wrapper.setState({match})
    //     expect(LocaleToggle.prototype.render).toHaveBeenCalledTimes(1);
    // })

    // it('Function testing on mapDispatchToProps', () => {
    //     const dispatch = jest.fn();
    //     const payload = "demo"
    //     mapDispatchToProps(dispatch).onLocaleToggle(payload);
    //     expect(dispatch.mock.calls[0][0]).
    //     toEqual({ 
    //       payload: 'demo'
    //     })
    // });
});