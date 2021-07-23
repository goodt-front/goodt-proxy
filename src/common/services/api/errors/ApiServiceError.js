import { BaseError } from '@goodt-common/errors';

/**
 * Enum ошибок апи-сервиса
 *
 * @readonly
 * @enum string
 */
export const ApiServiceErrorCode = Object.freeze({
    INTERNAL: 'internal',
    VALIDATION: 'validation',
    FORBIDDEN: 'forbidden',
    NOT_FOUND: 'not_found',
    UNAUTHORIZED: 'unauthorized',
    UNKNOWN: 'unknown'
});

/**
 * Класс-исключение транспортного уровня для запросов к api
 * @class ApiServiceError
 */
class ApiServiceError extends BaseError {
    static Code = ApiServiceErrorCode;

    /**
     * @private
     * @member {number|string}
     */
    _code = ApiServiceErrorCode.UNKNOWN;

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
     * @param {number|string} [code]
     * @param {*} [data]
     * @param {Object} [reason]
     * @constructs Service
     */
    constructor(message, { code, data, reason } = {}) {
        super(message);

        if (code) {
            this._code = code;
        }
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
     * @member {number} Service_code
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

export { ApiServiceError, ApiServiceError as default };
