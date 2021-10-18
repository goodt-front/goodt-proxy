<template>
    <div class="root" :class="cssClass" :style="cssStyle">
        <span class="box pad-l1" @click="numClicks++">
            {{ numClicks }}
        </span>
    </div>
</template>
<script>
import { Elem } from '@goodt-wcore/core';
import { useWatchStore } from '@goodt-wcore/core/managers/StoreManager';
import { SettingsPanelAsync } from './panels';
import { descriptor, Vars } from './descriptor';

export default {
    extends: Elem,
    data: () => ({
        descriptor: descriptor(),
        numClicks: 0
    }),
    computed: {
        /** @return {object} */
        $cssVars() {
            const { even, odd } = this.props.color;
            return {
                'box-bg': this.numClicks % 2 ? odd : even
            };
        }
    },
    watchStore: [
        {
            handler(state) {
                console.log('*.changed', state);
            }
        },
        {
            vars: [Vars.FOO],
            handler(state) {
                console.log('FOO.changed', state);
            }
        },
        {
            vars: [Vars.BAR],
            handler(state) {
                console.log('BAR.changed', state);
            }
        },
        {
            vars: [Vars.FOO, Vars.BAR],
            handler(state) {
                const [foo, bar] = Object.values(state);
                console.log('FOO-BAR.changed', state, foo, bar);
            }
        },
        {
            strat: 'all',
            vars: [Vars.FOO, Vars.BAR],
            handler(state) {
                const [foo, bar] = Object.values(state);
                console.log('[all] FOO-BAR.changed', state, foo, bar);
            }
        }
    ],
    created() {
        // this will be implemented in base `Elem` component
        useWatchStore(this);
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
        /**
         * @return {import('vue').AsyncComponent[]}
         */
        getPanels() {
            return [SettingsPanelAsync];
        }
    }
};
</script>
<style lang="less" scoped src="./style.less"></style>
