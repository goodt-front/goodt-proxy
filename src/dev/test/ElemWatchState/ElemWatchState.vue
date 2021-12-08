<template>
    <div class="root" :class="cssClass" :style="cssStyle">
        <table class="table">
            <tr>
                <td>Сработали</td>
                <td>{{ hits['bar'] ? 'BAR' : '' }}</td>
                <td>{{ hits['foo'] ? 'FOO' : '' }}</td>
                <td>{{ hits['foo||bar'] ? '[ANY] FOO, BAR' : '' }}</td>
                <td>{{ hits['foo&bar'] ? '[ALL] FOO, BAR' : '' }}</td>
            </tr>
            <tr>
                <td>Store values</td>
                <td>BAR = {{ $storeState.bar }}</td>
                <td>FOO = {{ $storeState.foo }}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td><button class="btn btn-primary" @click="commitBar">BAR +1</button></td>
                <td><button class="btn btn-primary mar-left-3" @click="commitFoo">FOO +1</button></td>
                <td>
                    <button class="btn btn-primary mar-left-3" @click="commitBoth">BAR +1 & FOO + 1</button>
                </td>
                <td>
                    <button class="btn btn-error mar-left-3" @click="resetState">RESET</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import { Elem } from '@goodt-wcore/core';
import { StoreManager } from '@goodt-wcore/managers';
import { SettingsPanelAsync } from './panels';
import { descriptor, Vars } from './descriptor';

/**
 * @typedef {import('./ElemWatchState').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

export default {
    extends: Elem,
    data: () => ({
        descriptor: descriptor(),
        numClicks: 0,
        hits: {
            [Vars.BAR]: false,
            [Vars.FOO]: false,
            [Vars.FOO + '&' + Vars.BAR]: false,
            [Vars.FOO + '||' + Vars.BAR]: false
        }
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
    static: {},
    watchStore: [
        {
            handler(state) {
                console.log(state.c);
                console.log('*.changed', state);
            }
        },
        {
            vars: [Vars.FOO],
            when: true,
            handler([ foo ], state) {
                console.log('FOO.changed', { foo }, { state });
                this.hits[Vars.FOO] = true;
            }
        },
        {
            vars: [Vars.BAR],
            when: ([ bar ]) => bar > 6,
            handler([ bar ], state) {
                console.log('BAR.changed', { bar }, { state });
                this.hits[Vars.BAR] = true;
            }
        },
        {
            vars: [Vars.FOO, Vars.BAR],
            handler([ foo, bar ], state) {
                console.log('[any] FOO-BAR.changed', { foo, bar }, { state });
                this.hits[Vars.FOO + '||' + Vars.BAR] = true;
            }
        },
        {
            all: true,
            vars: [Vars.FOO, Vars.BAR],
            handler: 'onBarAndFooChanged'
        }
    ],
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
        },
        resetHits() {
            this.hits = {
                [Vars.BAR]: false,
                [Vars.FOO]: false,
                [Vars.FOO + '&' + Vars.BAR]: false,
                [Vars.FOO + '||' + Vars.BAR]: false
            };
        },
        commitBar() {
            this.resetHits();
            this.$storeCommit({
                [Vars.BAR]: (this.$storeState[Vars.BAR] ?? 0) + 1
            });
        },
        commitFoo() {
            this.resetHits();
            this.$storeCommit({
                [Vars.FOO]: (this.$storeState[Vars.FOO] ?? 0) + 1
            });
        },
        commitBoth() {
            this.resetHits();
            this.$storeCommit({
                [Vars.FOO]: (this.$storeState[Vars.FOO] ?? 0) + 1,
                [Vars.BAR]: (this.$storeState[Vars.BAR] ?? 0) + 1
            });
        },
        resetState() {
            this.resetHits();
            StoreManager.store.replace({});
        },
        onBarAndFooChanged([ foo, bar ]) {
            console.log('[all] FOO-BAR.changed', { foo, bar });
            this.hits[Vars.FOO + '&' + Vars.BAR] = true;
        }
    }
};
</script>
