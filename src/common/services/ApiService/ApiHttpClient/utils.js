/**
 * Конвертирует ошибку от транспорта в исключение ApiServiceError
 *
 * @param {Error} exception
 * @throw {ApiServiceError|Error}
 */
import { ApiHttpClientError, ApiClientRequestCancel } from '../error';

/**
 *
 * @param error
 * @param {ITransport} transport
 * @return {Error}
 */
export const processTransportError = (error, transport) => {
    const { message } = error;
    // If non-transport error
    if (transport.constructor.isTransportError(error) === false) {
        return new ApiHttpClientError(message, { reason: error });
    }

    // mute cancel error
    if (transport.constructor.isCancel(error)) {
        return new ApiClientRequestCancel();
    }

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const {
        response,
        request,
        config: { url, data: requestData, method }
    } = error;

    const reason = { url, data: requestData, method };

    if (response) {
        const { data, status } = response;

        return new ApiHttpClientError(message, {
            data,
            code: status,
            reason
        });
    }

    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    if (request) {
        return new ApiHttpClientError(message, {
            code: 0,
            reason
        });
    }

    // Something happened in setting up the request that triggered an Error
    return new ApiHttpClientError(message, {
        code: 0,
        reason: error
    });
};

/**
 * Билдит конфиг реквеста для транспорта из ITransportRequest
 *
 * @param {ApiServiceRequest} request
 * @return {import('@goodt/core/net').ITransportRequest} ITransportRequest
 */
export const buildTransportRequest = (request) => {
    const {
        operation: url,
        payload: params,
        options: { method }
    } = request;

    if (!url) {
        throw new ApiHttpClientError('Empty url or pathname');
    }

    return {
        url,
        method,
        ...(params && { params })
    };
};

/**
 * Обрабатывает ответа Axios и возвращает целевые данные для HttpApiClient
 * @param {import('@goodt/core/net').ITransportResponse} transportResponse
 * @return {*}
 */
export const processTransportResponse = (transportResponse) => {
    const { data } = transportResponse;
    return data;
};
