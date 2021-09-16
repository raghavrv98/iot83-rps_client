import React from 'react';
import { shallow } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import MessageModal from '../index';

describe('< MessageModal />', () => {

    it('match snapshots', () => {
        const wrap = shallow(<MessageModal type="confirm" />)
        expect(wrap).toMatchSnapshot()
    })
    
    it("test children count for success or error" , () => {
        const wrap = shallow(<MessageModal type="suceess" />)
        let modalBody = wrap.find("div.modal-body");
        expect(modalBody.children().length).toBe(1);
    })

    it("test children count for confirm or error" , () => {
        const wrap = shallow(<MessageModal type="confirm" />)
        let modalBody = wrap.find("div.modal-body");
        expect(modalBody.children().length).toBe(3);
    })

    it("test function in case of confirm modal" , () => {
        const closeFunction = jest.fn();
        const confirmFunction = jest.fn();
        const wrap = shallow(<MessageModal type="confirm" onClose={closeFunction} onConfirm={confirmFunction} />)
        let closeSpan = wrap.find("span.close");
        closeSpan.simulate('click')
        expect(closeFunction.mock.calls.length).toBe(1);
        let closeButton = wrap.find("button.btn-secondary");
        closeButton.simulate('click')
        expect(closeFunction.mock.calls.length).toBe(2);
        let confirmButton = wrap.find("button.btn-danger");
        confirmButton.simulate('click')
        expect(confirmFunction.mock.calls.length).toBe(1);
    })
    it("test function in case of success modal" , () => {
        const closeFunction = jest.fn();
        const wrap = shallow(<MessageModal type="success" onClose={closeFunction} />)
        let closeSpan = wrap.find("span.close");
        closeSpan.simulate('click')
        expect(closeFunction.mock.calls.length).toBe(1);
    })
    it("test function in case of error modal" , () => {
        const closeFunction = jest.fn();
        const wrap = shallow(<MessageModal type="error" onClose={closeFunction} />)
        let closeSpan = wrap.find("span.close");
        closeSpan.simulate('click')
        expect(closeFunction.mock.calls.length).toBe(1);
    })
});