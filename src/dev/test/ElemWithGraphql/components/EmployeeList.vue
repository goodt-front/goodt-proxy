<template>
    <section>
        <h2>OrgStructure GraphQL Service: {{ uid }}</h2>
        <ui-operation-result v-model="assignmentsResult" always>
            <template v-if="assignments.length > 0">
                <h3 class="mar-top-6">assignments</h3>
                <ul class="unstyled">
                    <li v-for="{ id, ...assignment } in assignments" :key="id">
                        <pre class="ui-pre mar-top-6">{{ { id, ...assignment } }}</pre>
                    </li>
                </ul>
            </template>
        </ui-operation-result>

        <button class="btn btn-primary mar-top-8 mar-left-4" @click="onCreateEmployee">Create Employee</button>
        <button class="btn btn-primary mar-top-8 mar-left-4" @click="onDeleteEmployee">Delete Employee 1</button>
    </section>
</template>

<script>
import { OperationResult } from '@goodt-common/graphql';
import { Elem } from '@goodt-wcore/core';
import { OrgStructureConsumerMixinTypes } from '../api';

/**
 * @type {IComponentOptions}
 */
export default {
    extends: Elem,
    components: {
        UiOperationResult: OperationResult
    },
    inject: { orgStructureGql: 'orgStructureGql' },
    data() {
        return {
            employeeId: 0,
            employeesResult: null,
            assignmentsResult: null
        };
    },
    computed: {
        uid() {
            return this._uid;
        },
        employees() {
            if (this.employeesResult === null) {
                return [];
            }
            const { isSuccess, result } = this.employeesResult;
            if (isSuccess) {
                const {
                    employees: { list: employees }
                } = result;
                return employees;
            }
            return [];
        },
        assignments() {
            const { isSuccess = false, result } = this.assignmentsResult ?? {};
            if (isSuccess === false) {
                return [];
            }
            const {
                teamAssignments: { list: assignments }
            } = result;

            return assignments;
        }
    },
    /**
     * @this {IInstance}
     */
    created() {
        this.$nextTick(() => {
            this.fetchDivisionTeamAssignments();
        });
    },
    methods: {
        isChildAllowed(/* type */) {
            return true;
        },
        getSlotNames() {
            return ['default'];
        },
        getPanels() {
            return [];
        },
        /**
         *
         */
        fetchEmployees() {
            this.employeesResult = this.orgStructureGql.getEmployeesByIds([25, 26, 27]);
        },
        fetchDivisionTeamAssignments() {
            this.assignmentsResult = this.orgStructureGql.getDivisionTeamAssignments({
                employeeId: 1
            });
        },
        createEmployee(...args) {
            this.orgStructureGql.createEmployee(...args);
        },
        deleteEmployee(...args) {
            this.orgStructureGql.deleteEmployeeById(1);
        },
        onCreateEmployee() {
            this.createEmployee({ name: 'Тестовый' });
        },
        onDeleteEmployee() {
            this.deleteEmployee();
        },
        ...OrgStructureConsumerMixinTypes
    }
};
</script>

<style scoped>
.ui-pre {
    white-space: break-spaces;
}
</style>
