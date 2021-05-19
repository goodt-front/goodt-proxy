export default EventBus;
export type EventHandler = (event: EventBusEvent, data: any) => any;
export type ListenerInfo = {
    event: EventBusEvent;
    handler: EventHandler;
    once: boolean;
};

/**
 * EventBus class
 */
declare class EventBus extends EventBusBase {
    /**
     * Constructor
     *
     * @param {import('./StoreManager').Store} store
     * @param {import('./RouteManager').default} routeManager
     */
    constructor(store: any, routeManager: any);

    useStateHistory: boolean;
    useStateDeferredMerging: boolean;
    private _stateNew: {};
    private _stateTriggerTimeout: any;
    private _store: any;
    private _routeManager: any;

    /**
     * Set state
     *
     * @param {object} state
     */
    setState(state: object): void;

    /**
     * Returns state
     *
     * @return {object}
     */
    getState(): object;

    /**
     * Reset latest/new states
     */
    resetState(): void;

    /**
     * Create state trigger timeout
     *
     * @param {Function} handler    handler
     */
    createStateTriggerTimeout(handler: Function): void;

    /**
     * Reset active state trigger timeout
     */
    resetStateTriggerTimeout(): void;

    /**
     * Check if state timeout is active
     *
     * @return {boolean}
     */
    stateTriggerTimeoutActive(): boolean;

    /**
     * Listen state change event handler
     *
     * @private
     * @param {EventBusEvent} event     event
     * @param {EventHandler} handler    handler
     * @param {boolean} once            once? @default false
     * @return {Function}              dispose handler i.e. dispose() === unlisten(event, handler)
     */
    private _listenStateChange;
    /**
     * Trigger state change event handler
     *
     * @private
     * @param {EventBusEvent} event     event
     * @param {object} stateChange      state change
     */
    private _triggerStateChange;
    /**
     * Store commit handler
     *
     * @private
     * @param {object} stateChange
     */
    private _storeCommitHandler;
    /**
     * Route manager route handler
     *
     * @private
     * @param {import('./RouteManager').RouteObject} route
     */
    private _routeManagerRouteHandler;
}

import EventBusEvent from './EventBusEvent';
import EventBusBase from './EventBusBase';
