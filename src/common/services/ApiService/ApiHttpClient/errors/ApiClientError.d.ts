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
}>;

/**
 * Enum ошибок апи-сервиса
 */
export type TApiHttpClientErrorCode = typeof ApiHttpClientErrorCode[keyof typeof ApiHttpClientErrorCode];
/**
 * Класс-исключение транспортного уровня для запросов к api
 * @class ApiHttpClientError
 */
export class ApiHttpClientError {
    static Code: typeof ApiHttpClientErrorCode;
    /**
     *
     * @param {string} [message]
     * @param {number} [code]
     * @param {*} [data]
     * @param {Object} [reason]
     * @constructs Service
     */
    constructor(message?: string, { code, data, reason }?: number);
    /**
     * @private
     * @member {number}
     */
    private _code: TApiHttpClientErrorCode;
    /**
     * @private
     * @member {*}
     */
    private _data;
    /**
     * Ошибка вызвавшая exception
     * @private
     * @member {Object}
     */
    private _reason;
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
