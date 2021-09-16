import { fromJS } from 'immutable';
import mappingListReducer from '../reducer';
import { 
  DEFAULT_ACTION, GET_MAPINGS_SUCCESS, GET_MAPINGS_FAILURE,
  GET_AGENT_SUCCESS,GET_AGENT_FAILURE, DELETE_MAPPING_SUCCESS, DELETE_MAPPING_FAILURE,
  SAVE_MAPPINGS_SUCCESS,SAVE_MAPPINGS_FAILURE,
} from "../constants"

describe('mappingListReducer', () => {
  it('returns the initial state', () => {
    expect(mappingListReducer(undefined, {type: DEFAULT_ACTION})).toEqual(fromJS({}));
  });

  it('returns the initial state', () => {
    expect(mappingListReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle "GET_MAPINGS_SUCCESS" action', () => {
    expect(mappingListReducer(undefined, { type: GET_MAPINGS_SUCCESS, response: "Success" }).toJS()).
    toEqual({mapingListSuccess: "Success"})
  })

  it('should handle "GET_MAPINGS_FAILURE" action', () => {
    expect(mappingListReducer(undefined, { type: GET_MAPINGS_FAILURE, error: "Exception" }).toJS()).
    toEqual({mapingListFailure: "Exception"})
  })

  it('should handle "GET_AGENT_SUCCESS" action', () => {
    expect(mappingListReducer(undefined, { type: GET_AGENT_SUCCESS, response: "Success" }).toJS()).
    toEqual({agentDetailsSuccess: "Success"})
  })

  it('should handle "GET_AGENT_FAILURE" action', () => {
    expect(mappingListReducer(undefined, { type: GET_AGENT_FAILURE, error: "Exception" }).toJS()).
    toEqual({agentDetailsFailure: "Exception"})
  })

  it('should handle "DELETE_MAPPING_SUCCESS" action', () => {
    expect(mappingListReducer(undefined, { type: DELETE_MAPPING_SUCCESS, response: "Success" }).toJS()).
    toEqual({deleteMappingSuccess: "Success"})
  })

  it('should handle "DELETE_MAPPING_FAILURE" action', () => {
    expect(mappingListReducer(undefined, { type: DELETE_MAPPING_FAILURE, error: "Exception" }).toJS()).
    toEqual({deleteMappingFailure: "Exception"})
  })

  it('should handle "SAVE_MAPPINGS_SUCCESS" action', () => {
    expect(mappingListReducer(undefined, { type: SAVE_MAPPINGS_SUCCESS, response: "Success" }).toJS()).
    toEqual({saveMappingSuccess: "Success"})
  })

  it('should handle "SAVE_MAPPINGS_FAILURE" action', () => {
    expect(mappingListReducer(undefined, { type: SAVE_MAPPINGS_FAILURE, error: "Exception" }).toJS()).
    toEqual({saveMappingFailure: "Exception"})
  })

});
