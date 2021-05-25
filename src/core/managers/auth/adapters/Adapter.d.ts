declare class Adapter {
    /**
     * Constructor
     *
     * @param {Record<string, any>} [config={}]  adapter config
     */
    constructor(config?: Record<string, any>);
    config: Record<string, any>;
    /**
     * Init adapter
     *
     * @return {Promise}
     */
    init(): Promise<any>;
    /**
     * Destroy adapter
     *
     * @return {Promise<void>}
     */
    destroy(): Promise<void>;
    /**
     * Redirect to login page (redirect -> login -> redirect back)
     * or resolve promise
     *
     * @param {Record<string, any>} [credentials={}]  user credentials
     * @return {Promise<void>}
     */
    login(credentials?: Record<string, any>): Promise<void>;
    /**
     * Redirect to logout page (redirect -> logout -> redirect)
     * or resolve promise
     *
     * @return {Promise}
     */
    logout(): Promise<any>;
    /**
     * If the token expires within minValidity seconds the token is refreshed.
     *
     * @param {number} [minValidity=10]
     * @return {Promise<boolean>}  Promise; resolve(refreshed) if token is valid/update; reject() if session expired
     */
    updateToken(minValidity?: number): Promise<boolean>;
    /**
     * Returns session permissions list
     *
     * @return {Promise.<object[]>}
     */
    getPermissions(): Promise<object[]>;
    /**
     * Returns session permissions
     *
     * @return {Promise.<object[]>}
     */
    getUserPermissions(): Promise<object[]>;
    /**
     * Returns user profile
     *
     * @return {Promise.<object>}   Promise; resolve(profile); reject() on error
     */
    getUserProfile(): Promise<object>;
    /**
     * Returns true if the token has less than minValidity seconds left before it expires (minValidity is optional, if not specified 0 is used).
     *
     * @param {number} [minValidity=10]
     * @return {boolean}
     */
    isTokenExpired(minValidity?: number): boolean;
    /**
     * Return auth status
     *
     * @return {boolean}
     */
    readonly authenticated: boolean;
    /**
     * Return token
     *
     * @return {string}
     */
    readonly token: string;
    /**
     * Return parsed token
     *
     * @return {?object}
     */
    readonly tokenParsed: any;
    /**
     * Returns default config
     *
     * @return {Record<string, any>}
     */
    readonly configDefault: Record<string, any>;
}

export default Adapter;
