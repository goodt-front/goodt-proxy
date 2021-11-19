<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} @todo: DELETE COMMENTS -->
        <h3>Результаты запроса</h3>
        <ui-operation-result :value="[operations.employeeQuery]" always>
            <template #default="{ isCompleted }">
                <h4>Сотрудник</h4>
                <code v-if="!isCompleted" class="d-flex">Данные сотрудника не загружены</code>
                <destruct :of="employeeData">
                    <template #is="{ id, name, surname }">Сотрудник #{{ id }} {{ name }} {{ surname }}</template>
                </destruct>
            </template>
        </ui-operation-result>
        <ui-operation-result :value="[operations.employeeQuery, operations.assignmentsQuery]" always>
            <template #loading>
                <div class="w-100 text-center">
                    <div class="preloader"></div>
                </div>
            </template>
            <template #error="{ error }">
                <div class="color-red">{{ error.message }}</div>
            </template>
            <template #default="{ isSuccess, isCompleted }">
                <div v-if="isSuccess" class="mar-top-5">
                    <h4>Команды и роли</h4>
                    <ul class="unstyled">
                        <li v-for="{ id, teamName, roleName } in assignmentDataEntries" :key="id">
                            <code class="wrap">{{ teamName }} – {{ roleName}}</code>
                        </li>
                    </ul>
                </div>
                <code v-else-if="isCompleted === false" class="d-flex mar-top-5">Назначения не загружены</code>
            </template>
        </ui-operation-result>
        <div class="mar-top-5 w-100 d-flex flex-h-center">
            <button :disabled="isBusy" class="btn btn-primary" @click="onFetchData">Fetch data</button>
        </div>
        <!-- {/demo} -->
    </div>
</template>

<script>
import { Elem } from '[[{core}]]';
import { OperationResult, resolveOperationStates } from '@goodt-common/graphql';
import { Destruct } from '@goodt-wcore/core/components';
import { useConsumersMixins, ConsumersMixinsTypes } from './api';
import { descriptor /* , Vars */ } from './descriptor';
import Panels from '[[{panelPath}]]';

/**
 * @typedef {import('./types/[[{name}]]').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

/**
 * Создаёт массив миксинов для использования сервисов вместе с компонентом
 */
const ConsumerMixins = useConsumersMixins();

/**
 * @typedef {Record<string, import('@goodt-common/graphql').OperationState>} OperationStatesRecord
 */

export default {
    extends: Elem,
    mixins: [ ...ConsumerMixins ],
    components: {
        UiOperationResult: OperationResult,
        Destruct
    },

    data: () => ({
        descriptor: descriptor(),
        /**
         * @type {Record<string, any>}
         */
        employeeData: null,
        /**
         * @type {Array<Record<string, any>>}
         */
        assignmentDataEntries: [],
        /**
         * @type {Record<string, import('@goodt-common/graphql').OperationState>}
         */
        operations: {
            employeeQuery: null,
            assignmentsQuery: null
        },
    }),

    watch: {
        'operations.employeeQuery': {
            handler: 'onEmployeeQueryCompleted',
            deep: true
        },
        'operations': {
            handler: 'onAllOperationsCompleted',
            deep: true
        },
    },

    computed: {
        /**
         * General component business
         * @return {boolean}
         */
        isBusy() {
            return Object.values(this.operations)
                .filter(Boolean)
                .some(({ isLoading }) => isLoading);
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
            return Panels;
        },

        // ///////////////////////////
        // View Model Data Management
        // ///////////////////////////
        buildEmployeeData({ result }) {
            // some data extraction and compilation
            const { employee: { id, person: { name, surname } } } = result;

            return {
                id,
                name,
                surname
            };
        },
        /**
         *
         * @param employeeResult
         * @param assignmentsResult
         * @return {*}
         */
        buildAssignmentsSummary({ employeeResult, assignmentsResult }) {
            const {
                employee: {
                    id: expertId,
                    person: { name, surname }
                }
            } = employeeResult;
            const {
                teamAssignments: { list: assignments }
            } = assignmentsResult;

            return assignments.map((assignment) => {
                const {
                    employee,
                    divisionTeamRole: {
                        divisionTeam: { fullName: teamName },
                        role: { fullName: roleName }
                    }
                } = assignment;

                return {
                    expert: { id: expertId, name, surname },
                    teamName,
                    roleName
                };
            });
        },

        // ////////////////
        // API Operations
        // ////////////////
        fetchDivisionTeamAssignments() {
            const divisionTeamId = 2;
            /*
             * non-promise api request
             * use `watch` to process result
             */
            this.operations.assignmentsQuery = this.orgStructureGql.getDivisionTeamAssignments({ divisionTeamId });
        },
        fetchEmployeeInfo() {
            const employeeId = 25;
            /*
             * non-promise api request
             * use `watch` to process result
             */
            this.operations.employeeQuery = this.orgStructureGql.getEmployeeById(employeeId);
        },

        // ///////////////
        // Event Handlers
        // ///////////////
        onFetchData() {
            this.fetchEmployeeInfo();
            this.fetchDivisionTeamAssignments();
        },

        /**
         * @param {{ isSuccess: boolean, isCompleted: boolean, result: any }} operations
         */
        onEmployeeQueryCompleted({ isSuccess, isCompleted, result }) {
            if (!isCompleted) {
                return;
            }
            if (isSuccess) {
                this.employeeData = this.buildEmployeeData({ result });
            }
        },
        /**
         * @param {OperationStatesRecord} operations
         */
        onAllOperationsCompleted(operations) {
            const {
                isCompleted,
                isSuccess,
                result: [employeeResult, assignmentsResult]
            } = resolveOperationStates(operations);

            if (!isCompleted) {
                return;
            }

            if (isSuccess) {
                this.assignmentDataEntries = this.buildAssignmentsSummary({ employeeResult, assignmentsResult });
            }
        },
        /* Vetur HACK – extra structure and type hinting */
        ...ConsumersMixinsTypes,
        ...ComponentInstanceTypeDescriptor
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
