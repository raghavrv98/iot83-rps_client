import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import About from '../index';

describe('< About />', () => {

    it('match snapshots', () => {
        const wrap = shallow(<About />)
        expect(wrap).toMatchSnapshot()
    })

    it("test render case", async () => {
        const mockParams = {
          params: {
            id: "demoId"
          }
        }
        spyOn(About.prototype, 'render').and.callThrough();
        const wrapper = shallow(<About />);
        expect(About.prototype.render).toHaveBeenCalledTimes(1);
    });
});