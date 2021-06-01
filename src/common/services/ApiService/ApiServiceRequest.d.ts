import { IApiServiceRequest } from './BaseApiService';

export type ApiServiceRequestTypeEnum = Readonly<{
    READ: 'read';
    DELETE: 'delete';
    CREATE: 'create';
    UPDATE: 'update';
}>;

export const ApiServiceRequestType: ApiServiceRequestTypeEnum;

export interface IApiServiceRequest extends IApiServiceRequest {
    type?: ApiServiceRequestTypeEnum[keyof ApiServiceRequestTypeEnum];
}
