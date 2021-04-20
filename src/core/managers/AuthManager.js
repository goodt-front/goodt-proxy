import Adapter from './auth/adapters/Adapter';
import Adapters from './auth/adapters/index';

/** @type {AuthManager} */
let authManager = null;
let authManagerEnforcer = Symbol();

/**
 * @typedef {Object} AdapterInfo
 * @property {String} name      name
 * @property {Object} config    default config
 */
export default class AuthManager {
    /**
     * Constructor
     * @param {Symbol} enforcer  singleton enforcer
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
     * @param {String} adapterName  adapter name
     * @param {Object} config       adapter config
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
        return new Promise(resolve => {
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
    get adaptersList() {
        return Adapters;
    }
    /**
     * Available adapters info
     * @return {AdapterInfo[]}
     */
    get adaptersInfo() {
        let a = [];
        for (let name in Adapters) {
            let config = new Adapters[name]().configDefault;
            a.push({ name, config });
        }
        return a;
    }
    /**
     * @private Creates a new adapter instance
     * @param {String} adapterName
     * @param {Object} config
     * @returns
     */
    _createAdapter(adapterName, config) {
        let AdapterClass = Adapters[adapterName];
        if (!AdapterClass) {
            throw new Error(`AuthManager adapter not found: ${adapterName}`);
        }
        return new AdapterClass(config);
    }
}
