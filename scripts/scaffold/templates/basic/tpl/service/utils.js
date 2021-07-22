/**
 * @typedef {object} RequestOptions
 * @property {{ url:string, options: import('@goodt-wcore/net').ITransportOptions }} action
 * @property {object} urlBinds
 * @property {object} params
 * @property {import('@goodt-wcore/net').ITransportOptions} options
 */
/**
 * Builds service a request
 * @param {RequestOptions} requestOptions
 * @return {import('@goodt-common/api/types').IApiServiceRequest}
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
