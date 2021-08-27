import KeycloakJS from 'keycloak-js';
import Adapter from './Adapter';

const href = window.location.href.replace(window.location.hash, '');

/** @type {import('keycloak-js').KeycloakConfig} */
const CONFIG_DEFAULT = {
    url: '',
    realm: '',
    clientId: ''
};

/** @type {import('keycloak-js').KeycloakInitOptions} */
const INIT_CONFIG_DEFAULT = {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${href}keycloak-check-sso.html`,
    pkceMethod: 'S256',
    responseMode: 'fragment'
};

class Keycloak extends Adapter {
    /** @type {import('keycloak-js').KeycloakInstance} */
    keycloakInstance;

    /**
     * @type {import('keycloak-js').KeycloakInitOptions}
     * @private
     */
    _initConfig = INIT_CONFIG_DEFAULT;

    /**
     * Constructor
     *
     * @param {import('keycloak-js').KeycloakConfig & { init: import('keycloak-js').KeycloakInitOptions }|null|undefined} config
     */
    constructor(config) {
        /**
         * @var {import('keycloak-js').KeycloakConfig} instanceConfig
         * @var {import('keycloak-js').KeycloakInitOptions} initConfig
         */
        const { init: initConfig, ...instanceConfig } = { ...CONFIG_DEFAULT, ...config };
        super(instanceConfig);

        this._extendInitConfig(initConfig);

        this.keycloakInstance = KeycloakJS(instanceConfig);
        this.initPromise = null;
    }

    /**
     *
     * @private
     * @param {import('keycloak-js').KeycloakInitOptions|undefined} initConfig
     */
    _extendInitConfig(initConfig) {
        this._initConfig = {
            ...this._initConfig,
            ...initConfig
        };
    }

    /**
     * Init adapter
     *
     * @return {Promise}
     */
    init() {
        if (this.initPromise == null) {
            this.initPromise = this.keycloakInstance.init(this._initConfig);
        }
        return this.initPromise;
    }

    /**
     * Login method
     *
     * @param {Record<string, any>} [credentials={}]  user credentials
     * @return {Promise<void>}
     */
    login(credentials = {}) {
        this.keycloakInstance.login();
        return super.login(credentials);
    }

    /**
     * Logout method
     *
     * @return {Promise<void>}
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
        return { ...CONFIG_DEFAULT };
    }
}

export default Keycloak;
