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
export const getDomId = elemId => `elem-${elemId}`;

/**
 * Dispatches Elem Vue Component LC-specific Event
 * via Vue emit mechanism and also DOM events mechanism.
 *
 * @param {string} eventName
 * @this {VueInstance}
 */
export const dispatchEventByName = function(eventName) {
    const e = new ElemEvent(eventName, this);
    this.$emit(e.type, this);
    document.dispatchEvent(e);
};

/**
 * Patches vue component instance root dom element with runtime prop
 * __elem__ refers to self component instance and set constructor-specific extra attributes
 *
 * @param {VueInstance & {id, type}} context
 */
export const patchRootDomElement = context => {
    const { $el, id, type } = context;
    if ($el) {
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
 * @return {Object}
 */
export const getDescriptorDefaultProps = descriptor => {
    const o = {};
    let p = descriptor.props;
    for (let n in p) {
        o[n] = typeof p[n].default === 'function' ? p[n].default() : p[n].default;
    }
    return o;
};
