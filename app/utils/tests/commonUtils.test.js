import history from "../history";
import { getHeaders, logoutHandler, bytesToSize, clearLocalStorage, errorHandler } from '../commonUtils';
import { put } from "redux-saga/effects";
import { push } from "react-router-redux";

describe('< commonUtils />', () => {

    it('test getHeaders', () => {
        const expected = {
            headers: {
                "X-Authorization": `Bearer ${localStorage.token}`, // Need to get from store once Group done
                "Content-Type": "application/json",
                "X-TENANT-ID": localStorage.tenant
            }
        }
        expect(getHeaders()).toEqual(expected);
    });

    it('test bytesToSize', () => {
        expect(bytesToSize(0)).toEqual("0 Byte");
        expect(bytesToSize(1032)).toEqual("1.03 KB");
        expect(bytesToSize(1032000)).toEqual("1.03 MB");
        expect(bytesToSize(1032000000)).toEqual("1.03 GB");
        expect(bytesToSize(1032000000000)).toEqual("1.03 TB");
    });

    it('test clearLocalStorage', () => {
        clearLocalStorage();
        const temp = history.location.pathname;
        expect(temp).toEqual('/');
    });

    it('test errorHandler for 400 status', () => {
        const errorType = "typeError";
        const error = {
            response: {
                data: {
                    message: "demo",
                },
                status: 400
            }
        };
        let generator = errorHandler(error, errorType);
        expect(generator.next().value).toEqual(put({ type: errorType, error: "demo" }))
    });

    it('test errorHandler for not havin message in case of 400 status', () => {
        const errorType = "typeError";
        const error = {
            response: {
                data: {
                    error: "error"
                },
                status: 400
            }
        };
        let generator = errorHandler(error, errorType);
        expect(generator.next().value).toEqual(put({ type: errorType, error: "error" }))
    });

    // it('test errorHandler for 403', () => {
    //     const errorType = "typeError";
    //     const error = {
    //         response: {
    //             status: 403
    //         }
    //     };
    //     let generator = errorHandler(error, errorType);
    //     expect(generator.next().value).toEqual(put(push("/error403")))
    // });
    it('test errorHandler for 404', () => {
        const errorType = "typeError";
        const error = {
            response: {
                status: 404
            }
        };
        let generator = errorHandler(error, errorType);
        expect(generator.next().value).toEqual(put(push("/error404")))
    });
    it('test errorHandler for other status', () => {
        const errorType = "typeError";
        const error = {
            response: {
                status: 123,
                data: {
                    message: "demo",
                    error: "error"
                },
            }
        }
        let generator = errorHandler(error, errorType);
        expect(generator.next(error).value).toEqual(put({ type: errorType, error: "demo" }));
    })

    it('test errorHandler for not having "error.response.message"', () => {
        const errorType = "typeError";
        const error = "demo";
        let generator = errorHandler(error, errorType);
        expect(generator.next(error).value).toEqual(put({ type: errorType, error }));
    })

    it('test errorHandler for not having "error.response" only', () => {
        const errorType = "typeError";
        const error = {
            message: "demo"
        };
        let generator = errorHandler(error, errorType);
        expect(generator.next(error).value).toEqual(put({ type: errorType, error: "demo" }));
    })
    it('test errorHandler for 401', () => {
        const logoutHandler = jest.fn();
        const errorType = "typeError";
        const error = {
            response: {
                status: 401
            }
        };
        let generator = errorHandler(error, errorType);
        expect(logoutHandler).toHaveBeenCalledTimes(0);
    });
})