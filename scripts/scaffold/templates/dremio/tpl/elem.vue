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
 * @typedef {import('./[[{name}]]').IComponentOptions} IComponentOptions
 * @typedef {import('./[[{name}]]').IInstance} IInstance
 */
import { Elem } from '[[{core}]]';
import { mixin as DremioMixin } from '[[{core}]]/dremio';
import { descriptor } from './descriptor';

/**
 * @type {IComponentOptions}
 */
export default ({
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
    // @todo: DELETE UNUSED STUFF
    /*
    watch: {
        $storeState(state, prevState) {
            // to be implement watch
        },
        $routeCurrent(route, prevRoute) {
            // to be implement watch
        },
    },
    */
    /**
     * @todo: DELETE UNUSED STUFF
     * @this {IInstance}
     */
    created() {
        // to be implemented
    },
    methods: {
        // @todo: DELETE UNUSED STUFF
        /*
        sampleStoreCommitMethod() {
           // ...
           this.$storeCommit(updatedState);
        },
        sampleRouteNavigateMethod() {
           // ...
           this.$routeNavigate({ path, query });
        },
        */
        getSlotNames() {
            return ['default'];
        },
        isChildAllowed(/* type */) {
            return true;
        },
        getPanels() {
            return [
                import('[[{lib}]]/DremioPanel.vue'),
                import('[[{panelPath}]]/[[{panelName}]].vue')
            ];
        },
        loadDataPage(page) {
            this.page = page;
            this.loadData();
        }
    }
});
</script>
