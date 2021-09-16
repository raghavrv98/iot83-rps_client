import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import { fromJS } from 'immutable';
import { createPlantHandler, fetchPlantDetails, uploadPlantImage } from '../actions';
import { AddOrEditPlant, mapDispatchToProps} from '../index';
import { CREATE_PLANT,GET_DETAILS, UPLOAD_PLANT_IMAGE } from '../constants';

let match = {
  params:{
    id:"demoId",
  }
}

const list = {
  uploadedImage: "",
  mobilePhoneError: "",
  payload: {
    name: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    plantImage: null,
  },
  phone: ""
};

const createPlantSuccess = "this is submit success";
const createPlantFailure = "this is submit error";
const getDetailsSuccess = "this is plant details success";
const getDetailsFailure = "this is plant details Error"; 
const plantImageUplaod = "this is image success";
const plantImageUplaodFailure = "this is image error";
describe('< AddOrEditPlant />', () => {

  it('match snapshots', () => {
    const wrap = shallow(<AddOrEditPlant match={match} createPlantHandler={createPlantHandler} fetchPlantDetails={fetchPlantDetails} uploadPlantImage={uploadPlantImage} />)
    expect(wrap).toMatchSnapshot()
  })

it("clicking back button trigger onClick event", async () => {
    let expectedCount = history.length + 1;
    const wrapper = shallow(<AddOrEditPlant history={history} match={match} fetchPlantDetails={fetchPlantDetails} />);
    let backbutton = wrapper.find("button.btn-transparent");
    expect(backbutton.length).toBe(1);
    backbutton.simulate("click");
    expect(history.length + 1).toEqual(expectedCount);
    expect(history.location.pathname).toEqual("/");
});
  

//   it("clicking submit button trigger onClick event", async () => {
//     const createPlantHandler = jest.fn();
//     const wrapper = shallow(<AddOrEditPlant history={history} match={match} createPlantHandler={createPlantHandler} fetchPlantDetails={fetchPlantDetails} />);
//     wrapper.setState({ uploadPlantImage: 'uploadPlantImage' });
//     const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'submitHandler');
//     wrapper.instance().forceUpdate(); 
//     let addOrEditForm = wrapper.find("form.contentForm");
//     expect(addOrEditForm.length).toBe(1);
//     addOrEditForm.simulate('submit', { preventDefault() { } });
//     expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
//   });

//  it("clicking onChange button trigger onClick event", async () => {
//   const createPlantHandler = jest.fn();
//   const wrapper = shallow(<AddOrEditPlant history={history} match={match} createPlantHandler={createPlantHandler} fetchPlantDetails={fetchPlantDetails} />);
//   const inputChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'nameChangeHandler');
//   wrapper.instance().forceUpdate(); 
//   wrapper.find('[id="name"]').simulate('change',{target: {id: "name", value: "name"}});
//   expect(wrapper.find('[id="name"]').props().value).toEqual("name");
//   expect(inputChangeHandlerSpy).toHaveBeenCalledTimes(1);
// });

  it("test component will recieve props", async () => {
    spyOn( AddOrEditPlant.prototype, "componentWillReceiveProps").and.callThrough();
    const wrapper = shallow(<AddOrEditPlant history={history} match={match} fetchPlantDetails={fetchPlantDetails} uploadPlantImage={uploadPlantImage} createPlantHandler={createPlantHandler} createPlantSuccess={undefined} createPlantFailure={undefined} getDetailsSuccess={undefined} getDetailsFailure={undefined} plantImageUplaod={undefined} plantImageUplaodFailure={undefined} />);
    wrapper.setProps({ createPlantSuccess, createPlantFailure, getDetailsSuccess, getDetailsFailure, plantImageUplaod, plantImageUplaodFailure });
    wrapper.setState({resList:list.payload});
    expect( AddOrEditPlant.prototype.componentWillReceiveProps ).toHaveBeenCalledTimes(1);
  });

  it("test componentDidMount", async () => {
    const fetchPlantDetails=jest.fn();
    spyOn(AddOrEditPlant.prototype, "componentDidMount").and.callThrough();
    const wrapper = shallow(<AddOrEditPlant history={history} match={match} fetchPlantDetails={fetchPlantDetails} />);
    wrapper.setState({ })
    expect(AddOrEditPlant.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    // expect(fetchPlantDetails).toHaveBeenCalledTimes(1);
  });



  it("Function testing on mapDispatchToProps", () => {
    const dispatch = jest.fn();
    const payload = "demo";
    const id = "demoId";
    const image="image";
  
    mapDispatchToProps(dispatch).createPlantHandler(payload, id);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CREATE_PLANT,
      payload: "demo",
      id: "demoId"
    });
    mapDispatchToProps(dispatch).fetchPlantDetails( id );
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: GET_DETAILS,
      id: "demoId",
    });
    mapDispatchToProps(dispatch).uploadPlantImage(image);
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: UPLOAD_PLANT_IMAGE,
      image:"image",
    });
  });
});