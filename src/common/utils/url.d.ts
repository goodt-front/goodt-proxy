type UrlPartQuery = Record<string, string | number | boolean | null | undefined>;

interface UrlPartsExtra {
    /**
     * Key-value object with search string pairs key=value
     */
    query: UrlPartQuery;

    /**
     * Alias for URL's `pathname` to meet RouteManager Public Interface
     */
    path: string;
}

interface UrlInstance extends UrlPartsExtra, URL {
    /**
     * Indicates if url includes host parts
     */
    isAbsolute: boolean;

    /**
     * Indicates if url not includes host parts
     */
    isRelative: boolean;
}

/**
 * Type for input object
 */
type UrlParts = Partial<UrlPartsExtra> & Partial<Omit<URL, 'toString' | 'toJSON'>>;

/**
 * Utility class – window.URL wrapper with safe constructor.
 * Allows create URL instance without origin/host/protocol
 **/
export class Url implements UrlInstance {
    /**
     * Static class factory
     *
     * @param {UrlParts | string} [input='']
     * @return {Url}
     */
    static create(input?: UrlParts | string = ''): Url;

    /**
     * Concats path part strings, resolving leading and trailing slashes
     *
     * @param {...string[]} args
     * @return {Url}
     */
    static join(...args: string[]): string;

    /**
     * @param {string|UrlParts} [input='']
     * @construct {URL}
     */
    constructor(input?: UrlParts | string = ''): Url;
}
