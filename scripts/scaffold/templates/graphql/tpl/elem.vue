<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} @todo: DELETE COMMENTS -->
        <h3>Результаты запроса</h3>
        <ui-operation-result v-model="operations.assignmentsQuery" always>
            <template #loading>
                <div class="preloader"></div>
            </template>
            <template #error="{ error }">
                <div class="color-red">{{ error.message }}</div>
            </template>
            <template #default="{ isSuccess }">
                <ul v-if="isSuccess">
                    <template v-for="item in renderDataList">
                        <li :key="item.id">{{ item.name }}</li>
                    </template>
                </ul>
                <code v-else>
                    Нет источника данных
                </code>
            </template>
        </ui-operation-result>
        <div class="mar-top-5 w-100 d-flex flex-h-center">
            <button class="btn btn-primary" @click="onFetchData">Fetch data</button>
        </div>
        <!-- {/demo} -->
    </div>
</template>
<script>
import { Elem } from '[[{core}]]';
import { OperationResult } from '@goodt-common/graphql';
import { useConsumersMixins, ConsumersMixinsTypes } from './api';
import { descriptor /* , Vars */ } from './descriptor';
import { [[{panelName}]]Async } from '[[{panelPath}]]';

/**
 * @typedef {import('./types').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;
/**
 * Создаёт массив миксинов для использования сервисов вместе с компонентом
 */
const ConsumerMixins = useConsumersMixins();

export default {
    extends: Elem,
    mixins: [ ...ConsumerMixins ],
    components: {
        UiOperationResult: OperationResult
    },

    data: () => ({
        descriptor: descriptor(),
        /**
         * @type {Array<Record<string, any>>}
         */
        renderDataList: [],
        /**
         * @type {Record<string, import('@goodt-common/graphql').OperationState>}
         */
        operations: {
            assignmentsQuery: null,
            /* some tasksQuery */
        },
    }),

    watch: {
        'operations.assignmentsQuery': 'onAssignmentsQueryChange'
    },

    computed: {
        isLoading() {
            return Object.values(this.operations).some(({ isLoading }) => isLoading);
        }
    },

    methods: {
        // ////////////////
        // Service Methods
        // ////////////////
        /**
         * @return {string[]}
         */
        getSlotNames() {
            return ['default'];
        },
        /**
         * @param {string} type widget type
         * @return {boolean}
         */
        isChildAllowed(/* type */) {
            return true;
        },
        /**
         * @return {Array<function(): Promise>}
         */
        getPanels() {
            return [ [[{panelName}]]Async ];
        },
        // ////////////////
        // View Model Data Builders
        // ////////////////
        buildSomeRenderData({ queryResultData }) {
            // some data extraction and compilation
            const { teamAssignments: { list: assignments } } = queryResultData;

            return assignments;
        },
        // ////////////////
        // API Operations
        // ////////////////
        fetchDivisionTeamAssignments() {
            /*
             * non-promise api request
             * use `computed` or `watch` to process result
             */
            const employeeId = 25;
            this.operations.assignmentsQuery = this.orgStructureGql.getDivisionTeamAssignments({ employeeId });
        },
        // ///////////////
        // Event Handlers
        // ///////////////
        onFetchData() {
            this.fetchDivisionTeamAssignments();
        },
        onAssignmentsQueryChange({ isSuccess, result: queryResultData }) {
            if (isSuccess) {
                this.renderDataList = this.buildSomeRenderData({ queryResultData });
                return;
            }
            this.renderDataList = [];
        },
        /* Vetur HACK – extra structure and type hinting */
        ...ConsumersMixinsTypes,
        ...ComponentInstanceTypeDescriptor
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
