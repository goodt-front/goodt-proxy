const ResultSafeType = {
    FAIL: Symbol('Fail'),
    SUCCESS: Symbol('Success')
};

/**
 * Удобный вариант работы с результатом удачным/ошибочным
 * в виде контейнера.
 * Как безопасная альтернатива try...catch.
 */
export class SafeResult {
    /**
     * @type {symbol}
     */
    _type;

    /**
     * @type {*}
     */
    _value;

    static success(value) {
        return new SafeResult(ResultSafeType.SUCCESS, value);
    }

    static fail(value) {
        return new SafeResult(ResultSafeType.FAIL, value);
    }

    constructor(type, value) {
        this._type = type;
        this._value = value;
    }

    get isFail() {
        return this._type === ResultSafeType.FAIL;
    }

    get isSuccess() {
        return this._type === ResultSafeType.SUCCESS;
    }

    get value() {
        return this._value;
    }

    get result() {
        return this.isSuccess ? this._value : null;
    }

    get error() {
        return this.isFail ? this._value : null;
    }
}

export const { fail, success } = SafeResult;

export const isSafeResult = (value) => value instanceof SafeResult;
