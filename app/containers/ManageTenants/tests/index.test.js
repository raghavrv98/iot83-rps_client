import React, { Component } from 'react';
import { shallow } from 'enzyme';
import history from "utils/history";
import { getTenants, deleteHandler } from "../actions";
import { GET_TENANTS, DELETE_TENANT } from "../constants";
import { ManageTenants, mapDispatchToProps } from "../index";

const tenantsList = [
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

describe(' < ManageTenants />', () => {
    const match = {
        params: {
            id: ""
        }
    };
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('match snapshots', () => {
        const wrap = shallow(<ManageTenants match={match} getTenants={getTenants} history={history}/>)
        expect(wrap).toMatchSnapshot()
    })

    it("test componentDidMount", async () => {
        const match = {
            params: {
                id: "demoId"
            }
        };
        const getTenants = jest.fn();
        spyOn(ManageTenants.prototype, "componentDidMount").and.callThrough();
        shallow(
            <ManageTenants
                history={history}
                match={match}
                getTenants={getTenants}
            />
        );
        expect(ManageTenants.prototype.componentDidMount).toHaveBeenCalledTimes(1);
        expect(getTenants).toHaveBeenCalledTimes(0);
    });

    it('should test component when recieve props', () => {
        spyOn(ManageTenants.prototype, 'componentWillReceiveProps').and.callThrough();
        const wrapper = shallow(<ManageTenants getTenants={getTenants} history={history} list={undefined} listError={undefined} deleteSuccess={undefined} deleteFailure={undefined} />);
        expect(wrapper).toBeDefined();
        wrapper.setState({ userList: tenantsList });
        wrapper.setProps({ list: tenantsList, listError: "No Error Found.", deleteSuccess: "bb157d6738bb4886b77fd25635301010", deleteFailure: "No Error Found in delete." });
        expect(ManageTenants.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
      })

    // it("clicking add button trigger onClick event", async () => {
    //     let expectedCount = history.length + 2;
    //     const wrapper = shallow(<ManageTenants getTenants={getTenants} history={history} />);
    //     let addButton = wrapper.find("button.btn.btn-create");
    //     expect(addButton.length).toBe(1);
    //     addButton.simulate('click');
    //     expect(history.length).toEqual(expectedCount);
    //     expect(history.location.pathname).toEqual("/addOrEditTenant");
    // });

    it("Function testing on mapDispatchToProps", () => {
        const mockParams = {
          params: {
            id: "demo"
          }
        };
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getTenants();
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: GET_TENANTS,
        });
        mapDispatchToProps(dispatch).deleteHandler(
          mockParams.params.id
        );
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: DELETE_TENANT,
          id: "demo"
        });
    });
});