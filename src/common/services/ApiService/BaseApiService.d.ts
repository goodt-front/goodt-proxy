import { SafeResult } from '@goodt/common/utils';
import { ITransportOptions, ITransportRequest } from '@goodt/core/net';

interface ISafeResult extends InstanceType<typeof SafeResult> {}

export interface IServiceResponse extends ISafeResult {}

export interface IServiceRequest {
    operation: string;
    payload: string;
    options: ITransportOptions;
}

export interface IService {
    /**
     * Make async request and returns response promise
     */
    request(request: IServiceRequest): Promise<IServiceResponse>;
    /**
     * Disposes transport-related resources
     * (cancel requests, close connections, streams, release memory, sending abort signals and etc.)
     */
    dispose(): void;
}

export const BaseApiService: IService;
