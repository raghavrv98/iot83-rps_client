import React from 'react';
import { shallow } from 'enzyme';
import { ManageGroups, mapDispatchToProps, mapStateToProps } from '../index';
import { getGroupList, deleteHandler } from '../actions';
import { GET_LIST, DELETE_REQUEST } from "../constants";
import history from 'utils/history';
const mockGroupList = [
  {
    "id": "9f1c2f19a97d4a01bebec08ddd206fe2",
    "name": "DEFAULT",
    "description": "Default container",
    "mqttConnectionId": null,
    "devices": 0
  }]

describe('<ManageGroups />', () => {

  it('should test component when recieve props', () => {
    spyOn(ManageGroups.prototype, 'componentWillReceiveProps').and.callThrough();
    const wrapper = shallow(<ManageGroups getGroupList={getGroupList} list={undefined} listError={undefined} deleteSuccess={undefined} deleteFailure={undefined} />);
    expect(wrapper).toBeDefined();
    wrapper.setState({groupList: mockGroupList})
    wrapper.setProps({ list: mockGroupList, listError: "No Error Found.", deleteSuccess: "9f1c2f19a97d4a01bebec08ddd206fe2", deleteFailure: "No Error Found in Delete" });
    expect(ManageGroups.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  })

  // it("clicking add button trigger onClick event", async () => {
  //   let expectedCount = history.length + 1;
  //   const wrapper = shallow(<ManageGroups getGroupList={getGroupList} history={history} />);
  //   let addButton = wrapper.find("button.btn.btn-create");
  //   expect(addButton.length).toBe(1);
  //   addButton.simulate('click');
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/addOrEditGroup");
  // });

  // it("clicking edit button trigger onClick event", async () => {
  //   const match = {
  //     params: {
  //         id: "demoId"
  //     }
  //   }
  //   let expectedCount = history.length + 1;
  //   const wrapper = shallow(<ManageGroups getGroupList={getGroupList} history={history} />);
  //   let addButton = wrapper.find("button.btn-transparent");
  //   expect(addButton.length).toBe(1);
  //   addButton.simulate('click');
  //   expect(history.length).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/addOrEditGroup/" + match.params.id);
  // });

  it('match snapshots', () => {
    const wrap = shallow(<ManageGroups getGroupList={getGroupList} />)
    expect(wrap).toMatchSnapshot()
  })

  it("test componentDidMount", async () => {
    const match = {
        params: {
            id: "demoId"
        }
    };
    const getGroupList = jest.fn();
    spyOn(ManageGroups.prototype, "componentDidMount").and.callThrough();
    shallow(
        <ManageGroups
            history={history}
            match={match}
            getGroupList={getGroupList}
        />
    );
    expect(ManageGroups.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    expect(getGroupList).toHaveBeenCalledTimes(1);
  });

  it("Function testing on mapDispatchToProps", () => {
    const payload = "demo";
    const mockParams = {
      params: {
        id: "demo"
      }
    };
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getGroupList();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: GET_LIST
    });
    mapDispatchToProps(dispatch).deleteHandler(mockParams.params.id);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: DELETE_REQUEST,
      id: "demo"
    });
  });
});
