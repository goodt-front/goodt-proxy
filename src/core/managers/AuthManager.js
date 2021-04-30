// eslint-disable-next-line import/no-cycle
import Adapters from './auth/adapters';

/** @type {AuthManager} */
let authManager = null;
const authManagerEnforcer = Symbol('authManagerEnforcer');

/**
 * @typedef {Object} AdapterInfo
 * @property {string} name      name
 * @property {Record<string, any>} config    default config
 */
export default class AuthManager {
    /**
     * Constructor
     * @param {symbol} enforcer  singleton enforcer
     */
    constructor(enforcer) {
        if (enforcer !== authManagerEnforcer) {
            throw new Error(`Instantiation failed: use AuthManager.instance`);
        }
        /**
         * @property {Adapter}
         */
        this._adapter = null;
    }

    /**
     * @return {AuthManager}
     */
    static get instance() {
        if (!authManager) {
            authManager = new AuthManager(authManagerEnforcer);
        }
        return authManager;
    }

    /**
     * Initializes manager with the specified adapter
     * @param {string} adapterName  adapter name
     * @param {Record<string, any>} config       adapter config
     * @return {Promise}
     */
    init(adapterName, config = {}) {
        this._adapter = this._createAdapter(adapterName, config);
        return this._adapter.init();
    }

    /**
     * Destroys adapter
     */
    destroy() {
        return new Promise((resolve) => {
            if (this.adapter) {
                this.adapter.destroy().finally(() => {
                    this._adapter = null;
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * Current used adapter
     * @return {Adapter} adapter
     */
    get adapter() {
        return this._adapter;
    }

    /**
     * Available adapters list
     * @return {Object.<String, Adapter>}
     */
    // eslint-disable-next-line class-methods-use-this
    get adaptersList() {
        return Adapters;
    }

    /**
     * Available adapters info
     * @return {AdapterInfo[]}
     */
    // eslint-disable-next-line class-methods-use-this
    get adaptersInfo() {
        const adapters = [];
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const name in Adapters) {
            const config = new Adapters[name]().configDefault;
            adapters.push({ name, config });
        }
        return adapters;
    }

    /**
     * @private Creates a new adapter instance
     * @param {string} adapterName
     * @param {Record<string, any>} config
     * @returns
     */
    // eslint-disable-next-line class-methods-use-this
    _createAdapter(adapterName, config) {
        const AdapterClass = Adapters[adapterName];
        if (!AdapterClass) {
            throw new Error(`AuthManager adapter not found: ${adapterName}`);
        }
        return new AdapterClass(config);
    }
}
