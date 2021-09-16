import React from 'react';
import { shallow } from 'enzyme';

import Contact from '../index';

describe('< Contact />', () => {
    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    it("test render case", async () => {
        spyOn(Contact.prototype, 'render').and.callThrough();
        const wrapper = shallow(<Contact />);
        expect(Contact.prototype.render).toHaveBeenCalledTimes(1);
    });
});