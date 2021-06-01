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
[[#hasTransport]]
import { useApiService } from '[[{coreMixins}]]';
[[/hasTransport]]
import { descriptor, /* Vars */ } from './descriptor';
import { [[{panelName}]]Async } from '[[{panelPath}]]';

[[#hasTransport]]

/**
 * Creates transport mixin, that adds $transport (http, httpAuth) instance
 * @member {import('[[{coreMixins}]]/useTransport').ITransportMixin} ServiceMixin
 */
const { mixin: ApiServiceMixin } = useApiService({
    options: {
        baseURL: 'http://localhost:3000'
    },
    /*
    // @todo: DELETE UNUSED
    // or using component's instance context
    options: (vm) => ({
        apiBaseURL: vm.someUrlProp
    })
    */
});
[[/hasTransport]]

/**
 * @type {IComponentOptions}
 */
export default ({
    extends: Elem,
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
            return [ [[{panelName}]]Async ];
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
        }
        */
    }
});
</script>
