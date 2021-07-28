/**
 * @typedef {object} RequestOptions
 * @property {{ url:string, options: import('@goodt-wcore/net').ITransportOptions }} action     action
 * @property {object} urlBinds  properties to replace url placeholders with
 * @property {object} params    post/get params
 * @property {import('@goodt-wcore/net').ITransportOptions} options     options
 */
/**
 * Builds a service request
 *
 * @param {RequestOptions} requestOptions   options
 * @return {import('@goodt-common/api/types').IApiServiceRequest}   request
 */
export const buildRequest = ({ action, urlBinds = {}, params = {}, options = {} }) => {
    let { url } = action;
    Object.entries(urlBinds).forEach(([key, val]) => {
        url = url.replace(new RegExp(`:${key}`, 'g'), val);
    });
    return {
        url,
        params,
        options: { ...action.options, ...options }
    };
};
