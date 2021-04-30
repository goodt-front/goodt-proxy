/**
 * @callback EventHandler
 * @param {EventBusEvent} event
 * @param {any} data
 */
/**
 * @typedef {Object} ListenerInfo
 * @property {EventBusEvent} event
 * @property {EventHandler} handler
 * @property {Boolean} once
 */

import EventBusEvent from './EventBusEvent';
import EventBusBase from './EventBusBase';

/**
 * @private Removes all keys with 'undefined' values
 * @param {Object} obj     object
 * @return {Object}
 */
function removeUndefinedKeys(obj) {
    const out = { ...obj };
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const k in out) {
        if (Object.prototype.hasOwnProperty.call(out, k) && out[k] === undefined) {
            delete out[k];
        }
    }
    return out;
}

/**
 * EventBus class
 */
class EventBus extends EventBusBase {
    /**
     * Constructor
     * @param {import('./StoreManager').Store} store
     * @param {import('./RouteManager').default} routeManager
     */
    constructor(store, routeManager) {
        super();
        this.useStateHistory = true;
        this.useStateDeferredMerging = true;
        //
        this._stateNew = {};
        this._stateTriggerTimeout = null;
        //
        this._store = store;
        this._store.addCommitHandler(this._storeCommitHandler.bind(this));
        this._routeManager = routeManager;
        this._routeManager.addRouteHandler(this._routeManagerRouteHandler.bind(this));
    }

    /**
     * Listen
     * @param {EventBusEvent} event     event
     * @param {(e:EventBusEvent, data:Object)} handler        handler
     * @param {Boolean} [once=false]    once?
     * @return {Function}               dispose handler i.e. dispose() === unlisten(event, handler)
     */
    listen(event, handler, once) {
        if (event.type === EventBusEvent.EVENT_STATE_CHANGE) {
            return this._listenStateChange(event, handler, once);
        }
        return super.listen(event, handler, once);
    }

    /**
     * Trigger
     * @param {EventBusEvent} event     event
     * @param {*} data                  data
     */
    trigger(event, data) {
        if (event.type === EventBusEvent.EVENT_STATE_CHANGE) {
            this._triggerStateChange(event, data);
        } else if (event.type === EventBusEvent.EVENT_NAVIGATE) {
            const { url, params } = data;
            this._routeManager.navigate({ path: url, query: params });
        } else {
            super.trigger(event, data);
        }
    }

    /**
     * Set state
     * @param {Object} state
     */
    setState(state) {
        this._store.commit(state, false);
    }

    /**
     * Returns state
     * @return {Object}
     */
    getState() {
        return { ...this._store.state };
    }

    /**
     * Reset latest/new states
     */
    resetState() {
        this._store.replace({});
    }

    /**
     * Create state trigger timeout
     * @param {Function} handler    handler
     */
    createStateTriggerTimeout(handler) {
        this._stateTriggerTimeout = setTimeout(() => {
            this._stateTriggerTimeout = null;
            handler();
        });
    }

    /**
     * Reset active state trigger timeout
     */
    resetStateTriggerTimeout() {
        if (this._stateTriggerTimeout) {
            clearTimeout(this._stateTriggerTimeout);
            this._stateTriggerTimeout = null;
        }
    }

    /**
     * Check if state timeout is active
     * @return {Boolean}
     */
    stateTriggerTimeoutActive() {
        return this._stateTriggerTimeout != null;
    }

    /**
     * @private Listen state change event handler
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @param {Boolean} once            once? @default false
     * @return {Function}              dispose handler i.e. dispose() === unlisten(event, handler)
     */
    _listenStateChange(event, handler, once) {
        if (this.useStateHistory) {
            // no timeout active --> force invoke handler with latest state
            super.callEventHandler(handler, event, this.getState());
            if (once) {
                return () => {};
            }
        }
        return super.listen(event, handler, once);
    }

    /**
     * @private Trigger state change event handler
     * @param {EventBusEvent} event     event
     * @param {Object} stateChange      state change
     */
    _triggerStateChange(event, stateChange) {
        // no defer merging strat
        if (!this.useStateDeferredMerging) {
            // merge state + stateChange
            if (this.useStateHistory) {
                this.setState(
                    removeUndefinedKeys({
                        ...this.getState(),
                        ...stateChange
                    })
                );
                super.trigger(event, stateChange);
            }
            return;
        }

        // defer merging strat --> collect 'stateChanges': merge stateNew + stateChange
        this._stateNew = {
            ...this._stateNew,
            ...stateChange
        };
        if (!this.stateTriggerTimeoutActive()) {
            // defer the trigger
            this.createStateTriggerTimeout(() => {
                // merge state + stateNew
                if (this.useStateHistory) {
                    this.setState(
                        this._removeUndefinedKeys({
                            ...this.getState(),
                            ...this._stateNew
                        })
                    );
                }
                super.trigger(event, this._stateNew);
                this._stateNew = {};
            });
        }
    }

    /**
     * @private Store commit handler
     * @param {Object} stateChange
     */
    _storeCommitHandler(stateChange) {
        super.trigger(new EventBusEvent(EventBusEvent.EVENT_STATE_CHANGE), stateChange);
    }

    /**
     * @private Route manager route handler
     * @param {import('./RouteManager').RouteObject} route
     */
    _routeManagerRouteHandler({ path: url, query: params }) {
        super.trigger(new EventBusEvent(EventBusEvent.EVENT_NAVIGATE), { url, params });
    }
}

export default EventBus;
