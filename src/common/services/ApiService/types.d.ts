import { ISafeResult } from '@goodt/common/utils';
import { ApiServiceRequestTypeEnum } from './ApiServiceRequest';

export interface IApiServiceResponse extends ISafeResult {}

export interface IApiServiceRequest {
    operation: string;
    payload?: Record<string, any>;
    type?: ApiServiceRequestTypeEnum;
    options?: IApiServiceOptions;
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
