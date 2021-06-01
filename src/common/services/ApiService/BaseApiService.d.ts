/**
 * @type {import('./BaseApiService').IApiService}
 */
import {
    IApiService,
    IApiServiceConstructorOptions,
    IApiServiceOptions,
    IApiServiceRequest
} from './types';
import { ApiHttpClient } from './ApiHttpClient';
import { ApiServiceError } from './error';

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
     * @param {import('./ApiServiceRequest')} request
     * @return {Promise<SafeResult>}
     */
    request(request: IApiServiceRequest): Promise<any>;
    /**
     * Освобождает ресурсы, используемые сервисом
     */
    dispose(): void;
    /**
     * Билдит конфиг реквеста для клиента
     *
     * @param {IApiServiceRequest} request
     * @return {import('@goodt/core/net').ITransportRequest} ITransportRequest
     */
    _buildApiClientRequest(request: IApiServiceRequest): ITransportRequest;
    /**
     *
     * @param {Error} error
     * @return {ApiServiceError|Error|null}
     */
    _processError(error: Error): ApiServiceError | Error | null;
    /**
     *
     * @param {Error} error
     * @return {ApiServiceError}
     */
    _buildApiServiceError(error: Error): ApiServiceError;
}
