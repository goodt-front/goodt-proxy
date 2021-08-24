import {
    ApiClientRequestCancel,
    create as createApiHttpClient,
    ApiHttpClientError
} from '@goodt-common/api/ApiHttpClient';

import mockAxios from 'jest-mock-axios';

import { createTransport, HttpTransportSymbol } from '@goodt-wcore/net';
import { wrapTestWithAaa } from '@goodt/tests/.jest/utils';

const test = wrapTestWithAaa(it);

const API_CLIENT_BASE_URL_CUSTOM = 'https://host.com';
const API_CLIENT_VALID_REQUEST = { url: '/some/path' };

const API_CLIENT_VALID_REQUEST_RESULT = {};

/**
 *
 * @param requestResult
 * @return {[ITransport, jest.SpyInstance<ReturnType<Required<any>[string]>]}
 */
const createMockHttpTransportWithRequest = (requestResult) => {
    const transport = createTransport(HttpTransportSymbol);
    const requestSpy = jest.spyOn(transport, 'request'); //.mockImplementation(() => requestResult);

    return [transport, requestSpy];
};

describe(`'ApiHttpClient' check`, () => {
    let transport;
    let transportRequestSpy;
    let apiClient;

    beforeEach(() => {
        [transport, transportRequestSpy] = createMockHttpTransportWithRequest({
            data: API_CLIENT_VALID_REQUEST_RESULT
        });
        apiClient = createApiHttpClient(transport);
    });

    afterEach(() => {
        // cleaning up the mess left behind the previous test
        mockAxios.reset();
    });

    it('ApiHttpClient create with empty transport SHOULD fail', () => {
        try {
            createApiHttpClient(null);
        } catch (error) {
            expect(error).toBeInstanceOf(ApiHttpClientError);
        }
    });

    test('ApiHttpClient `baseURL` change SHOULD change `baseURL`', (done, { act, assert }) => {
        act(() => {
            apiClient.baseURL = API_CLIENT_BASE_URL_CUSTOM;
            return { baseURL: apiClient.baseURL };
        });

        assert(({ baseURL }) => {
            expect(baseURL).toEqual(API_CLIENT_BASE_URL_CUSTOM);
        });
    });

    test('ApiHttpClient `request` with empty input argument options SHOULD fail', (done, {
        act,
        assert
    }) => {
        const EMPTY_REQUEST = undefined;
        act(async () => {
            try {
                const result = await apiClient.request(EMPTY_REQUEST);
                return { result };
            } catch (error) {
                return { result: error };
            }
        });

        assert(({ result }) => {
            expect(transportRequestSpy).not.toBeCalled();
            expect(result).toBeInstanceOf(ApiHttpClientError);
            expect(result.code).toBe(ApiHttpClientError.Code.INTERNAL);
        });
    });

    test('ApiHttpClient `request` with invalid type input argument options SHOULD fail', (done, {
        act,
        assert
    }) => {
        const INVALID_REQUEST = null;
        act(async () => {
            try {
                const result = await apiClient.request(INVALID_REQUEST);
                return { result };
            } catch (error) {
                return { result: error };
            }
        });

        assert(({ result }) => {
            expect(transportRequestSpy).not.toBeCalled();
            expect(result).toBeInstanceOf(ApiHttpClientError);
            expect(result.code).toBe(ApiHttpClientError.Code.INTERNAL);
        });
    });

    test('ApiHttpClient success `request` SHOULD returns expected result', (done, {
        arrange,
        act,
        assert
    }) => {
        arrange(() => ({
            response: () => mockAxios.mockResponse({ data: API_CLIENT_VALID_REQUEST_RESULT })
        }));

        act(({ response }, assert) => {
            const result = apiClient.request(API_CLIENT_VALID_REQUEST);
            result.then((result) => {
                assert({ result });
            });
            response();
        });

        assert(({ result }) => {
            expect(transportRequestSpy).toBeCalled();
            expect(result).toEqual(API_CLIENT_VALID_REQUEST_RESULT);
        });
    });

    describe('ApiHttpClient fail requests', () => {
        test('Server 500 request leads to ApiHttpClientError INTERNAL_SERVER_ERROR', async (done, {
            act,
            assert,
            arrange
        }) => {
            const TRANSPORT_ERROR = {
                message: 'Internal Server Error',
                response: { status: ApiHttpClientError.Code.INTERNAL_SERVER_ERROR },
                config: API_CLIENT_VALID_REQUEST
            };

            arrange(() => ({
                reject: () => mockAxios.mockError(TRANSPORT_ERROR)
            }));

            act(({ reject }, assert) => {
                const result = apiClient.request(API_CLIENT_VALID_REQUEST);
                result.then(assert).catch(assert);
                reject();
            });

            assert((result) => {
                expect(transportRequestSpy).toBeCalled();
                expect(result).toBeInstanceOf(ApiHttpClientError);
                expect(result.code).toBe(ApiHttpClientError.Code.INTERNAL_SERVER_ERROR);
            });
        });

        test('Transport `dispose` SHOULD leads to ApiClientRequestCancel', (done, {
            act,
            assert
        }) => {
            act((_, assert) => {
                const result = apiClient.request(API_CLIENT_VALID_REQUEST);
                result.then(assert).catch(assert);
                transport.dispose();
            });

            assert((result) => {
                expect(transportRequestSpy).toBeCalled();
                expect(result).toBeInstanceOf(ApiClientRequestCancel);
            });
        });
    });
});
