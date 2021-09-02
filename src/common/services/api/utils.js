/**
 * Builds an api service request
 *
 * @param {import('@goodt-common/api').IApiServiceRequestOptions} requestOptions options
 * @return {import('@goodt-common/api').IApiServiceRequest} request
 */
export const buildRequest = ({ action, pathParams = {}, params = {}, options = {} }) => {
    const { url: initialUrl = '', options: defaultOptions } = action;
    const url = Object.entries(pathParams).reduce(
        (finalUrl, [key, value]) => finalUrl.replace(new RegExp(`:${key}`, 'g'), value),
        initialUrl
    );

    return {
        url,
        params,
        options: { ...defaultOptions, ...options }
    };
};
