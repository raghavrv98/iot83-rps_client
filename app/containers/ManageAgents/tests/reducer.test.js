import { fromJS } from 'immutable';
import manageAgentsReducer from '../reducer';
import { DEFAULT_ACTION, GET_AGENTS_SUCCESS, GET_AGENTS_FAILURE,
  DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE
} from '../constants'

describe('manageAgentsReducer', () => {
  it('returns the initial state', () => {
    expect(manageAgentsReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('returns the initial state', () => {
    expect(manageAgentsReducer(undefined, { type: DEFAULT_ACTION })).toEqual(fromJS({}));
  });

  it('should handle "GET_AGENTS_SUCCESS" action', () => {
    expect(manageAgentsReducer(undefined, { type: GET_AGENTS_SUCCESS, response: "Success" }).toJS()).
    toEqual({agentsList: "Success"})
  })

  it('should handle "GET_AGENTS_FAILURE" action', () => {
    expect(manageAgentsReducer(undefined, { type: GET_AGENTS_FAILURE, error: "Exception" }).toJS()).
    toEqual({agentsListError: "Exception"})
  })

  it('should handle "DELETE_REQUEST_SUCCESS" action', () => {
    expect(manageAgentsReducer(undefined, { type: DELETE_REQUEST_SUCCESS, response: "Success" }).toJS()).
    toEqual({deleteSuccess: "Success"})
  })

  it('should handle "DELETE_REQUEST_FAILURE" action', () => {
    expect(manageAgentsReducer(undefined, { type: DELETE_REQUEST_FAILURE, error: "Exception" }).toJS()).
    toEqual({deleteFailure: "Exception"})
  })
});
