<template>
    <div :class="cssClass" :style="cssStyle" />
</template>
<script>
import { get as getByPath } from 'lodash';
import { buildExternalStateFromInternal, buildInternalStateFromExternal } from '../mixins/useStore';
import { ConstManager, RouteManager, StoreManager, EB } from '../managers';
import { dispatchEventByName, getDescriptorDefaultProps, patchComponentRootDomElement, unobserve } from './infra/utils';

import { descriptor } from './descriptor';
import { ElemEvent } from './infra/config';

const { store, buildStoreValue, unwrapStoreValue, useWatchStore } = StoreManager;
const { EventBusWrapper } = EB;

const PropsToClassMap = new Map([
    ['marginT', 'mar-top'],
    ['marginR', 'mar-right'],
    ['marginB', 'mar-bot'],
    ['marginL', 'mar-left'],
    ['paddingT', 'pad-top'],
    ['paddingR', 'pad-right'],
    ['paddingB', 'pad-bot'],
    ['paddingL', 'pad-left']
]);

const ComponentOptions = {
    props: {
        /** uniq instance id */
        id: {
            type: String,
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
            descriptor: descriptor(),
            /** @NOTE we have to make it reactive for the computed $eventBus to work */
            eventBusWrapper: null
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
         * Css variables (run-time, context-aware, should be overriden)
         * @note don't prefix css-var names with '--'
         * @return {object}
         */
        $cssVars() {
            return {};
        },
        /**
         * Css variables (static, auto-generated from descriptor)
         * @return {object}
         */
        $cssVarsStatic() {
            const {
                props,
                descriptor: { cssVars }
            } = this;
            if (cssVars == null) {
                return {};
            }
            const resolveMapping = (mapping) => {
                if (typeof mapping === 'function') {
                    return mapping(props);
                }
                if (typeof mapping === 'string') {
                    return getByPath(props, mapping);
                }
                if (Array.isArray(mapping)) {
                    const value = getByPath(props, mapping[0]);
                    return value || mapping[1];
                }
                return mapping;
            };
            // prettier-ignore
            return Object.entries(cssVars).reduce((acc, [cssVar, mapping]) => ({
                ...acc,
                [cssVar]: this.$c(resolveMapping(mapping))
            }), {});
        },
        /**
         * Returns the current store state
         * @return {Record<string, any>} state
         */
        $storeState() {
            const varAliases = this.props.varAliases || {};
            const { state: externalState } = store;
            const internalState = buildInternalStateFromExternal(externalState, varAliases, unwrapStoreValue);

            return internalState;
        },
        /**
         * Returns the current route
         *
         * @return {import('../managers/RouteManager').RouteObject} current route object
         */
        $routeCurrent() {
            return RouteManager.instance.route;
        },
        /**
         * Returns event bus instance for further use, after eventBusWrapper would renamed
         *
         * @return {null|*}
         */
        $eventBus() {
            return this.eventBusWrapper;
        }
    },
    /**
     * @this {import("./Elem").IElemInstance}
     */
    created() {
        this.eventBusWrapper = null;
        //// whenever css-vars change -> invoke getCssStyle()
        this.$watch('$cssVars', this.genCssStyle, { immediate: true });

        if (this.isEditorMode) {
            /**
             * @todo remove varAliases
             */
            this.$watch('props.varAliases', (val) => {
                // @ts-ignore
                const { eventBusWrapper } = this;
                if (eventBusWrapper) {
                    eventBusWrapper.varAliases = val;
                }
            });
            this.$watch('props.cssClass', this.genCssClass, { immediate: true });
            this.$watch('props.cssStyle', this.genCssStyle, { immediate: true });
            this.$watch('$cssVarsStatic', this.genCssStyle, { immediate: true });
        } else {
            this.genCssClass();
            /*
            // skipping due earlier
            // this.$watch('$cssVars', this.genCssStyle, { immediate: true });
            this.genCssStyle();
            */
            unobserve([this.descriptor, this.$props, this.cssClass, this.cssStyle]);
        }

        // starts watching Global Store.state
        useWatchStore(this);
        // emit 'created' event via vue/dom
        dispatchEventByName.call(this, ElemEvent.CREATED);
    },
    /**
     * @this {import("./Elem").IElemInstance}
     */
    mounted() {
        this._mounted();
    },
    /**
     * @this {import("./Elem").IElemInstance}
     */
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
         *
         * @example this.super(ComponentOptions).method.call(this)
         * @param {any} componentOptions  component options
         * @return {Record<string, any>}  methods list
         */
        super(componentOptions = ComponentOptions) {
            return componentOptions.methods;
        },
        /**
         * Generates css-class def
         */
        genCssClass() {
            const { props } = this;
            const classMap = {};
            // prettier-ignore
            ['display', 'position', 'cssClass'].forEach((propName) => {
                [].concat(props[propName])
                  .filter(Boolean)
                  .forEach((propValue) => {
                      classMap[propValue] = true;
                  });
            });
            PropsToClassMap.forEach((classPrefix, propName) => {
                const { [propName]: value } = props;
                if (value) {
                    classMap[`${classPrefix}-${value}`] = true;
                }
            });
            if (props.widthUnit === '' && props.width !== '') {
                classMap[`w-${props.width}`] = true;
            }

            this.$set(this, 'cssClass', classMap);

            return classMap;
        },
        /**
         * Generates css-style def
         */
        genCssStyle() {
            const cssStyle = { ...this.props.cssStyle };
            if (this.props.widthUnit !== 'size' && !Number.isNaN(this.props.width) && this.props.width !== '') {
                cssStyle.width = `${this.props.width}${this.props.widthUnit}`;
            }
            if (!Number.isNaN(this.props.height) && this.props.height !== '') {
                cssStyle.height = `${this.props.height}${this.props.heightUnit}`;
            }
            this.$set(this, 'cssStyle', { ...this.genCssVarsStyle(), ...cssStyle });
        },
        /**
         * Generates css-vars-style def
         */
        genCssVarsStyle() {
            // prettier-ignore
            return Object.entries({ ...this.$cssVarsStatic, ...this.$cssVars }).reduce((acc, [key, value]) => ({
                ...acc,
                [`--w-${key}`]: value
            }), {});
        },
        /**
         * Returns component slot names
         *
         * @NOTE <slot></slot> without name have a 'default' name
         * @return {Array}
         */
        getSlotNames() {
            return ['default'];
        },
        /**
         * Returns panel components list (used by the editor env)
         *
         * @return {import('vue/types/options').AsyncComponentPromise[]}   list of panel components
         */
        getPanels() {
            return [];
        },
        /**
         * Returns true if component accepts children (used by the editor env, dnd)
         *
         * @param {string} type     elem fulltype to test @example 'Ns/SubNs/ElemExample'
         * @return {boolean}        true if 'type' child is allowed
         */
        isChildAllowed(type) {
            return true;
        },
        /**
         * Creates a new event bus wrapper
         * @invoked after @see ElemEvent.MOUNTED
         * @param {import('../managers/EventBus').EventBus} eventBus
         */
        setEventBus(eventBus) {
            const wrapper = new EventBusWrapper(eventBus);
            wrapper.varAliases = this.props.varAliases || {};
            // @NOTE method overloading for compatibility with old widgets that use EventBusWrapper for global state management
            // {compat}
            wrapper.toVO = buildStoreValue;
            wrapper.toValue = unwrapStoreValue;
            // {/compat}
            this.eventBusWrapper = wrapper;
            this.$nextTick(() => this.subscribe());
        },
        /**
         * Transforms 'internalStatePartial' object to Object.< string, ValueObject>
         * and commits internalStatePartial to the store's state
         *
         * @param {Record<string, any>} internalStatePartial
         */
        $storeCommit(internalStatePartial) {
            const varAliases = this.props.varAliases || {};
            const externalStatePartial = buildExternalStateFromInternal(
                internalStatePartial,
                varAliases,
                buildStoreValue
            );

            // don't commit if obj is empty
            if (Object.keys(externalStatePartial).length > 0) {
                store.commit(externalStatePartial);
            }
        },
        /**
         /**
         * Requests a route change by path
         *
         * @param {import('../managers/RouteManager').NavigateOptions} options
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
         * Mounted LC handler
         *
         * @private
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

export default ComponentOptions;
</script>
