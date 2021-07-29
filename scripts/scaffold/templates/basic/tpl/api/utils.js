/**
 * @typedef {object} RequestOptions
 * @property {{ url:string, options: import('@goodt-wcore/net').ITransportOptions }} action     action
 * @property {object} pathParams  properties to replace url placeholders with
 * @property {object} params    post/get params
 * @property {import('@goodt-wcore/net').ITransportOptions} options     options
 */
/**
 * Builds a service request
 *
 * @param {RequestOptions} requestOptions   options
 * @return {import('@goodt-common/api/types').IApiServiceRequest}   request
 */
export const buildRequest = ({ action, pathParams = {}, params = {}, options = {} }) => {
    let { url } = action;
    Object.entries(pathParams).forEach(([key, val]) => {
        url = url.replace(new RegExp(`:${key}`, 'g'), val);
    });
    return {
        url,
        params,
        options: { ...action.options, ...options }
    };
};
