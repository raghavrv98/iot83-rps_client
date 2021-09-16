/*
 *
 * Settings reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  GENERATE_KEY_SUCCESS,
  GENERATE_KEY_FAILURE,
  SECRET_KEY_SUCCESS,
  SECRET_KEY_FAILURE,
  SECRET_STATUS_SUCCESS,
  SECRET_STATUS_FAILURE,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAILURE,
  DELETE_SECRET_KEY_SUCCESS,
  DELETE_SECRET_KEY_FAILURE,
  GET_PIPELINE_CONFIG_SUCCESS,
  GET_PIPELINE_CONFIG_FAILURE,
  SUBMIT_CONFIG_DETAILS_SUCCESS,
  SUBMIT_CONFIG_DETAILS_FAILURE,
  GET_LICENCE_SUCCESS,
  GET_LICENCE_FAILURE,
  GET_SETTINGTABS_SUCCESS, 
  GET_SETTINGTABS_FAILURE,
  LICENSE_KEY_DETAILS_SUCCESS,
  LICENSE_KEY_DETAILS_FAILURE
} from "./constants";

export const initialState = fromJS({});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GENERATE_KEY_SUCCESS:
      return state.set('generatedKey', action.response);
    case GENERATE_KEY_FAILURE:
      return state.set('generateKeyError', action.error);
    case SECRET_KEY_SUCCESS:
      return state.set('secretKeys', action.response);
    case SECRET_KEY_FAILURE:
      return state.set('secretKeysError', action.error);
    case SECRET_STATUS_SUCCESS:
      return state.set('secretStatusSuccess', action.response);
    case SECRET_STATUS_FAILURE:
      return state.set('secretStatusFailure', action.error);
    case ACCOUNT_DETAILS_SUCCESS:
      return state.set('accountDetails', action.response);
    case ACCOUNT_DETAILS_FAILURE:
      return state.set('accountDetailsError', action.error);
    case GET_PIPELINE_CONFIG_SUCCESS:
      return state.set('pipelineConfigSuccess', action.response);
    case GET_PIPELINE_CONFIG_FAILURE:
      return state.set('pipelineConfigError', action.error);
    case DELETE_SECRET_KEY_SUCCESS:
      return state.set('secretKeyDeleteSuccess', action.response);
    case DELETE_SECRET_KEY_FAILURE:
      return state.set('secretKeyDeleteFailure', action.error);
    case SUBMIT_CONFIG_DETAILS_SUCCESS:
      return state.set('submitConfigSuccess', action.response);
    case SUBMIT_CONFIG_DETAILS_FAILURE:
      return state.set('submitConfigFailure', action.error);
    case GET_LICENCE_SUCCESS:
      return state.set('licenceSuccess',action.response);
    case GET_LICENCE_FAILURE:
      return state.set('licenceFailure',action.error);
    case GET_SETTINGTABS_SUCCESS:
      return state.set('tabsSuccess',action.response);
    case GET_SETTINGTABS_FAILURE:
      return state.set('tabsFailure',action.error);
      case LICENSE_KEY_DETAILS_SUCCESS:
        return state.set('licenseKeySuccess',action.response);
      case LICENSE_KEY_DETAILS_FAILURE:
        return state.set('licenseKeyFailure',action.error);
    default:
      return initialState;
  }
}

export default settingsReducer;
