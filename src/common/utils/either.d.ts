/**
 * Удобный вариант работы с результатом удачным/ошибочным
 * в виде контейнера.
 * Как безопасная альтернатива try...catch.
 */
export class SafeResult<TSuccessValue extends any, TFailValue extends Error | null>
    implements ISafeResult {
    static success(value: TSuccessValue): SafeResult;

    static fail(value: TFailValue): SafeResult;

    constructor(type: any, value: any);

    /**
     * @type {symbol}
     */
    private _type: symbol;
    /**
     * @type {*}
     */
    private _value: TSuccessValue | TFailValue;

    isFail: boolean;
    isError: boolean;
    isSuccess: boolean;
    value: TSuccessValue | TFailValue;
    result: TSuccessValue;
    error: TFailValue;
}

export function fail(value: Error | null): SafeResult;

export function success(value: any): SafeResult;

export function isSafeResult(value: any): boolean;

export interface ISafeResult<TSuccessValue extends any, TFailValue extends Error> {
    isFail: boolean;
    isError: boolean;
    isSuccess: boolean;
    value: TSuccessValue | TFailValue | null;
    result: TSuccessValue;
    error: Error | null;
}
