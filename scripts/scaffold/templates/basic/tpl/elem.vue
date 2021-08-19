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
import { createApiService, ServiceTypeData } from './api/service';
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
         * @property {import('./api/service').ApiService} apiService
         */
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
         * @todo replace for useService
         */
        createWidgetApiService() {
            const apiService = createApiService({
                apiBaseURL: this.props[API_SERVICE_BASE_URL_PROP_NAME]
            });
            // in 'editor mode' props may change
            if (this.isEditorMode) {
                this.$watch(`props.${API_SERVICE_BASE_URL_PROP_NAME}`, (url) => {
                    apiService.apiBaseURL = url;
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
        isChildAllowed(/* type */) {
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
            /*
            const { isSuccess, isError, result, error } = this.demoResult;
            if (isSuccess) {
                console.log({ result });
            }
            if (isError) {
                console.error({ error });
            }
            */
        },
        /* Vetur HACK – extra structure and type information */
        ...ServiceTypeData
        [[/hasTransport]]
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
