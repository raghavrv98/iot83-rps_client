import { fromJS } from "immutable";
import addOrEditPlantReducer from "../reducer";
import {
  CREATE_PLANT_SUCCESS,
  CREATE_PLANT,
  CREATE_PLANT_FAILURE,
  GET_DETAILS,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_FAILURE,
  UPLOAD_PLANT_IMAGE,
  UPLOAD_PLANT_IMAGE_SUCCESS,
  UPLOAD_PLANT_IMAGE_FAILURE
} from "../constants";

describe("addOrEditPlantReducer", () => {
  it("returns the initial state", () => {
    expect(addOrEditPlantReducer(undefined, {})).toEqual(fromJS({}));
  });
  it("returns the CREATE_PLANT_SUCCESS", () => {
    expect(
      addOrEditPlantReducer(undefined, {
        type: CREATE_PLANT_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        createPlantSuccess: "Request Completed Successfully"
      })
    );
  });
  it("returns the CREATE_PLANT_FAILURE", () => {
    expect(
      addOrEditPlantReducer(undefined, {
        type: CREATE_PLANT_FAILURE,
        error:"Expection"
      })
    ).toEqual(
      fromJS({
        createPlantFailure: "Expection"
      })
    );
  });
  it("returns the GET_DETAILS_SUCCESS", () => {
    expect(
      addOrEditPlantReducer(undefined, {
        type: GET_DETAILS_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        getDetailsSuccess: "Request Completed Successfully"
      })
    );
  });
  it("returns the GET_DETAILS_FAILURE", () => {
    expect(
      addOrEditPlantReducer(undefined, {
        type: GET_DETAILS_FAILURE,
        error:"Expection"
      })
    ).toEqual(
      fromJS({
        getDetailsFailure: "Expection"
      })
    );
  });
  it("returns the UPLOAD_PLANT_IMAGE_SUCCESS", () => {
    expect(
      addOrEditPlantReducer(undefined, {
        type: UPLOAD_PLANT_IMAGE_SUCCESS,
        response: "Request Completed Successfully"
      })
    ).toEqual(
      fromJS({
        plantImageUplaod: "Request Completed Successfully"
      })
    );
  });
  it("returns the CREATE_PLANT_FAILURE", () => {
    expect(
      addOrEditPlantReducer(undefined, {
        type: UPLOAD_PLANT_IMAGE_FAILURE,
        error:"Expection"
      })
    ).toEqual(
      fromJS({
        plantImageUplaodFailure: "Expection"
      })
    );
  });
});
