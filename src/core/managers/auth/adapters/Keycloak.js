import Adapter from './Adapter';
import Keycloak from 'keycloak-js';

const href = location.href.replace(location.hash, '');
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

export default class extends Adapter {
    /**
     * Constructor
     * @param {Record<string, any>} [config={}]
     */
    constructor(config = {}) {
        config = { ...configDefault, ...config };
        super(config);
        /** @type {import('keycloak-js').KeycloakInstance} */
        this.kc = Keycloak(config);
    }

    /**
     * Init adapter
     * @return {Promise}
     */
    init() {
        return this.kc.init(initConfig);
    }

    /**
     * Login method
     * @param {Record<string, any>} [credentials={}]  user credentials
     * @return {Promise}
     */
    login(credentials = {}) {
        this.kc.login();
        return super.login(credentials);
    }

    /**
     * Logout method
     * @return {Promise}
     */
    logout() {
        this.kc.logout();
        return super.logout();
    }

    /**
     * If the token expires within minValidity seconds the token is refreshed.
     * @param {number} [minValidity=5]
     * @return {Promise.<Boolean>}  Promise; resolve(refreshed) if token is valid/update; reject() if session expired
     */
    updateToken(minValidity = 5) {
        return this.kc.updateToken(minValidity);
    }

    /**
     * Returns user profile (depends on the adapter)
     * @return {Promise.<Object>}   Promise; resolve(profile); reject() on error
     */
    getUserProfile() {
        return this.kc.loadUserProfile();
    }

    /**
     * Returns true if the token has less than minValidity seconds left before it expires (minValidity is optional, if not specified 0 is used).
     * @param {number} [minValidity=5]
     * @return {boolean}
     */
    isTokenExpired(minValidity = 5) {
        return this.kc.isTokenExpired(minValidity);
    }

    /**
     * Return auth status
     * @return {boolean}
     */
    get authenticated() {
        return this.kc.authenticated;
    }

    /**
     * Return token
     * @return {string}
     */
    get token() {
        return this.kc.token;
    }

    /**
     * Return parsed token
     * @return {?Object}
     */
    get tokenParsed() {
        return this.kc.tokenParsed;
    }

    /**
     * Returns default config
     * @return {Record<string, any>}
     */
    get configDefault() {
        return { ...configDefault };
    }
}
