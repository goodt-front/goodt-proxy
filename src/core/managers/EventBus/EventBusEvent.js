/**
 * EventBusEvent class
 */

class EventBusEvent {
    static EVENT_NAVIGATE = 'navigate';

    static EVENT_STATE_CHANGE = 'state-change';

    /**
     * @type string
     */
    ns;

    /**
     * @type string
     */
    type;

    /**
     * EventBusEvent
     * @param {string} type     event type
     * @param {string} ns       event namespace @default '''
     */
    constructor(type, ns = '') {
        this.type = type;
        this.ns = ns;

        return Object.freeze(this);
    }

    /**
     * @type {string}
     */
    get fullType() {
        return this.ns ? `${this.type}.${this.ns}` : this.type;
    }
}

export default EventBusEvent;
