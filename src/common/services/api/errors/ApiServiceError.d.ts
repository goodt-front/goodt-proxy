/**
 * Enum ошибок апи-сервиса
 */
export type TApiServiceErrorCode = Readonly<{
    INTERNAL: 'internal';
    VALIDATION: 'validation';
    FORBIDDEN: 'forbidden';
    NOT_FOUND: 'not_found';
    UNAUTHORIZED: 'unauthorized';
    UNKNOWN: 'unknown';
}>;
/**
 * Enum ошибок апи-сервиса
 *
 * @readonly
 * @enum string
 */
export const ApiServiceErrorCode: TApiServiceErrorCode;
/**
 * Класс-исключение транспортного уровня для запросов к api
 * @class ApiServiceError
 */
export class ApiServiceError {
    static Code: TApiServiceErrorCode;
    /**
     *
     * @param {string} [message]
     * @param {number|string} [code]
     * @param {*} [data]
     * @param {Object} [reason]
     * @constructs Service
     */
    constructor(message?: string, { code, data, reason }?: number | string);
    /**
     * @private
     * @member {number|string}
     */
    private _code: number | string;
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
    private _reason: Record<string, any> | Error;
    /**
     * Данные пришедшие в ответе в
     * @public
     * @readonly
     * @member {*} Service_data
     */
    public data: any;
    /**
     * HTTP status code
     * @public
     * @readonly
     * @member {number} Service_code
     */
    public code: string;
    /**
     * Дополнительная информация о причине ошибки
     * @public
     * @readonly
     * @member {Object} Service_reason
     */
    public reason: Record<string, any> | Error | undefined;
}

export { ApiServiceError as default };
