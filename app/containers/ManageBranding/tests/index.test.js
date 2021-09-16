import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';
import {UPLOAD_LOGO_REQUEST} from '../constants';
import { ManageBranding, mapDispatchToProps } from '../index';

describe('< ManageBranding />', () => {
    it('Function testing on mapDispatchToProps', () => {
        const dispatch = jest.fn();
        const filePayload = "demo"
        mapDispatchToProps(dispatch).uploadLogo(filePayload);
        expect(dispatch.mock.calls[0][0]).
        toEqual({ 
          type: UPLOAD_LOGO_REQUEST,
          filePayload: 'demo',
        })
    });
});