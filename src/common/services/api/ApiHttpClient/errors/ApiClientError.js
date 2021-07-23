import { InfrastructureError } from '@goodt-common/errors';

/**
 * @typedef { import('./ApiClientError').TApiHttpClientErrorCode } TApiHttpClientErrorCode
 */

/**
 * Enum ошибок апи-сервиса
 *
 * @readonly
 * @enum string
 */
export const ApiHttpClientErrorCode = Object.freeze({
    INTERNAL: 0,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400
});

/**
 * Класс-исключение транспортного уровня для запросов к api
 * @class ApiHttpClientError
 */
class ApiHttpClientError extends InfrastructureError {
    static Code = ApiHttpClientErrorCode;

    /**
     * @private
     * @type {TApiHttpClientErrorCode} [code]
     */
    _code = ApiHttpClientErrorCode.INTERNAL;

    /**
     * @private
     * @member {*}
     */
    _data;

    /**
     * Ошибка вызвавшая exception
     * @private
     * @member {Object}
     */
    _reason;

    /**
     *
     * @param {string} [message]
     * @param {TApiHttpClientErrorCode} [code]
     * @param {*} [data]
     * @param {Object} [reason]
     * @constructs Service
     */
    constructor(message, { code = ApiHttpClientErrorCode.INTERNAL, data, reason } = {}) {
        super(message);
        this.name = this.constructor.name;
        this._code = code;
        this._data = data;
        this._reason = reason;
    }

    /**
     * Данные пришедшие в ответе в
     * @public
     * @readonly
     * @member {*} Service_data
     */
    get data() {
        return this._data;
    }

    /**
     * HTTP status code
     * @public
     * @readonly
     * @type {TApiHttpClientErrorCode}
     * @return {TApiHttpClientErrorCode}
     */
    get code() {
        return this._code;
    }

    /**
     * Дополнительная информация о причине ошибки
     * @public
     * @readonly
     * @member {Object} Service_reason
     */
    get reason() {
        return this._reason;
    }
}

export { ApiHttpClientError, ApiHttpClientError as default };
