import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import history from "utils/history";
import { getMenu, navlistSaveHandler } from "../actions";
import { GET_MENU_REQUEST, MENU_SAVE_HANDLER } from "../constants";
import { ManageNavigation, mapDispatchToProps } from "../index";

const navList = [
    {
      _id: "9bed0d5ca79011e9863a0242ac110016",
      plantId: "9bed0d5ca79011e9863a0242ac110016",
      type:"demo",
      childVisibility:false,
      posit: 1,
      subMenus:["demo"]
    }];

describe('< ManageNavigation />', () => {
    const match = {
        params: {
            payload: "demo"
        }
    };
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('match snapshots', () => {
        const wrap = shallow(<ManageNavigation match={match} getMenu={getMenu} />)
        expect(wrap).toMatchSnapshot()
    })

    it("test componentWillMount", async () => {
        const fetchZonesList = jest.fn();
        spyOn(ManageNavigation.prototype, "componentDidMount").and.callThrough();
        shallow(
            <ManageNavigation
                match={match}
                getMenu={getMenu}
            />
        );
        expect(ManageNavigation.prototype.componentDidMount).toHaveBeenCalledTimes(1);
        expect(fetchZonesList).toHaveBeenCalledTimes(0);
    });

    it("Function testing on mapDispatchToProps", () => {
        const mockParams = {
          params: {
            payload: "demo"
          }
        };
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getMenu();
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: GET_MENU_REQUEST
        });
        mapDispatchToProps(dispatch).navlistSaveHandler(
            mockParams.params.payload
        );
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: MENU_SAVE_HANDLER,
          payload: "demo"
        });
    });
});