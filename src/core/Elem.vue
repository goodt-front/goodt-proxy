<template>
    <div :class="cssClass" :style="cssStyle" />
</template>
<script>
import { ConstManager, StateManager, EB } from './managers/index';
import descriptor from './Elem.descriptor';

const { store, vo, ValueObject } = StateManager;
const { EventBusWrapper } = EB;

/**
 * Returns descriptor props hash with default values
 * @param {ElemDescriptor} descriptor
 * @return {Object}
 */
const getDescriptorDefaultProps = descriptor => {
    let o = {};
    let p = descriptor.props;
    for (let n in p) {
        o[n] = typeof p[n].default === 'function' ? p[n].default() : p[n].default;
    }
    return o;
};
/**
 * Returns dom id
 * @return {String}
 */
const getDomId = elemId => `elem-${elemId}`;
/**
 * Elem events Lifecycle events
 */
const ElemEvent = {
    CREATED: 'elem-created',
    MOUNTED: 'elem-mounted',
    DESTROYED: 'elem-destroyed'
};

export { getDescriptorDefaultProps, getDomId, ElemEvent };

export default {
    props: {
        /** uniq instance id */
        id: {
            default: ''
        },
        /** elem fulltype @example 'Ns/SubNs/ElemExample' */
        type: {
            type: String,
            default: ''
        },
        /** elem props defined in ElemDescriptor */
        props: {
            type: Object,
            default() {
                return {};
            }
        },
        /** env mode (true - player env; false - editor env) */
        isEditorMode: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            /** css-style def object */
            cssClass: {},
            /** css-class def object */
            cssStyle: {},
            /** default slot name (used in editor env by dnd) */
            slotDefault: 'default',
            /** @type {ElemDescriptor} */
            descriptor: descriptor()
        };
    },
    computed: {
        /**
         * Returns the current store state
         * @return {Object} state
         */
        $state() {
            let { state } = store;
            let { varAliases } = this.props;
            varAliases = varAliases || {};
            let obj = {};
            for (let k in varAliases) {
                let alias = varAliases[k].listen;
                if (alias && state[alias]) {
                    obj[k] = ValueObject.getValue(state[alias]);
                }
            }
            return obj;
        }
    },
    watch: {
        'props.cssClass': {
            handler() {
                this.genCssClass();
            },
            immediate: true
        },
        'props.cssStyle': {
            handler() {
                this.genCssStyle();
            },
            immediate: true
        }
    },
    created() {
        if (this.isEditorMode) {
            this.$watch('props.varAliases', val => {
                // @ts-ignore
                const { eventBusWrapper } = this;
                if (eventBusWrapper) {
                    eventBusWrapper.varAliases = val;
                }
            });
        }
        /** @type {EventBusWrapper} */
        // @ts-ignore
        this.eventBusWrapper = null;
        // emit 'created' event via vue/dom
        let e = new Event(ElemEvent.CREATED);
        // @ts-ignore
        e.instance = this;
        document.dispatchEvent(e);
        this.$emit(e.type, this);
    },
    mounted() {
        this._mounted();
    },
    beforeDestroy() {
        // teardown eventbus wrapper
        if (this.eventBusWrapper) {
            this.eventBusWrapper.destroy();
            this.eventBusWrapper = null;
        }
        // emit 'destroyed' event via vue/dom
        let e = new Event(ElemEvent.DESTROYED);
        e.instance = this;
        document.dispatchEvent(e);
        this.$emit(e.type, this);
    },
    methods: {
        /**
         * Super method call helper, allows calling super methods when using extends/mixins
         * @example this.super(ComponentOptions).method.call(this)
         * @param {import('vue').ComponentOptions} componentOptions   component options
         * @return {Object}  methods list
         */
        super(componentOptions) {
            return componentOptions.methods;
        },
        /**
         * Generates css-class def
         */
        genCssClass() {
            let o = {};
            let p = ['display', 'position', 'cssClass'];
            p.forEach(pName => {
                let pVal = this.props[pName];
                let pValArr = Array.isArray(pVal) ? pVal : [pVal];
                pValArr.forEach(v => {
                    if (v) {
                        o[v] = true;
                    }
                });
            });
            if (this.props.widthUnit == '' && this.props.width != '') {
                o[`w-${this.props.width}`] = true;
            }
            if (this.props.marginT) {
                o[`mar-top-${this.props.marginT}`] = true;
            }
            if (this.props.marginR) {
                o[`mar-right-${this.props.marginR}`] = true;
            }
            if (this.props.marginB) {
                o[`mar-bot-${this.props.marginB}`] = true;
            }
            if (this.props.marginL) {
                o[`mar-left-${this.props.marginL}`] = true;
            }
            if (this.props.paddingT) {
                o[`pad-top-${this.props.paddingT}`] = true;
            }
            if (this.props.paddingR) {
                o[`pad-right-${this.props.paddingR}`] = true;
            }
            if (this.props.paddingB) {
                o[`pad-bot-${this.props.paddingB}`] = true;
            }
            if (this.props.paddingL) {
                o[`pad-left-${this.props.paddingL}`] = true;
            }
            this.$set(this, 'cssClass', o);
        },
        /**
         * Generates css-style def
         */
        genCssStyle() {
            let o = this.props.cssStyle ? { ...this.props.cssStyle } : {};
            if (
                this.props.widthUnit != 'size' &&
                !isNaN(this.props.width) &&
                this.props.width != ''
            ) {
                o.width = `${this.props.width}${this.props.widthUnit}`;
            }
            if (!isNaN(this.props.height) && this.props.height != '') {
                o.height = `${this.props.height}${this.props.heightUnit}`;
            }
            this.$set(this, 'cssStyle', o);
        },
        /**
         * Returns component slot names
         * @NOTE <slot></slot> without name have a 'default' name
         * @return {array}
         */
        getSlotNames() {
            return ['default'];
        },
        /**
         * Returns panel components list (used by the editor env)
         * @return {import('vue/types/options').AsyncComponentPromise[]}   list of panel components
         */
        getPanels() {
            return [];
        },
        /**
         * Returns true if component accepts children (used by the editor env, dnd)
         * @param {String} type     elem fulltype to test @example 'Ns/SubNs/ElemExample'
         * @return {Boolean}        true if 'type' child is allowed
         */
        isChildAllowed(type) {
            return true;
        },
        /**
         * Creates a new event bus wrapper
         * @invoked after @see ElemEvent.MOUNTED
         * @param {import('./managers/EventBus').EventBus} eventBus
         */
        setEventBus(eventBus) {
            let wrapper = new EventBusWrapper(eventBus);
            wrapper.varAliases = this.props.varAliases || {};
            // @NOTE method overloading for compatibily with old widgets that use EventBusWrapper for global state management
            // {compat}
            wrapper.toVO = (value, meta) =>
                value instanceof ValueObject ? value : vo(value, meta);
            wrapper.toValue = vo => ValueObject.getValue(vo);
            // {/compat}
            // @ts-ignore
            this.eventBusWrapper = wrapper;
            this.$nextTick(() => this.subscribe());
        },
        /**
         * Transforms 'stateChange' object to Object.< string, ValueObject>
         * and commits stateChange to the store's state
         * @param {Object.<string, any>} stateChange
         * @return {Object} transformed 'stateChange' with ValueObjects
         */
        $commitState(stateChange) {
            let { varAliases } = this.props;
            varAliases = varAliases || {};
            let obj = {};
            for (let k in stateChange) {
                if (varAliases[k] && varAliases[k].trigger) {
                    let alias = varAliases[k].trigger;
                    obj[alias] = vo(stateChange[k], varAliases[k].meta);
                }
            }
            // don't commit if obj is empty
            Object.keys(obj) && store.commit(obj);
            return {};
        },
        /**
         * Replaces all constant keys occurances with values in a string
         * @param {String} str  string to test
         * @return {any}
         */
        $c(str) {
            if (typeof str !== 'string') {
                return str;
            }
            let manager = ConstManager.instance;
            // @TODO regExp should be defined via ConstManager constant
            return str.replace(/(%[^%]+%)/g, m => manager.getConstValue(m));
        },
        /**
         * LC stage, called by the env after 'mounted()'
         */
        subscribe() {
            // ... to be implemented
        },
        /**
         * @private Mounted LC handler
         * This method is useful for edge-cases when Elem's $el may change
         * Cases:
         * - root domNode has a v-if directive
         * - component uses render() function and the domNode tag is dynamic and v-key is not used
         * @param {Boolean} [triggerEvents=true]    whether to emit 'mounted' event
         */
        _mounted(triggerEvents = true) {
            let { $el } = this;

            if ($el) {
                // expose vue component instance reference
                $el.__elem__ = this;
                // set id/data-elem attrs
                if ($el.setAttribute) {
                    $el.setAttribute('id', getDomId(this.id));
                    $el.setAttribute('data-elem', this.type);
                }
            }
            if (triggerEvents) {
                // emit 'mounted' event via vue/dom
                let e = new Event(ElemEvent.MOUNTED);
                e.instance = this;
                document.dispatchEvent(e);
                this.$emit(e.type, this);
            }
        }
    }
};
</script>
