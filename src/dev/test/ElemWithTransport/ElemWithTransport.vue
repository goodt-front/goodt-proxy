<template>
    <section>
        <h1 @click="doApiRequest">Transport</h1>
        <div @click="changeApiURL">BaseURL: {{ $apiService.apiBaseURL }}</div>
        <div v-if="apiResponseResult.isError">{{ apiResponseResult.value }}</div>
        <div v-else>API response result: {{ apiResponseResult.value }}</div>
    </section>
</template>
<script>
import { Elem } from '@goodt/core';
import { useApiService } from '@goodt/common/mixins';
import { fail, success } from '@goodt/common/utils';
import { PresentableError } from '@goodt/common/errors';
import { descriptor } from './descriptor';
import { create as createApiService } from './service/ExampleApiService';
// import { ExampleDomainService } from './service/ExampleDomainService';

/**
 * @param {ApiServiceError} error
 */
const processApiServiceError = (error) => {
    if (error.code === error.constructor.Code.NOT_FOUND) {
        return new PresentableError('Ресурс не найден');
    }

    if (error.code === error.constructor.Code.FORBIDDEN) {
        this.apiResponseResult = 'У вас нет прав доступа к этому ресурсу';
        return new PresentableError('Ресурс не найден');
    }

    return new PresentableError('Неизвестная ошибка');
};

/**
 * useTransport example
 */
const { mixin: ServiceMixin } = useApiService(createApiService, {
    name: '$apiService',
    apiBaseURL: 'apiURL'
});

/**
 * @type {IComponentOptions}
 */
export default {
    extends: Elem,
    data() {
        return {
            descriptor: descriptor(),
            apiResponseResult: success(null),
            apiURL: null
        };
    },
    mixins: [ServiceMixin],

    created() {
        this.apiURL = this.props.apiURL;
        // this.useCases = new ExampleDomainService({ apiService: this.$apiService });
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
        changeApiURL() {
            this.apiURL += '1';
        },
        /**
         *
         */
        async doApiRequest() {
            this.apiResponseResult = success(null);

            // const safeResult = await this.useCases.getPollInfo(200);
            const safeResult = await this.$apiService.getPollInfo(1);
            const { isFail, error, result: pollInfo } = safeResult;
            if (isFail) {
                const presentableError = processApiServiceError(error);
                this.apiResponseResult = fail(presentableError);
                return;
            }

            this.apiResponseResult = pollInfo;
            // this.useCases.savePollInfo(pollInfo);
        }
    }
};
</script>
