<template>
    <section>
        <h1>Transport</h1>
        <div>BaseURL: {{ transportBaseUrl }}</div>
        <div>API response result: {{ apiResponseResult }}</div>
    </section>
</template>
<script>
import { Elem } from '@goodt/core';
import { useTransport, HttpAuthTransportSymbol, useApiService } from '@goodt/core/mixins';
import { descriptor } from './descriptor';
import { create as createApiService } from './service/ExampleApiService';

/**
 * useTransport example
 */
const { mixin: TransportMixin } = useTransport(HttpAuthTransportSymbol, {
    options(vm) {
        return {
            baseURL: vm.props.apiURL
        };
    }
});

/**
 * useTransport example
 */
const { mixin: ServiceMixin } = useApiService(createApiService);

/**
 * @typedef {import('./ElemWithTransport').IComponentOptions} IComponentOptions
 * @typedef {import('./ElemWithTransport').IInstance} IInstance
 */

/**
 * @type {IComponentOptions}
 */
export default {
    extends: Elem,
    data() {
        return {
            descriptor: descriptor(),
            apiResponseResult: null
        };
    },
    mixins: [TransportMixin, ServiceMixin],
    computed: {
        transportBaseUrl() {
            return this.$transport.getBaseUrl();
        }
    },
    /**
     * @this {IInstance}
     */
    mounted() {
        this.doApiRequest();
    },
    methods: {
        isChildAllowed(type) {
            return false;
        },
        getSlotNames() {
            return [];
        },
        getPanels() {
            return [];
        },
        /**
         *
         */
        async doApiRequest() {
            this.apiResponseResult = null;
            const response = await this.$apiService.getPollInfoDto(3);
            const { isFail, error, result } = response;
            if (isFail) {
                this.apiResponseResult = error.message;
                return;
            }
            this.apiResponseResult = result;
        }
    }
};
</script>
