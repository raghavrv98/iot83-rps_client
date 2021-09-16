import React from 'react';
import { shallow } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import { mapDispatchToProps, ManageRoles } from '../index';
import { getRolesList } from '../actions'
import { GET_LIST ,DELETE_REQUEST} from "../constants";
import history from 'utils/history';
const mockGroupList = [
  {
    "id": "9f1c2f19a97d4a01bebec08ddd206fe2",
    "name": "DEFAULT",
    "description": "Default container",
    "mqttConnectionId": null,
    "devices": 0
  }
]

describe('<ManageRoles />', () => {
  it('should test component when recieve props', () => {
    spyOn(ManageRoles.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<ManageRoles getRolesList={getRolesList} list={undefined} listError={undefined} />);
    expect(wrapper).toBeDefined();
    wrapper.setProps({ list: mockGroupList, listError: "No Error Found." });
    expect(ManageRoles.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  })

  // it("clicking add button trigger onClick event", async () => {
  //   let expectedCount = history.length + 1
  //   const wrapper = shallow(<ManageRoles getRolesList={getRolesList} history={history} />);
  //   let addButton = wrapper.find("button.btn-danger");
  //   expect(addButton.length).toBe(1);
  //   addButton.simulate('click');
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/addOrEditRole");
  // });

  it('Function testing on mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const payload = "demo"
    const mockParams = {
      params: {
        id: "demoId"
      }
    }
    mapDispatchToProps(dispatch).getRolesList();
    expect(dispatch.mock.calls[0][0]).
    toEqual({ 
      type: GET_LIST,
    })
    mapDispatchToProps(dispatch).deleteHandler(mockParams.params.id);
    expect(dispatch.mock.calls[1][0]).
    toEqual({
      type: DELETE_REQUEST,
      id: "demoId"
    })
  });

  it('match snapshots', () => {
    const wrap = shallow(<ManageRoles getRolesList={getRolesList} />)
    expect(wrap).toMatchSnapshot()
  })
});
