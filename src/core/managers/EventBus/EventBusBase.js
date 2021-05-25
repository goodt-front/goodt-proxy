/**
 * @callback EventHandler
 * @param {EventBusEvent} event
 * @param {any} data
 */

/**
 * @typedef {object} ListenerInfo
 * @property {EventBusEvent} event
 * @property {EventHandler} handler
 * @property {boolean} once
 */

/**
 * EventBusBase class
 */
class EventBusBase {
    /**
     * @private
     * @type {Record<string, ListenerInfo[]>}
     */
    _listeners;

    /**
     * Constructor
     */
    constructor() {
        this._listeners = Object.create(null);
    }

    /**
     * Registers an event handler
     *
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
     *
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @return {boolean}                true if ayn handler unregistered
     */
    unlisten(event, handler) {
        const listeners = this._listeners[event.type];
        if (!listeners) {
            return false;
        }
        let unlistenedCount = 0;
        for (let i = 0; i < listeners.length; ++i) {
            const listener = listeners[i];
            if (listener.event.fullType === event.fullType && listener.handler === handler) {
                listeners.splice(i, 1);
                i--;
                unlistenedCount++;
            }
        }

        return unlistenedCount > 0;
    }

    /**
     * Returns true if event handler is registered
     *
     * @param {EventBusEvent} theEvent     event
     * @param {EventHandler} theHandler    handler
     * @return {boolean}
     */
    has(theEvent, theHandler) {
        const listeners = this._listeners[theEvent.type];
        if (!listeners) {
            return false;
        }
        const hasEventHandler = listeners.some(
            ({ event, handler }) => event.fullType === theEvent.fullType && handler === theHandler
        );

        return hasEventHandler;
    }

    /**
     * Triggers event
     *
     * @param {EventBusEvent} event     event
     * @param {*} data                  data
     */
    trigger(event, data) {
        const listeners = this._listeners[event.type];
        if (!listeners) {
            return;
        }
        for (let i = 0; i < listeners.length; ++i) {
            const info = listeners[i];
            if (info.event.fullType === event.fullType) {
                this.callEventHandler(info.handler, event, data);
                if (info.once) {
                    listeners.splice(i, 1);
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
     *
     * @param {EventHandler} handler        handler
     * @param {EventBusEvent} event     event
     * @param {any} data                  data
     */
    callEventHandler(handler, event, data) {
        handler.apply(this, [event, data]);
    }
}

export default EventBusBase;
