<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} @todo: DELETE COMMENTS -->
        <code v-if="isEditorMode">{{ type }}</code>
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
            @click="fetchDemoData">
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
    ApiMixins,
    ApiMixinsTypeDescriptor
} from './mixins';
[[/hasTransport]]
import { [[{panelName}]]Async } from '[[{panelPath}]]';
import { descriptor /* , Vars */ } from './descriptor';

/**
 * @typedef {import('./types').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

export default {
    extends: Elem,
    [[#hasTransport]]
    mixins: [ ...ApiMixins ],
    [[/hasTransport]]
    data: () => ({
        descriptor: descriptor()[[#hasTransport]],
        isLoading: false,
        /**
         * @type {import('[[{commonUtils}]]').ISafeResult}
         */
        demoResult: null
        [[/hasTransport]]
    }),
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
        /**
         * @return {import('vue').AsyncComponent[]}
         */
        getPanels() {
            return [ [[{panelName}]]Async ];
        },
        [[#hasTransport]]
        async fetchDemoData() {
            this.isLoading = true;
            /* this.demoResult = await this.orgStructureApi.getEmployeeDivisionTeamAssignments({ employeeId: 25 }); */
            this.demoResult = await this.apiService.getUserById(1);
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
        ...ApiMixinsTypeDescriptor,
        [[/hasTransport]]
        ...ComponentInstanceTypeDescriptor
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
