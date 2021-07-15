import { ITransport, ITransportRequest, ITransportResponse } from '@goodt-wcore/core/net';
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
    private _buildTransportRequest: ITransportRequest;
    /**
     * Обрабатывает ответа транспорта и возвращает целевые данные для HttpApiClient
     * Особенность: знает формат ответа сервера
     *
     * @param {ITransportResponse} transportResponse
     * @return {*}
     */
    private _processTransportResponse(transportResponse: ITransportResponse): any;
    /**
     * Обрабатывает ошибку от транспорта и трансформирует в инфраструктурную ошибку
     * Особенность: знает формат ошибки сервера, какие статус коды являются ошибочными
     *
     * @param {Error} error
     * @return {Error}
     */
    private _processTransportError(error: Error): Error;
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
