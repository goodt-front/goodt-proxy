/**
 * Конвертирует ошибку от транспорта в исключение ApiServiceError
 *
 * @param {Error} exception
 * @throw {ApiServiceError|Error}
 */
import { ApiHttpClientError } from '../error';

export const processTransportException = (exception) => {
    const { isAxiosError, message } = exception;
    // If non-axios exception
    if (isAxiosError === false) {
        return new ApiHttpClientError(message, { reason: exception });
    }

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const {
        response,
        request,
        config: { url, data: requestData, method }
    } = exception;

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
        reason: exception
    });
};

/**
 * Билдит конфиг реквеста для транспорта из FrontendApiRequest
 *
 * @param {ApiServiceRequest} request
 * @return {AxiosRequestConfig}
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
 * @typedef { import('axios').AxiosResponse } TransportResponse
 * @param {TransportResponse} transportResponse
 * @return {*}
 */
export const processTransportResponse = (transportResponse) => {
    const { data } = transportResponse;
    return data;
};
