import { KeycloakInstance, KeycloakInitOptions, KeycloakConfig } from 'keycloak-js';
import Adapter from './Adapter';

class Keycloak extends Adapter {
    public keycloakInstance: KeycloakInstance;

    private _isPostMessageInit: boolean;

    private _initConfig: KeycloakInitOptions;

    /**
     * @param config
     */
    constructor(
        config: KeycloakConfig & { postMessageInit: boolean } & { init: KeycloakInitOptions }
    );
    /**
     * Return auth status
     *
     * @type {boolean}
     */
    public authenticated: boolean;

    /**
     * Return token
     *
     * @type {string}
     */
    public token: string;

    /**
     * Return parsed token
     *
     * @type {?object}
     */
    public tokenParsed: Record<string, unknown>;

    /**
     * Returns default config
     *
     * @type {Record<string, any>}
     */
    public configDefault: KeycloakConfig;

    /**
     *
     * @param {KeycloakInitOptions} initConfig
     * @private
     */
    private _extendInitConfig(initConfig: KeycloakInitOptions): void;

    /**
     * Init adapter
     *
     * @return {Promise}
     */
    init(): Promise;

    /**
     * Login method
     *
     * @param {Record<string, any>} [credentials={}]  user credentials
     * @return {Promise<void>}
     */
    login(credentials = {}): Promise<void>;

    /**
     * Logout method
     *
     * @return {Promise<void>}
     */
    logout(): Promise<void>;

    /**
     * If the token expires within minValidity seconds the token is refreshed.
     *
     * @param {number} [minValidity=5]
     * @return {Promise<boolean>}  Promise; resolve(refreshed) if token is valid/update; reject() if session expired
     */
    updateToken(minValidity: number = 5): Promise<boolean>;

    /**
     * Returns user profile (depends on the adapter)
     *
     * @return {Promise<Record<string, unknown>>}   Promise; resolve(profile); reject() on error
     */
    getUserProfile(): Promise<Record<string, unknown>>;

    /**
     * Returns true if the token has less than minValidity seconds left before it expires (minValidity is optional, if not specified 0 is used).
     *
     * @param {number} [minValidity=5]
     * @return {boolean}
     */
    isTokenExpired(minValidity: number = 5): Promise<boolean>;
}

export default Keycloak;
