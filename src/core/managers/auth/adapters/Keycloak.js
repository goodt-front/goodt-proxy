import KeycloakJS from 'keycloak-js';
import Adapter from './Adapter';

const href = window.location.href.replace(window.location.hash, '');
/** @type {import('keycloak-js').KeycloakConfig} */
const configDefault = {
    url: '',
    realm: '',
    clientId: ''
};
/** @type {import('keycloak-js').KeycloakInitOptions} */
const initConfig = {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${href}keycloak-check-sso.html`,
    pkceMethod: 'S256',
    responseMode: 'fragment'
};

class Keycloak extends Adapter {
    /** @type {import('keycloak-js').KeycloakInstance} */
    keycloakInstance;

    /**
     * Constructor
     *
     * @param {Record<string, any>} [config={}]
     */
    constructor(config = {}) {
        /**
         * @type {import('keycloak-js').KeycloakConfig | string}
         */
        const configFinal = { ...configDefault, ...config };
        super(configFinal);
        this.keycloakInstance = KeycloakJS(configFinal);
        this.initPromise = null;
    }

    /**
     * Init adapter
     *
     * @return {Promise}
     */
    init() {
        if (!this.initPromise) {
            this.initPromise = this.keycloakInstance.init(initConfig);
        }
        return this.initPromise;
    }

    /**
     * Login method
     *
     * @param {Record<string, any>} [credentials={}]  user credentials
     * @return {Promise}
     */
    login(credentials = {}) {
        this.keycloakInstance.login();
        return super.login(credentials);
    }

    /**
     * Logout method
     *
     * @return {Promise}
     */
    logout() {
        this.keycloakInstance.logout();
        return super.logout();
    }

    /**
     * If the token expires within minValidity seconds the token is refreshed.
     *
     * @param {number} [minValidity=5]
     * @return {Promise<boolean>}  Promise; resolve(refreshed) if token is valid/update; reject() if session expired
     */
    updateToken(minValidity = 5) {
        return this.keycloakInstance.updateToken(minValidity);
    }

    /**
     * Returns user profile (depends on the adapter)
     *
     * @return {Promise.<object>}   Promise; resolve(profile); reject() on error
     */
    getUserProfile() {
        return this.keycloakInstance.loadUserProfile();
    }

    /**
     * Returns true if the token has less than minValidity seconds left before it expires (minValidity is optional, if not specified 0 is used).
     *
     * @param {number} [minValidity=5]
     * @return {boolean}
     */
    isTokenExpired(minValidity = 5) {
        return this.keycloakInstance.isTokenExpired(minValidity);
    }

    /**
     * Return auth status
     *
     * @return {boolean}
     */
    get authenticated() {
        return this.keycloakInstance.authenticated;
    }

    /**
     * Return token
     *
     * @return {string}
     */
    get token() {
        return this.keycloakInstance.token;
    }

    /**
     * Return parsed token
     *
     * @return {?object}
     */
    get tokenParsed() {
        return this.keycloakInstance.tokenParsed;
    }

    /**
     * Returns default config
     *
     * @return {Record<string, any>}
     */
    // eslint-disable-next-line class-methods-use-this
    get configDefault() {
        return { ...configDefault };
    }
}

export default Keycloak;
