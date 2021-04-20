let constManager = null;
let constManagerEnforcer = Symbol();

export default class ConstManager {
    /**
     * Constructor
     * @param {Symbol} enforcer  singleton enforcer
     */
    constructor(enforcer) {
        if (enforcer !== constManagerEnforcer) {
            throw new Error(`Instantiation failed: use ConstManager.instance`);
        }
        this._constants = {};
    }
    /**
     * @return {ConstManager}
     */
    static get instance() {
        if (!constManager) {
            constManager = new ConstManager(constManagerEnforcer);
        }
        return constManager;
    }
    /**
     * Return key value or key if no value found
     * @param {String} key  key
     * @return {any} value
     */
    getConstValue(key) {
        if (typeof key !== 'string' || !this._constants[key]) {
            return key;
        }
        return this._constants[key];
    }
    /**
     * Set the constants hash
     * @param {Object} constants
     */
    setConstantsHash(constants = {}) {
        this._constants = constants;
    }
    /**
     * Return the constants hash
     * @return {Object}
     */
    getConstantsHash() {
        return this._constants;
    }
}
