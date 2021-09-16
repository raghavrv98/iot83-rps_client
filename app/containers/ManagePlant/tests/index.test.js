import React, { Component } from 'react';
import { shallow } from 'enzyme';
import history from "utils/history";
import { managePlantList, deleteHandler } from "../actions";
import { GET_PLANTLIST, DELETE_PLANT } from "../constants";
import { ManagePlant, mapDispatchToProps } from "../index";

const plantList = [
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

describe('< ManagePlant />', () => {

    const match = {
        params: {
            id: ""
        }
    };

    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('match snapshots', () => {
        const wrap = shallow(<ManagePlant match={match} managePlantList={managePlantList} history={history}/>)
        expect(wrap).toMatchSnapshot()
    })

    it("test componentWillMount", async () => {
        const match = {
            params: {
                id: "demoId"
            }
        };
        const managePlantList = jest.fn();
        spyOn(ManagePlant.prototype, "componentWillMount").and.callThrough();
        shallow(
            <ManagePlant
                history={history}
                match={match}
                managePlantList={managePlantList}
            />
        );
        expect(ManagePlant.prototype.componentWillMount).toHaveBeenCalledTimes(1);
        expect(managePlantList).toHaveBeenCalledTimes(1);
    });

    it('should test component when recieve props', () => {
        spyOn(ManagePlant.prototype, 'componentWillReceiveProps').and.callThrough();
        const wrapper = shallow(<ManagePlant managePlantList={managePlantList} list={undefined} listError={undefined} deleteSuccess={undefined} deleteFailure={undefined} />);
        expect(wrapper).toBeDefined();
        wrapper.setState({ plantList });
        wrapper.setProps({ list: plantList, listError: "No Error Found.", deleteSuccess: "bb157d6738bb4886b77fd25635301010", deleteFailure: "No Error Found in delete." });
        expect(ManagePlant.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
    })

    // it("clicking add button trigger onClick event", async () => {
    //     let expectedCount = history.length + 1
    //     const wrapper = shallow(<ManagePlant managePlantList={managePlantList} history={history} />);
    //     let addButton = wrapper.find("button.btn.btn-create");
    //     expect(addButton.length).toBe(1);
    //     addButton.simulate('click');
    //     expect(history.length).toEqual(expectedCount);
    //     expect(history.location.pathname).toEqual("/addOrEditPlant");
    //   });

      it("Function testing on mapDispatchToProps", () => {
        const mockParams = {
          params: {
            id: "demo"
          }
        };
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).managePlantList();
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: GET_PLANTLIST
        });
        mapDispatchToProps(dispatch).deleteHandler(
          mockParams.params.id
        );
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: DELETE_PLANT,
          id: "demo"
        });
      });
});