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
/**
 * @typedef {import('./[[{name}]]').IInstance} IInstance
 */
import { Elem } from '[[{core}]]';
import { useDremio } from '[[{coreMixins}]]';
import { DremioPanelAsync, [[{panelName}]]Async } from '[[{panelPath}]]';
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
            error: null
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
            return [
                DremioPanelAsync,
                [[{panelName}]]Async
            ];
        },
        loadDataPage(page) {
            this.page = page;
            this.loadData();
        }
    }
};
</script>
