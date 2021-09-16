
import { DEFAULT_ACTION,CREATE_PLANT,GET_DETAILS, UPLOAD_PLANT_IMAGE } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function createPlantHandler(payload,id) {
  return {
    type: CREATE_PLANT,
    payload,
    id
  };
}

export function fetchPlantDetails(id) {
  return {
    type: GET_DETAILS,
    id
  };
}

export function uploadPlantImage(image) {
  return {
    type: UPLOAD_PLANT_IMAGE,
    image,
  };
}