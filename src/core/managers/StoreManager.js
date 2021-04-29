import Vue from 'vue';

/**
 * @typedef {Object} ValueObjectMeta
 * @property {boolean} global   global flag
 */
/**
 * ValueObject class
 */
class ValueObject {
    /**
     * Constructor
     * @param {any} value
     * @param {ValueObjectMeta} [meta=null]
     */
    constructor(value, meta = null) {
        const def = ValueObject.defaultMeta();
        /**
         * @member {any} value
         */
        this.value = value;
        /**
         * @member {ValueObjectMeta} meta
         */
        this.meta = meta ? { ...def, ...meta } : def;
    }
}
/**
 * @static Default meta factory
 * @return {ValueObjectMeta}
 */
ValueObject.defaultMeta = () => ({ global: true });
/**
 * @static Returns 'value' property if 'obj' is instanceof ValueObject; otherwise just returns the obj itself
 * @param {any} obj
 * @return {any}
 */
ValueObject.getValue = obj => (obj instanceof ValueObject ? obj.value : obj);

/**
 * ValueObject factory method
 * @param {any} value
 * @param {?ValueObjectMeta} [meta=null]
 */
const vo = (value, meta = null) => new ValueObject(value, meta);

/**
 * Reactive state holder
 */
const stateOb = Vue.observable({ state: {} });
/**
 * Store
 */
class Store {
    /**
     * Constructor
     */
    constructor() {
        /**
         * @callback CommitHandler
         * @param {Record<string, any>} stateChange
         */
        /** @type {CommitHandler[]} */
        this._commitHandlers = [];
    }

    /**
     * Returns the current state
     * @return {Record<string, any>}
     */
    get state() {
        return stateOb.state;
    }

    /**
     * Merges the 'newState' object to the current state
     * @param {Record<string, any>} stateChange                      state change obj
     * @param {boolean} [invokeCommitHandlers=true]     if true will invoked
     */
    commit(stateChange, invokeCommitHandlers = true) {
        const stateNew = { ...stateOb.state, ...stateChange };
        for (const k in stateNew) {
            stateNew[k] === undefined && delete stateNew[k];
        }
        stateOb.state = stateNew;
        invokeCommitHandlers && this._commitHandlers.forEach(h => h(stateChange));
    }

    /**
     * Replaces the state with the 'newState'
     * @param {Record<string, any>} newState
     */
    replace(newState) {
        stateOb.state = newState;
    }

    /**
     * Adds a commit handler
     * @param {CommitHandler} handler
     */
    addCommitHandler(handler) {
        this._commitHandlers.push(handler);
    }

    /**
     * Removes a commit handler
     * @param {CommitHandler} handler
     */
    removeCommitHandler(handler) {
        this._commitHandlers = this._commitHandlers.filter(h => h !== handler);
    }
}
const store = new Store();

export { store, vo, ValueObject, Store };
