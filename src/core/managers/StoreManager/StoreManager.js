// eslint-disable-next-line max-classes-per-file
import Vue from 'vue';
import { filterObject } from '../../utils';

/**
 * Reactive state holder symbol identifier
 */
const stateManagerObservable = Symbol('stateManagerObservable');

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
        this[stateManagerObservable] = Vue.observable({ state: {} });
        this._commitHandlers = [];
    }

    /**
     * Returns the current state
     *
     * @return {Record<string, any>}
     */
    // eslint-disable-next-line class-methods-use-this
    get state() {
        return this[stateManagerObservable].state;
    }

    /**
     * Merges the 'statePartial' object to the current state
     *
     * @param {Record<string, unknown>} statePartial      state change obj
     * @param {boolean} [isInvokeCommitHandlers=true]     if true will invoked
     */
    commit(statePartial, isInvokeCommitHandlers = true) {
        const stateNew = filterObject(
            { ...this[stateManagerObservable].state, ...statePartial },
            ([, value]) => value !== undefined
        );
        this[stateManagerObservable].state = stateNew;
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
        this[stateManagerObservable].state = newState;
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

/**
 * Store instance
 *
 * @type {Store}
 */
const storeInternal = new Store();

/**
 * Store factory method
 *
 * @return {Store}
 */
const createStore = () => new Store();

export { createStore, Store };

/**
 * @deprecated
 */
export const store = storeInternal;
