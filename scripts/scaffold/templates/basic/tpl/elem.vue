<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} -->
        <code>{{ type }}</code>
        <div v-if="isEditorMode">running in editor</div>
        <div>{{ props }}</div>
        <!-- {/demo} -->
    </div>
</template>
<script>
/**
 * @typedef {import('./[[{name}]]').IComponentOptions} IComponentOptions
 * @typedef {import('./[[{name}]]').IInstance} IInstance
 */
import { Elem } from '[[{core}]]';
[[#hasTransport]]
import {
    useTransport,
    [[#http]]HttpTransportSymbol[[/http]][[#httpAuth]]HttpAuthTransportSymbol[[/httpAuth]] as TransportSymbol
} from '[[{core}]]/mixins/useTransport';
[[/hasTransport]]
import { descriptor } from './descriptor';

[[#hasTransport]]

/**
 * Create transport mixin with useTransport
 * @member {import('[[{core}]]/mixins/useTransport').ITransportMixin} TransportMixin
 */
const { mixin: TransportMixin } = useTransport(TransportSymbol, {
    /**
     * @param {import('vue/types/vue').Vue} vm component instance
     * @return {import('[[{core}]]/mixins/useTransport').TransportOptions}
     */
    options: (vm) => ({ baseURL: vm.$props })
    /*
    // or
    options: {
        baseURL: process.env.API_STATIC_URL
    }
    */
});
[[/hasTransport]]

/**
 * @type {IComponentOptions}
 */
export default ({
    extends: Elem,
    [[#hasTransport]]
    mixins: [ TransportMixin ],
    [[/hasTransport]]
    data: () => ({
        descriptor: descriptor()
    }),
    computed: {
        // to be implemented
    },
    /*
    watch: {
        // watching global state changes
        $storeState(state, prevState) {
            // to be implement watch
        },
        // watching route changes
        $routeCurrent(route, prevRoute) {
            // to be implement watch
        },
    },
    */
    /**
     * @this {IInstance}
     */
    created() {
        // to be implemented
    },
    methods: {
        /**
         * @return {string[]}
         */
        getSlotNames() {
            return ['default'];
        },
        /**
         * @return {boolean}
         */
        isChildAllowed(/* type */) {
            return true;
        },
        getPanels() {
            return [import('[[{panelPath}]]/[[{panelName}]].vue')];
        },
        /*
        storeCommitMethod() {
           // ...
           this.$storeCommit(updatedState);
        },
        routeNavigateMethod() {
           // ...
           this.$routeNavigate({ path, query });
        },
        [[#hasTransport]]
        transportUseMethod() {
           // ...
           this.$transport.request(requestOptions);
        },
        [[/hasTransport]]
        */
    }
});
</script>
