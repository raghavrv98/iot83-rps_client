import { fromJS } from 'immutable';
import { getAgentsList, getAgentsListError, getDeleteSuccess, getDeleteFailure } from '../selectors';

const mockState = fromJS({
    manageAgents: {
        agentsList: true ,
        agentsListError: false,
        deleteSuccess: true,
        deleteFailure: false
    }
})

describe('selectManageAgentsDomain', () => {
    
    it('Expect to have unit tests specified', () => {
        expect(true).toEqual(true);
    });

    it('should return getAgentsList state ', () => {
        const functioncalls = getAgentsList();
        expect(functioncalls(mockState)).toBeTruthy();
    });

    it('should return getAgentsListError state ', () => {
        const functioncalls = getAgentsListError();
        expect(functioncalls(mockState)).toBeFalsy();
    });

    it('should return getDeleteSuccess state ', () => {
        const functioncalls = getDeleteSuccess();
        expect(functioncalls(mockState)).toBeTruthy();
    });

    it('should return getDeleteFailure state ', () => {
        const functioncalls = getDeleteFailure();
        expect(functioncalls(mockState)).toBeFalsy();
    });
});