import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import Licence from '../index';

describe('< Licence />', () => {
    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    it("test render case", async () => {
        spyOn(Licence.prototype, 'render').and.callThrough();
        const wrapper = shallow(<Licence />);
        expect(Licence.prototype.render).toHaveBeenCalledTimes(1);
    });
});