import React from "react";
import { shallow } from "enzyme";
import history from "utils/history";
import { ManageRolePermission, mapDispatchToProps } from '../index';
import { onSubmitHandler,getRoleDetails, getPermissions, getEntitlements} from '../actions';
import { ON_SUBMIT_REQUEST, GET_ROLE_DETAILS, GET_PERMISSIONS, GET_ENTITLEMENTS } from '../constants';

const List = [
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

describe('< ManageRolePermission />', () => {

    const match = {
        params: {
            id: ""
        }
    }

    it("Function testing on mapDispatchToProps", () => {
        const mockParams = {
          params: {
            id: "demo",
            payload: "demo"
          }
        };
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onSubmitHandler(
          mockParams.params.payload, mockParams.params.payload
        );
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ON_SUBMIT_REQUEST,
          payload: "demo",
          id: "demo"
        });
        mapDispatchToProps(dispatch).getRoleDetails(
          mockParams.params.id
        );
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: GET_ROLE_DETAILS,
          id: "demo"
        });
        mapDispatchToProps(dispatch).getPermissions();
        expect(dispatch.mock.calls[2][0]).toEqual({
            type: GET_PERMISSIONS
        });
        mapDispatchToProps(dispatch).getEntitlements();
        expect(dispatch.mock.calls[3][0]).toEqual({
            type: GET_ENTITLEMENTS
        });
    });

    it("test edit case", async () => {
      spyOn(ManageRolePermission.prototype, "componentDidMount").and.callThrough();
      const wrapper = shallow(
        <ManageRolePermission
          match={match}
          getPermissions={getPermissions}
        />
      );
      expect(ManageRolePermission.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    });
});