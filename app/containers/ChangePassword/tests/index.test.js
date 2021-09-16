import React from 'react';
import { shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import { ChangePassword, mapDispatchToProps } from '../index';
import { CHANGE_PASSWORD_REQUEST } from "../constants";

describe('< ChangePassword />', () => {
    it('Function testing on mapDispatchToProps', () => {
        const dispatch = jest.fn();
        const payload = "demo"
        mapDispatchToProps(dispatch).changePasswordHandler(payload);
        expect(dispatch.mock.calls[0][0]).
        toEqual({ 
          type: CHANGE_PASSWORD_REQUEST,
          payload: 'demo'
        })
      });
});