/**
 * @interface ITransport
 */
import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * @interface ITransportOptions
 */
export interface ITransportOptions extends AxiosRequestConfig {}

export interface ITransportResponse extends AxiosResponse {}

export type ITransportRequestParams = AxiosRequestConfig['params'] | AxiosRequestConfig['data'];

export interface ITransportRequest {
    /**
     * url
     */
    url: string;
    /**
     * request method
     */
    method?: string;
    /**
     * params
     */
    params?: ITransportRequestParams;
    /**
     * request options (axios)
     */
    options?: ITransportOptions;
    /**
     * response handler
     */
    responseHandler?: (response: ITransportResponse) => any;
}

export interface ITransport {
    /**
     * Make async request and returns response promise
     */
    request(options: ITransportRequest): Promise<ITransportResponse>;
    /**
     * Disposes transport-related resources
     * (cancel requests, close connections, streams, release memory, sending abort signals and etc.)
     */
    dispose(): void;
}

/**
 * @interface ITransportConstructor
 */
export interface ITransportConstructor {
    new (options?: ITransportOptions): ITransport;
}

export interface ITransportFactoryOptions extends ConstructorParameters<ITransportConstructor> {}

/**
 * @interface ITransportFactory
 */
export interface ITransportFactory {
    (...args: ITransportFactoryOptions): InstanceType<ITransportConstructor>;
}
