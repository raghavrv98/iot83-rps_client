import { put, takeLatest, all } from 'redux-saga/effects';
import { GET_LIST,GOT_LIST,NOT_GOT_LIST, DELETE_REQUEST, DELETE_REQUEST_FAILURE, DELETE_REQUEST_SUCCESS } from '../constants'
import { watcherGroupRequests, apiGroupHandlerAsync, watcherDeleteRequests, apiDeleteRequestHandlerAsync} from '../saga'
import rootSaga from '../saga'
import {errorHandler} from '../../../utils/commonUtils';

const error = "error";
describe('manageGroupsSaga Saga', () => {
    const mockAction = {
        id: "sampleId"
    }
    it('unit testing on rootSaga', () => {
      const generator = rootSaga();
      expect(generator.next().value).toEqual(all([
        watcherGroupRequests(), watcherDeleteRequests()
      ]))
    })

    it('should dispatch action "GET_LIST" ', () => {
        const generator = watcherGroupRequests();
        expect(generator.next().value).toEqual(takeLatest(GET_LIST, apiGroupHandlerAsync));
    })

    it('should dispatch action "DELETE_REQUEST" ', () => {
        const generator = watcherDeleteRequests();
        expect(generator.next().value).toEqual(takeLatest(DELETE_REQUEST, apiDeleteRequestHandlerAsync));
    })

    it('should dispatch action "DELETE_REQUEST_SUCCESS" with result from fetch News API', () => {
        const response = {
            data:{
                data: true,
            }
        }
        const generator = apiDeleteRequestHandlerAsync(mockAction);
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({ type: DELETE_REQUEST_SUCCESS, response: mockAction.id }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "DELETE_REQUEST_FAILURE" with result from fetch News API', () => {
        const generator = apiDeleteRequestHandlerAsync(mockAction);
        generator.next()
        expect(generator.throw(error).value)
        .toEqual(errorHandler(error, DELETE_REQUEST_FAILURE))
    })

    it('should dispatch action "GOT_LIST" with result from fetch News API', () => {
        const response = {
            data:{
                data: true,
            }
        }
        const generator = apiGroupHandlerAsync();
        generator.next()
        expect(generator.next(response).value)
        .toEqual(put({ type: GOT_LIST, response: response.data.data }))
        expect(generator.next().done).toBeTruthy();
    })

    it('should dispatch action "NOT_GOT_LIST" with result from fetch News API', () => {
        const generator = apiGroupHandlerAsync(mockAction);
        generator.next()
        expect(generator.throw(error).value)
        .toEqual(errorHandler(error, NOT_GOT_LIST))
    })
})
