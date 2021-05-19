export default EventBusBase;
export type EventHandler = (event: any, data: any) => any;
export type ListenerInfo = {
    event: any;
    handler: EventHandler;
    once: boolean;
};
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
declare class EventBusBase {
    /**
     * @private
     * @type {Record<string, ListenerInfo[]>}
     */
    private _listeners;

    /**
     * Registers an event handler
     *
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]    if set true event handler will be auto-unregistered when invoked
     * @return {Function}               dispose function to unregister the handler i.e. dispose() === unlisten(event, handler)
     */
    listen(event: any, handler: EventHandler, once?: boolean): Function;

    /**
     * Unregisters an event handler
     *
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @return {boolean}                true if ayn handler unregistered
     */
    unlisten(event: any, handler: EventHandler): boolean;

    /**
     * Returns true if event handler is registered
     *
     * @param {EventBusEvent} theEvent     event
     * @param {EventHandler} theHandler    handler
     * @return {boolean}
     */
    has(theEvent: any, theHandler: EventHandler): boolean;

    /**
     * Triggers event
     *
     * @param {EventBusEvent} event     event
     * @param {*} data                  data
     */
    trigger(event: any, data: any): void;

    /**
     * Remove all listeners
     */
    resetListeners(): void;

    /**
     * Alias for 'resetListeners'
     */
    reset(): void;

    /**
     * Call event handler
     *
     * @param {EventHandler} handler        handler
     * @param {EventBusEvent} event     event
     * @param {any} data                  data
     */
    callEventHandler(handler: EventHandler, event: any, data: any): void;
}
