import React from 'react';
import { shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import ErrorPage404 from '../index';

describe('< ErrorPage404 />', () => {

    it('should test render', () => {
        spyOn(ErrorPage404.prototype, 'render').and.callThrough();
        const wrapper = shallow(<ErrorPage404  />);
        expect(wrapper).toBeDefined();
        expect(ErrorPage404.prototype.render).toHaveBeenCalledTimes(1);
    })
});