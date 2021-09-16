import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import Loader from '../index';

describe('< Loader />', () => {
    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    it("test render case", async () => {
        spyOn(Loader.prototype, 'render').and.callThrough();
        const wrapper = shallow(<Loader />);
        expect(Loader.prototype.render).toHaveBeenCalledTimes(1);
    });
});