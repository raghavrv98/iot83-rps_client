import React from "react";
import { shallow} from "enzyme";
import history from "utils/history";
import { getNav, getVersion } from "../actions";
import { AddOrEditAgent,mapDispatchToProps } from "../index";
import { CREATE_AGENT_REQUEST, GET_AGENT_DETAILS } from "../constants";
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

describe('< HomePage />', () => {
it('Expect to have unit tests specified', () => {
expect(true).toEqual(true);
});
});