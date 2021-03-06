/**
 * @typedef {import('./EventBus')} EventBus
 */
import EventBusEvent from './EventBusEvent';

import { buildExternalStateFromInternal, buildInternalStateFromExternal } from '../../mixins';

/**
 * EventBusWrapper class
 * used by components
 */
class EventBusWrapper {
    /**
     * Constructor
     * @param {EventBus} eventBus
     */
    constructor(eventBus) {
        /**
         * @type {EventBus}
         */
        this._eb = eventBus;
        /**
         * @type {Function[]}
         */
        this._listeners = [];
        // { '<var-name>': { listen:'<var-alias>', trigger:'<var-alias>' } }
        this.varAliases = {};
        //
        this.toVO = (value, meta) => value;
        this.toValue = (x) => x;
    }

    /**
     * Returns current state
     * @return {object}
     */
    getState() {
        const state = this._eb.getState();
        return buildInternalStateFromExternal(state, this.varAliases ?? {}, this.toValue);
    }

    /**
     * Returns current session
     *
     * @return {object}
     */
    getSession() {
        const session = this._eb.getState();
        return { ...session };
    }

    /**
     * Listen for @see EventBusEvent.EVENT_NAVIGATE event
     *
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]    once
     * @return {Function}               handler ref
     */
    listenNavigate(handler, once = false) {
        return this.listen(EventBusEvent.EVENT_NAVIGATE, handler, once);
    }

    /**
     * Unlisten @see EventBusEvent.EVENT_NAVIGATE event
     *
     * @param {EventHandler} handler    handler
     */
    unlistenNavigate(handler) {
        return this.unlisten(EventBusEvent.EVENT_NAVIGATE, handler);
    }

    /**
     * Trigger @see EventBusEvent.EVENT_NAVIGATE event (for relative urls; change window location for other url schemas)
     *
     * @param {object} info     nav info object { url:{String}, params:{Object} }
     * @param info.url
     * @param info.params
     * @return {boolean}        whether the event was triggered or not
     */
    triggerNavigate({ url, params = {} }) {
        const regExp = new RegExp('^(?:\\w*:(//)?)+', 'i');
        if (regExp.test(url) === false) {
            this.trigger(EventBusEvent.EVENT_NAVIGATE, { url, params });
            return true;
        }
        if (window) {
            const esc = encodeURIComponent;
            const query = Object.keys(params)
                .map((key) => `${key}=${esc(params[key])}`)
                .join('&');
            const sign = url.indexOf('?') >= 0 ? '&' : '?';
            window.location = query.length ? `${url}${sign}${query}` : url;
        }
        return false;
    }

    /**
     * Listen for @see EventBusEvent.EVENT_STATE_CHANGE event
     *
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]    once
     * @return {EventHandler}           decorated handler
     */
    listenStateChange(handler, once = false) {
        const decoratedHandler = (event, stateChange) => {
            const state = buildInternalStateFromExternal(
                stateChange,
                this.varAliases ?? {},
                this.toValue
            );
            if (Object.keys(state).length > 0) {
                handler.apply(this, [event, state]);
            }
        };
        this.listen(EventBusEvent.EVENT_STATE_CHANGE, decoratedHandler, once);

        return decoratedHandler;
    }

    /**
     * Unlisten @see EventBusEvent.EVENT_STATE_CHANGE event
     *
     * @param {EventHandler} decoratedHandler    decorated handler
     */
    unlistenStateChange(decoratedHandler) {
        this.unlisten(EventBusEvent.EVENT_STATE_CHANGE, decoratedHandler);
    }

    /**
     * Trigger @see EventBusEvent.EVENT_STATE_CHANGE event
     *
     * @param {object} stateChange     state change object { '<key>': '<value>' }
     */
    triggerStateChange(stateChange) {
        const state = buildExternalStateFromInternal(stateChange, this.varAliases ?? {}, this.toVO);
        if (Object.keys(state).length > 0) {
            this.trigger(EventBusEvent.EVENT_STATE_CHANGE, state);
        }
    }

    /**
     * Listen
     *
     * @param {string | EventBusEvent} eventType      event type
     * @param {EventHandler} handler                handler
     * @param {boolean} [once=false]                once? @default false
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
            const handlerCompat = (_event, data) => {
                if (Object.keys(data).length > 0) {
                    const state = buildInternalStateFromExternal(data, null, this.toValue);
                    handler.apply(this, [_event, state]);
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
     *
     * @param {string | EventBusEvent} eventType      event type
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
     *
     * @param {string | EventBusEvent} eventType    event type
     * @param {object} data         custom data
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
            if (Object.keys(data).length > 0) {
                const state = buildExternalStateFromInternal(data, null, this.toVO);
                this._eb.trigger(event, state);
            }
        }
        // {/block}
        else {
            this._eb.trigger(event, data);
        }
    }

    /**
     * Has
     *
     * @param {string | EventBusEvent} eventType      event type
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

export default EventBusWrapper;
