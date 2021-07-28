<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} @todo: DELETE COMMENTS -->
        <code>{{ type }}</code>
        <div v-if="isEditorMode">running in editor</div>
        <div>{{ props }}</div>
        [[#hasTransport]]
        <template v-if="demoResult">
            <pre v-if="demoResult.isSuccess">{{ demoResult.result }}</pre>
            <pre v-if="demoResult.isError" class="color-red">{{ demoResult.error.message }}</pre>
        </template>
        <template v-else>
            <div>No result yet</div>
        </template>
        <button
            class="btn btn-primary btn-small"
            :class="{ 'btn-loading events-none': isLoading }"
            @click="getDemoData"
        >
            send demo request
        </button>
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
import { createApiService, ApiService } from './api/service';
[[/hasTransport]]
import { descriptor, /* Vars */ } from './descriptor';
import { [[{panelName}]]Async } from '[[{panelPath}]]';

[[#hasTransport]]
// service 'apiBaseURL' property name in descriptor
const API_SERVICE_BASE_URL_PROP_NAME = 'apiBaseURL';
[[/hasTransport]]

export default {
    extends: Elem,
    data: () => ({
        descriptor: descriptor(),
        [[#hasTransport]]
        isLoading: false,
        /**
         * @type {import('[[{commonUtils}]]').ISafeResult}
         */
        demoResult: null,
        /**
         * @type {ApiService}
         */
        apiService: null
        [[/hasTransport]]
    }),
    created() {
        [[#hasTransport]]
        this.createWidgetApiService();
        [[/hasTransport]]
    },
    methods: {
        [[#hasTransport]]
        /**
         * @this {IInstance}
         */
        createWidgetApiService() {
            [[#http]]
            const transport = createTransport(HttpTransportSymbol);
            [[/http]]
            [[^http]]
            const transport = createTransport(HttpAuthTransportSymbol);
            [[/http]]
            const apiService = createApiService(transport, {
                apiBaseURL: this.props[API_SERVICE_BASE_URL_PROP_NAME]
            });
            // in 'editor mode' props may change
            if (this.isEditorMode) {
                this.$watch(`props.${API_SERVICE_BASE_URL_PROP_NAME}`, (val) => {
                    apiService.apiBaseURL = val;
                });
            }
            // clean-up
            this.$on('hook:beforeDestroy', () => apiService.dispose());
            this.apiService = apiService;
        },
        [[/hasTransport]]
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
            this.isLoading = true;
            this.demoResult = await this.apiService.getUserById(1);
            this.isLoading = false;
        }
        [[/hasTransport]]
    }
};
</script>
