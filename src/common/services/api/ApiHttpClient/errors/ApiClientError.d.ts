import { InfrastructureError } from '@goodt-common/errors';

/**
 * Enum ошибок апи-сервиса
 *
 * @readonly
 * @enum string
 */
export const ApiHttpClientErrorCode: Readonly<{
    FORBIDDEN: 403;
    NOT_FOUND: 404;
    UNAUTHORIZED: 401;
    INTERNAL_SERVER_ERROR: 500;
    BAD_REQUEST: 400;
    INTERNAL: 0;
}>;

/**
 * Enum ошибок апи-сервиса
 */
export type TApiHttpClientErrorCode = typeof ApiHttpClientErrorCode[keyof typeof ApiHttpClientErrorCode];
/**
 * Класс-исключение транспортного уровня для запросов к api
 * @class ApiHttpClientError
 */
export class ApiHttpClientError extends InfrastructureError {
    static Code: typeof ApiHttpClientErrorCode = ApiHttpClientErrorCode;
    /**
     *
     * @param {string} [message]
     * @param {TApiHttpClientErrorCode} [code]
     * @param {*} [data]
     * @param {Object} [reason]
     * @constructs Service
     */
    constructor(
        message?: string,
        { code, data, reason }?: { code?: string; data?: any; reason?: any }
    );
    /**
     * @private
     * @type {TApiHttpClientErrorCode}
     */
    private _code: TApiHttpClientErrorCode = ApiHttpClientErrorCode.INTERNAL;
    /**
     * @private
     * @member {*}
     */
    private _data: any;
    /**
     * Ошибка вызвавшая exception
     * @private
     * @member {Object}
     */
    private _reason: any;
    name: string;
    /**
     * Данные пришедшие в ответе в
     * @public
     * @readonly
     * @member {*} Service_data
     */
    public get data(): any;
    /**
     * HTTP status code
     * @public
     * @readonly
     * @member {number} Service_code
     */
    public get code(): TApiHttpClientErrorCode;
    /**
     * Дополнительная информация о причине ошибки
     * @public
     * @readonly
     * @member {Object} Service_reason
     */
    public get reason(): any;
}

export { ApiHttpClientError as default };
