import { success, fail } from '@goodt/common/utils/either';
import './typedefs';
import {
    ApiClientRequestCancel,
    ApiHttpClientError,
    ApiHttpClientErrorCode,
    create as createApiHttpClient
} from './ApiHttpClient';
import { ApiServiceError, ApiServiceErrorCode } from './error';
import './typedefs';

/**
 * @type {import('./BaseApiService').IApiService}
 */
class BaseApiService {
    /**
     * @private
     * @type {import('./ApiHttpClient').ApiHttpClient}
     */
    _client;

    /**
     * @private
     * @type {IApiServiceOptions}
     */
    _options = {};

    /**
     * @param {import('./ApiHttpClient').ApiHttpClient} client?
     * @param {ITransport} transport?
     * @param {IApiServiceOptions} [options={}]
     * @throws ApiServiceError
     */
    constructor({ client, transport, options }) {
        if (options) {
            this._options = options;
        }

        if (client) {
            const { apiBaseURL } = this._options;
            if (apiBaseURL) {
                // eslint-disable-next-line no-param-reassign
                client.baseURL = apiBaseURL;
            }

            this._options.apiBaseURL = client.baseURL;
            this.setClient(client);
            return;
        }

        if (transport) {
            const newClient = createApiHttpClient(transport);
            const { apiBaseURL } = this._options;
            if (apiBaseURL) {
                newClient.baseURL = apiBaseURL;
            }

            this._options.apiBaseURL = newClient.baseURL;
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
     * @param {import('./ApiHttpClient').ApiHttpClient} client
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
     *
     * @param {import('./ApiServiceRequest')} request
     * @return {Promise<SafeResult>}
     */
    async request(request) {
        if (!this._client) {
            throw new ApiServiceError('Server API `client` did not set', {
                code: ApiServiceErrorCode.INTERNAL
            });
        }

        try {
            const apiClientRequest = this._buildApiClientRequest(request);
            const result = await this._client.request(apiClientRequest);
            return success(result);
        } catch (error) {
            /**
             * async uncaught error throw for top level error tracking service
             */
            // throwUncaughtError(error);
            const processedError = this._processError(error);
            processedError.captureStackTrace(this.request);

            return fail(processedError);
        }
    }

    /**
     * Освобождает ресурсы, используемые сервисом
     */
    dispose() {
        this._client.dispose();
    }

    /**
     * Билдит конфиг реквеста для клиента
     *
     * @param {IApiServiceRequest} request
     * @return {import('./ApiHttpClient').IApiClientRequest} IApiClientRequest
     */
    // eslint-disable-next-line class-methods-use-this
    _buildApiClientRequest(request) {
        return request;
    }

    /**
     *
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

        return error;
    }

    /**
     *
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
            reason
        });

        return apiServiceError;
    }
}

export { BaseApiService };
