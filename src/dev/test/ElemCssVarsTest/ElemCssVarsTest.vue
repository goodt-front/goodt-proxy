<template>
    <div class="widget" :class="cssClass" :style="cssStyle" @click="isClicked = !isClicked">
        <!-- {demo} @todo: DELETE COMMENTS -->
        <code>{{ type }}</code>
        <div v-if="isEditorMode">running in editor</div>
        <div>{{ props }}</div>
        <!-- {/demo} -->
    </div>
</template>
<script>
import { Elem } from '@goodt-wcore/core';
import { SettingsPanelAsync } from './panels';
import { descriptor /* , Vars */ } from './descriptor';

/**
 * @typedef {import('./types').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

export default {
    extends: Elem,
    data: () => ({
        descriptor: descriptor(),
        isClicked: false
    }),
    computed: {
        $cssVars() {
            return { 'font-size': this.isClicked ? '1rem' : '2rem' };
        }
    },
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
            return [SettingsPanelAsync];
        },
        ...ComponentInstanceTypeDescriptor
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
