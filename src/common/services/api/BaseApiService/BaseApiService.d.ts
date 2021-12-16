import { SafeResult } from '@goodt-common/utils';
import { IApiService, IApiServiceConstructorOptions, IApiServiceOptions, IApiServiceRequest } from '../types';
import { ApiHttpClient, IApiClientRequest } from '../ApiHttpClient';
import { ApiServiceError } from '../error';

export class BaseApiService implements IApiService {
    /**
     * @throws ApiServiceError
     */
    constructor({ client, transport, options }: IApiServiceConstructorOptions);
    /**
     * @protected
     */
    protected _client: ApiHttpClient;
    /**
     * @protected
     */
    protected _options: IApiServiceOptions;
    /**
     *
     * @param {string} url
     */
    apiBaseURL: string | undefined;
    /**
     * @param {import('./../ApiHttpClient').ApiHttpClient} client
     */
    setClient(client: ApiHttpClient): void;
    /**
     * @param {IApiServiceOptions} options
     */
    setOptions(options: IApiServiceOptions): void;
    /**
     *
     * @param {IApiServiceRequest} request
     * @return {Promise<import('@goodt-common/utils').ISafeResult<*, Error>>}
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
    protected _buildApiClientRequest(request: IApiServiceRequest): IApiClientRequest;
    /**
     *
     * @param {Error} error
     * @return {ApiServiceError|Error|null}
     */
    protected _processError(error: Error): ApiServiceError | Error | null;
    /**
     *
     * @param {Error} error
     * @return {ApiServiceError}
     */
    protected _buildApiServiceError(error: Error): ApiServiceError;
}
