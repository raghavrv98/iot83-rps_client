import React from "react";
import { shallow} from "enzyme";
import history from "utils/history";
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import { passwordRequestList } from "../actions";
import { ManagePasswordRequest,mapDispatchToProps } from "../index";
import { PASSWORDREQUESTLIST,PASSWORDREQUESTLIST_SUCCESS,PASSWORDREQUESTLIST_FAILURE } from '../constants';
// import { ManagePasswordRequest } from '../index';

const match = {
    params: {
      id: ""
    }
  };

describe('< ManagePasswordRequest />', () => {
it('Expect to have unit tests specified', () => {
expect(true).toEqual(true);
});
// it("clicking submit button trigger onClick event", async () => {
//    const passwordRequestList = jest.fn();
//    const wrapper = shallow(<ManagePasswordRequest history={history} match={match} passwordRequestList={passwordRequestList} />);
//    let handelaproval = wrapper.find('[data-test="approve"]');
//    expect(handelaproval.length).toBe(1);
//    // expect(wrapper.find("[data-test='approve']")).to.have.lengthOf(1);
//    // addOrEditForm.simulate('submit', { preventDefault() { } });
//    // expect(onSubmitHandlerSpy).toHaveBeenCalledTimes(1);
//   });

it("test componentDidMount", async () => {
  const match = {
      params: {
          id: "demo",
           payload : "demo"
      }
  };
  const passwordRequestList = jest.fn();
  spyOn(ManagePasswordRequest.prototype, "componentDidMount").and.callThrough();
  shallow(
      <ManagePasswordRequest
          match={match}
          passwordRequestList={passwordRequestList}
      />
  );
  expect(ManagePasswordRequest.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  expect(passwordRequestList).toHaveBeenCalledTimes(1);
});

it('Function testing on mapDispatchToProps', () => {
  const payload = "demo"
  const mockParams = {
    params: {
      id: "demoId"
    }
  }
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).passwordRequestList(mockParams.params.id, payload);
  expect(dispatch.mock.calls[0][0]).
  toEqual({ 
    type: PASSWORDREQUESTLIST,
    payload:"demo",
    id:"demoId"
    })
  });
});