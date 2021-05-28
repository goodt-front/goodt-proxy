/**
 * @type {import('./ApiServiceRequest').ApiServiceRequestTypeEnum}
 */
export const ApiServiceRequestType = Object.freeze({
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete'
});

/**
 * @typedef {import('./ApiServiceRequest').IApiServiceRequest} IApiServiceRequest
 * @type {IApiServiceRequest}
 */
class ApiServiceRequest {
    /**
     * Название операции
     *
     * @private
     * @type  {IApiServiceRequest.operation}
     */
    _operation;

    /**
     * Данные для операции
     *
     * @private
     * @member {IApiServiceRequest.payload} payload
     */
    _payload;

    /**
     * Тип операции
     *
     * @private
     * @member {IApiServiceRequest.type} type
     */
    _type;

    /**
     * @private
     * @member {IApiServiceRequest.options} type
     */
    _options = {};

    /**
     * @public
     * @readonly
     * @type {IApiServiceRequest.operation}
     */
    get operation() {
        return this._operation;
    }

    /**
     * @public
     * @readonly
     * @type {IApiServiceRequest.payload}
     */
    get payload() {
        return this._payload;
    }

    /**
     * @public
     * @readonly
     * @type {IApiServiceRequest.options}
     */
    get options() {
        return this._options;
    }

    /**
     * @public
     * @readonly
     * @type {IApiServiceRequest.type}
     */
    get type() {
        return this._type;
    }

    /**
     * Request constructor.
     *
     * @param {IApiServiceRequest.operation} operation
     * @param {IApiServiceRequest.payload} payload?
     * @param {IApiServiceRequest.type} [type=ApiServiceRequestTypeEnum.READ]
     * @param {IApiServiceRequest.options} [options={}]
     * @constructs ApiServiceRequest
     */
    constructor(operation, payload, type, options = {}) {
        this._operation = operation;
        this._payload = payload;
        this._type = type ?? ApiServiceRequestType.READ;
        this._options = options;
    }
}

export const create = (...args) => new ApiServiceRequest(...args);

export { ApiServiceRequest, ApiServiceRequest as default };
