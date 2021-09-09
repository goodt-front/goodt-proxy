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
import {
    useApiServiceMixin, ApiServiceTypeDescriptor,
    useOrgStructureApiServiceMixin, OrgStructureApiServiceTypeDescriptor
} from './api';
[[/hasTransport]]
import { [[{panelName}]]Async } from '[[{panelPath}]]';
import { descriptor /* , Vars */ } from './descriptor';

/**
 * @typedef {import('./types').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

[[#hasTransport]]
/**
 * Миксин для использования ApiService вместе с компонентом
 * Дефолтные `apiBaseURL` и `name` настройки определены в аргументах миксина
 * @type {import('@goodt-common/mixins').IApiServiceMixin}
 */
const ApiServiceMixin = useApiServiceMixin();
/**
 * Миксин для использования OrgStructureApiService вместе с компонентом
 * Дефолтные настройки определены в аргументах миксина
 * @type {import('@goodt-common/mixins').IApiServiceMixin}
 */
const OrgStructureApiServiceMixin = useOrgStructureApiServiceMixin();
[[/hasTransport]]

export default {
    extends: Elem,
    [[#hasTransport]]
    mixins: [ ApiServiceMixin, OrgStructureApiServiceMixin ],
    [[/hasTransport]]
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
    [[#hasTransport]]
    computed: {
        apiBaseUrl() {
            const { options } = this.descriptor.props.apiBaseUrl;
            const { apiBaseURL: baseUrl } = this.props;

            return options.build(this.$c(baseUrl));
        },
        orgStructureApiUrl() {
            const { options } = this.descriptor.props.orgStructureApiUrl;
            const { orgStructureApiUrl: baseUrl } = this.props;

            return options.build(this.$c(baseUrl));
        },
    },
    [[/hasTransport]]
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
        isChildAllowed(/* type */) {
            return true;
        },
        getPanels() {
            return [ [[{panelName}]]Async ];
        },
        [[#hasTransport]]
        async getDemoData() {
            this.isLoading = true;
            /* this.demoResult = await this.apiService.getUserById(1); */
            this.demoResult = await this.orgStructureApi.getEmployeeDivisionTeamAssignments({ employeeId: 25 });
            this.isLoading = false;
            const { isSuccess, isError, result: employeeAssignments, error } = this.demoResult;
            if (isError) {
                console.error(error.message);
                return;
            }
            if (isSuccess) {
                console.log({ employeeAssignments });
            }
        },
        /* Vetur HACK – extra structure and type hinting */
        ...ApiServiceTypeDescriptor,
        ...OrgStructureApiServiceTypeDescriptor,
        [[/hasTransport]]
        ...ComponentInstanceTypeDescriptor
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
