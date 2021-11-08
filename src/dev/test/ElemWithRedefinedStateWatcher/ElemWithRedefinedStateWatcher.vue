<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} -->
        <code>{{ type }}</code>
        <div v-if="state">Текущее состояние: {{ state }}</div>
        <div v-if="result">
            <pre v-for="(item, i) in result.rows" :key="i">{{ item }}</pre>
        </div>
        <div v-if="!props.dremio">no dataset selected</div>
        <!-- {/demo} -->
    </div>
</template>
<script>
/**
 * @typedef {import('./ElemWithRedefinedStateWatcher').IInstance} IInstance
 */
import { Elem } from '@goodt-wcore/core';
import { useDremio } from '@goodt-wcore/mixins';
import { DremioPanelAsync } from '@goodt-wcore/panels';
import { descriptor /*, Vars*/ } from './descriptor';

const { mixin: DremioMixin } = useDremio();

export default {
    extends: Elem,
    mixins: [DremioMixin],
    data() {
        return {
            descriptor: descriptor(),
            loadDataHooks: {
                before: () => {
                    this.loading = true;
                },
                then: (r) => r,
                catch: (e) => {
                    if (!e.isCancel) {
                        this.error = e;
                    }
                },
                finally: () => {
                    this.loading = false;
                }
            },
            loading: false,
            error: null,
            state: null
        };
    },
    created() {
        // to be implemented
    },
    methods: {
        getSlotNames() {
            return ['default'];
        },
        isChildAllowed(/* type */) {
            return true;
        },
        getPanels() {
            return [DremioPanelAsync];
        },
        loadDataPage(page) {
            this.page = page;
            this.loadData();
        },
        storeStateWatcher(state) {
            this.state = state;
        }
    }
};
</script>
