import EventBusEvent from './EventBusEvent';

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
        this.toValue = (vo) => vo;
    }

    /**
     * Returns current state
     * @return {Object}
     */
    getState() {
        const state = this._eb.getState();
        const stateLoc = {};
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
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
     * @return {Object}
     */
    getSession() {
        const session = this._eb.getState();
        return { ...session };
    }

    /**
     * Listen for @see EventBusEvent.EVENT_NAVIGATE event
     * @param {EventHandler} handler    handler
     * @param {Boolean} [once=false]    once
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
     * @param {Object} info     nav info object { url:{String}, params:{Object} }
     * @return {Boolean}        whether the event was triggered or not
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
                .map((k) => `${k}=${esc(params[k])}`)
                .join('&');
            const sign = url.indexOf('?') >= 0 ? '&' : '?';
            window.location = query.length ? `${url}${sign}${query}` : url;
        }
        return false;
    }

    /**
     * Listen for @see EventBusEvent.EVENT_STATE_CHANGE event
     * @param {EventHandler} handler    handler
     * @param {Boolean} [once=false]    once
     * @return {EventHandler}           decorated handler
     */
    listenStateChange(handler, once = false) {
        const decoratedHandler = (e, stateChange) => {
            const obj = {};
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const name in stateChange) {
                // replace  aliases[ name ].listen --> 'varName'
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
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
     * @param {Object} stateChange     state change object { '<key>': '<value>' }
     */
    triggerStateChange(stateChange) {
        const obj = {};
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
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
     * @param {Boolean} [once=false]                once? @default false
     * @return {Function}                           dispose handler
     */
    listen(eventType, handler, once = false) {
        if (!this._eb) {
            return () => {};
        }
        const event = eventType instanceof EventBusEvent ? eventType : new EventBusEvent(eventType);
        let dispose = null;
        // {block}
        // @NOTE compatibility with those, who call listen(EventBusEvent.EVENT_STATE_CHANGE)
        // instead of listenStateChange()
        if (event.type === EventBusEvent.EVENT_STATE_CHANGE) {
            const handlerCompat = (e, data) => {
                const obj = {};
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
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
     * @param {Object} data         custom data
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
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
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
     * @return {Boolean}
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

export default EventBusWrapper;
