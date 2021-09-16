import React, { Component } from 'react';
import { shallow } from 'enzyme';
import history from "utils/history";
import { getMenus, getAllMenus, saveMenu } from "../actions";
import { GET_MENUS, GET_ALL_MENUS, SAVE_MENUS } from "../constants";
import { ManageRoleNavigation, mapDispatchToProps } from "../index";

const list = [
    {
      _id: "9bed0d5ca79011e9863a0242ac110016",
      createdAt: 1563257514466,
      name: "edfedeefdf",
      other: "fvcerdfedfv",
      overallGeometry: "dfe3dfedc",
      plantId: "f29b79c09f0911e986810242ac110011",
      processFluid: "efe3dcfed",
      updatedAt: 1563257547048
    }
  ];

describe('< ManageRoleNavigation />', () => {

    const match = {
        params: {
            roleId: ""
        }
    }

    it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
    });

    it('should test component when render', () => {
        spyOn(ManageRoleNavigation.prototype, 'render').and.callThrough();
        const wrapper = shallow(<ManageRoleNavigation getMenus={getMenus} match={match} />);
        expect(wrapper).toBeDefined();
        expect(ManageRoleNavigation.prototype.render).toHaveBeenCalledTimes(1);
    })

    it('match snapshots', () => {
        const wrap = shallow(<ManageRoleNavigation match={match} getMenus={getMenus} />)
        expect(wrap).toMatchSnapshot()
    })

    it("test componentWillMount", async () => {
        const match = {
            params: {
                roleId: "demo"
            }
        };
        const fetchList = jest.fn();
        spyOn(ManageRoleNavigation.prototype, "componentWillMount").and.callThrough();
        shallow(
            <ManageRoleNavigation
                match={match}
                getMenus={getMenus}
            />
        );
        expect(ManageRoleNavigation.prototype.componentWillMount).toHaveBeenCalledTimes(1);
        expect(fetchList).toHaveBeenCalledTimes(0);
    });

    it('should test component when recieve props', () => {
        spyOn(ManageRoleNavigation.prototype, 'componentWillReceiveProps').and.callThrough();
        const wrapper = shallow(<ManageRoleNavigation getMenus={getMenus} match={match} list={undefined} listError={undefined} deleteSuccess={undefined} deleteFailure={undefined} />);
        expect(wrapper).toBeDefined();
        wrapper.setState({ list });
        wrapper.setProps({ list, listError: "No Error Found.", deleteSuccess: "bb157d6738bb4886b77fd25635301010", deleteFailure: "No Error Found in delete." });
        expect(ManageRoleNavigation.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
    })

    it("Function testing on mapDispatchToProps", () => {
        const mockParams = {
          params: {
            id: "demo",
            payload: "demo"
          }
        };
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getMenus(
          mockParams.params.id
        );
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: GET_MENUS,
          id: "demo"
        });
        mapDispatchToProps(dispatch).getAllMenus();
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: GET_ALL_MENUS
        });
        mapDispatchToProps(dispatch).saveMenu(
            mockParams.params.id,mockParams.params.payload
          );
          expect(dispatch.mock.calls[2][0]).toEqual({
            type: SAVE_MENUS,
            id: "demo",
            payload: "demo"
        });
    });

});