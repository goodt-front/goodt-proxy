export default EventBusEvent;

/**
 * EventBusEvent class
 */
declare class EventBusEvent {
    static EVENT_NAVIGATE: string;
    static EVENT_STATE_CHANGE: string;

    /**
     * EventBusEvent
     * @param {string} type     event type
     * @param {string} ns       event namespace @default '''
     */
    constructor(type: string, ns?: string);

    /**
     * @type string
     */
    ns: string;
    /**
     * @type string
     */
    type: string;
    /**
     * @type {string}
     */
    fullType: string;
}
