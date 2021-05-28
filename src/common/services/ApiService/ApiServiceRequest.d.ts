export type IApiServiceRequestType = string;

export type ApiServiceRequestTypeEnum = Readonly<{
    READ: 'read';
    DELETE: 'delete';
    CREATE: 'create';
    UPDATE: 'update';
}>;

export interface IApiServiceRequest {
    operation: string;
    payload?: Record<string, any> | {};
    type?: ApiServiceRequestTypeEnum[keyof ApiServiceRequestTypeEnum];
    options?: Record<string, any> | {};
}
