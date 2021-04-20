import cloneDeep from 'lodash/cloneDeep';

/**
 * EventBusBase class
 */
class EventBusBase {
    /**
     * Constructor
     */
    constructor() {
        /**
         * @typedef {Object} Listener
         * @property {EventBusEvent} event
         * @property {Function} handler
         * @property {Boolean} once
         */
        /**
         * @type {Object.<String, Listener>}
         */
        this._listeners = Object.create(null);
    }
    /**
     * Listen
     * @param {EventBusEvent} event     event
     * @param {Function} handler        handler
     * @param {Boolean} once            once? @default false
     * @return {Function}              dispose handler i.e. dispose() === unlisten(event, handler)
     */
    listen(event, handler, once = false) {
        if (!this._listeners[event.type]) {
            this._listeners[event.type] = [];
        }
        this._listeners[event.type].push({ event, handler, once });
        return () => this.unlisten(event, handler);
    }
    /**
     * Unlisten
     * @param {EventBusEvent} event     event
     * @param {Function} handler        handler
     * @return {Boolean}
     */
    unlisten(event, handler) {
        let arr = this._listeners[event.type];
        if (!arr) {
            return false;
        }
        let n = 0;
        for (let i = 0; i < arr.length; ++i) {
            let obj = arr[i];
            if (obj.event.fullType == event.fullType && obj.handler === handler) {
                arr.splice(i, 1);
                i--;
                n++;
            }
        }
        return n > 0;
    }
    /**
     * Has
     * @param {EventBusEvent} event     event
     * @param {Function} handler        handler
     * @return {Boolean}
     */
    has(event, handler) {
        let arr = this._listeners[event.type];
        if (!arr) {
            return false;
        }
        let r = arr.find(obj => obj.event.fullType == event.fullType && obj.handler === handler);
        return !(r == null);
    }
    /**
     * Trigger
     * @param {EventBusEvent} event     event
     * @param {*} data                  data
     */
    trigger(event, data) {
        let arr = this._listeners[event.type];
        if (!arr) {
            return;
        }
        for (let i = 0; i < arr.length; ++i) {
            let obj = arr[i];
            if (obj.event.fullType == event.fullType) {
                this.callEventHandler(obj.handler, event, data);
                if (obj.once) {
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
     * Removes all listeners alias for 'resetListeners'
     */
    reset() {
        this.resetListeners();
    }
    /**
     * Call event handler
     * @param {Function} handler        handler
     * @param {EventBusEvent} event     event
     * @param {*} data                  data
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
     */
    constructor() {
        super();
        this.useStateHistory = true;
        this.useStateDeferredMerging = true;
        //
        this._state = this._createStateObj();
        this._stateNew = this._createStateObj();
        this._stateTriggerTimeout = {
            [EventBus.STATE_SCOPE_PUBLIC]: null,
            [EventBus.STATE_SCOPE_SESSION]: null
        };
    }
    /**
     * Listen
     * @param {EventBusEvent} event     event
     * @param {Function} handler        handler
     * @param {Boolean} once            once? @default false
     * @return {Function}              dispose handler i.e. dispose() === unlisten(event, handler)
     */
    listen(event, handler, once) {
        if (event.type == EventBusEvent.EVENT_STATE_CHANGE) {
            return this._listenStateChange(event, handler, once, EventBus.STATE_SCOPE_PUBLIC);
        } else if (event.type == EventBusEvent.EVENT_SESSION_CHANGE) {
            return this._listenStateChange(event, handler, once, EventBus.STATE_SCOPE_SESSION);
        }
        return super.listen(event, handler, once);
    }
    /**
     * Trigger
     * @param {EventBusEvent} event     event
     * @param {*} data                  data
     */
    trigger(event, data) {
        if (event.type == EventBusEvent.EVENT_STATE_CHANGE) {
            this._triggerStateChange(event, data, EventBus.STATE_SCOPE_PUBLIC);
        } else if (event.type == EventBusEvent.EVENT_SESSION_CHANGE) {
            this._triggerStateChange(event, data, EventBus.STATE_SCOPE_SESSION);
        } else if (event.type == EventBusEvent.EVENT_SESSION_CLEAR) {
            let scope = EventBus.STATE_SCOPE_SESSION;
            this.resetState(scope);
            this._triggerStateChange(
                new EventBusEvent(EventBusEvent.EVENT_SESSION_CHANGE),
                {},
                scope
            );
        } else {
            super.trigger(event, data);
        }
    }
    /**
     * Set state
     * @param {String} stateScope   state scope
     * @param {Object} state
     */
    setState(stateScope, state) {
        this._state[stateScope] = state;
    }
    /**
     * Returns state
     * @param {String} stateScope   state scope
     * @return {Object}
     */
    getState(stateScope) {
        return this._state[stateScope];
    }
    /**
     * Reset latest/new states
     * @param {String} stateScope   state scope or all if null @default null
     */
    resetState(stateScope = null) {
        if (stateScope) {
            if (this._state[stateScope]) {
                this._state[stateScope] = {};
                this._stateNew[stateScope] = {};
            }
        } else {
            this._state = this._createStateObj();
            this._stateNew = this._createStateObj();
        }
    }
    /**
     * Create state trigger timeout
     * @param {String} stateScope   state scope
     * @param {Function} handler    handler
     */
    createStateTriggerTimeout(stateScope, handler) {
        this._stateTriggerTimeout[stateScope] = setTimeout(() => {
            this._stateTriggerTimeout[stateScope] = null;
            handler();
        });
    }
    /**
     * Reset active state trigger timeout
     * @param {String} stateScope   state scope
     */
    resetStateTriggerTimeout(stateScope = null) {
        if (stateScope == null) {
            Object.keys(this._stateTriggerTimeout).forEach(scope =>
                this.resetStateTriggerTimeout(scope)
            );
        } else if (this._stateTriggerTimeout[stateScope]) {
            clearTimeout(this._stateTriggerTimeout[stateScope]);
            this._stateTriggerTimeout[stateScope] = null;
        }
    }
    /**
     * Check if state timeout is active
     * @param {String} stateScope   state scope
     * @return {Boolean}
     */
    stateTriggerTimeoutActive(stateScope) {
        return this._stateTriggerTimeout[stateScope] != null;
    }
    /**
     * @private Listen state change event handler
     * @param {EventBusEvent} event     event
     * @param {Function} handler        handler
     * @param {Boolean} once            once? @default false
     * @param {String} stateScope       state scope
     * @return {Function}              dispose handler i.e. dispose() === unlisten(event, handler)
     */
    _listenStateChange(event, handler, once, stateScope) {
        if (this.useStateHistory) {
            // no timeout active --> force invoke handler with latest state
            super.callEventHandler(handler, event, this._state[stateScope]);
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
     * @param {String} stateScope       state scope
     */
    _triggerStateChange(event, stateChange, stateScope) {
        let stateChangeClone = cloneDeep(stateChange);
        // no defer merging strat
        if (!this.useStateDeferredMerging) {
            // merge state + stateChangeClone
            if (this.useStateHistory) {
                this._state[stateScope] = this._removeUndefinedKeys({
                    ...this._state[stateScope],
                    ...stateChangeClone
                });
            }
            // trigger --> stateChangeClone
            let data = this._removeUndefinedKeys(stateChangeClone);
            super.trigger(event, data);
            return;
        }

        // defer merging strat --> collect 'stateChanges': merge stateNew + stateChangeClone
        this._stateNew[stateScope] = {
            ...this._stateNew[stateScope],
            ...stateChangeClone
        };
        if (!this.stateTriggerTimeoutActive(stateScope)) {
            // defer the trigger
            this.createStateTriggerTimeout(stateScope, () => {
                // merge state + stateNew
                if (this.useStateHistory) {
                    this._state[stateScope] = this._removeUndefinedKeys({
                        ...this._state[stateScope],
                        ...this._stateNew[stateScope]
                    });
                }
                // trigger --> stateNew
                let data = this._removeUndefinedKeys(this._stateNew[stateScope]);
                this._stateNew[stateScope] = {};
                super.trigger(event, data);
            });
        }
    }
    /**
     * @private Removes all keys with 'undefined' values
     * @param {Object} obj     object
     * @return {Object}
     */
    _removeUndefinedKeys(obj) {
        let out = { ...obj };
        for (let k in out) {
            if (Object.prototype.hasOwnProperty.call(out, k) && out[k] === undefined) {
                delete out[k];
            }
        }
        return out;
    }
    /**
     * @private Creates a new state object
     * @return {Object}
     */
    _createStateObj() {
        return {
            [EventBus.STATE_SCOPE_PUBLIC]: {},
            [EventBus.STATE_SCOPE_SESSION]: {}
        };
    }
}
EventBus.STATE_SCOPE_SESSION = 'session';
EventBus.STATE_SCOPE_PUBLIC = 'public';

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
    }
    /**
     * Returns current state
     * @return {Object}
     */
    getState() {
        let state = this._eb.getState(EventBus.STATE_SCOPE_PUBLIC);
        let stateLoc = {};
        for (let varName in this.varAliases) {
            let prop = this.varAliases[varName].listen;
            if (state[prop] != null) {
                stateLoc[varName] = ValueObject.getValue(state[prop]);
            }
        }
        return { ...stateLoc };
    }
    /**
     * Returns currect session
     * @return {Object}
     */
    getSession() {
        let session = this._eb.getState(EventBus.STATE_SCOPE_SESSION);
        return { ...session };
    }
    /**
     * Listen for @see EventBusEvent.EVENT_NAVIGATE event
     * @param {Function} handler    handler
     * @param {Boolean} once        once? @default false
     * @return {Function}           handler ref
     */
    listenNavigate(handler, once = false) {
        return this.listen(EventBusEvent.EVENT_NAVIGATE, handler, once);
    }
    /**
     * Unlisten @see EventBusEvent.EVENT_NAVIGATE event
     * @param {Function} handler    handler
     */
    unlistenNavigate(handler) {
        return this.unlisten(EventBusEvent.EVENT_NAVIGATE, handler);
    }
    /**
     * Trigger @see EventBusEvent.EVENT_NAVIGATE event (for relative urls; change window location for other url schemas)
     * @param {Object} info     nav info object { url:{String}, params:{Object} }
     * @return {Boolean}        whether the event was triggered or not
     */
    triggerNavigate({ url, params = {} }) {
        let r = new RegExp('^(?:\\w*:(//)?)+', 'i');
        if (r.test(url) === false) {
            this.trigger(EventBusEvent.EVENT_NAVIGATE, { url, params });
            return true;
        } else if (window) {
            let esc = encodeURIComponent;
            let query = Object.keys(params)
                .map(k => `${k}=${esc(params[k])}`)
                .join('&');
            let sign = url.indexOf('?') >= 0 ? '&' : '?';
            window.location = query.length ? `${url}${sign}${query}` : url;
        }
        return false;
    }
    /**
     * Listen for @see EventBusEvent.EVENT_STATE_CHANGE event
     * @param {Function} handler    handler
     * @param {Boolean} once        once? @default false
     * @return {Function}           decorated handler
     */
    listenStateChange(handler, once = false) {
        let decoratedHandler = (e, stateChange) => {
            let obj = {};
            for (let name in stateChange) {
                // replace  aliases[ name ].listen --> 'varName'
                for (let varName in this.varAliases) {
                    let alias = this.varAliases[varName];
                    if (alias && alias.listen === name) {
                        obj[varName] = ValueObject.getValue(stateChange[name]);
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
     * @param {Function} decoratedHandler    decorated handler @see EventBusWrapper.listenStateChange()
     */
    unlistenStateChange(decoratedHandler) {
        this.unlisten(EventBusEvent.EVENT_STATE_CHANGE, decoratedHandler);
    }
    /**
     * Trigger @see EventBusEvent.EVENT_STATE_CHANGE event
     * @param {Object} stateChange     state change object { '<key>': '<value>' }
     */
    triggerStateChange(stateChange) {
        let obj = {};
        for (let name in stateChange) {
            // replace 'name' -> aliases[ name ].trigger
            let alias = this.varAliases[name];
            if (alias && alias.trigger) {
                obj[alias.trigger] =
                    stateChange[name] === undefined
                        ? stateChange[name]
                        : new ValueObject(stateChange[name], alias.meta);
            }
        }
        if (Object.keys(obj)) {
            this.trigger(EventBusEvent.EVENT_STATE_CHANGE, obj);
        }
    }
    /**
     * Listen for @see EventBusEvent.EVENT_SESSION_CHANGE event
     * @param {Function} handler    handler
     * @param {Boolean} once        once? @default false
     * @return {Function}           dispose handler @see EventBus.listen()
     */
    listenSessionChange(handler, once = false) {
        return this.listen(EventBusEvent.EVENT_SESSION_CHANGE, handler, once);
    }
    /**
     * Unlisten @see EventBusEvent.EVENT_SESSION_CHANGE event
     * @param {Function} handler    handler
     */
    unlistenSessionChange(handler) {
        this.unlisten(EventBusEvent.EVENT_SESSION_CHANGE, handler);
    }
    /**
     * Trigger @see EventBusEvent.EVENT_SESSION_CHANGE event
     * @param {Object} sessionChange     session change object { '<key>': '<value>' }
     */
    triggerSessionChange(sessionChange) {
        if (Object.keys(sessionChange)) {
            this.trigger(EventBusEvent.EVENT_SESSION_CHANGE, sessionChange);
        }
    }
    /**
     * Trigger @see EventBusEvent.EVENT_SESSION_CLEAR event
     * @invokes @see EventBusEvent.EVENT_SESSION_CHANGE event
     */
    triggerSessionClear() {
        this.trigger(EventBusEvent.EVENT_SESSION_CLEAR);
    }
    /**
     * Listen
     * @param {String|EventBusEvent} eventType    event type
     * @param {Function} handler    handler
     * @param {Boolean} once        once? @default false
     * @return {Function}           dispose handler @see EventBus.listen()
     */
    listen(eventType, handler, once = false) {
        if (!this._eb) {
            return;
        }
        let event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        let dispose = null;
        // {block}
        // @NOTE compatibility with those, who call listen(EventBusEvent.EVENT_STATE_CHANGE)
        // instead of listenStateChange()
        if (event.type === EventBusEvent.EVENT_STATE_CHANGE) {
            let handlerCompat = (e, data) => {
                let obj = {};
                for (let k in data) {
                    obj[k] = ValueObject.getValue(data[k]);
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
     * @param {String|EventBusEvent} eventType    event type
     * @param {Function} handler    handler
     */
    unlisten(eventType, handler) {
        if (!this._eb) {
            return;
        }
        let event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        this._eb.unlisten(event, handler);
    }
    /**
     * Trigger
     * @param {String|EventBusEvent} eventType    event type
     * @param {Object} data         custom data
     */
    trigger(eventType, data) {
        if (!this._eb) {
            return;
        }
        let event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        // {block}
        // @NOTE compatibility with those, who call trigger(EventBusEvent.EVENT_STATE_CHANGE)
        // instead of triggerStateChange()
        if (event.type === EventBusEvent.EVENT_STATE_CHANGE) {
            let obj = {};
            for (let k in data) {
                let vo = data[k] !== undefined && !(data[k] instanceof ValueObject);
                obj[k] = vo ? new ValueObject(data[k]) : data[k];
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
     * @param {String|EventBusEvent} eventType    event type
     * @param {Function} handler    handler
     * @return {Boolean}
     */
    has(eventType, handler) {
        if (!this._eb) {
            return false;
        }
        let event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        return this._eb.has(event, handler);
    }
    /**
     * Destroy all handlers that refer to eventBus
     */
    destroy() {
        while (this._listeners.length) {
            let dispose = this._listeners.pop();
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
     * @param {String} type     event type
     * @param {String} ns       event namespace @default '''
     */
    constructor(type, ns = '') {
        this.type = type;
        this.ns = ns;
    }
    get fullType() {
        return this.ns ? `${this.type}.${this.ns}` : this.type;
    }
}
EventBusEvent.EVENT_NAVIGATE = 'navigate';
EventBusEvent.EVENT_STATE_CHANGE = 'state-change';
EventBusEvent.EVENT_SESSION_CHANGE = 'session-change';
EventBusEvent.EVENT_SESSION_CLEAR = 'session-clear';

/**
 * @typedef {Object} ValueObjectMeta
 * @property {Boolean} global   global flag
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
 * @static Returns 'value' property if obj is instanceof ValueObject; otherwise just returns the obj itself
 * @param {any} obj
 * @return {any}
 */
ValueObject.getValue = obj => (obj instanceof ValueObject ? obj.value : obj);

export { EventBusBase, EventBus, EventBusWrapper, EventBusEvent, ValueObject };
