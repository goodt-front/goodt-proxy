<template>
    <div :class="cssClass" :style="cssStyle" />
</template>
<script>
import { ConstManager, RouteManager, StoreManager, EB } from './managers';
import descriptor from './Elem.descriptor';
import {
    dispatchEventByName,
    getDescriptorDefaultProps,
    patchComponentRootDomElement
} from './utils';

const { store, vo, ValueObject } = StoreManager;
const { EventBusWrapper } = EB;

/**
 * Elem events Lifecycle events
 * @enum {string}
 */
const ElemEvent = {
    CREATED: 'elem-created',
    MOUNTED: 'elem-mounted',
    DESTROYED: 'elem-destroyed'
};

/**
 * @type {import("./Elem.vue.d.ts").ComponentOptions}
 */
const ComponentOptions = {
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
        $storeState() {
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
        },
        /**
         * Returns the current route
         * @return {import('./managers/RouteManager').RouteObject} current route object
         */
        $routeCurrent() {
            return RouteManager.instance.route;
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
        dispatchEventByName.call(this, ElemEvent.CREATED);
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
        dispatchEventByName.call(this, ElemEvent.DESTROYED);
    },
    methods: {
        /**
         * Super method call helper, allows calling super methods when using extends/mixins
         * @example this.super(ComponentOptions).method.call(this)
         * @param {import('vue').ComponentOptions} componentOptions   component options
         * @return {Object}  methods list
         */
        super(componentOptions = ComponentOptions) {
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
            if (this.props.widthUnit === '' && this.props.width !== '') {
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
                this.props.widthUnit !== 'size' &&
                !isNaN(this.props.width) &&
                this.props.width !== ''
            ) {
                o.width = `${this.props.width}${this.props.widthUnit}`;
            }
            if (!isNaN(this.props.height) && this.props.height !== '') {
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
            // @NOTE method overloading for compatibility with old widgets that use EventBusWrapper for global state management
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
        $storeCommit(stateChange) {
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
            if (Object.keys(obj).length > 0) {
                store.commit(obj);
            }
            return {};
        },
        /**
         /**
         * Requests a route change by path
         * @param {string} path
         * @param {object} [query={}]
         */
        $routeNavigate({ path, query = {} }) {
            RouteManager.instance.navigate({ path, query });
        },
        /**
         * Replaces all constant keys occurrences with values in a string
         * @param {any} constantName  string to test
         * @return {any}
         */
        $c(constantName) {
            if (typeof constantName !== 'string') {
                return constantName;
            }
            let manager = ConstManager.instance;
            // @TODO regExp should be defined via ConstManager constant
            return constantName.replace(/(%[^%]+%)/g, m => manager.getConstValue(m));
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
            patchComponentRootDomElement(this);
            if (triggerEvents) {
                // emit 'mounted' event via vue/dom
                dispatchEventByName.call(this, ElemEvent.MOUNTED);
            }
        }
    }
};

export { ElemEvent, getDescriptorDefaultProps };
export default ComponentOptions;
</script>
