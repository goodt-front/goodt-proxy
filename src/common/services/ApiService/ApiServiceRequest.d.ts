import { IServiceRequest } from './BaseApiService';

export type ApiServiceRequestTypeEnum = Readonly<{
    READ: 'read';
    DELETE: 'delete';
    CREATE: 'create';
    UPDATE: 'update';
}>;

export interface IApiServiceRequest extends IServiceRequest {
    type?: ApiServiceRequestTypeEnum[keyof ApiServiceRequestTypeEnum];
}
