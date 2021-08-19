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
            @click="getDemoData">
            send demo request
        </button>
        [[/hasTransport]]
        <!-- {/demo} -->
    </div>
</template>
<script>
import { Elem } from '[[{core}]]';
[[#hasTransport]]
[[/hasTransport]]
import { [[{panelName}]]Async } from '[[{panelPath}]]';
import { useApiServiceMixin, ServiceTypeDescriptor } from './api/service';
import { descriptor /* , Vars */ } from './descriptor';

/**
 * @typedef {import('./types').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

[[#hasTransport]]
/**
 * Миксин для использования ApiService вместе с компонентом
 * @type {import('@goodt-common/mixins').IApiServiceMixin}
 */
const ApiServiceMixin = useApiServiceMixin({
    /**
     * api service would watch for 'props.apiBaseURL' property changes
     * @type {string}
     */
    apiBaseURL: 'props.apiBaseURL'
}, {
    /**
     * api service accessor name to access in component: `this.apiService`
     * @type {string}
     */
    name: 'apiService'
});
[[/hasTransport]]

export default {
    extends: Elem,
    mixins: [ ApiServiceMixin ],
    data: () => ({
        descriptor: descriptor(),
        [[#hasTransport]]
        isLoading: false,
        /**
         * @type {import('[[{commonUtils}]]').ISafeResult}
         */
        demoResult: null,
        [[/hasTransport]]
    }),
    created() {
        [[#hasTransport]]
        [[/hasTransport]]
    },
    methods: {
        [[#hasTransport]]
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
        /* Vetur HACK – extra structure and type hinting */
        ...ComponentInstanceTypeDescriptor,
        ...ServiceTypeDescriptor
        [[/hasTransport]]
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
