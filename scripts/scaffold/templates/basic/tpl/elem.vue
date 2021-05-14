<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} @todo: DELETE COMMENTS -->
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
import { [[{panelName}]]Async } from '[[{panelPath}]]';
[[#hasTransport]]
import {
    useTransport,
    [[#http]]HttpTransportSymbol[[/http]][[#httpAuth]]HttpAuthTransportSymbol[[/httpAuth]] as TransportSymbol
} from '[[{coreMixins}]]/useTransport';
[[/hasTransport]]
import { descriptor, /* Vars */ } from './descriptor';

[[#hasTransport]]

/**
 * Creates transport mixin, that adds $transport (http, httpAuth) instance
 * @member {import('[[{coreMixins}]]/useTransport').ITransportMixin} TransportMixin
 */
const { mixin: TransportMixin } = useTransport(TransportSymbol, {
    /**
     * @type {import('[[{coreMixins}]]/useTransport').TransportOptions}
     */
    options: {
        baseURL: 'http://localhost:3000'
    },
    /*
    // @todo: DELETE UNUSED
    // or using component's instance context
    options: (vm) => ({
        baseURL: vm.someUrlProp
    })
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
    // @todo: DELETE UNUSED
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
     * @todo: DELETE UNUSED
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
            return [[{panelName}]]Async;
        },
        // @todo: DELETE UNUSED STUFF
        /*
        sampleStoreCommitMethod() {
           // ...
           this.$storeCommit(updatedState);
        },
        sampleRouteNavigateMethod() {
           // ...
           this.$routeNavigate({ path, query });
        },
        [[#hasTransport]]
        sampleTransportUseMethod() {
           // ...
           this.$transport.request(requestOptions);
        },
        [[/hasTransport]]
        */
    }
});
</script>
