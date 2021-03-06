import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

// @private
let REQUEST_ID = 0;
/**
 * @typedef {Promise} RequestPromise
 * @property {number} id
 */
/**
 * @typedef {object} RequestRecord
 * @property {number} id
 * @property {CancelTokenSource} source
 */
/**
 * @typedef {object} RequestConfig
 * @property {string} url               url
 * @property {string} [method='get']    request method
 * @property {Record<string, any>} [params={}]       params
 * @property {Record<string, any>} [options={}]      request options (axios)
 * @property {Function} [responseHandler=null]     response handler
 */
/**
 * HTTP Transport Client implementation
 * with Axios HTTP Client underhood
 * and extra service-specific behaviour
 *
 * @implements {import('./types').ITransportConstructor}
 */
class Http {
    /**
     * Checks if specified error is transport-related
     *
     * @param {Error} error
     * @return {boolean}
     */
    static isTransportError(error) {
        return axios.isAxiosError(error);
    }

    /**
     * Checks if specified error is cancel request-related
     * @param {Error} error
     * @return {boolean}
     */
    static isCancel(error) {
        return axios.isCancel(error);
    }

    /**
     * Constructor
     *
     * @param {import('./types').ITransportOptions} [options={}] transport config
     */
    constructor(options = {}) {
        /** @type {RequestRecord[]} */
        this._requests = [];
        this.axios = axios.create(this.options);
    }

    /**
     * Creates a new request
     *
     * @param {RequestConfig} config per-request config
     * @return {RequestPromise}
     */
    request({ url, method = 'get', params = {}, options = {}, responseHandler = null }) {
        const source = axios.CancelToken.source();
        const requestId = REQUEST_ID++;
        const request = {
            method,
            url,
            cancelToken: source.token,
            ...options
        };
        if (method.toLocaleLowerCase() === 'get') {
            request.params = params;
        } else {
            request.data = params;
        }
        /** @type {RequestPromise} */
        const promise = new Promise((resolve, reject) => {
            this._registerRequest(requestId, source);
            this.axios
                .request(request)
                .then((response) => {
                    this._unregisterRequest(requestId);
                    if (typeof response.data === 'object' && response.data.error) {
                        reject(response.data.error);
                        return;
                    }
                    resolve(responseHandler ? responseHandler(response) : response);
                })
                .catch((error) => {
                    this._unregisterRequest(requestId);
                    reject(error);
                });
        });
        // @ts-ignore
        promise.id = requestId;
        return promise;
    }

    /**
     * Disposes http transport related resources
     */
    dispose() {
        this.cancelAllRequests();
    }

    /**
     * Cancel active RequestPromise
     *
     * @param {number} id   request id
     */
    cancelRequest(id) {
        const i = this._requests.findIndex((item) => item.id === id);
        if (i < 0) {
            return;
        }
        const item = this._requests[i];
        item.source.cancel('canceled');
        this._requests.splice(i, 1);
    }

    /**
     * Cancel all active RequestPromises
     */
    cancelAllRequests() {
        this._requests.forEach((item) => item.source.cancel('canceled'));
        this._requests = [];
    }

    /**
     *
     * @return {string}
     */
    get baseURL() {
        return this.axios.defaults.baseURL;
    }

    /**
     *
     * @param baseURL
     */
    set baseURL(baseURL) {
        this.axios.defaults.baseURL = baseURL;
    }

    /**
     * Returns the base url
     *
     * @return {string}
     */
    getBaseUrl() {
        return this.baseURL;
    }

    /**
     * Registers a new cancel source
     *
     * @private
     * @param {number} id   id
     * @param {CancelTokenSource} cancelTokenSource cancel Token Source
     */
    _registerRequest(id, cancelTokenSource) {
        this._requests.push({ id, source: cancelTokenSource });
    }

    /**
     * @private
     */
    _unregisterRequest(id) {
        this._requests = this._requests.filter((item) => item.id !== id);
    }
}

export { Http, Http as default };
