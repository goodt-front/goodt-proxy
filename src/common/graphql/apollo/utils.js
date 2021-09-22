/**
 *
 * @param {string} token
 * @param {Record<string, string>} defaults
 * @return {{authorization: (string)}}
 */
export const buildApolloClientHeaders = ({ token }, defaults = {}) => ({
    ...defaults,
    authorization: token ? `Bearer ${token}` : ''
});
