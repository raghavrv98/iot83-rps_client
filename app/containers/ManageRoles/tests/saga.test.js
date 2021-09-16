import {
    GET_LIST, GOT_LIST, NOT_GOT_LIST, 
    DELETE_REQUEST, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAILURE
} from '../constants';
import rootSaga,{
    watcherRoleRequests,
    watcherDeleteRequests,
    apiRolesHandlerAsync,
    apiDeleteRequestHandlerAsync
} from '../saga';
import { takeLatest,put, all } from 'redux-saga/effects';
import { errorHandler } from '../../../utils/commonUtils';

const error = "error";
const mockAction = {
    id: "demoId",
}
const mockResponse = {
    data: {
      data: true
    }
};

describe('manageAgentsSaga Saga', () => {
    it('Expect to have unit tests specified', () => {
        expect(rootSaga().next().value).toEqual(all([
            watcherRoleRequests(),
            watcherDeleteRequests()
        ]));
    });

    it('Expect to have unit tests specified', () => {
        expect(watcherRoleRequests().next().value).toEqual(
            takeLatest(GET_LIST, apiRolesHandlerAsync)
        );
    });

    it('Expect to have unit tests specified', () => {
        expect(watcherDeleteRequests().next().value).toEqual(
            takeLatest(DELETE_REQUEST, apiDeleteRequestHandlerAsync)
        );
    });

    it('should dispatch action "GOT_LIST" with result from fetch News API', () => {
        const generator = apiRolesHandlerAsync();
        generator.next();
        expect(generator.next(mockResponse).value).toEqual(
          put({ type: GOT_LIST, response: true })
        )
    });

    it('should dispatch action "NOT_GOT_LIST" with result from fetch News API', () => {
        const generator = apiRolesHandlerAsync();
        generator.next();
        expect(generator.throw(error).value).toEqual(
            errorHandler(error, NOT_GOT_LIST)
        )
    });

    it('should dispatch action "DELETE_REQUEST_SUCCESS" with result from fetch News API', () => {
        const generator = apiDeleteRequestHandlerAsync(mockAction);
        generator.next();
        expect(generator.next(mockResponse).value).toEqual(
            put({ type: DELETE_REQUEST_SUCCESS, response: "demoId" })
        )
    });

    it('should dispatch action "DELETE_REQUEST_FAILURE" with result from fetch News API', () => {
        const generator = apiDeleteRequestHandlerAsync(mockAction);
        generator.next();
        expect(generator.throw(error).value).toEqual(
            errorHandler(error, DELETE_REQUEST_FAILURE)
        )
    });
});