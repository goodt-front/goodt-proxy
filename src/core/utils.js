/**
 * @typedef {import('vue/types/vue').Vue} VueInstance
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
 * @return {string}
 */
export const getDomId = (elemId) => `elem-${elemId}`;

/**
 * Dispatches Elem Vue Component LC-specific Event
 * via Vue emit mechanism and also DOM events mechanism.
 *
 * @param {string} eventName
 * @this {VueInstance}
 */
export function dispatchEventByName(eventName) {
    const e = new ElemEvent(eventName, this);
    this.$emit(e.type, this);
    document.dispatchEvent(e);
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
        $el.setAttribute('id', getDomId(id));
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
    });
};

/**
 *
 * @param {Record<string, unknown>} object
 * @param {function([string, unknown]): boolean} filterFn
 * @return {Record<string, unknown>}
 */
export const filterObject = (object, filterFn) =>
    Object.fromEntries(Object.entries(object).filter(filterFn));
