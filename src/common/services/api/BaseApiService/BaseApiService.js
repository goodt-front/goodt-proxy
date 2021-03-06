import { success, fail } from '@goodt-common/utils';
import { BaseError } from '@goodt-common/errors';
import {
    ApiClientRequestCancel,
    ApiHttpClientError,
    ApiHttpClientErrorCode,
    create as createApiHttpClient
} from '../ApiHttpClient';
import { ApiServiceError, ApiServiceErrorCode } from '../errors';
import '../typedefs';

/**
 * @type {import('./').IApiService}
 */
class BaseApiService {
    /**
     * @protected
     * @type {import('../ApiHttpClient').ApiHttpClient}
     */
    _client;

    /**
     * @protected
     * @type {IApiServiceOptions}
     */
    _options = {};

    /**
     * @param {?import('../ApiHttpClient').ApiHttpClient} client
     * @param {?ITransport} transport
     * @param {?IApiServiceOptions} options
     * @throws ApiServiceError
     */
    constructor({ client, transport, options = {} } = {}) {
        const { apiBaseURL, ...serviceOptions } = options;

        if (serviceOptions) {
            this._options = {
                ...this._options,
                ...serviceOptions
            };
        }

        if (client) {
            if (apiBaseURL) {
                // eslint-disable-next-line no-param-reassign
                client.baseURL = apiBaseURL;
            }
            this.setClient(client);
            return;
        }

        if (transport) {
            const newClient = createApiHttpClient(transport);
            if (apiBaseURL) {
                newClient.baseURL = apiBaseURL;
            }
            this.setClient(newClient);
        }
    }

    /**
     * @return {string}
     */
    get apiBaseURL() {
        return this._client?.baseURL ?? null;
    }

    /**
     *
     * @param {string} url
     */
    set apiBaseURL(url) {
        if (this._client) {
            this._client.baseURL = url;
        }
    }

    /**
     * @param {import('../ApiHttpClient').ApiHttpClient} client
     */
    setClient(client) {
        this._client = client;
    }

    /**
     * @param options
     */
    setOptions(options) {
        this._options = options;
    }

    /**
     * @param {import('../types').IApiServiceRequest} request
     * @return {Promise<import('@goodt-common/utils').ISafeResult<*, Error>>}
     */
    async request(request) {
        try {
            if (!this._client) {
                throw new ApiServiceError('Server API `client` did not set', {
                    code: ApiServiceErrorCode.INTERNAL
                });
            }
            const apiClientRequest = this._buildApiClientRequest(request);
            const result = await this._client.request(apiClientRequest);

            return success(result);
        } catch (error) {
            // throwUncaughtError(error);
            const processedError = this._processError(error);
            if (processedError instanceof BaseError) {
                processedError.captureStackTrace(this.request);
            }

            return fail(processedError);
        }
    }

    /**
     * ?????????????????????? ??????????????, ???????????????????????? ????????????????
     */
    dispose() {
        this._client.dispose();
    }

    /**
     * ???????????? ???????????? ???????????????? ?????? ??????????????
     * @protected
     * @param {IApiServiceRequest} request
     * @return {import('../ApiHttpClient').IApiClientRequest} IApiClientRequest
     */
    // eslint-disable-next-line class-methods-use-this
    _buildApiClientRequest(request) {
        return request;
    }

    /**
     * @protected
     * @param {Error} error
     * @return {ApiServiceError|Error|null}
     */
    _processError(error) {
        if (error instanceof ApiHttpClientError) {
            const apiServiceError = this._buildApiServiceError(error);
            return apiServiceError;
        }
        if (error instanceof ApiClientRequestCancel) {
            return null;
        }

        return new ApiServiceError(error.message, {
            code: ApiServiceErrorCode.INTERNAL,
            reason: error
        });
    }

    /**
     * @protected
     * @param {Error} error
     * @return {ApiServiceError}
     */
    // eslint-disable-next-line class-methods-use-this
    _buildApiServiceError(error) {
        const { message, code, data, reason } = error;

        const apiServiceErrorCode = (() => {
            switch (code) {
                case ApiHttpClientErrorCode.UNAUTHORIZED:
                    return ApiServiceErrorCode.UNAUTHORIZED;
                case ApiHttpClientErrorCode.NOT_FOUND:
                    return ApiServiceErrorCode.NOT_FOUND;
                case ApiHttpClientErrorCode.FORBIDDEN:
                    return ApiServiceErrorCode.FORBIDDEN;
                case ApiHttpClientErrorCode.BAD_REQUEST:
                case ApiHttpClientErrorCode.INTERNAL_SERVER_ERROR:
                    return ApiServiceErrorCode.INTERNAL;
                default:
                    return ApiServiceErrorCode.UNKNOWN;
            }
        })();

        const apiServiceError = new ApiServiceError(message, {
            code: apiServiceErrorCode,
            data,
            reason: error
        });

        return apiServiceError;
    }
}

export { BaseApiService };
