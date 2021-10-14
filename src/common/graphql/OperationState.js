import { SafeResult, ResultType, useEventHook } from '@goodt-common/utils';

export class OperationState extends SafeResult {
    /**
     * @type {boolean}
     */
    isLoading;

    _resultHook = useEventHook();

    _errorHook = useEventHook();

    /**
     * @param {boolean} isLoading
     */
    constructor({ isLoading = true } = {}) {
        super(null, null);
        this.isLoading = isLoading;
    }

    /**
     *
     * @return {boolean}
     */
    get isCompleted() {
        return this._type !== null;
    }

    /**
     * @param {any} result
     */
    setResult(result) {
        this.isLoading = false;
        this._type = ResultType.SUCCESS;
        this._value = result;
        this._resultHook.trigger(result);
    }

    /**
     * @param {Error} error
     */
    setError(error) {
        this.isLoading = false;
        this._type = ResultType.FAIL;
        this._value = error;
        this._errorHook.trigger(error);
    }

    /**
     *
     * @param {function} resultCallback
     * @return {*}
     */
    onResult(resultCallback) {
        return this._resultHook.on(resultCallback);
    }

    /**
     *
     * @param {function} errorCallback
     * @return {*}
     */
    onError(errorCallback) {
        return this._errorHook.on(errorCallback);
    }
}

/**
 * @param {Record<string, OperationState>|OperationState[]} states
 * @return {{ isSuccess: boolean, isError: boolean, isCompleted: boolean, isLoading: boolean, result: any[] }}
 */
export const resolveOperationStates = (states) => {
    if (Array.isArray(states) === false) {
        states = Object.values(states);
    }

    if (states.some((state) => state == null)) {
        return {
            isSuccess: false,
            isError: false,
            isCompleted: false,
            isLoading: states.filter(Boolean).some(({ isLoading }) => isLoading),
            result: states.map((state) => (state == null ? null : state.result))
        };
    }

    return {
        isCompleted: states.every(({ isCompleted }) => isCompleted),
        isSuccess: states.every(({ isSuccess }) => isSuccess),
        isLoading: states.some(({ isLoading }) => isLoading),
        isError: states.some(({ isError }) => isError),
        result: states.map(({ result }) => result)
    };
};
