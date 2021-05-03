<template>
    <div :class="cssClass" :style="cssStyle" />
</template>
<script>
import {
    buildExternalStateFromInternal,
    buildInternalStateFromExternal
} from './mixins/useStoreTransitional';

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
const ElemEvent = Object.freeze({
    CREATED: 'elem-created',
    MOUNTED: 'elem-mounted',
    DESTROYED: 'elem-destroyed'
});

/**
 * @type {import("./Elem.vue").ComponentOptions}
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
        initProps: {
            type: Object,
            default() {
                return {};
            }
        },
        /** slot scope data if component is inside scoped slot of the parent component */
        slotData: {
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
         * Merged props
         * @return {object}
         */
        props() {
            const { initProps } = this;
            const defaultProps = getDescriptorDefaultProps(this.descriptor);
            return { ...defaultProps, ...initProps };
        },
        /**
         * Returns the current store state
         * @return {Record<string, any>} state
         */
        $storeState() {
            const varAliases = this.props.varAliases || {};
            const { state: externalState } = store;
            const internalState = buildInternalStateFromExternal(externalState, varAliases);

            return internalState;
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
            this.$watch('props.varAliases', (val) => {
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
         * @return {Record<string, any>}  methods list
         */
        super(componentOptions = ComponentOptions) {
            return componentOptions.methods;
        },
        /**
         * Generates css-class def
         */
        genCssClass() {
            const o = {};
            const p = ['display', 'position', 'cssClass'];
            p.forEach((pName) => {
                const pVal = this.props[pName];
                const pValArr = Array.isArray(pVal) ? pVal : [pVal];
                pValArr.forEach((v) => {
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
            const o = this.props.cssStyle ? { ...this.props.cssStyle } : {};
            if (
                this.props.widthUnit !== 'size' &&
                !Number.isNaN(this.props.width) &&
                this.props.width !== ''
            ) {
                o.width = `${this.props.width}${this.props.widthUnit}`;
            }
            if (!Number.isNaN(this.props.height) && this.props.height !== '') {
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
         * @param {string} type     elem fulltype to test @example 'Ns/SubNs/ElemExample'
         * @return {boolean}        true if 'type' child is allowed
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
            const wrapper = new EventBusWrapper(eventBus);
            wrapper.varAliases = this.props.varAliases || {};
            // @NOTE method overloading for compatibility with old widgets that use EventBusWrapper for global state management
            // {compat}
            wrapper.toVO = (value, meta) =>
                value instanceof ValueObject ? value : vo(value, meta);
            wrapper.toValue = (valueObject) => ValueObject.getValue(valueObject);
            // {/compat}
            this.eventBusWrapper = wrapper;
            this.$nextTick(() => this.subscribe());
        },
        /**
         * Transforms 'internalStatePartial' object to Object.< string, ValueObject>
         * and commits internalStatePartial to the store's state
         * @param {Record<string, any>} internalStatePartial
         * @return {Record<string, any>} transformed 'internalStatePartial' with ValueObjects
         */
        $storeCommit(internalStatePartial) {
            const varAliases = this.props.varAliases || {};
            const externalStatePartial = buildExternalStateFromInternal(
                internalStatePartial,
                varAliases
            );

            // don't commit if obj is empty
            if (Object.keys(externalStatePartial).length > 0) {
                store.commit(externalStatePartial);
            }
            return {};
        },
        /**
         /**
         * Requests a route change by path
         * @param {import('./managers/RouteManager').NavigateOptions} options
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
            const manager = ConstManager.instance;
            // @TODO regExp should be defined via ConstManager constant
            return constantName.replace(/(%[^%]+%)/g, (m) => manager.getConstValue(m));
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
         * @param {boolean} [triggerEvents=true]    whether to emit 'mounted' event
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
