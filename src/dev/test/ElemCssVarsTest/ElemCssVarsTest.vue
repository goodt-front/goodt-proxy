<template>
    <div class="widget" :class="cssClass" :style="cssStyle" @click="isClicked = !isClicked">
        <code>{{ type }}</code>
        <div v-if="isEditorMode">running in editor</div>
        <div>{{ props }}</div>
        <button v-for="index in props.buttonStyles.length" class="btn btn-outline" :style="buttonCssVars[index]">
            <span class="btn__text">text</span>
        </button>
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

const createButtonCssVarsMappingByIndex = (i) => ({
    'button-caption_color': `buttonStyles[${i}].textColor`
});

export default {
    extends: Elem,
    data: () => ({
        descriptor: descriptor(),
        isClicked: false
    }),
    computed: {
        $cssVars() {
            return { 'font-size': this.isClicked ? '1rem' : '2rem' };
        },
        buttonCssVars() {
            const buildCssVarsStyle = (index) => this.genCssVarsStyle(
                this.buildCssVars(
                    createButtonCssVarsMappingByIndex(index)
                )
            );
            return Object.keys(this.props.buttonStyles)
                .map(buildCssVarsStyle)
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
