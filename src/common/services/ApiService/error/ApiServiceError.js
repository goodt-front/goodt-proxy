/**
 * Класс-исключение транспортного уровня для запросов к api
 * @class ApiServiceError
 */
class ApiServiceError extends Error {
    /**
     * @private
     * @member {number}
     */
    _code;

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
     * @param {number} [code]
     * @param {*} [data]
     * @param {Object} [reason]
     * @constructs Service
     */
    constructor(message, { code = 0, data, reason } = {}) {
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
