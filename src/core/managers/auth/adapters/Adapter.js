export default class {
    /**
     * Constructor
     * @param {Record<string, any>} [config={}]  adapter config
     */
    constructor(config = {}) {
        this.config = config;
    }

    /**
     * Init adapter
     * @return {Promise}
     */
    init() {
        return Promise.resolve();
    }

    /**
     * Destroy adapter
     * @return {Promise<void>}
     */
    destroy() {
        return Promise.resolve();
    }

    /**
     * Redirect to login page (redirect -> login -> redirect back)
     * or resolve promise
     * @param {Record<string, any>} [credentials={}]  user credentials
     * @return {Promise<void>}
     */
    login(credentials = {}) {
        return Promise.resolve();
    }

    /**
     * Redirect to logout page (redirect -> logout -> redirect)
     * or resolve promise
     * @return {Promise}
     */
    logout() {
        return Promise.resolve();
    }

    /**
     * If the token expires within minValidity seconds the token is refreshed.
     * @param {number} [minValidity=10]
     * @return {Promise<boolean>}  Promise; resolve(refreshed) if token is valid/update; reject() if session expired
     */
    updateToken(minValidity = 10) {
        return Promise.resolve(true);
    }

    /**
     * Returns session permissions list
     * @return {Promise.<Object[]>}
     */
    getPermissions() {
        return Promise.resolve([{}]);
    }

    /**
     * Returns session permissions
     * @return {Promise.<Object[]>}
     */
    getUserPermissions() {
        return Promise.resolve([{}]);
    }

    /**
     * Returns user profile
     * @return {Promise.<Object>}   Promise; resolve(profile); reject() on error
     */
    getUserProfile() {
        return Promise.resolve({});
    }

    /**
     * Returns true if the token has less than minValidity seconds left before it expires (minValidity is optional, if not specified 0 is used).
     * @param {number} [minValidity=10]
     * @return {boolean}
     */
    isTokenExpired(minValidity = 10) {
        return false;
    }

    /**
     * Return auth status
     * @return {boolean}
     */
    get authenticated() {
        return true;
    }

    /**
     * Return token
     * @return {string}
     */
    get token() {
        return '';
    }

    /**
     * Return parsed token
     * @return {?Object}
     */
    get tokenParsed() {
        return null;
    }

    /**
     * Returns default config
     * @return {Record<string, any>}
     */
    get configDefault() {
        return {};
    }
}
