/**
 * @typedef {import('vue/types/vue')} VueInstance
 */

/**
 * Widget LC event class
 */
class ElemEvent extends CustomEvent {
    constructor(eventName, instance) {
        super(eventName, {
            detail: {
                instance
            }
        });
    }

    get instance() {
        return this.detail.instance;
    }
}

/**
 * Returns generated Constructor-specific dom id
 *
 * @param {string | number} elemId
 * @return {string}
 */
export const getElemDomId = (elemId) => `elem-${elemId}`;

/**
 * Dispatches Elem Vue Component LC-specific Event
 * via Vue emit mechanism and also DOM events mechanism.
 *
 * @param {string} eventName
 * @this {VueInstance}
 */
export function dispatchEventByName(eventName) {
    const event = new ElemEvent(eventName, this);
    this.$emit(event.type, this);
    document.dispatchEvent(event);
}

/**
 * Patches vue component instance root dom element with runtime prop
 * __elem__ refers to self component instance and set constructor-specific extra attributes
 *
 * @param {VueInstance & {id, type}} context
 */
export const patchComponentRootDomElement = (context) => {
    const { $el, id, type } = context;
    if (!$el) {
        return;
    }
    // expose vue component instance reference
    $el.__elem__ = context;
    // set id/data-elem attrs
    if ($el.setAttribute) {
        $el.setAttribute('id', getElemDomId(id));
        $el.setAttribute('data-elem', type);
    }
};

/**
 * Returns descriptor props hash with default values
 *
 * @param {ElemDescriptor} descriptor
 * @return {Record<string, any>}
 */
export const getDescriptorDefaultProps = (descriptor) => {
    const { props } = descriptor;
    return Object.entries(props).reduce((defaults, [propName, propOptions]) => {
        const { default: value } = propOptions;
        return {
            ...defaults,
            [propName]: typeof value === 'function' ? value() : value
        };
    }, {});
};
