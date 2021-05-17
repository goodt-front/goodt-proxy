/**
 *
 */
class ApiServiceRequest {
    /**
     * Название операции
     *
     * @private
     * @member {string} operation
     */
    _operation;

    /**
     * Данные для
     *
     * @private
     * @member {object} payload
     */
    _payload;

    /**
     *
     */
    _options = {};

    /**
     * @public
     * @readonly
     * @member {string} operation
     */
    get operation() {
        return this._operation;
    }

    /**
     * @public
     * @readonly
     * @member {object} payload
     */
    get payload() {
        return this._payload;
    }

    /**
     * Request constructor.
     *
     * @param {string} operation
     * @param {object} [payload]
     * @param {{ method: string }} [options={}]
     * @constructs FrontendApiRequest
     */
    constructor(operation, payload, options = {}) {
        this._operation = operation;
        this._payload = payload;

        this._options = {};
    }
}

export const create = (...args) => new ApiServiceRequest(...args);

export { ApiServiceRequest, ApiServiceRequest as default };
