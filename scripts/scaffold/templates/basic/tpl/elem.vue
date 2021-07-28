<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} @todo: DELETE COMMENTS -->
        <code>{{ type }}</code>
        <div v-if="isEditorMode">running in editor</div>
        <div>{{ props }}</div>
        [[#hasTransport]]
        <pre v-if="demoResult">{{ demoResult.value }}</pre>
        <div
            class="btn btn-primary btn-small"
            :class="{ 'btn-loading events-none': loading }"
            @click="getDemoData"
        >
            send demo request
        </div>
        [[/hasTransport]]
        <!-- {/demo} -->
    </div>
</template>
<script>
/**
 * @typedef {import('./[[{name}]]').IInstance} IInstance
 */
import { Elem } from '[[{core}]]';
[[#hasTransport]]
[[#http]]
import { createTransport, HttpTransportSymbol } from '[[{coreNetPath}]]';
[[/http]]
[[^http]]
import { createTransport, HttpAuthTransportSymbol } from '[[{coreNetPath}]]';
[[/http]]
import { ServiceFactory, Service } from './service/service';
[[/hasTransport]]
import { descriptor, /* Vars */ } from './descriptor';
import { [[{panelName}]]Async } from '[[{panelPath}]]';

/**
 * @type {IInstance}
 */
export default {
    extends: Elem,
    data: () => ({
        descriptor: descriptor(),
        [[#hasTransport]]
        loading: false,
        /**
         * @type {import('[[{commonUtils}]]').ISafeResult}
         */
        demoResult: null,
        /**
         * @type {Service}
         */
        service: null
        [[/hasTransport]]
    }),
    created() {
        [[#hasTransport]]
        // service 'apiBaseURL' property name in descriptor
        const serviceBaseURLPropName = 'apiBaseURL';
        [[#http]]
        const transport = createTransport(HttpTransportSymbol);
        [[/http]]
        [[^http]]
        const transport = createTransport(HttpAuthTransportSymbol);
        [[/http]]
        this.service = ServiceFactory(transport, {
            apiBaseURL: this.props[serviceBaseURLPropName]
        });
        // in 'editor mode' props may change
        if (this.isEditorMode) {
            this.$watch(`props.${serviceBaseURLPropName}`, (val) => {
                this.service.apiBaseURL = val;
            });
        }
        // clean-up
        this.$on('hook:beforeDestroy', () => this.service.dispose());
        [[/hasTransport]]
        [[^hasTransport]]
        // to be implemented
        [[/hasTransport]]
    },
    methods: {
        /**
         * @return {string[]}
         */
        getSlotNames() {
            return ['default'];
        },
        /**
         * @param {string} type  widget type
         * @return {boolean}
         */
        isChildAllowed(type) {
            return true;
        },
        getPanels() {
            return [ [[{panelName}]]Async ];
        },
        [[#hasTransport]]
        async getDemoData() {
            this.loading = true;
            this.demoResult = await this.service.getUserById(1);
            this.loading = false;
        }
        [[/hasTransport]]
    }
};
</script>
