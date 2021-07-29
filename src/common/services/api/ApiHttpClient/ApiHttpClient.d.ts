import {
    ITransport,
    ITransportRequest,
    ITransportResponse,
    ITransportOptions
} from '@goodt-wcore/net';
/**
 * @class ApiHttpClient
 */
export class ApiHttpClient {
    /**
     * @param {ITransport} transport
     * @constructs ApiHttpClient
     */
    constructor(transport: ITransport);
    /**
     * @type {string}
     */
    public baseURL: string;
    /**
     * Transport client instance
     * @private
     * @member {ITransport}
     */
    public request(request: ITransportRequest): Promise<any>;
    public dispose(): void;

    private _transport: ITransport;
    /**
     * Создаёт конфиг реквеста для совершения запроса транспортом ITransportRequest
     * Особенность: знает формат запроса к серверу, дополнительные HTTP заголовки
     *
     * @param {ITransportRequest} request
     * @return {ITransportRequest} ITransportRequest
     * @private
     */
    protected _buildTransportRequest(request: ITransportRequest): ITransportRequest;
    /**
     * Создаёт/дополняет объект опций для транспорта ITransportOptions
     *
     * @param {ITransportOptions} transportOptions
     * @return {ITransportOptions}
     */
    protected _buildTransportOptions(transportOptions: ITransportOptions): ITransportOptions;
    /**
     * Обрабатывает ответа транспорта и возвращает целевые данные для HttpApiClient
     * Особенность: знает формат ответа сервера
     *
     * @param {ITransportResponse} transportResponse
     * @return {*}
     */
    protected _processTransportResponse(transportResponse: ITransportResponse): any;
    /**
     * Обрабатывает ошибку от транспорта и трансформирует в инфраструктурную ошибку
     * Особенность: знает формат ошибки сервера, какие статус коды являются ошибочными
     *
     * @param {Error} error
     * @return {Error}
     */
    protected _processTransportError(error: Error): Error;
}

export const ApiClientMethod: Readonly<{
    GET: string;
    POST: string;
    PATCH: string;
    DELETE: string;
}>;

export interface IApiClientRequest extends ITransportRequest {}

/**
 * Creates ApiHttpClient instance
 *
 * @param {ITransport} transport Transport client instance
 * @return {ApiHttpClient}
 */
export function create(transport: ITransport): ApiHttpClient;
