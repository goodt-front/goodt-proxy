/**
 * Удобный вариант работы с результатом удачным/ошибочным
 * в виде контейнера.
 * Как безопасная альтернатива try...catch.
 */
export class SafeResult {
    static success(value: any): SafeResult;

    static fail(value: any): SafeResult;

    constructor(type: any, value: any);

    /**
     * @type {symbol}
     */
    private _type: symbol;
    /**
     * @type {*}
     */
    private _value: any;

    isFail: boolean;
    isError: boolean;
    isSuccess: boolean;
    value: Error | null | any;
    result: any;
    error: Error | null;
}

export function fail(value: Error | null): SafeResult;

export function success(value: any): SafeResult;

export function isSafeResult(value: any): boolean;

export interface ISafeResult extends InstanceType<typeof SafeResult> {}
