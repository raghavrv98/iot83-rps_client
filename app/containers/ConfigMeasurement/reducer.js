/*
 *
 * ConfigMeasurement reducer
 *
 */

import { fromJS } from "immutable";
import { MEASUREMENT_LIST_SUCCESS, MEASUREMENT_LIST_FAILURE, ADD_MEASUREMENT_SUCCESS, ADD_MEASUREMENT_FAILURE, PROCESS_MEASUREMENT_SUCCESS, PROCESS_MEASUREMENT_FAILURE } from "./constants";

export const initialState = fromJS({});
export let i = 1;
function configMeasurementReducer(state = initialState, action) {

  switch (action.type) {
    case MEASUREMENT_LIST_SUCCESS:
      return state.set('measurementsList', action.response);  
    case MEASUREMENT_LIST_FAILURE:
      return state.set('measurementsListError', action.error);
    case PROCESS_MEASUREMENT_SUCCESS:
      return state.set('processMeasurement', action.response );
    case PROCESS_MEASUREMENT_FAILURE:
      return state.set('processMeasurementFailure', action.error);
    default:
      return initialState;
  }
}

export default configMeasurementReducer;
