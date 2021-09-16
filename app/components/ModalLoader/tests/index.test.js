import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import ModalLoader from '../index';

describe('< ModalLoader />', () => {it('Expect to have unit tests specified', () => {
expect(true).toEqual(true);
});

it("test render case", async () => {
    spyOn(ModalLoader.prototype, 'render').and.callThrough();
    const wrapper = shallow(<ModalLoader />);
    expect(ModalLoader.prototype.render).toHaveBeenCalledTimes(1);
});
});