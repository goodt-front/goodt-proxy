export const ResultType = {
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
        return new SafeResult(ResultType.SUCCESS, value);
    }

    static fail(value) {
        return new SafeResult(ResultType.FAIL, value);
    }

    constructor(type, value) {
        this._type = type;
        this._value = value;
    }

    get isError() {
        return this._type === ResultType.FAIL;
    }

    get isSuccess() {
        return this._type === ResultType.SUCCESS;
    }

    get result() {
        return this.isSuccess ? this._value : null;
    }

    get error() {
        return this.isError ? this._value : null;
    }
}

export const { fail, success } = SafeResult;

export const isSafeResult = (value) => value instanceof SafeResult;
