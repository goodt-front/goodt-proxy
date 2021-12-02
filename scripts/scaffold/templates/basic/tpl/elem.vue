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
} from './api/mixins';
[[/hasTransport]]
import { descriptor /*, Vars */ } from './descriptor';
import { ElemInstanceTypeDescriptor } from './types';
import Panels from '[[{panelPath}]]';

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
        demoResult: null,
        [[/hasTransport]]
        /* Vetur HACK for type hinting */
        ...ApiMixinsTypeDescriptor,
        ...ElemInstanceTypeDescriptor
    }),
    /* static data used in <template></template> */
    static: {},
    watchStore: [
    /*
        {
            vars: [Vars.FOO],
            handler([ foo ], state) {
                /!* todo: implement *!/
            }
        },
        {
            // any changed and both are not undefined
            all: true,
            vars: [Vars.FOO, Vars.BAR],
            handler([ foo, bar ], state) {
                /!* todo: implement *!/
                console.log('[all] FOO-BAR.changed', { foo, bar }, { state );
            }
        }
    */
    ],
    methods: {
        /**
         * @return {string[]}
         */
        getSlotNames() {
            return ['default'];
        },
        /**
         * @param {string} [type]  widget type
         * @return {boolean}
         */
        isChildAllowed(/* type */) {
            return true;
        },
        /**
         * @return {import('vue').AsyncComponent[]}
         */
        getPanels() {
            return Panels;
        },
        [[#hasTransport]]
        async fetchDemoData() {
            this.isLoading = true;
            /* this.demoResult = await this.orgStructureApiService.getEmployeeDivisionTeamAssignments({ employeeId: 25 }); */
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
        }
        [[/hasTransport]]
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
