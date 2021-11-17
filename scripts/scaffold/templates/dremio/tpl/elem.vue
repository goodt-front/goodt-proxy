<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} -->
        <code>{{ type }}</code>
        <div v-if="isEditorMode">running in editor</div>
        <div v-if="result">
            <pre v-for="(item, i) in result.rows" :key="i">{{ item }}</pre>
        </div>
        <div v-if="loading">loading</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="!props.dremio">no dataset selected</div>
        <ul class="pagination" v-if="pages > 1">
            <li v-for="n in pages" :key="n" :class="{ active: n === page }">
                <a href="#" @click.stop="loadDataPage(n)">{{ n }}</a>
            </li>
        </ul>
        <!-- {/demo} -->
    </div>
</template>
<script>
import { Elem } from '[[{core}]]';
import { useDremio } from '[[{coreMixins}]]';
import { descriptor /*, Vars */ } from './descriptor';
import Panels from '[[{panelPath}]]';

/**
 * @typedef {import('./types/[[{name}]]').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

export default {
    extends: Elem,
    mixins: [ useDremio().mixin ],
    data: (vm) => ({
        descriptor: descriptor(),
        loadDataHooks: {
            before: () => {
                vm.loading = true;
            },
            then: (result) => result,
            catch: (error) => {
                if (!error.isCancel) {
                    vm.error = error;
                }
            },
            finally: () => {
                vm.loading = false;
            }
        },
        /* Vetur HACK */
        ...ComponentInstanceTypeDescriptor
    }),
    methods: {
        getSlotNames() {
            return ['default'];
        },
        isChildAllowed(/* type */) {
            return true;
        },
        getPanels() {
            return Panels;
        },
        loadDataPage(page) {
            this.page = page;
            this.loadData();
        }
    }
};
</script>
