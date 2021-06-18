import { BaseApiService, ApiServiceError } from '@goodt/common/services/ApiService';
import {
    ApiClientRequestCancel,
    ApiHttpClient,
    ApiHttpClientError
} from '@goodt/common/services/ApiService/ApiHttpClient';
import { createTransport, HttpTransportSymbol } from '@goodt/core/net';

const API_BASE_URL = 'https://localhost:8080';
const API_BASE_URL_CUSTOM = 'https://host.com';
const API_SERVICE_CUSTOM_OPTIONS = {
    apiBaseURL: API_BASE_URL_CUSTOM
};

const FIXTURE_API_HTTP_CLIENT_REQUEST_RESULT = {};

const TestApiService = class extends BaseApiService {};
const MockApiHttpClient = class extends ApiHttpClient {
    async request(_) {
        return FIXTURE_API_HTTP_CLIENT_REQUEST_RESULT;
    }
};

const createMockFailedApiHttpClient = ({ error }) => {
    return class extends ApiHttpClient {
        async request(_) {
            throw error;
        }
    };
};

describe(`'BaseApiService' check`, () => {
    let transport;

    beforeEach(() => {
        transport = createTransport(HttpTransportSymbol, { baseURL: API_BASE_URL });
    });

    test('ApiService construct with empty options SHOULD pass and `apiBaseURL` is NULL', () => {
        const apiService = new TestApiService();
        expect(apiService).toBeTruthy();
        expect(apiService.apiBaseURL).toBeNull();
    });

    test('ApiService construct with client option SHOULD pass', () => {
        // Arrange
        // Assert
        const apiClient = new MockApiHttpClient(transport);

        // Act
        const apiService = new TestApiService({ client: apiClient });

        // Assert
        expect(apiService).toBeTruthy();
        expect(apiService.apiBaseURL).toEqual(API_BASE_URL);
    });

    test('ApiService construct with transport option SHOULD pass', () => {
        // Act
        const apiService = new TestApiService({ transport });

        // Assert
        expect(apiService).toBeTruthy();
        expect(apiService.apiBaseURL).toEqual(API_BASE_URL);
    });

    test('ApiService construct with `transport` and CUSTOM `apiBaseUrl` options SHOULD set `apiBaseUrl` to CUSTOM', () => {
        // Act
        const apiService = new TestApiService({ transport, options: API_SERVICE_CUSTOM_OPTIONS });

        // Assert
        expect(apiService.apiBaseURL).toEqual(API_BASE_URL_CUSTOM);
    });

    test('ApiService construct with `client` and CUSTOM `apiBaseUrl` options SHOULD set `apiBaseUrl` to CUSTOM', () => {
        // Arrange
        const apiClient = new MockApiHttpClient(transport);

        // Act
        const apiService = new TestApiService({
            client: apiClient,
            options: API_SERVICE_CUSTOM_OPTIONS
        });

        // Assert
        expect(apiService.apiBaseURL).toEqual(API_BASE_URL_CUSTOM);
    });

    test('ApiService `setClient` SHOULD pass and `apiBaseURL` is changed to client`s', () => {
        // Arrange
        const apiService = new TestApiService({ transport, options: API_SERVICE_CUSTOM_OPTIONS });

        const newTransport = createTransport(HttpTransportSymbol, { baseURL: API_BASE_URL });
        const apiClient = new MockApiHttpClient(newTransport);

        // Act
        apiService.setClient(apiClient);

        // Assert
        // to apiBaseURL is equal to client's baseURL
        expect(apiService.apiBaseURL).toEqual(API_BASE_URL);
    });

    test('ApiService `apiBaseURL` change SHOULD change `apiBaseURL`', () => {
        // Arrange
        const apiService = new TestApiService({ transport });

        // Act
        apiService.apiBaseURL = API_BASE_URL_CUSTOM;

        // Assert
        // to apiBaseURL is equal to client's baseURL
        expect(apiService.apiBaseURL).toEqual(API_BASE_URL_CUSTOM);
    });

    test('ApiService success request ', async () => {
        // Arrange
        const apiClient = new MockApiHttpClient(transport);
        const apiService = new TestApiService({ client: apiClient });
        const requestOptions = { url: API_BASE_URL };

        // Act
        const { isSuccess, isFail, result } = await apiService.request(requestOptions);

        // Assert
        expect(isSuccess).toBeTruthy();
        expect(isFail).toBeFalsy();
        expect(result).toEqual(FIXTURE_API_HTTP_CLIENT_REQUEST_RESULT);
    });

    describe('ApiService fail requests', () => {
        const createApiServiceWithFailedRequest = ({ error }) => {
            const MockApiHttpClient = createMockFailedApiHttpClient({ error });
            const apiClient = new MockApiHttpClient(transport);
            const apiService = new TestApiService({ client: apiClient });

            return apiService;
        };

        const expectRequest = ({ isSuccess, isFail, error }, code, reason) => {
            expect(isSuccess).toBeFalsy();
            expect(isFail).toBeTruthy();
            expect(error).toBeInstanceOf(ApiServiceError);
            expect(error.code).toEqual(code);
            if (reason) {
                expect(error.reason).toBe(reason);
            }
        };

        test('ApiService `request` with no `client` is set leads to fail', async () => {
            // Arrange
            const apiService = new TestApiService({});

            // Act
            const request = await apiService.request(null);

            // Assert
            expectRequest(request, ApiServiceError.Code.INTERNAL);
        });

        test('ApiHttpClientError INTERNAL_SERVER_ERROR leads to ApiServiceError INTERNAL', async () => {
            // Arrange
            const requestError = new ApiHttpClientError('INTERNAL_SERVER_ERROR', {
                code: ApiHttpClientError.Code.INTERNAL_SERVER_ERROR
            });
            const apiService = createApiServiceWithFailedRequest({ error: requestError });

            // Act
            const request = await apiService.request(null);

            // Assert
            expectRequest(request, ApiServiceError.Code.INTERNAL, requestError);
        });

        test('ApiHttpClientError 0 leads to ApiService UNKNOWN', async () => {
            // Arrange
            const requestError = new ApiHttpClientError('Message', {
                code: 0
            });
            const apiService = createApiServiceWithFailedRequest({ error: requestError });

            // Act
            const request = await apiService.request(null);

            // Assert
            expectRequest(request, ApiServiceError.Code.UNKNOWN, requestError);
        });

        test('Non-ApiHttpClientError leads to ApiService INTERNAL', async () => {
            // Arrange
            const requestError = new Error('Message');
            const apiService = createApiServiceWithFailedRequest({ error: requestError });

            // Act
            const request = await apiService.request(null);

            // Assert
            expectRequest(request, ApiServiceError.Code.INTERNAL, requestError);
        });

        test('ApiClientRequestCancel leads to fail(null)', async () => {
            // Arrange
            const requestError = new ApiClientRequestCancel('');
            const apiService = createApiServiceWithFailedRequest({ error: requestError });

            // Act
            const { isSuccess, isFail, error } = await apiService.request(null);

            // Assert
            expect(isSuccess).toBeFalsy();
            expect(isFail).toBeTruthy();
            expect(error).toBeNull();
        });
    });
});
