import React from 'react';
import { shallow } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import { ManageUsers, mapDispatchToProps } from '../index';
import { getUserList, deleteHandler } from '../actions';
import { GET_LIST, DELETE_REQUEST } from "../constants";
import history from 'utils/history';
const mockGroupList = {
  "totalCount": 1,
  "objects": [
    {
      "id": "bb157d6738bb4886b77fd25635301010",
      "firstName": "Skidanenko",
      "lastName": "Constantine",
      "email": "admin@pmmp.com",
      "company": "PMMP.",
      "userRole": [
        {
          "id": "c2278f01c66b4ebcb67c8bad7f273c6c",
          "role": {
            "id": "e9ef98a8afaf4b06b1942159b8418e3a",
            "name": "SYSTEM_ADMIN",
            "type": "SYSTEM_ROLE"
          }
        }
      ],
      "compartment": [
        {
          "id": "9f1c2f19a97d4a01bebec08ddd206fe2",
          "name": "DEFAULT",
          "description": "Default container"
        }
      ],
      "name": "Skidanenko Constantine",
      "internalUser": true,
      "enabled": true
    }
  ]
}

describe('<ManageUsers />', () => {

  it('should test component when render', () => {
    spyOn(ManageUsers.prototype, 'render').and.callThrough();
    const wrapper = shallow(<ManageUsers getUserList={getUserList} list={mockGroupList} />);
    expect(wrapper).toBeDefined();
    expect(ManageUsers.prototype.render).toHaveBeenCalledTimes(2);
  })

  it('should test component when recieve props', () => {
    spyOn(ManageUsers.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<ManageUsers getUserList={getUserList} list={undefined} listError={undefined} deleteSuccess={undefined} deleteFailure={undefined} />);
    expect(wrapper).toBeDefined();
    wrapper.setState({ userList: mockGroupList });
    wrapper.setProps({ list: mockGroupList, listError: "No Error Found.", deleteSuccess: "bb157d6738bb4886b77fd25635301010", deleteFailure: "No Error Found in delete." });
    expect(ManageUsers.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  })

  // it("clicking add button trigger onClick event", async () => {
  //   let expectedCount = history.length + 1
  //   const wrapper = shallow(<ManageUsers getUserList={getUserList} history={history} />);
  //   let addButton = wrapper.find("button.btn.btn-create");
  //   expect(addButton.length).toBe(1);
  //   addButton.simulate('click');
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/addOrEditUser");
  // });

  it('match snapshots', () => {
    const wrap = shallow(<ManageUsers deleteHandler={deleteHandler} getUserList={getUserList} />)
    expect(wrap).toMatchSnapshot()
  })

  it("Function testing on mapDispatchToProps", () => {
    const mockParams = {
      params: {
        id: "demo",
        payload: "demo"
      }
    };
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getUserList(
      mockParams.params.payload
    );
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: GET_LIST,
      payload: "demo"
    });
    mapDispatchToProps(dispatch).deleteHandler(
      mockParams.params.id
    );
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: DELETE_REQUEST,
      id: "demo"
    });
  });
});
