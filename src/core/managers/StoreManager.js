// eslint-disable-next-line max-classes-per-file
import Vue from 'vue';
import { filterObject } from '../utils';

/**
 * @typedef {object} ValueObjectMeta
 * @property {boolean} global   global flag
 */
/**
 * ValueObject class
 */
class ValueObject {
    /**
     * Constructor
     *
     * @param {any} value
     * @param {?ValueObjectMeta} [meta=null]
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
 * Default meta factory
 *
 * @static
 * @return {ValueObjectMeta}
 */
ValueObject.defaultMeta = () => ({ global: true });
/**
 * Returns 'value' property if 'obj' is instanceof ValueObject; otherwise just returns the obj itself
 *
 * @static
 * @param {any} obj
 * @return {any}
 */
ValueObject.getValue = (obj) => (obj instanceof ValueObject ? obj.value : obj);

/**
 * ValueObject factory method
 *
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
         * @param {Record<string, any>} statePartial
         */
        /** @type {CommitHandler[]} */
        this._commitHandlers = [];
    }

    /**
     * Returns the current state
     *
     * @return {Record<string, any>}
     */
    // eslint-disable-next-line class-methods-use-this
    get state() {
        return stateOb.state;
    }

    /**
     * Merges the 'statePartial' object to the current state
     *
     * @param {Record<string, unknown>} statePartial      state change obj
     * @param {boolean} [isInvokeCommitHandlers=true]     if true will invoked
     */
    commit(statePartial, isInvokeCommitHandlers = true) {
        const stateNew = filterObject(
            { ...stateOb.state, ...statePartial },
            ([, value]) => value !== undefined
        );
        stateOb.state = stateNew;
        if (isInvokeCommitHandlers) {
            this._commitHandlers.forEach((h) => {
                h(statePartial);
            });
        }
    }

    /**
     * Replaces the state with the 'newState'
     *
     * @param {Record<string, any>} newState
     */
    // eslint-disable-next-line class-methods-use-this
    replace(newState) {
        stateOb.state = newState;
    }

    /**
     * Adds a commit handler
     *
     * @param {CommitHandler} handler
     */
    addCommitHandler(handler) {
        this._commitHandlers.push(handler);
    }

    /**
     * Removes a commit handler
     *
     * @param {CommitHandler} handler
     */
    removeCommitHandler(handler) {
        this._commitHandlers = this._commitHandlers.filter((h) => h !== handler);
    }
}
const store = new Store();

export { store, vo, ValueObject, Store };
