import React from "react";
import { shallow} from "enzyme";
import history from "utils/history";
import { AddOrEditPipeLine, mapDispatchToProps } from "../index";
import { ON_SUBMIT_REQUEST, GET_PIPELINE_REQUEST } from "../constants";
import { onSubmitHandler,getPipelineDetails } from "../actions";

const match = {
  params: {
    id: ""
  }
};
const submitError = "this is submit success";
const submitSuccess = "this is submit error";
const pipelineDetailsSuccess = "this is pipeline details success";
const pipelineDetailsFailure = "this is pipeline details Error";

describe("<AddOrEditPipeLine />", () => {
  // test("renders clicking back button trigger onClick event error", () => {
  //   let expectedCount = history.length + 1;
  //   const resetToInitailState = jest.fn();
  //   const wrapper = shallow(
  //     <AddOrEditPipeLine
  //       history={history}
  //       match={match}
  //       resetToInitailState={resetToInitailState}
  //     />
  //   );
  //   let backbutton = wrapper.find("button.btn-transparent");
  //   expect(backbutton.length).toBe(1);
  //   backbutton.simulate("click");
  //   expect(history.length + 1).toEqual(expectedCount);
  //   expect(history.location.pathname).toEqual("/");
  // });

  it("clicking submit button trigger onClick event", async () => {
    const wrapper = shallow(<AddOrEditPipeLine history={history} match={match} onSubmitHandler={onSubmitHandler} />);
    const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'formSubmitHandler');
    wrapper.instance().forceUpdate(); 
    let addOrEditForm = wrapper.find("form.contentForm");
    expect(addOrEditForm.length).toBe(1);
    addOrEditForm.simulate('submit', {preventDefault: () => {
    }});
    expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it("clicking submit button bad low band trigger onClick event", async () => {
    const wrapper = shallow(<AddOrEditPipeLine history={history} match={match} onSubmitHandler={onSubmitHandler} />);
    const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'formSubmitHandler');
    wrapper.instance().forceUpdate();
    let addOrEditForm = wrapper.find("form.contentForm");
    expect(addOrEditForm.length).toBe(1);
    addOrEditForm.simulate('submit', {preventDefault: () => {
    }});
    expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  });

// it("clicking onChange button trigger onClick event", async () => {
//   const resetToInitailState = jest.fn();
//   const wrapper = shallow(<AddOrEditPipeLine history={history} match={match} getPipelineDetails={getPipelineDetails} />);
//   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'nameChangeHandler');
//   wrapper.instance().forceUpdate(); 
//   wrapper.find('[id="name"]').simulate('change',{target: {id: "name", value: "name"}});
//   expect(wrapper.find('[id="name"]').props().value).toEqual("name");
//   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
// });
// it("clicking onChange button trigger onClick event", async () => {
//   const resetToInitailState = jest.fn();
//   const wrapper = shallow(<AddOrEditPipeLine history={history} match={match} getPipelineDetails={getPipelineDetails} resetToInitailState={resetToInitailState} />);
//   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'nameChangeHandler');
//   wrapper.instance().forceUpdate(); 
//   wrapper.find('[id="processFluid"]').simulate('change',{target: {id: "processFluid", value: "processFluid"}});
//   expect(wrapper.find('[id="processFluid"]').props().value).toEqual("processFluid");
//   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
// });
// it("clicking onChange button trigger onClick event", async () => {
//   const resetToInitailState = jest.fn();
//   const wrapper = shallow(<AddOrEditPipeLine history={history} match={match} getPipelineDetails={getPipelineDetails} resetToInitailState={resetToInitailState} />);
//   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'nameChangeHandler');
//   wrapper.instance().forceUpdate(); 
//   wrapper.find('[id="overallGeometry"]').simulate('change',{target: {id: "overallGeometry", value: "overallGeometry"}});
//   expect(wrapper.find('[id="overallGeometry"]').props().value).toEqual("overallGeometry");
//   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
// });
// it("clicking onChange button trigger onClick event", async () => {
//   const resetToInitailState = jest.fn();
//   const wrapper = shallow(<AddOrEditPipeLine history={history} match={match} getPipelineDetails={getPipelineDetails} resetToInitailState={resetToInitailState} />);
//   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'nameChangeHandler');
//   wrapper.instance().forceUpdate(); 
//   wrapper.find('[id="other"]').simulate('change',{target: {id: "other", value: "other"}});
//   expect(wrapper.find('[id="other"]').props().value).toEqual("other");
//   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
// });
  it("test component will receive props", async () => {
    // const resetToInitailState = jest.fn();
    // let expectedCount = history.length + 1;
    spyOn(
      AddOrEditPipeLine.prototype,
      "componentWillReceiveProps"
    ).and.callThrough();
    const wrapper = shallow(
      <AddOrEditPipeLine
        history={history}
        match={match}
        onSubmitHandler={onSubmitHandler}
        submitSuccess=""
        submitError=""
        pipelineDetailsSuccess=""
        pipelineDetailsFailure=""
      />
    );
    wrapper.setProps({
      submitError,
      submitSuccess,
      pipelineDetailsSuccess,
      pipelineDetailsFailure
    });
    expect(
      AddOrEditPipeLine.prototype.componentWillReceiveProps
    ).toHaveBeenCalledTimes(1);
  });
  it("test edit case", async () => {
    const mockParams = {
      params: {
        id: "demoId",
        pipelineId:'demoId'
      }
    };

    spyOn(AddOrEditPipeLine.prototype, "componentDidMount").and.callThrough();
    const wrapper = shallow(
      <AddOrEditPipeLine
        history={history}
        match={mockParams}
        onSubmitHandler={onSubmitHandler}
        // resetToInitailState={resetToInitailState}
        getPipelineDetails={getPipelineDetails}
      />
    );
    expect(AddOrEditPipeLine.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });

  // it("Input should call handleChange on name change event", () => {
  //   const resetToInitailState = jest.fn();
  //   const inputChangeHandlerSpy = jest.spyOn(AddOrEditPipeLine.propTypes, "nameChangeHandler");
  //    const wrapper = shallow(<AddOrEditPipeLine history={history} match={match}  getPipelineDetails={getPipelineDetails} /> );
  //   wrapper.find('[id="name"]').simulate("change", { target: { id: "name", value: "name" } });
  //   expect(wrapper.find('[id="name"]').props().value).toEqual("name");
  //   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
  //  });

  it("Function testing on mapDispatchToProps", () => {
    const dispatch = jest.fn();
    const payload = "demo";
    const pipelineId = "demoId";
    const id = "demoId";
  
    mapDispatchToProps(dispatch).onSubmitHandler(payload, pipelineId, id);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: ON_SUBMIT_REQUEST,
      payload: "demo",
      pipelineId:"demoId",
      id: "demoId"
    });
    mapDispatchToProps(dispatch).getPipelineDetails(pipelineId, id);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: GET_PIPELINE_REQUEST,
      id: "demoId",
      pipelineId:"demoId"
    });
  });

  it("match snapshots", () => {
    // const resetToInitailState = jest.fn();
    const wrap = shallow(
      <AddOrEditPipeLine
        history={history}
        match={match}
        onSubmitHandler={onSubmitHandler}
      />
    );
    expect(wrap).toMatchSnapshot();
  });
});

// /**
//  * Factory function to create a shallowWrapper for the App component.
//  * @function setup
//  * @param {object} props - component props specific to this setup.
//  * @param {any} state - Initial state for setup
//  * @returns {shallowWrapper}
//  */

// const setup = (props = {}, state = null) =>{
//     const wrapper = shallow(<AddOrEditPipeLine { ...props } />)
//     if(state) wrapper.setState(state);
//     return wrapper;
// }

// /**
//  * Return ShallowWrapper containg node(s) with the given data-test value.
//  * @param {shallowWrapper} wrapper - Enzyme shallow wrapper to search within.
//  * @param {string} val - value of data-test attribute for search.
//  * @returns {shallowWrapper}
//  */

// const findByTestAttr = (wrapper, val) => {
//     return wrapper.find(`[data-test="${val}"]`);
// }