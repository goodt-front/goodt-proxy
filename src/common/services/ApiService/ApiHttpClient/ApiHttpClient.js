import {
    buildTransportRequest,
    processTransportException,
    processTransportResponse
} from './utils';

/**
 * @typedef { import('axios').AxiosInstance } AxiosInstance
 * @typedef { import('FrontendApiRequest') } FrontendApiRequest
 * @typedef { import('axios').AxiosRequestConfig } AxiosRequestConfig
 */

/**
 * @class ApiHttpClient
 */
class ApiHttpClient {
    /**
     * Transport client instance
     * @private
     * @member {AxiosInstance}
     */
    _transport;

    /**
     * @param {AxiosInstance} [transport=defaultTransportInstance]
     * @constructs ApiHttpClient
     */
    constructor(transport) {
        this._transport = transport;
    }

    /**
     * @public
     * @async
     * @method ApiHttpClient#request
     * @param {FrontendApiRequest} request
     *
     * @throw {ApiHttpClientError|Error}
     * @return {Promise<*>}
     */
    async request(request) {
        const requestConfig = buildTransportRequest(request);
        try {
            const response = await this._transport.request(requestConfig);
            return processTransportResponse(response);
        } catch (e) {
            const exception = processTransportException(e);
            throw exception;
        }
    }

    dispose() {
        if (typeof this._transport.dispose === 'function') {
            this._transport.dispose();
        }
    }
}

/**
 * Creates ApiHttpClient instance
 *
 * @param {AxiosInstance} [transport] Transport client instance
 * @return {ApiHttpClient}
 */
const create = (transport) => new ApiHttpClient(transport);

export { ApiHttpClient, create };
