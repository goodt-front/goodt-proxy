<template>
    <section>
        <h2>OrgStructure GraphQL Service: {{ uid }}</h2>
        <h4>BaseURL: {{ $orgStructureGql.apiBaseURL }}</h4>
        <template v-if="employeeQuery">
            <div>Завершено: {{ employeeQuery.isCompleted ? 'Да' : 'Нет' }}</div>
            <div>Успешно: {{ employeeQuery.isSucceed ? 'Да' : 'Нет' }}</div>
            <div v-if="employeeQuery.isLoading">...Loading</div>
            <template v-if="employees.length > 0">
                <h3 class="mar-top-6">employee</h3>
                <ul class="unstyled">
                    <li v-for="employee in employees" :key="employee.id">
                        <pre class="ui-pre mar-top-6">{{
                            employee
                        }}</pre>
                    </li>
                </ul>
            </template>
            <button class="btn btn-primary mar-top-8 mar-left-4" @click="onEmployeeCreate">Create</button>
            <button class="btn btn-primary mar-top-8 mar-left-4" @click="onEmployeeDelete">Delete</button>
        </template>
    </section>
</template>

<script>
import { Elem } from '@goodt-wcore/core';
import { descriptor } from './descriptor';

/**
 * @type {IComponentOptions}
 */
export default {
    extends: Elem,
    inject: [ 'gqlService' ],
    data() {
        return {
            employeeId: 2,
            descriptor: descriptor(),
            employeeQuery: null,
        };
    },
    computed: {
        uid() {
            return this._uid;
        },
        employees() {
            const { result, isSuccess } = this.employeeQuery?.either ?? {};
            if (result) {
                return [result];
            }
            return [];
        }
    },
    watch: {
    },
    created() {
        this.createOperations();
    },

    /**
     * @this {IInstance}
     */
    mounted() {
        this.fetchEmployee();
    },
    methods: {
        createOperations() {
            this.employeeQuery = this.orgStructureGql.employeeQuery;

        },
        deleteEmployee() {
            this.employeeId += 1;
            this.orgStructureGql.deleteEmployee({ id: this.employeeId.toString() });
        },
        createEmployee() {
            this.orgStructureGql.createEmployee();
        },
        /**
         *
         */
        fetchEmployee() {
           this.orgStructureGql.getEmployee({ id: this.employeeId.toString() });
        },
        onEmployeeCreate() {
            this.createEmployee();
        },
        onEmployeeDelete() {
            this.deleteEmployee();
        }
    }
};
</script>

<style scoped>
    .ui-pre {
        white-space: break-spaces;
    }
</style>
