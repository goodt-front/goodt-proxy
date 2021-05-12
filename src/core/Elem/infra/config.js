/**
 * 
 * Elem events Lifecycle events
 * @enum {string}
 * @type {Readonly<{CREATED: string, MOUNTED: string, DESTROYED: string}>}
 */
const ElemEvent = Object.freeze({
    CREATED: 'elem-created',
    MOUNTED: 'elem-mounted',
    DESTROYED: 'elem-destroyed'
});

export { ElemEvent };

export default {
    ElemEvent
};
