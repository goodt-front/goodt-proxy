import { joinPathParts } from './path';

const PROTOCOL_BASE = 'https:';
const ORIGIN_FAKE_HOST = `fake`;
const ORIGIN_FAKE_PROTOCOL = PROTOCOL_BASE;
const ORIGIN_PART_NAMES = ['origin', 'protocol', 'host', 'hostname', 'username', 'password', 'port'];

/**
 * Checks if URL instance was originally created without 'origin' / 'host' + 'protocol' parts
 *
 * @param {URL} url
 * @return {boolean}
 */
const isRelativeURL = (url) => {
    return url.host === ORIGIN_FAKE_HOST;
};

/**
 * Creates original URL from string safely by adding fake origin if no origin specified
 *
 * @param {string} url
 * @return {URL}
 */
const createURLFromStringSafe = (url) => {
    try {
        // absolute path
        return new globalThis.URL(url);
    } catch {
        return new globalThis.URL(url, [ORIGIN_FAKE_PROTOCOL, '//', ORIGIN_FAKE_HOST].join(''));
    }
};

/**
 * Creates extended URL from string with Proxy and extra logic
 *
 * @param {string} urlString
 * @return {URL}
 */
const createURLFromString = (urlString) => {
    const url = createURLFromStringSafe(urlString);

    return new Proxy(url, {
        set(target, propKey, propValue) {
            if (propKey === 'query') {
                target.search = new URLSearchParams(propValue).toString();
            }
            if (propKey === 'path') {
                target.pathname = propValue;
            }
            if (propKey in target) {
                target[propKey] = propValue;
            }

            return true;
        },

        get(target, propKey, receiver) {
            const isRelative = isRelativeURL(target);

            if (propKey === 'href') {
                return receiver.toString();
            }
            if (propKey === 'isAbsolute') {
                return isRelative === false;
            }
            if (propKey === 'isRelative') {
                return isRelative;
            }
            if (propKey === 'query') {
                return Object.fromEntries(target.searchParams);
            }
            if (propKey === 'path') {
                return target.pathname;
            }
            if (isRelative) {
                // if relative url
                if (ORIGIN_PART_NAMES.includes(propKey)) {
                    return undefined;
                }
                if (propKey === 'toString') {
                    return () => target.toString().replace([target.protocol, '//', target.host].join(''), '');
                }
            }
            const propValue = target[propKey];
            return typeof propValue === 'function' ? propValue.bind(target) : propValue;
        },
        has(target, propKey) {
            if (isRelativeURL(target) && ORIGIN_PART_NAMES.includes(propKey)) {
                return false;
            }
            return Reflect.has(...arguments) || ['isRelative', 'isAbsolute', 'query', 'path'].includes(propKey);
        }
    });
};

/**
 * @typedef {import('./url').UrlParts} UrlParts
 */

/**
 * Creates extended URL instance using createURLFromString under hood
 * from common url key-value object with parts by known URL public
 * interface props
 *
 * @param {UrlParts} parts
 * @return {URL}
 */
const createURLFromParts = (parts) => {
    const {
        href,
        host,
        hostname,
        origin,
        path,
        pathname,
        searchParams,
        query,
        search: queryString,
        ...restUrlParts
    } = parts;

    // prettier-ignore
    const resolvedHref = href
        ?? origin
        ?? ((hostname ?? host)
            ? [PROTOCOL_BASE, '//', hostname ?? host].join('')
            : null)
        ?? '';

    const url = createURLFromString(resolvedHref);

    // prettier-ignore
    new URLSearchParams(query ?? queryString ?? searchParams)
        .forEach((queryValue, queryName) => {
            url.searchParams.append(queryName, queryValue);
        });

    const pathResolved = path ?? pathname;
    if (pathResolved != null) {
        url.pathname = pathResolved;
    }

    return Object.assign(url, restUrlParts);
};

/**
 * @param {string|UrlParts} input
 * @return {URL}
 */
const create = (input) => {
    if (typeof input === 'string') {
        return createURLFromString(input);
    }
    if (typeof input === 'object') {
        return createURLFromParts(input);
    }
    throw new Error(`Argument invalid type: '${typeof input}'`);
};

/**
 * Utility class – window.URL wrapper with safe constructor.
 * Allows create URL instance without origin/host/protocol
 **/
export class Url {
    /**
     *
     * @param {string|UrlParts} [input='']
     * @return {URL}
     */
    static create(input = '') {
        return new Url(input);
    }

    static join = joinPathParts;

    /**
     *
     * @param {string|UrlParts} [input='']
     * @return {URL}
     */
    constructor(input = '') {
        return create(input);
    }
}
