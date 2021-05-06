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
import { Elem, getDescriptorDefaultProps } from '[[{core}]]';
[[#hasTransport]]
import {
    useTransport,
    [[#http]]HttpTransportSymbol as TransportSymbol[[/http]]
    [[#httpAuth]]HttpAuthTransportSymbol as TransportSymbol[[/httpAuth]]
} from '[[{core}]]/mixins/useTransport';
[[/hasTransport]]

const descriptor = () => ({
    props: {},
    vars: {}
});
[[#hasTransport]]

/**
 * useTransport
 */
const { mixin: TransportMixin } = useTransport(TransportSymbol, {
    /**
     * overrides transport instance accessor name, default: '$transport'
     */
    // name: '$transport',
    /**
     * bind to vue component instance context
     */
    options() {
        return {
            baseURL: this.someUrlFromProps
        };
    }
});

[[/hasTransport]]
export default {
    extends: Elem,
    [[#hasTransport]]
    mixins: [ TransportMixin ],
    [[/hasTransport]]
    props: {
        props: {
            default() {
                return getDescriptorDefaultProps(descriptor());
            }
        }
    },
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
    mounted() {
        // to be implemented
    },
    methods: {
        getSlotNames() {
            return ['default'];
        },
        isChildAllowed(type) {
            return true;
        },
        getPanels() {
            return [import('./panels/SettingsPanel.vue')];
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
};
</script>
