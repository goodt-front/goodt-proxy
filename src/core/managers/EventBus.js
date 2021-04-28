/**
 * @callback EventHandler
 * @param {EventBusEvent} event
 * @param {any} data
 */
/**
 * @typedef {Object} ListenerInfo
 * @property {EventBusEvent} event
 * @property {EventHandler} handler
 * @property {boolean} once
 */

/**
 * EventBusBase class
 */
class EventBusBase {
    /**
     * Constructor
     */
    constructor() {
        /**
         * @type {Object.<string, ListenerInfo[]>}
         */
        this._listeners = Object.create(null);
    }

    /**
     * Registers an event handler
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]    if set true event handler will be auto-unregistered when invoked
     * @return {Function}               dispose function to unregister the handler i.e. dispose() === unlisten(event, handler)
     */
    listen(event, handler, once = false) {
        if (!this._listeners[event.type]) {
            this._listeners[event.type] = [];
        }
        this._listeners[event.type].push({ event, handler, once });
        return () => this.unlisten(event, handler);
    }

    /**
     * Unregisters an event handler
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @return {boolean}                true if ayn handler unregistered
     */
    unlisten(event, handler) {
        const arr = this._listeners[event.type];
        if (!arr) {
            return false;
        }
        let n = 0;
        for (let i = 0; i < arr.length; ++i) {
            const obj = arr[i];
            if (obj.event.fullType == event.fullType && obj.handler === handler) {
                arr.splice(i, 1);
                i--;
                n++;
            }
        }
        return n > 0;
    }

    /**
     * Returns true if event handler is registered
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @return {boolean}
     */
    has(event, handler) {
        const arr = this._listeners[event.type];
        if (!arr) {
            return false;
        }
        const r = arr.find(
            info => info.event.fullType === event.fullType && info.handler === handler
        );
        return !(r == null);
    }

    /**
     * Triggers event
     * @param {EventBusEvent} event     event
     * @param {*} data                  data
     */
    trigger(event, data) {
        const arr = this._listeners[event.type];
        if (!arr) {
            return;
        }
        for (let i = 0; i < arr.length; ++i) {
            const info = arr[i];
            if (info.event.fullType === event.fullType) {
                this.callEventHandler(info.handler, event, data);
                if (info.once) {
                    arr.splice(i, 1);
                    i--;
                }
            }
        }
    }

    /**
     * Remove all listeners
     */
    resetListeners() {
        this._listeners = Object.create(null);
    }

    /**
     * Alias for 'resetListeners'
     */
    reset() {
        this.resetListeners();
    }

    /**
     * Call event handler
     * @param {EventHandler} handler        handler
     * @param {EventBusEvent} event     event
     * @param {any} data                  data
     */
    callEventHandler(handler, event, data) {
        handler.apply(this, [event, data]);
    }
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
     * @param {function(e: EventBusEvent, data: Object): void} handler        handler
     * @param {boolean} [once=false]    once?
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
     * @param {Record<string, any>} state
     */
    setState(state) {
        this._store.commit(state, false);
    }

    /**
     * Returns state
     * @return {Record<string, any>}
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
     * @return {boolean}
     */
    stateTriggerTimeoutActive() {
        return this._stateTriggerTimeout != null;
    }

    /**
     * @private Listen state change event handler
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]            once? @default false
     * @return {Function}              dispose handler i.e. dispose() === unlisten(event, handler)
     */
    _listenStateChange(event, handler, once = false) {
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
     * @param {Record<string, any>} stateChange      state change
     */
    _triggerStateChange(event, stateChange) {
        // no defer merging strat
        if (!this.useStateDeferredMerging) {
            // merge state + stateChange
            if (this.useStateHistory) {
                this.setState(
                    this._removeUndefinedKeys({
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
     * @private Removes all keys with 'undefined' values
     * @param {Record<string, any>} obj     object
     * @return {Record<string, any>}
     */
    _removeUndefinedKeys(obj) {
        const out = { ...obj };
        for (const k in out) {
            if (Object.prototype.hasOwnProperty.call(out, k) && out[k] === undefined) {
                delete out[k];
            }
        }
        return out;
    }

    /**
     * @private Store commit handler
     * @param {Record<string, any>} stateChange
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

/**
 * EventBusWrapper class
 * used by components
 */
class EventBusWrapper {
    /**
     * Constructor
     * @param {EventBus} eb
     */
    constructor(eb) {
        /**
         * @type {EventBus}
         */
        this._eb = eb;
        /**
         * @type {Function[]}
         */
        this._listeners = [];
        // { '<var-name>': { listen:'<var-alias>', trigger:'<var-alias>' } }
        this.varAliases = {};
        //
        this.toVO = (value, meta) => value;
        this.toValue = vo => vo;
    }

    /**
     * Returns current state
     * @return {Record<string, any>}
     */
    getState() {
        const state = this._eb.getState();
        const stateLoc = {};
        for (const varName in this.varAliases) {
            const prop = this.varAliases[varName].listen;
            if (state[prop] != null) {
                stateLoc[varName] = this.toValue(state[prop]);
            }
        }
        return { ...stateLoc };
    }

    /**
     * Returns currect session
     * @return {Record<string, any>}
     */
    getSession() {
        const session = this._eb.getState();
        return { ...session };
    }

    /**
     * Listen for @see EventBusEvent.EVENT_NAVIGATE event
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]    once
     * @return {Function}               handler ref
     */
    listenNavigate(handler, once = false) {
        return this.listen(EventBusEvent.EVENT_NAVIGATE, handler, once);
    }

    /**
     * Unlisten @see EventBusEvent.EVENT_NAVIGATE event
     * @param {EventHandler} handler    handler
     */
    unlistenNavigate(handler) {
        return this.unlisten(EventBusEvent.EVENT_NAVIGATE, handler);
    }

    /**
     * Trigger @see EventBusEvent.EVENT_NAVIGATE event (for relative urls; change window location for other url schemas)
     * @param {Record<string, any>} info     nav info object {{ url: String, params: Record<string, any>  }}
     * @return {boolean}        whether the event was triggered or not
     */
    triggerNavigate({ url, params = {} }) {
        const r = new RegExp('^(?:\\w*:(//)?)+', 'i');
        if (r.test(url) === false) {
            this.trigger(EventBusEvent.EVENT_NAVIGATE, { url, params });
            return true;
        }
        if (window) {
            const esc = encodeURIComponent;
            const query = Object.keys(params)
                .map(k => `${k}=${esc(params[k])}`)
                .join('&');
            const sign = url.indexOf('?') >= 0 ? '&' : '?';
            window.location = query.length ? `${url}${sign}${query}` : url;
        }
        return false;
    }

    /**
     * Listen for @see EventBusEvent.EVENT_STATE_CHANGE event
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]    once
     * @return {EventHandler}           decorated handler
     */
    listenStateChange(handler, once = false) {
        const decoratedHandler = (e, stateChange) => {
            const obj = {};
            for (const name in stateChange) {
                // replace  aliases[ name ].listen --> 'varName'
                for (const varName in this.varAliases) {
                    const alias = this.varAliases[varName];
                    if (alias && alias.listen === name) {
                        obj[varName] = this.toValue(stateChange[name]);
                    }
                }
            }
            if (Object.keys(obj).length) {
                handler.apply(this, [e, obj]);
            }
        };
        this.listen(EventBusEvent.EVENT_STATE_CHANGE, decoratedHandler, once);
        return decoratedHandler;
    }

    /**
     * Unlisten @see EventBusEvent.EVENT_STATE_CHANGE event
     * @param {EventHandler} decoratedHandler    decorated handler
     */
    unlistenStateChange(decoratedHandler) {
        this.unlisten(EventBusEvent.EVENT_STATE_CHANGE, decoratedHandler);
    }

    /**
     * Trigger @see EventBusEvent.EVENT_STATE_CHANGE event
     * @param {Record<string, any>} stateChange     state change object { '<key>': '<value>' }
     */
    triggerStateChange(stateChange) {
        const obj = {};
        for (const name in stateChange) {
            // replace 'name' -> aliases[ name ].trigger
            const alias = this.varAliases[name];
            if (alias && alias.trigger) {
                obj[alias.trigger] = this.toVO(stateChange[name], alias.meta);
            }
        }
        if (Object.keys(obj)) {
            this.trigger(EventBusEvent.EVENT_STATE_CHANGE, obj);
        }
    }

    /**
     * Listen
     * @param {String|EventBusEvent} eventType      event type
     * @param {EventHandler} handler                handler
     * @param {boolean} [once=false]                once? @default false
     * @return {Function}                           dispose handler
     */
    listen(eventType, handler, once = false) {
        if (!this._eb) {
            return;
        }
        const event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        let dispose = null;
        // {block}
        // @NOTE compatibility with those, who call listen(EventBusEvent.EVENT_STATE_CHANGE)
        // instead of listenStateChange()
        if (event.type === EventBusEvent.EVENT_STATE_CHANGE) {
            const handlerCompat = (e, data) => {
                const obj = {};
                for (const k in data) {
                    obj[k] = this.toValue(data[k]);
                }
                if (Object.keys(obj).length) {
                    handler.apply(this, [e, obj]);
                }
            };
            dispose = this._eb.listen(event, handlerCompat, once);
        }
        // {/block}
        else {
            dispose = this._eb.listen(event, handler, once);
        }
        this._listeners.push(dispose);
        return dispose;
    }

    /**
     * Unlisten
     * @param {String|EventBusEvent} eventType      event type
     * @param {EventHandler} handler                handler
     */
    unlisten(eventType, handler) {
        if (!this._eb) {
            return;
        }
        const event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        this._eb.unlisten(event, handler);
    }

    /**
     * Trigger
     * @param {String|EventBusEvent} eventType    event type
     * @param {Record<string, any>} data         custom data
     */
    trigger(eventType, data) {
        if (!this._eb) {
            return;
        }
        const event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        // {block}
        // @NOTE compatibility with those, who call trigger(EventBusEvent.EVENT_STATE_CHANGE)
        // instead of triggerStateChange()
        if (event.type === EventBusEvent.EVENT_STATE_CHANGE) {
            const obj = {};
            for (const k in data) {
                obj[k] = this.toVO(data[k]);
            }
            if (Object.keys(obj).length) {
                this._eb.trigger(event, obj);
            }
        }
        // {/block}
        else {
            this._eb.trigger(event, data);
        }
    }

    /**
     * Has
     * @param {String|EventBusEvent} eventType      event type
     * @param {EventHandler} handler                handler
     * @return {boolean}
     */
    has(eventType, handler) {
        if (!this._eb) {
            return false;
        }
        const event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        return this._eb.has(event, handler);
    }

    /**
     * Destroy all handlers that refer to eventBus
     */
    destroy() {
        while (this._listeners.length) {
            const dispose = this._listeners.pop();
            dispose();
        }
    }
}

/**
 * EventBusEvent class
 */
class EventBusEvent {
    /**
     * EventBusEvent
     * @param {string} type     event type
     * @param {string} ns       event namespace @default '''
     */
    constructor(type, ns = '') {
        this.type = type;
        this.ns = ns;
    }

    /**
     * @type {string}
     */
    get fullType() {
        return this.ns ? `${this.type}.${this.ns}` : this.type;
    }
}
EventBusEvent.EVENT_NAVIGATE = 'navigate';
EventBusEvent.EVENT_STATE_CHANGE = 'state-change';

export { EventBusBase, EventBus, EventBusWrapper, EventBusEvent };
