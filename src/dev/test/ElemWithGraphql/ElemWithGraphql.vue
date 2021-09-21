<template>
    <section>
<!--        <w-single :key="forceKeyOne" />-->
        <button class="btn btn-primary" @click="onResetFirst">Reset</button>
        <w-list :key="forceKeyTwo" :offset="0" />
        <w-list :key="forceKeyTwo + 1" :offset="1" />
        <button class="btn btn-primary mar-top-8 mar-left-4" @click="onReset">
            reset
        </button>
    </section>
</template>

<script>
import { Elem } from '@goodt-wcore/core';
// import EmployeeSingle from './EmployeeSingle.vue';
import EmployeeList from './components/EmployeeList.vue';
import { descriptor } from './descriptor';

import { useOrgStructureConsumerMixin, OrgStructureConsumerMixinTypes } from './api';

/**
 * @type {IComponentOptions}
 */
export default {
    extends: Elem,
    components: {
        // WSingle: EmployeeSingle,
        WList: EmployeeList
    },
    mixins: [ useOrgStructureConsumerMixin() ],
    provide() {
        const vm = this;
        return {
            get orgStructureGql() {
                return vm.orgStructureGql;
            }
        }
    },
    data() {
        return {
            descriptor: descriptor(),
            forceKeyTwo: 100,
            forceKeyOne: 1
        };
    },
    methods: {
        isChildAllowed(type) {
            return true;
        },
        getSlotNames() {
            return ['default'];
        },
        getPanels() {
            return [];
        },
        onReset() {
            this.forceKeyTwo = Date.now();
        },
        onResetFirst() {
            this.forceKeyOne = Date.now();
        },
        ...OrgStructureConsumerMixinTypes
    }
};
</script>
