export default EventBusWrapper;
export type EventBus = typeof import('./EventBus');

/**
 * EventBusWrapper class
 * used by components
 */
declare class EventBusWrapper {
    /**
     * Constructor
     * @param {EventBus} eb
     */
    constructor(eventBus: EventBus);

    /**
     * @type {EventBus}
     */
    private _eb: EventBus;
    /**
     * @type {Function[]}
     */
    private _listeners: Function[];

    varAliases: {};
    toVO: (value: any, meta: any) => any;
    toValue: (vo: any) => any;

    /**
     * Returns current state
     * @return {object}
     */
    getState(): object;

    /**
     * Returns current session
     *
     * @return {object}
     */
    getSession(): object;

    /**
     * Listen for @see EventBusEvent.EVENT_NAVIGATE event
     *
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]    once
     * @return {Function}               handler ref
     */
    listenNavigate(handler: any, once?: boolean): Function;

    /**
     * Unlisten @see EventBusEvent.EVENT_NAVIGATE event
     *
     * @param {EventHandler} handler    handler
     */
    unlistenNavigate(handler: any): void;

    /**
     * Trigger @see EventBusEvent.EVENT_NAVIGATE event (for relative urls; change window location for other url schemas)
     *
     * @param {object} info     nav info object { url:{String}, params:{Object} }
     * @param info.url
     * @param info.params
     * @return {boolean}        whether the event was triggered or not
     */
    triggerNavigate({ url, params }: { url: any; params: any }): boolean;

    /**
     * Listen for @see EventBusEvent.EVENT_STATE_CHANGE event
     *
     * @param {EventHandler} handler    handler
     * @param {boolean} [once=false]    once
     * @return {EventHandler}           decorated handler
     */
    listenStateChange(handler: any, once?: boolean): any;

    /**
     * Unlisten @see EventBusEvent.EVENT_STATE_CHANGE event
     *
     * @param {EventHandler} decoratedHandler    decorated handler
     */
    unlistenStateChange(decoratedHandler: any): void;

    /**
     * Trigger @see EventBusEvent.EVENT_STATE_CHANGE event
     *
     * @param {object} stateChange     state change object { '<key>': '<value>' }
     */
    triggerStateChange(stateChange: object): void;

    /**
     * Listen
     *
     * @param {string | EventBusEvent} eventType      event type
     * @param {EventHandler} handler                handler
     * @param {boolean} [once=false]                once? @default false
     * @return {Function}                           dispose handler
     */
    listen(eventType: string | EventBusEvent, handler: any, once?: boolean): Function;

    /**
     * Unlisten
     *
     * @param {string | EventBusEvent} eventType      event type
     * @param {EventHandler} handler                handler
     */
    unlisten(eventType: string | EventBusEvent, handler: any): void;

    /**
     * Trigger
     *
     * @param {string | EventBusEvent} eventType    event type
     * @param {object} data         custom data
     */
    trigger(eventType: string | EventBusEvent, data: object): void;

    /**
     * Has
     *
     * @param {string | EventBusEvent} eventType      event type
     * @param {EventHandler} handler                handler
     * @return {boolean}
     */
    has(eventType: string | EventBusEvent, handler: any): boolean;

    /**
     * Destroy all handlers that refer to eventBus
     */
    destroy(): void;
}

import EventBusEvent from './EventBusEvent';
