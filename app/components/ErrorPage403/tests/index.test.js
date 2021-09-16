import React from 'react';
import { shallow } from 'enzyme';

import ErrorPage403 from '../index';

describe('< ErrorPage403 />', () => {

    it('should test render', () => {
        spyOn(ErrorPage403.prototype, 'render').and.callThrough();
        const history = {
            location: {
                state: {}
            }
        }
        const wrapper = shallow(<ErrorPage403 history={history}  />);
        expect(wrapper).toBeDefined();
        expect(ErrorPage403.prototype.render).toHaveBeenCalledTimes(1);
    })
});