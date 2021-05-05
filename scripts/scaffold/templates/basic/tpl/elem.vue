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
import { Elem, getDescriptorDefaultProps } from '[[{core}]]/core';
[[#http]]
import { useTransport, HttpTransportSymbol as TransportSymbol } from '[[{core}]]/core/mixins/useTransport';
[[/http]]
[[#httpAuth]]
import { useTransport, HttpAuthTransportSymbol as TransportSymbol } from '[[{core}]]/core/mixins/useTransport';
[[/httpAuth]]

const descriptor = () => ({
    props: {},
    vars: {}
});

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
            baseURL: this.props.apiURL
        };
    }
});

export default {
    extends: Elem,
    [[#http]]
    mixins: [ TransportMixin ],
    [[/http]]
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
        [[#http]]
        // http transport instance available
        // this.$transport
        [[/http]]
    },
    /*
    watch: {
        $storeState(state, prevState) {
            // to be implement watch
        },
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
        sampleStoreCommitMethod() {
           // ...
           this.$storeCommit(updatedState);
        },
        sampleRouteNavigateMethod() {
           // ...
           this.$routeNavigate({ path, query });
        },
        */
    }
};
</script>
