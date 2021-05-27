import { ApiClientRequestCancel, ApiServiceError, ApiServiceErrorCode } from './error';
import { ApiHttpClientError } from './error/ApiClientError';

/**
 *
 * @param {Error} error
 * @return {ApiServiceError}
 */
const buildApiServiceError = (error) => {
    const { message, code, data, reason } = error;

    const apiServiceErrorCode = (() => {
        if (code === 401) {
            return ApiServiceErrorCode.UNAUTHORIZED;
        }
        if (code === 404) {
            return ApiServiceErrorCode.NOT_FOUND;
        }
        if (code === 403) {
            return ApiServiceErrorCode.FORBIDDEN;
        }
        if (code >= 400) {
            return ApiServiceErrorCode.INTERNAL;
        }

        return ApiServiceErrorCode.UNKNOWN;
    })();

    const apiServiceError = new ApiServiceError(message, {
        code: apiServiceErrorCode,
        data,
        reason
    });

    return apiServiceError;
};
/**
 *
 * @param {Error} error
 * @return {ApiServiceError|Error|null}
 */
export const processError = (error) => {
    if (error instanceof ApiHttpClientError) {
        const apiServiceError = buildApiServiceError(error);
        return apiServiceError;
    }
    if (error instanceof ApiClientRequestCancel) {
        return null;
    }

    /**
     * async uncaught error throw for top level error tracking service
     */
    setTimeout(() => {
        throw error;
    });

    return error;
};
