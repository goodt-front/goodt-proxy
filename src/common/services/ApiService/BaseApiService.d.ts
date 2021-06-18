/**
 * @type {import('./BaseApiService').IApiService}
 */
import {
    IApiService,
    IApiServiceConstructorOptions,
    IApiServiceOptions,
    IApiServiceRequest
} from './types';
import { ApiHttpClient, IApiClientRequest } from './ApiHttpClient';
import { ApiServiceError } from './error';
import { SafeResult } from '../../utils';
import { ITransportRequest } from '@goodt/core/net';

export class BaseApiService implements IApiService {
    /**
     * @throws ApiServiceError
     */
    constructor({ client, transport, options }: IApiServiceConstructorOptions);
    /**
     * @private
     */
    private _client: ApiHttpClient;
    /**
     * @private
     */
    private _options: IApiServiceOptions;
    /**
     *
     * @param {string} url
     */
    apiBaseURL: string | undefined;
    /**
     * @param {import('./ApiHttpClient').ApiHttpClient} client
     */
    setClient(client: ApiHttpClient): void;
    /**
     * @param {IApiServiceOptions} options
     */
    setOptions(options: IApiServiceOptions): void;
    /**
     *
     * @param {IApiServiceRequest} request
     * @return {Promise<SafeResult>}
     */
    request(request: IApiServiceRequest): Promise<SafeResult>;
    /**
     * Освобождает ресурсы, используемые сервисом
     */
    dispose(): void;
    /**
     * Билдит конфиг реквеста для клиента
     *
     * @param {IApiServiceRequest} request
     * @return {IApiClientRequest} IApiClientRequest
     */
    private _buildApiClientRequest(request: IApiServiceRequest): IApiClientRequest;
    /**
     *
     * @param {Error} error
     * @return {ApiServiceError|Error|null}
     */
    private _processError(error: Error): ApiServiceError | Error | null;
    /**
     *
     * @param {Error} error
     * @return {ApiServiceError}
     */
    private _buildApiServiceError(error: Error): ApiServiceError;
}
