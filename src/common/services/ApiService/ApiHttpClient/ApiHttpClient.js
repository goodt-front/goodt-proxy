import { buildTransportRequest, processTransportError, processTransportResponse } from './utils';

/**
 * @typedef { import('@goodt/core/net').ITransport } ITransport
 * @typedef { import('../ApiServiceRequest').ApiServiceRequest } ApiServiceRequest
 * @typedef { import('@goodt/core/net').ITransportOptions } ITransportOptions
 */

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
     * @param {ITransport} [transport]
     * @constructs ApiHttpClient
     */
    constructor(transport) {
        this._transport = transport;
    }

    /**
     * @public
     * @async
     * @method ApiHttpClient#request
     * @param {ApiServiceRequest} request
     *
     * @throw {ApiHttpClientError|Error}
     * @return {Promise<*>}
     */
    async request(request) {
        const requestConfig = buildTransportRequest(request);
        try {
            const response = await this._transport.request(requestConfig);
            return processTransportResponse(response);
        } catch (error) {
            const exception = processTransportError(error, this._transport);
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
 * @param {ITransport} [transport] Transport client instance
 * @return {ApiHttpClient}
 */
const create = (transport) => new ApiHttpClient(transport);

export { ApiHttpClient, create };
