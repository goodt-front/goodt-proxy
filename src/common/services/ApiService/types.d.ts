import { ITransportOptions } from '@goodt/core/net';
import { ISafeResult } from '@goodt/common/utils';

export interface IApiServiceResponse extends ISafeResult {}

export interface IApiServiceRequest {
    url: string;
    params?: Record<string, any>;
    options?: ITransportOptions;
}

export interface IApiServiceOptions {
    apiBaseURL?: string;
    ttl?: number;
}

export interface IApiServiceConstructor {
    new (options?: IApiServiceConstructorOptions): IApiService;
}

export interface IApiServiceConstructorOptions {
    client?: typeof ApiHttpClient;
    transport?: ITransport;
    options?: IApiServiceOptions;
}

export interface IApiService {
    /**
     * Make async request and returns response promise
     */
    request(request: IApiServiceRequest): Promise<IApiServiceResponse>;

    /**
     * Disposes transport-related resources
     * (cancel requests, close connections, streams, release memory, sending abort signals and etc.)
     */
    dispose(): void;
}
