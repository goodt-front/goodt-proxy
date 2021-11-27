import { stringify as stringifyParams } from 'qs';
import { ApiClientRequestCancel, ApiHttpClientError } from './errors';
import '../typedefs';

const ApiClientMethod = Object.freeze({
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete'
});

/**
 * @class ApiHttpClient
 */
class ApiHttpClient {
    /**
     * Transport client instance
     * @private
     * @member {ITransport}
     */
    _transport;

    /**
     * @param {ITransport} transport
     * @constructs ApiHttpClient
     */
    constructor(transport) {
        if (transport == null) {
            throw new ApiHttpClientError('Required `transport` instance is not provided', {
                code: ApiHttpClientError.Code.INTERNAL
            });
        }
        this._transport = transport;
    }

    /**
     *
     * @return {string}
     */
    get baseURL() {
        return this._transport.baseURL;
    }

    /**
     *
     * @param baseURL
     */
    set baseURL(baseURL) {
        this._transport.baseURL = baseURL;
    }

    /**
     * @public
     * @async
     * @method ApiHttpClient#request
     * @param {ITransportRequest} request
     *
     * @throw {ApiHttpClientError|Error}
     * @return {Promise<*>}
     */
    async request(request) {
        const requestConfig = this._buildTransportRequest(request);
        try {
            const response = await this._transport.request(requestConfig);
            return this._processTransportResponse(response);
        } catch (error) {
            const exception = this._processTransportError(error);
            throw exception;
        }
    }

    dispose() {
        if (typeof this._transport.dispose === 'function') {
            this._transport.dispose();
        }
    }

    /**
     * Создаёт конфиг реквеста для совершения запроса транспортом ITransportRequest
     * Особенность: знает формат запроса к серверу, дополнительные HTTP заголовки
     *
     * @param {ITransportRequest} request
     * @return {ITransportRequest} ITransportRequest
     * @private
     */
    // eslint-disable-next-line class-methods-use-this
    _buildTransportRequest(request) {
        if (request == null || typeof request !== 'object') {
            throw new ApiHttpClientError('Invalid `request` method input argument type');
        }

        const { url, params, options = {} } = request;
        if (!url) {
            throw new ApiHttpClientError('Empty url or pathname');
        }

        const { method, ...resultTransportOptions } = this._buildTransportOptions(options);

        return {
            url,
            method,
            ...(params && { params }),
            options: resultTransportOptions
        };
    }

    /**
     * Создаёт/дополняет объект опций для транспорта ITransportOptions
     *
     * @param {ITransportOptions} transportOptions
     * @return {ITransportOptions}
     */
    // eslint-disable-next-line class-methods-use-this
    _buildTransportOptions(transportOptions) {
        const extraOptions = {};

        // repeat pattern for query string params
        extraOptions.paramsSerializer = (params) => stringifyParams(params, { arrayFormat: 'repeat' });

        return {
            ...extraOptions,
            ...transportOptions
        };
    }

    /**
     * Обрабатывает ответа транспорта и возвращает целевые данные для HttpApiClient
     * Особенность: знает формат ответа сервера
     *
     * @param {ITransportResponse} transportResponse
     * @return {*}
     */
    // eslint-disable-next-line class-methods-use-this
    _processTransportResponse(transportResponse) {
        const { data } = transportResponse;
        return data;
    }

    /**
     * Обрабатывает ошибку от транспорта и трансформирует в инфраструктурную ошибку
     * Особенность: знает формат ошибки сервера, какие статус коды являются ошибочными
     *
     * @param {Error} error
     * @return {ApiHttpClientError}
     */
    _processTransportError(error) {
        const { message } = error;
        // If non-transport error
        if (this._transport.constructor.isTransportError(error) === false) {
            return new ApiHttpClientError(message, {
                code: ApiHttpClientError.Code.INTERNAL,
                reason: error
            });
            // return error;
        }

        // mute cancel error
        if (this._transport.constructor.isCancel(error)) {
            return new ApiClientRequestCancel();
        }

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const {
            response,
            request,
            config: { url, data: requestData, method }
        } = error;

        const reason = { url, data: requestData, method };

        if (response) {
            const { data, status } = response;

            return new ApiHttpClientError(message, {
                data,
                code: status,
                reason
            });
        }

        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        if (request) {
            return new ApiHttpClientError(message, {
                code: ApiHttpClientError.Code.INTERNAL,
                reason
            });
        }

        // Something happened in setting up the request that triggered an Error
        return new ApiHttpClientError(message, {
            code: ApiHttpClientError.Code.INTERNAL,
            reason: error
        });
    }
}

/**
 * Creates ApiHttpClient instance
 *
 * @param {ITransport} [transport] Transport client instance
 * @return {ApiHttpClient}
 */
const create = (transport) => new ApiHttpClient(transport);

export { ApiHttpClient, ApiClientMethod, create };
