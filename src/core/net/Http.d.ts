import {
    ITransport,
    ITransportConstructor,
    ITransportOptions,
    ITransportRequest,
    ITransportResponse
} from './types';
import { CancelTokenSource, AxiosRequestConfig, AxiosInstance } from 'axios';
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
 * @param {ITransportOptions} [options={}]  transport config
 */
export class Http implements ITransport {
    /** @type {RequestRecord[]} */
    private _requests: RequestRecord[];
    /** @type {AxiosRequestConfig} */
    options: ITransportOptions;
    axios: AxiosInstance;

    /**
     * Constructor
     *
     * @param {AxiosRequestConfig} [options={}] Transport config
     */
    constructor(options?: ITransportOptions);
    /**
     * Creates a new request
     *
     * @param {RequestConfig} config per-request config
     * @return {RequestPromise}
     */
    request(config: ITransportRequest): Promise<ITransportResponse>;
    /**
     * Disposes http transport related resources
     */
    dispose(): void;
    /**
     * Cancel active RequestPromise
     *
     * @param {number} id   request id
     */
    cancelRequest(id: number): void;
    /**
     * Cancel all active RequestPromises
     */
    cancelAllRequests(): void;
    /**
     * Returns the base url
     *
     * @return {string}
     */
    getBaseUrl(): string;
    /**
     * Registers a new cancel source
     *
     * @private
     * @param {number} id   id
     * @param {CancelTokenSource} cancelTokenSource cancel Token Source
     */
    private _registerRequest;
    /**
     * @private
     */
    private _unregisterRequest;
}

export type RequestRecord = {
    id: number;
    source: CancelTokenSource;
};

export { Http as default };
